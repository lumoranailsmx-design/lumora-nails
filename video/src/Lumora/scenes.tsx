import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  Dust,
  Eyebrow,
  LightSweep,
  Photo,
  RevealText,
  Sparkle,
  serifStyle,
  tween,
} from "./primitives";
import { colors, ease, HEIGHT, img, sans, serif, WIDTH } from "./theme";

type Rect = { left: number; top: number; w: number; h: number };

const lerpRect = (p: number, a: Rect, b: Rect): Rect => ({
  left: a.left + (b.left - a.left) * p,
  top: a.top + (b.top - a.top) * p,
  w: a.w + (b.w - a.w) * p,
  h: a.h + (b.h - a.h) * p,
});

/** clip-path for an arch window (round top, flat bottom) in frame coordinates. */
const archClip = ({ left, top, w, h }: Rect, roundness = 1) => {
  const r = (w / 2) * roundness;
  return `inset(${top}px ${WIDTH - left - w}px ${HEIGHT - top - h}px ${left}px round ${r}px ${r}px 0 0)`;
};

/** Thin champagne outline that sits just outside an arch window, like the studio's LED arch. */
const ArchOutline: React.FC<{ rect: Rect; gap?: number; opacity?: number; draw?: number }> = ({
  rect,
  gap = 22,
  opacity = 0.8,
  draw = 1,
}) => {
  const left = rect.left - gap;
  const top = rect.top - gap;
  const w = rect.w + gap * 2;
  const h = rect.h + gap;
  const r = w / 2;
  const d = `M ${left} ${top + h} L ${left} ${top + r} A ${r} ${r} 0 0 1 ${left + w} ${top + r} L ${left + w} ${top + h}`;
  const length = 2 * (h - r) + Math.PI * r;
  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      style={{ position: "absolute", inset: 0, opacity, filter: "drop-shadow(0 0 10px rgba(240,214,170,0.55))" }}
    >
      <path
        d={d}
        fill="none"
        stroke={colors.champagne}
        strokeWidth={2}
        strokeDasharray={length}
        strokeDashoffset={length * (1 - draw)}
      />
    </svg>
  );
};

/* ------------------------------------------------------------------------ */
/* 0–2.4 s — Hook: an arch of light opens on gold chrome, like a door.       */
/* ------------------------------------------------------------------------ */
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const line = tween(frame, [0, 12], [0, 1]);
  const rise = tween(frame, [3, 24], [0, 1]);
  const open = tween(frame, [34, 62], [0, 1], ease.inOut);

  const small: Rect = { left: 330, top: 1240 - 620 * rise, w: 420, h: 620 * rise };
  const full: Rect = { left: -260, top: -560, w: 1600, h: 2700 };
  const rect = lerpRect(open, small, full);

  const textOut = tween(frame, [58, 70], [0, 1], ease.inOut);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.black }}>
      <AbsoluteFill style={{ clipPath: archClip(rect, 1 - open * 0.6) }}>
        <Photo
          src={img("premium")}
          from={{ scale: 1.6, x: 0, y: 0, rotate: -4 }}
          to={{ scale: 1.12, x: 30, y: -40, rotate: 0 }}
          end={78}
          origin="50% 48.4%"
          position="20% 50%"
          brightness={0.95}
        />
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(11,9,8,0.55) 0%, rgba(11,9,8,0) 30%, rgba(11,9,8,0) 52%, rgba(11,9,8,0.82) 100%)",
            opacity: open,
          }}
        />
        <LightSweep start={30} duration={36} opacity={0.6} />
      </AbsoluteFill>

      {/* Base hairline the arch rises from */}
      <div
        style={{
          position: "absolute",
          top: 1240,
          left: WIDTH / 2 - 260 * line,
          width: 520 * line,
          height: 1.5,
          background: `linear-gradient(90deg, transparent, ${colors.champagne}, transparent)`,
          opacity: 1 - open,
        }}
      />

      <Eyebrow
        style={{
          position: "absolute",
          top: 250,
          width: "100%",
          textAlign: "center",
          opacity: tween(frame, [2, 20], [0, 1]) * (1 - textOut),
          letterSpacing: `${0.9 - tween(frame, [2, 50], [0, 0.35])}em`,
        }}
      >
        Lumora Nails Studio
      </Eyebrow>

      <div style={{ position: "absolute", top: 1330, width: "100%" }}>
        <RevealText
          text="El arte"
          start={10}
          exitAt={58}
          style={{ ...serifStyle(118, true), color: colors.beige }}
        />
        <RevealText
          text="de los detalles"
          start={17}
          stagger={1.2}
          exitAt={60}
          style={{ ...serifStyle(118, true), color: colors.champagne, marginTop: 6 }}
        />
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------------ */
/* 2–5.2 s — Signature nails: rack focus, then a floating arch with depth.  */
/* ------------------------------------------------------------------------ */
export const SignatureNails: React.FC = () => {
  const frame = useCurrentFrame();

  // Feathered wipe up from the previous shot, with a gentle settle.
  const wipe = tween(frame, [0, 18], [0, 1], ease.inOut);
  const mask = `linear-gradient(to top, black ${wipe * 120 - 20}%, transparent ${wipe * 120}%)`;
  const settle = tween(frame, [0, 26], [1.1, 1]);

  // Shot B (floating arch) takes over from frame 48.
  const b = frame - 48;
  const bIn = tween(b, [0, 22], [0, 1], ease.inOut);
  const card: Rect = { left: 130, top: 300, w: 820, h: 1180 };
  const cardY = interpolate(bIn, [0, 1], [380, 0]) - tween(b, [0, 60], [0, 46], ease.push);

  return (
    <AbsoluteFill style={{ maskImage: mask, WebkitMaskImage: mask }}>
      <AbsoluteFill style={{ transform: `scale(${settle})`, backgroundColor: colors.black }}>
        {/* Shot A — nail art, rack focus + slow push towards the 3D flower */}
        <AbsoluteFill style={{ opacity: 1 - tween(b, [0, 18], [0, 1], ease.inOut) }}>
          <Photo
            src={img("nailart")}
            from={{ scale: 1.32, x: 0, y: 40 }}
            to={{ scale: 1.5, x: -30, y: -30 }}
            end={70}
            origin="40% 22%"
            position="50% 40%"
            blur={tween(frame, [0, 18], [9, 0])}
          />
          <AbsoluteFill
            style={{
              background: "linear-gradient(180deg, rgba(11,9,8,0) 60%, rgba(11,9,8,0.75) 100%)",
            }}
          />
          <Dust seed="a" count={16} speed={1.8} />
          <div
            style={{
              position: "absolute",
              left: 96,
              bottom: 220,
              opacity: tween(frame, [16, 30], [0, 1]) * (1 - tween(frame, [42, 52], [0, 1])),
              transform: `translateY(${tween(frame, [16, 34], [20, 0])}px)`,
            }}
          >
            <Eyebrow style={{ letterSpacing: "0.45em" }}>Nail Art</Eyebrow>
            <div style={{ ...serifStyle(76, true), marginTop: 18 }}>Diseñado a mano</div>
          </div>
        </AbsoluteFill>

        {/* Shot B — premium chrome in an arch, layered over its own defocused reflection */}
        {b > -1 ? (
          <AbsoluteFill style={{ opacity: tween(b, [0, 14], [0, 1]) }}>
            <Photo
              src={img("premium")}
              from={{ scale: 1.5, x: -60, y: 0 }}
              to={{ scale: 1.4, x: 60, y: 0 }}
              end={70}
              blur={26}
              brightness={0.5}
            />
            <AbsoluteFill style={{ transform: `translateY(${cardY}px)` }}>
              <ArchOutline rect={card} opacity={0.75 * bIn} draw={tween(b, [6, 40], [0, 1], ease.inOut)} />
              <AbsoluteFill
                style={{
                  clipPath: archClip(card),
                  filter: "drop-shadow(0 50px 70px rgba(0,0,0,0.5))",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: card.left,
                    top: card.top,
                    width: card.w,
                    height: card.h,
                  }}
                >
                  <Photo
                    src={img("premium")}
                    from={{ scale: 1.3, x: 50, y: -40 }}
                    to={{ scale: 1.1, x: -40, y: 30 }}
                    end={60}
                    position="62% 50%"
                    origin="62% 45%"
                  />
                  <LightSweep start={20} duration={32} opacity={0.7} />
                </div>
              </AbsoluteFill>
            </AbsoluteFill>
            <div
              style={{
                position: "absolute",
                top: 1560,
                width: "100%",
                textAlign: "center",
                opacity: tween(b, [14, 30], [0, 1]),
                transform: `translateY(${tween(b, [14, 34], [24, 0])}px)`,
              }}
            >
              <Eyebrow>Uñas Premium</Eyebrow>
              <div style={{ ...serifStyle(72, true), marginTop: 20 }}>Brillo de autor</div>
            </div>
            <Dust seed="b" count={14} speed={1.2} />
          </AbsoluteFill>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------------ */
/* 5–9.4 s — Services: editorial nude spreads with layered parallax.         */
/* ------------------------------------------------------------------------ */
type Service = {
  name: string;
  line: string;
  image: string;
  card: Rect;
  position?: string;
};

const services: Service[] = [
  {
    name: "Semipermanente",
    line: "Acabado impecable",
    image: "semipermanente",
    card: { left: 110, top: 250, w: 860, h: 1150 },
    position: "30% 50%",
  },
  {
    name: "Pedicure",
    line: "Cuidado y elegancia",
    image: "pedicure",
    card: { left: 110, top: 250, w: 860, h: 1150 },
    position: "50% 55%",
  },
  {
    name: "Pestañas",
    line: "Una mirada que enamora",
    image: "pestanas",
    card: { left: 70, top: 560, w: 940, h: 520 },
    position: "50% 60%",
  },
];

export const SERVICE_LEN = 40;

const ServicePanel: React.FC<{ s: Service; index: number; local: number }> = ({ s, index, local }) => {
  // Card enters from the right, leaves to the left at a slower rate (depth).
  const enter = index === 0 ? 1 : tween(local, [0, 16], [0, 1], ease.inOut);
  const leave = tween(local, [SERVICE_LEN, SERVICE_LEN + 16], [0, 1], ease.inOut);
  const cardX = (1 - enter) * 1100 - leave * 520;
  const numeralX = (1 - enter) * 1600 - leave * 900;
  const textX = (1 - enter) * 1400 - leave * 700;
  const drift = tween(local, [0, SERVICE_LEN + 16], [0, -40], ease.push);
  const { card } = s;

  return (
    <AbsoluteFill style={{ opacity: 1 - tween(local, [SERVICE_LEN + 4, SERVICE_LEN + 16], [0, 1]) }}>
      {/* Mid layer: photograph */}
      <div
        style={{
          position: "absolute",
          left: card.left,
          top: card.top,
          width: card.w,
          height: card.h,
          transform: `translate(${cardX}px, ${drift}px)`,
          boxShadow: "0 50px 90px rgba(70,45,30,0.28)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Photo
          src={img(s.image)}
          from={{ scale: 1.16, x: 30, y: 0 }}
          to={{ scale: 1.02, x: -20, y: 0 }}
          end={SERVICE_LEN + 16}
          position={s.position}
        />
        <LightSweep start={12} duration={30} opacity={0.5} />
      </div>

      {/* Near layer: outlined numeral overlapping the photo's corner */}
      <div
        style={{
          position: "absolute",
          right: 64,
          top: card.top + card.h - 210,
          fontFamily: serif,
          fontWeight: 300,
          fontSize: 300,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(200,165,116,0.9)",
          transform: `translate(${numeralX}px, ${drift * 1.8}px)`,
        }}
      >
        0{index + 1}
      </div>

      {/* Near layer: typography */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 1490,
          transform: `translate(${textX}px, ${drift * 1.4}px)`,
        }}
      >
        <div
          style={{
            fontFamily: sans,
            fontWeight: 400,
            fontSize: 24,
            letterSpacing: "0.4em",
            color: "#8E6E55",
          }}
        >
          0{index + 1} — 03
        </div>
        <div style={{ ...serifStyle(112), color: colors.ink, marginTop: 22, letterSpacing: "-0.01em" }}>
          {s.name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            marginTop: 26,
          }}
        >
          <div
            style={{
              width: 90 * tween(local, [8, 28], [0, 1]),
              height: 1.5,
              background: colors.gold,
            }}
          />
          <div style={{ ...serifStyle(50, true), color: "#5E4738" }}>{s.line}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Services: React.FC = () => {
  const frame = useCurrentFrame();
  // Nude arch curtain rises over the previous scene.
  const curtain = tween(frame, [0, 20], [0, 1], ease.inOut);
  const top = interpolate(curtain, [0, 1], [HEIGHT + 40, -700]);

  return (
    <AbsoluteFill
      style={{
        clipPath: archClip({ left: -400, top, w: WIDTH + 800, h: HEIGHT + 1400 }),
        background: `radial-gradient(120% 70% at 50% 35%, ${colors.beige} 0%, ${colors.nude} 70%, #DCC3B0 100%)`,
      }}
    >
      {services.map((s, i) => {
        const local = frame - 6 - i * SERVICE_LEN;
        if (local < -2 || local > SERVICE_LEN + 18) return null;
        return <ServicePanel key={s.name} s={s} index={i} local={local} />;
      })}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------------ */
/* 9–12.4 s — Brand: the studio's arch draws itself, camera pulls back.      */
/* ------------------------------------------------------------------------ */
export const Brand: React.FC = () => {
  const frame = useCurrentFrame();

  const curtain = tween(frame, [0, 20], [0, 1], ease.inOut);
  const top = interpolate(curtain, [0, 1], [HEIGHT + 40, -700]);

  const card: Rect = { left: 90, top: 400, w: 900, h: 1100 };
  const reveal = tween(frame, [8, 30], [0, 1], ease.inOut);
  const exit = tween(frame, [84, 100], [0, 1], ease.inOut);

  return (
    <AbsoluteFill
      style={{
        clipPath: archClip({ left: -400, top, w: WIDTH + 800, h: HEIGHT + 1400 }),
        backgroundColor: colors.black,
      }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${1 + exit * 0.35})`,
          opacity: 1 - exit,
          filter: `blur(${exit * 10}px)`,
        }}
      >
        <AbsoluteFill style={{ opacity: reveal }}>
          <Photo
            src={img("salon")}
            from={{ scale: 1.6, x: 0, y: 0 }}
            to={{ scale: 1.3, x: 0, y: 0 }}
            end={100}
            blur={30}
            brightness={0.42}
          />
        </AbsoluteFill>
        <ArchOutline rect={card} gap={24} draw={tween(frame, [4, 40], [0, 1], ease.inOut)} opacity={0.95} />
        <AbsoluteFill style={{ clipPath: archClip(card), opacity: reveal }}>
          <div style={{ position: "absolute", left: card.left, top: card.top, width: card.w, height: card.h }}>
            <Photo
              src={img("salon")}
              from={{ scale: 2.2, x: 0, y: 40 }}
              to={{ scale: 1.0, x: 0, y: 0 }}
              start={4}
              end={96}
              origin="50% 40%"
              easing={ease.silk}
            />
            <LightSweep start={50} duration={34} opacity={0.6} />
          </div>
        </AbsoluteFill>
        <Sparkle
          size={46}
          style={{
            position: "absolute",
            left: card.left + card.w - 150,
            top: card.top + 90,
            opacity: tween(frame, [56, 64], [0, 1]) * (1 - tween(frame, [70, 82], [0, 1])),
            transform: `scale(${tween(frame, [56, 66], [0.2, 1])}) rotate(${tween(frame, [56, 82], [0, 90])}deg)`,
            filter: "drop-shadow(0 0 14px rgba(255,236,200,0.9))",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 1610,
            width: "100%",
            textAlign: "center",
            opacity: tween(frame, [40, 58], [0, 1]),
            transform: `translateY(${tween(frame, [40, 60], [20, 0])}px)`,
          }}
        >
          <Eyebrow>Tu espacio de belleza</Eyebrow>
        </div>
        <Dust seed="c" count={12} speed={0.8} opacity={0.8} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------------ */
/* 12–15 s — End card.                                                       */
/* ------------------------------------------------------------------------ */
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = tween(frame, [0, 16], [0, 1], ease.inOut);
  const tracking = 0.44 - tween(frame, [6, 80], [0, 0.2], ease.silk);
  const push = 1 + tween(frame, [0, 94], [0, 0.04], ease.push);
  const lineW = tween(frame, [30, 52], [0, 1], ease.inOut);

  return (
    <AbsoluteFill style={{ opacity: fadeIn, backgroundColor: colors.black }}>
      <AbsoluteFill style={{ opacity: 0.22 }}>
        <Photo src={img("salon")} from={{ scale: 1.4, x: 0, y: 0 }} to={{ scale: 1.3, x: 0, y: 0 }} end={90} blur={44} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(60% 34% at 50% 48%, rgba(227,204,166,0.16) 0%, rgba(11,9,8,0) 100%)",
        }}
      />
      <Dust seed="d" count={14} speed={0.5} opacity={0.6} />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 40, transform: `scale(${push})` }}>
        <Sparkle
          size={40}
          style={{
            marginBottom: 54,
            opacity: tween(frame, [4, 16], [0, 1]),
            transform: `scale(${tween(frame, [4, 20], [0.3, 1])}) rotate(${tween(frame, [4, 40], [-45, 0])}deg)`,
            filter: "drop-shadow(0 0 12px rgba(255,236,200,0.7))",
          }}
        />
        <div style={{ position: "relative" }}>
          <RevealText
            text="LUMORA"
            start={8}
            stagger={2.2}
            duration={26}
            rise={0}
            style={{
              fontFamily: serif,
              fontWeight: 400,
              fontSize: 140,
              lineHeight: 1,
              letterSpacing: `${tracking}em`,
              marginRight: `-${tracking}em`,
              color: colors.champagne,
            }}
          />
          <AbsoluteFill style={{ mixBlendMode: "overlay" }}>
            <LightSweep start={50} duration={30} opacity={1} />
          </AbsoluteFill>
        </div>
        <RevealText
          text="NAILS STUDIO"
          start={22}
          stagger={1}
          duration={20}
          rise={12}
          style={{
            fontFamily: sans,
            fontWeight: 300,
            fontSize: 30,
            letterSpacing: "0.7em",
            marginRight: "-0.7em",
            color: colors.beige,
            marginTop: 36,
          }}
        />
        <div
          style={{
            width: 220 * lineW,
            height: 1.5,
            margin: "64px 0 58px",
            background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
          }}
        />
        <RevealText
          text="Detalles que brillan"
          start={40}
          stagger={1}
          duration={24}
          rise={16}
          style={{ ...serifStyle(76, true), color: colors.blush }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

