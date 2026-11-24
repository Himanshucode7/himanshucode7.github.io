import type { CSSProperties } from "react";
import type { PhotoAsset, Photo as PhotoData } from "@/content/types";
import { cn } from "@/lib/cn";
import { withBasePath } from "@/lib/site-url";

type Loading =
  /** The LCP image: fetched eagerly, ahead of everything else. */
  | "priority"
  /** Above the fold but not urgent (e.g. the second hero look). */
  | "eager"
  /** Everything below the fold. */
  | "lazy";

type PhotoProps = {
  photo: PhotoData;
  /** How wide the image renders at each breakpoint, as a `sizes` attribute. */
  sizes: string;
  loading?: Loading;
  /** Overrides the photo's own alt text, e.g. "" for a purely decorative copy. */
  alt?: string;
  className?: string;
  style?: CSSProperties;
};

function srcSet(asset: PhotoAsset, format: "avif" | "webp") {
  return asset.widths
    .map((width) => `${withBasePath(`/images/photos/${asset.file}-${width}.${format}`)} ${width}w`)
    .join(", ");
}

/**
 * Responsive photo from the pre-built set in /public/images/photos: AVIF with a
 * WebP fallback, several widths, intrinsic size to prevent layout shift, and a
 * blurred placeholder painted behind the image until it arrives.
 * (GitHub Pages serves static files, so the images are optimised at build time
 * by `npm run images` instead of by an image server.)
 */
export function Photo({ photo, sizes, loading = "lazy", alt, className, style }: PhotoProps) {
  const { asset, focus } = photo;
  const largest = asset.widths[asset.widths.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(asset, "avif")} sizes={sizes} />
      <img
        src={withBasePath(`/images/photos/${asset.file}-${largest}.webp`)}
        srcSet={srcSet(asset, "webp")}
        sizes={sizes}
        width={asset.width}
        height={asset.height}
        alt={alt ?? photo.alt}
        loading={loading === "lazy" ? "lazy" : "eager"}
        fetchPriority={loading === "priority" ? "high" : loading === "eager" ? "low" : "auto"}
        decoding={loading === "priority" ? "auto" : "async"}
        draggable={false}
        className={cn("select-none", className)}
        style={{
          objectPosition: focus,
          backgroundImage: `url(${asset.placeholder})`,
          backgroundSize: "cover",
          backgroundPosition: focus,
          ...style,
        }}
      />
    </picture>
  );
}
