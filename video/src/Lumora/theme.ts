import { loadFont } from "@remotion/fonts";
import { Easing, staticFile } from "remotion";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION = 15 * FPS;

export const colors = {
  black: "#0B0908",
  ink: "#16120F",
  champagne: "#E3CCA6",
  gold: "#C8A574",
  nude: "#E9D6C6",
  beige: "#F4ECE3",
  blush: "#EBCFCB",
};

export const serif = "Cormorant Garamond";
export const sans = "Poppins";

const fontFiles: { family: string; file: string; weight: string; style: string }[] = [
  ...(["300", "400", "500"] as const).flatMap((weight) =>
    (["normal", "italic"] as const).map((style) => ({
      family: serif,
      file: `cormorant-garamond-latin-${weight}-${style}.woff2`,
      weight,
      style,
    })),
  ),
  ...(["300", "400", "500"] as const).map((weight) => ({
    family: sans,
    file: `poppins-latin-${weight}-normal.woff2`,
    weight,
    style: "normal",
  })),
];

for (const f of fontFiles) {
  loadFont({
    family: f.family,
    url: staticFile(`fonts/${f.file}`),
    weight: f.weight,
    style: f.style,
  });
}

export const img = (name: string) => staticFile(`images/${name}.jpg`);

// Slow-in / long settle curves used across the piece.
export const ease = {
  silk: Easing.bezier(0.22, 1, 0.36, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  push: Easing.bezier(0.45, 0, 0.2, 1),
};
