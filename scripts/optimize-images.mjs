/**
 * Builds every photo the site serves from the masters in assets/photos.
 *
 *   npm run images
 *
 * For each photo it writes AVIF and WebP files at a few widths to
 * public/images/photos, and a typed manifest (sizes plus a tiny blurred
 * placeholder) to content/photos.generated.ts. It also renders the Open Graph
 * card, public/og-image.jpg. Outputs are committed, so the site build never
 * needs sharp; run this again after adding or replacing a master.
 *
 * Photos stay photos: raster formats at several sizes keep faces and skin
 * exactly as shot while letting phones download a fraction of the bytes.
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const SOURCE_DIR = path.join(root, "assets", "photos");
const OUTPUT_DIR = path.join(root, "public", "images", "photos");
const MANIFEST = path.join(root, "content", "photos.generated.ts");
const OG_IMAGE = path.join(root, "public", "og-image.jpg");

/**
 * `widths` are targets; any within 15% of the master's own width are dropped in
 * favour of the full-size file. `trimFrame` removes the white rounded mat baked
 * into some exports (the corners left behind are hidden by a CSS radius).
 */
const PHOTOS = [
  { id: "monoWetHair", source: "portrait-mono-wet-hair.webp", widths: [480, 800] },
  { id: "monoWetLook", source: "portrait-mono-wet-look.webp", widths: [480, 800] },
  { id: "buildLearnGrow", source: "portrait-build-learn-grow.webp", widths: [400, 640], trimFrame: true },
  { id: "dreamBigger", source: "portrait-dream-bigger.webp", widths: [400, 640], trimFrame: true },
];

const AVIF = { quality: 52, effort: 6 };
const WEBP = { quality: 78, effort: 6, smartSubsample: true };
const PLACEHOLDER_WIDTH = 24;
/** Extra pixels removed inside a trimmed mat, so no anti-aliased white fringe survives. */
const TRIM_INSET = 3;

async function loadMaster(photo) {
  const file = path.join(SOURCE_DIR, photo.source);
  if (!photo.trimFrame) return sharp(file).removeAlpha().toBuffer({ resolveWithObject: true });

  const trimmed = await sharp(file).removeAlpha().trim({ background: "#ffffff", threshold: 12 }).toBuffer({
    resolveWithObject: true,
  });
  const { width, height } = trimmed.info;
  return sharp(trimmed.data)
    .extract({ left: TRIM_INSET, top: TRIM_INSET, width: width - 2 * TRIM_INSET, height: height - 2 * TRIM_INSET })
    .toBuffer({ resolveWithObject: true });
}

function targetWidths(photo, fullWidth) {
  const smaller = photo.widths.filter((width) => width <= fullWidth * 0.85);
  return [...new Set([...smaller, fullWidth])].sort((a, b) => a - b);
}

async function buildPhoto(photo) {
  const { data, info } = await loadMaster(photo);
  const stem = path.basename(photo.source, path.extname(photo.source));
  const widths = targetWidths(photo, info.width);
  const files = [];

  for (const width of widths) {
    const resized = sharp(data).resize({ width });
    const avif = await resized.clone().avif(AVIF).toFile(path.join(OUTPUT_DIR, `${stem}-${width}.avif`));
    const webp = await resized.clone().webp(WEBP).toFile(path.join(OUTPUT_DIR, `${stem}-${width}.webp`));
    files.push(`${width}w avif ${kb(avif.size)} / webp ${kb(webp.size)}`);
  }

  const tiny = await sharp(data).resize({ width: PLACEHOLDER_WIDTH }).blur(0.6).webp({ quality: 50 }).toBuffer();
  console.log(`${photo.id} (${info.width}x${info.height})\n  ${files.join("\n  ")}`);

  return [
    photo.id,
    {
      file: stem,
      width: info.width,
      height: info.height,
      widths,
      placeholder: `data:image/webp;base64,${tiny.toString("base64")}`,
    },
  ];
}

function kb(bytes) {
  return `${Math.round(bytes / 1024)}KB`;
}

/** 1200×630 social card: name on the left, the hero portrait fading in from the right. */
async function buildOpenGraphImage() {
  const WIDTH = 1200;
  const HEIGHT = 630;
  const BACKGROUND = "#0a0a0a";
  // Scaled a little taller than the card, then cropped, so the face sits higher and larger.
  const scaled = await sharp(path.join(SOURCE_DIR, "portrait-mono-wet-hair.webp"))
    .resize({ height: 700 })
    .toBuffer({ resolveWithObject: true });
  const portraitWidth = Math.min(scaled.info.width, WIDTH);
  const portrait = await sharp(scaled.data)
    .extract({ left: 0, top: 20, width: portraitWidth, height: HEIGHT })
    .toBuffer();
  const portraitLeft = WIDTH - portraitWidth;

  const overlay = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
      <defs>
        <linearGradient id="fade-x" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="${BACKGROUND}" stop-opacity="1"/>
          <stop offset="1" stop-color="${BACKGROUND}" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="fade-y" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="${BACKGROUND}" stop-opacity="0"/>
          <stop offset="1" stop-color="${BACKGROUND}" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <rect x="${portraitLeft}" y="0" width="220" height="${HEIGHT}" fill="url(#fade-x)"/>
      <rect x="0" y="${HEIGHT - 200}" width="${WIDTH}" height="200" fill="url(#fade-y)"/>
      <g font-family="Segoe UI, Arial, sans-serif" fill="#fafafa">
        <text x="64" y="100" font-size="22" letter-spacing="3" fill="#a3a3a3">FRONTEND DEVELOPER</text>
        <text x="60" y="400" font-size="112" font-weight="600" letter-spacing="-4">HIMANSHU</text>
        <text x="60" y="500" font-size="112" font-weight="600" letter-spacing="-4">RANA</text>
        <text x="64" y="566" font-size="26" fill="#d4d4d4">Building thoughtful digital experiences.</text>
      </g>
    </svg>`;

  await sharp({ create: { width: WIDTH, height: HEIGHT, channels: 3, background: BACKGROUND } })
    .composite([
      { input: portrait, left: portraitLeft, top: 0 },
      { input: Buffer.from(overlay), left: 0, top: 0 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(OG_IMAGE);
  console.log(`og-image.jpg (${WIDTH}x${HEIGHT})`);
}

async function main() {
  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  const entries = [];
  for (const photo of PHOTOS) entries.push(await buildPhoto(photo));

  const manifest = `// Generated by scripts/optimize-images.mjs (npm run images). Do not edit by hand.
import type { PhotoAsset } from "./types";

export const photoAssets = ${JSON.stringify(Object.fromEntries(entries), null, 2)} as const satisfies Record<string, PhotoAsset>;
`;
  await writeFile(MANIFEST, manifest);
  await buildOpenGraphImage();
}

await main();
