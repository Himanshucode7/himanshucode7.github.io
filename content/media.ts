import { photoAssets } from "./photos.generated";
import type { Photo } from "./types";

/*
 * Where each photo appears and how it is described. The files themselves are built
 * by `npm run images` from the masters in assets/photos.
 * `focus` is the CSS object-position that keeps the face in frame when cropped.
 */
export const media = {
  /** The two hero looks. The first is the LCP image and loads with high priority. */
  hero: [
    {
      asset: photoAssets.monoWetHair,
      alt: "Black and white portrait of Himanshu Rana with wet hair, looking into the camera.",
      focus: "50% 32%",
    },
    {
      asset: photoAssets.monoWetLook,
      alt: "Black and white portrait of Himanshu Rana in a wet black shirt, chin raised.",
      focus: "50% 30%",
    },
  ],
  about: {
    asset: photoAssets.buildLearnGrow,
    alt: "Himanshu Rana smiling at his desk beside a laptop, with the handwritten words “Build. Learn. Grow.”",
    focus: "50% 40%",
  },
  outro: {
    asset: photoAssets.dreamBigger,
    alt: "Himanshu Rana smiling outdoors at sunset, with the handwritten words “Dream Bigger”.",
    focus: "50% 40%",
  },
} as const satisfies {
  hero: readonly [Photo, Photo];
  about: Photo;
  outro: Photo;
};
