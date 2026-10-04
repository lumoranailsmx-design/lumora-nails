import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { Grade, Grain } from "./primitives";
import { Brand, EndCard, Hook, Services, SignatureNails } from "./scenes";
import { colors } from "./theme";

// Frames where something moves fast enough to deserve real motion blur.
// Elsewhere the camera is slow, so we skip the (expensive) multi-sample pass.
const BLUR_WINDOWS: [number, number][] = [
  [56, 80],
  [104, 132],
  [148, 172],
  [192, 214],
  [232, 254],
  [268, 292],
  [350, 372],
];

const Timeline: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.black }}>
    <Sequence durationInFrames={74} name="Hook">
      <Hook />
    </Sequence>
    <Sequence from={60} durationInFrames={114} name="Signature nails">
      <SignatureNails />
    </Sequence>
    <Sequence from={150} durationInFrames={142} name="Services">
      <Services />
    </Sequence>
    <Sequence from={270} durationInFrames={102} name="Brand">
      <Brand />
    </Sequence>
    <Sequence from={356} name="End card">
      <EndCard />
    </Sequence>
  </AbsoluteFill>
);

export const LumoraPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const blurred = BLUR_WINDOWS.some(([a, b]) => frame >= a && frame <= b);
  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      {blurred ? (
        <CameraMotionBlur shutterAngle={200} samples={8}>
          <Timeline />
        </CameraMotionBlur>
      ) : (
        <Timeline />
      )}
      <Grade />
      <Grain />
    </AbsoluteFill>
  );
};
