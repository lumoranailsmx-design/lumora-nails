import "./index.css";
import { Composition } from "remotion";
import { LumoraPromo } from "./Lumora/LumoraPromo";
import { DURATION, FPS, HEIGHT, WIDTH } from "./Lumora/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LumoraPromo"
      component={LumoraPromo}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
