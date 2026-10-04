import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  useCurrentFrame,
  type EasingFunction,
} from "remotion";
import { colors, ease, sans, serif } from "./theme";

/** interpolate() with clamping on both ends and an optional easing. */
export const tween = (
  frame: number,
  input: [number, number],
  output: [number, number],
  easing: EasingFunction = ease.silk,
) =>
  interpolate(frame, input, output, {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

type Camera = { scale: number; x: number; y: number; rotate?: number };

/**
 * A photograph with a virtual camera: the frame of the image is fixed and the
 * camera pushes, pans and rolls over it between two keyframes.
 */
export const Photo: React.FC<{
  src: string;
  from: Camera;
  to: Camera;
  start?: number;
  end: number;
  blur?: number;
  brightness?: number;
  origin?: string;
  position?: string;
  easing?: EasingFunction;
  style?: React.CSSProperties;
}> = ({
  src,
  from,
  to,
  start = 0,
  end,
  blur = 0,
  brightness = 1,
  origin = "50% 50%",
  position = "50% 50%",
  easing = ease.push,
  style,
}) => {
  const frame = useCurrentFrame();
  const t = (a: number, b: number) => tween(frame, [start, end], [a, b], easing);
  const scale = t(from.scale, to.scale);
  const x = t(from.x, to.x);
  const y = t(from.y, to.y);
  const rotate = t(from.rotate ?? 0, to.rotate ?? 0);
  return (
    <AbsoluteFill style={{ overflow: "hidden", ...style }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: position,
          transformOrigin: origin,
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`,
          filter: `blur(${blur}px) brightness(${brightness}) saturate(0.92) contrast(1.04)`,
        }}
      />
    </AbsoluteFill>
  );
};

/** Warm cinematic grade: lifted blacks, champagne highlights. */
export const Grade: React.FC<{ strength?: number }> = ({ strength = 1 }) => (
  <>
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, rgba(227,204,166,0.10) 0%, rgba(235,207,203,0.06) 45%, rgba(22,18,15,0.0) 100%)`,
        mixBlendMode: "soft-light",
        opacity: strength,
      }}
    />
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(120% 80% at 50% 45%, rgba(0,0,0,0) 55%, rgba(11,9,8,0.38) 100%)",
        opacity: strength,
      }}
    />
  </>
);

/** Animated film grain. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.09 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 12;
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id={`grain-${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

/**
 * Out-of-focus champagne specks drifting in front of the subject. They move
 * faster than the photo underneath, which reads as depth.
 */
export const Dust: React.FC<{
  count?: number;
  seed: string;
  speed?: number;
  opacity?: number;
}> = ({ count = 18, seed, speed = 1, opacity = 1 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      {new Array(count).fill(0).map((_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const size = 4 + r("s") ** 2 * 26;
        const near = size > 18;
        const x = r("x") * 1080 + Math.sin(frame / 40 + i) * 12;
        const y =
          ((r("y") * 2200 - frame * speed * (0.6 + size / 14)) % 2200 + 2200) % 2200 - 140;
        const twinkle = 0.45 + 0.55 * Math.abs(Math.sin(frame / (14 + r("t") * 18) + i));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(246,230,200,${near ? 0.55 : 0.9}) 0%, rgba(227,204,166,0) 70%)`,
              filter: `blur(${near ? size / 5 : 0.6}px)`,
              opacity: twinkle * (near ? 0.5 : 0.85),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** A soft diagonal band of light that glides across the frame once. */
export const LightSweep: React.FC<{ start: number; duration?: number; opacity?: number }> = ({
  start,
  duration = 34,
  opacity = 0.55,
}) => {
  const frame = useCurrentFrame();
  const p = tween(frame, [start, start + duration], [-0.6, 1.6], ease.inOut);
  if (frame < start || frame > start + duration) return null;
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(115deg, rgba(255,240,215,0) ${p * 100 - 22}%, rgba(255,240,215,0.85) ${p * 100}%, rgba(255,240,215,0) ${p * 100 + 22}%)`,
        mixBlendMode: "soft-light",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

/** Text that resolves letter by letter from a soft, out-of-focus state. */
export const RevealText: React.FC<{
  text: string;
  start: number;
  stagger?: number;
  duration?: number;
  exitAt?: number;
  exitDuration?: number;
  rise?: number;
  style?: React.CSSProperties;
}> = ({ text, start, stagger = 1.6, duration = 22, exitAt, exitDuration = 12, rise = 26, style }) => {
  const frame = useCurrentFrame();
  const exit = exitAt === undefined ? 0 : tween(frame, [exitAt, exitAt + exitDuration], [0, 1], ease.inOut);
  return (
    <div style={{ display: "flex", justifyContent: "center", whiteSpace: "pre", ...style }}>
      {text.split("").map((ch, i) => {
        const s = start + i * stagger;
        const p = tween(frame, [s, s + duration], [0, 1]);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p * (1 - exit),
              filter: `blur(${(1 - p) * 14 + exit * 10}px)`,
              transform: `translateY(${(1 - p) * rise - exit * rise * 0.8}px)`,
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

export const Eyebrow: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      fontFamily: sans,
      fontWeight: 300,
      fontSize: 22,
      letterSpacing: "0.55em",
      textTransform: "uppercase",
      color: colors.champagne,
      ...style,
    }}
  >
    {children}
  </div>
);

export const serifStyle = (size: number, italic = false): React.CSSProperties => ({
  fontFamily: serif,
  fontWeight: 400,
  fontStyle: italic ? "italic" : "normal",
  fontSize: size,
  lineHeight: 1,
  color: colors.beige,
});

/** Four-point sparkle, the star from the Lumora sign. */
export const Sparkle: React.FC<{ size: number; color?: string; style?: React.CSSProperties }> = ({
  size,
  color = colors.champagne,
  style,
}) => (
  <svg width={size} height={size} viewBox="-50 -50 100 100" style={style}>
    <path
      d="M0 -50 C4 -12 12 -4 50 0 C12 4 4 12 0 50 C-4 12 -12 4 -50 0 C-12 -4 -4 -12 0 -50 Z"
      fill={color}
    />
  </svg>
);

/** Arch window (flat bottom, round top) — the shape of the studio's lit wall. */
export const archRadius = (w: number, roundness = 1) =>
  `${(w / 2) * roundness}px ${(w / 2) * roundness}px 0 0`;
