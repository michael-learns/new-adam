"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { PersonShape } from "./person";
import { Frame, INK, MIST, ORANGE, ROYAL, loop, useLoop } from "./step-art";

/*
 * Section illustrations in the same flat style as the "How it works" steps:
 * brand shapes, soft cards, short loops that only run while visible.
 */

const ease = [0.22, 1, 0.36, 1] as const;
const RED = "#e5484d";

/** Problem: the values on the poster fade week after week. */
export function FadingArt() {
  const { ref, play } = useLoop();
  return (
    <Frame svgRef={ref}>
      <path d="M70 26L106 8L142 26" stroke={INK} strokeOpacity="0.3" strokeWidth="2" />
      <circle cx="106" cy="8" r="4" fill={INK} />
      <rect x="46" y="24" width="120" height="112" rx="12" fill="#fff" stroke={INK} strokeWidth="4" />
      <rect x="76" y="40" width="60" height="6" rx="3" fill={INK} opacity="0.3" />
      {[62, 84, 106].map((y, i) => (
        <motion.rect
          key={y}
          x={66}
          y={y}
          width={80}
          height={12}
          rx={6}
          fill={i === 0 ? ROYAL : i === 1 ? ORANGE : INK}
          initial={{ opacity: 1 }}
          animate={play ? { opacity: [1, 1, 0.12, 0.12, 1] } : { opacity: 0.35 }}
          transition={{ duration: 6, times: [0, 0.15 + i * 0.12, 0.3 + i * 0.12, 0.9, 1], repeat: Infinity }}
        />
      ))}
      {/* Calendar pages flipping by */}
      <rect x="178" y="74" width="46" height="52" rx="8" fill="#fff" />
      <rect x="178" y="74" width="46" height="14" rx="7" fill={RED} />
      <rect x="178" y="81" width="46" height="7" fill={RED} />
      {["W1", "W2", "W3", "W4"].map((w, i) => (
        <motion.text
          key={w}
          x="201"
          y="114"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={INK}
          fontFamily="var(--font-display)"
          initial={{ opacity: i === 3 ? 1 : 0 }}
          animate={play ? { opacity: [0, 0, 1, 1, 0, 0] } : {}}
          transition={{
            duration: 6,
            times: [0, i * 0.22, i * 0.22 + 0.02, i * 0.22 + 0.2, i * 0.22 + 0.22, 1],
            repeat: Infinity,
          }}
        >
          {w}
        </motion.text>
      ))}
    </Frame>
  );
}

/** Generic training: the same slide, copied for every company. */
export function SlidesArt() {
  const { ref, play } = useLoop();
  return (
    <Frame svgRef={ref}>
      {[2, 1, 0].map((i) => (
        <motion.g
          key={i}
          initial={{ x: i * 14, y: i * -12 }}
          animate={play ? { x: [i * 14, i * 14 + 6, i * 14], y: [i * -12, i * -12 - 4, i * -12] } : {}}
          transition={loop(3, i * 0.2)}
        >
          <rect x="50" y="48" width="128" height="84" rx="10" fill="#fff" stroke={INK} strokeOpacity="0.15" strokeWidth="2" />
          <rect x="64" y="62" width="70" height="8" rx="4" fill={INK} opacity="0.25" />
          <rect x="64" y="80" width="98" height="6" rx="3" fill={INK} opacity="0.12" />
          <rect x="64" y="92" width="84" height="6" rx="3" fill={INK} opacity="0.12" />
          <rect x="64" y="104" width="92" height="6" rx="3" fill={INK} opacity="0.12" />
        </motion.g>
      ))}
      <motion.g
        animate={play ? { rotate: [-14, -10, -14], scale: [1, 1.06, 1] } : {}}
        transition={loop(2.4)}
      >
        <rect x="160" y="26" width="72" height="28" rx="6" fill="none" stroke={RED} strokeWidth="3" transform="rotate(-12 196 40)" />
        <text x="196" y="45" textAnchor="middle" fontSize="13" fontWeight="800" fill={RED} fontFamily="var(--font-display)" transform="rotate(-12 196 40)" letterSpacing="1.5">
          COPY
        </text>
      </motion.g>
    </Frame>
  );
}

/** New Adam: a piece made to fit your company exactly. Drawn for a royal background. */
export function TailoredArt() {
  const { ref, play } = useLoop();
  return (
    <Frame svgRef={ref}>
      {/* Your company: a block with a unique notch */}
      <path d="M40 132V60h56v26a14 14 0 0 0 28 0V60h72v72Z" fill="#fff" fillOpacity="0.14" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="5 5" />
      <motion.path
        d="M96 36h28v50a14 14 0 0 1-28 0Z"
        fill={ORANGE}
        initial={{ y: 0 }}
        animate={play ? { y: [-30, 24, 24, -30], opacity: [0, 1, 1, 0] } : { y: 24 }}
        transition={{ duration: 4, times: [0, 0.35, 0.85, 1], repeat: Infinity, ease }}
      />
      <motion.g
        initial={{ scale: 1 }}
        animate={play ? { scale: [0, 0, 1.15, 1, 1, 0] } : { scale: 1 }}
        transition={{ duration: 4, times: [0, 0.35, 0.45, 0.5, 0.85, 1], repeat: Infinity }}
      >
        <circle cx="196" cy="40" r="18" fill="#2fbf71" />
        <path d="M188 40l6 6 10-11" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>
      <text x="118" y="122" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fillOpacity="0.8" fontFamily="var(--font-display)">
        YOUR COMPANY
      </text>
    </Frame>
  );
}

/** Outcome: a value moves from the poster to a person. */
export function LivedArt() {
  const { ref, play } = useLoop();
  return (
    <Frame svgRef={ref}>
      <rect x="22" y="30" width="80" height="92" rx="10" fill="#fff" stroke={INK} strokeWidth="4" />
      <rect x="38" y="48" width="48" height="6" rx="3" fill={INK} opacity="0.25" />
      <rect x="38" y="64" width="48" height="8" rx="4" fill={INK} opacity="0.12" />
      <rect x="38" y="80" width="48" height="8" rx="4" fill={INK} opacity="0.12" />
      <motion.rect
        x="34"
        y="96"
        width="56"
        height="14"
        rx="7"
        fill={ORANGE}
        initial={{ x: 0, y: 0 }}
        animate={play ? { x: [0, 0, 128, 128, 0], y: [0, 0, -62, -62, 0] } : { x: 128, y: -62 }}
        transition={{ duration: 4, times: [0, 0.2, 0.55, 0.9, 1], repeat: Infinity, ease }}
      />
      <PersonShape x={190} y={138} size={0.95} tone="royal" />
    </Frame>
  );
}

/** Outcome: an open, honest two-way conversation. */
export function TrustArt() {
  const { ref, play } = useLoop();
  return (
    <Frame svgRef={ref}>
      <PersonShape x={56} y={140} size={0.9} tone="royal" />
      <PersonShape x={184} y={140} size={0.9} tone="orange" hair />
      <motion.g animate={play ? { opacity: [0, 1, 1, 0, 0] } : {}} transition={{ duration: 4, times: [0, 0.1, 0.4, 0.5, 1], repeat: Infinity }}>
        <rect x="70" y="18" width="70" height="34" rx="12" fill={ROYAL} />
        <rect x="82" y="30" width="44" height="6" rx="3" fill="#fff" opacity="0.8" />
      </motion.g>
      <motion.g animate={play ? { opacity: [0, 0, 1, 1, 0] } : {}} transition={{ duration: 4, times: [0, 0.45, 0.55, 0.9, 1], repeat: Infinity }}>
        <rect x="100" y="56" width="70" height="34" rx="12" fill={ORANGE} />
        <rect x="112" y="68" width="44" height="6" rx="3" fill={INK} opacity="0.6" />
      </motion.g>
      <motion.path
        d="M98 112c8 8 36 8 44 0"
        stroke={ROYAL}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 1 }}
        animate={play ? { pathLength: [0, 1, 1] } : {}}
        transition={{ duration: 4, times: [0, 0.3, 1], repeat: Infinity }}
      />
    </Frame>
  );
}

/** Outcome: commitments kept, one by one. */
export function IntegrityArt() {
  const { ref, play } = useLoop();
  return (
    <Frame svgRef={ref}>
      <rect x="54" y="16" width="132" height="122" rx="14" fill="#fff" />
      {[36, 70, 104].map((y, i) => (
        <g key={y}>
          <rect x="70" y={y} width="22" height="22" rx="6" fill={MIST} />
          <rect x="102" y={y + 8} width={i === 1 ? 52 : 68} height="7" rx="3.5" fill={INK} opacity="0.3" />
          <motion.path
            d={`M75 ${y + 11}l5 5 9-10`}
            stroke={ROYAL}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 1 }}
            animate={play ? { pathLength: [0, 0, 1, 1, 0] } : {}}
            transition={{ duration: 4, times: [0, 0.15 + i * 0.2, 0.25 + i * 0.2, 0.9, 1], repeat: Infinity }}
          />
        </g>
      ))}
    </Frame>
  );
}

/**
 * Outcome: people grow and stay. A time-lapse: the sun and moon keep rolling
 * over and the sky keeps turning light and dark, while a sprout grows once
 * into a fruiting tree and then stays.
 */
export function GrowthArt() {
  const { ref, play } = useLoop();
  // Latches on first view, so scrolling away and back never regrows the tree.
  const seen = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const growing = seen && !reduce;
  const DAY = 6; // seconds for one full sun-and-moon rotation
  const GROW = DAY * 3; // the tree grows over three days, once
  const ORBIT = { cx: 120, cy: 126, r: 92 };
  const DAY_SKY = "#dfe8ff";
  const DUSK_SKY = "#f9c6a0";
  const TWILIGHT_SKY = "#3d4a86";
  const NIGHT_SKY = "#18243a";
  // Growth plays once, the first time the art is seen; after that (and for
  // reduced motion) everything simply shows in its final state.
  const grow = (times: number[], values: number[]) => ({
    // Reduced motion: the tree is simply there, fully grown.
    initial: { scale: reduce ? 1 : 0 },
    animate: growing ? { scale: values } : {},
    transition: { duration: GROW, times, ease },
  });

  return (
    <Frame svgRef={ref}>
      <defs>
        <clipPath id="growth-frame">
          <rect width="240" height="150" rx="10" />
        </clipPath>
      </defs>
      <g clipPath="url(#growth-frame)">
        {/* Sky: day, dusk, night, dawn */}
        <motion.rect
          width="240"
          height="150"
          initial={false}
          animate={
            play
              ? {
                  fill: [DAY_SKY, DAY_SKY, DUSK_SKY, TWILIGHT_SKY, NIGHT_SKY, NIGHT_SKY, TWILIGHT_SKY, DUSK_SKY, DAY_SKY, DAY_SKY],
                }
              : { fill: DAY_SKY }
          }
          transition={{
            duration: DAY,
            times: [0, 0.17, 0.24, 0.29, 0.34, 0.66, 0.71, 0.76, 0.83, 1],
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Stars, out at night */}
        {[
          [36, 30],
          [70, 16],
          [168, 22],
          [204, 44],
          [140, 12],
          [22, 62],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={i % 2 ? 1.6 : 1.2}
            fill="#fff"
            initial={false}
            animate={play ? { opacity: [0, 0, 1, 1, 0, 0] } : { opacity: 0 }}
            transition={{ duration: DAY, times: [0, 0.3, 0.38, 0.62, 0.7, 1], repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Sun and moon on opposite ends of one orbit. The group is symmetric
            (same-size halo at each end), so its own centre is the orbit centre. */}
        <motion.g
          initial={false}
          animate={play ? { rotate: [0, 360] } : { rotate: -30 }}
          transition={{ duration: DAY, repeat: Infinity, ease: "linear" }}
        >
          <circle cx={ORBIT.cx} cy={ORBIT.cy - ORBIT.r} r="19" fill={ORANGE} opacity="0.2" />
          <circle cx={ORBIT.cx} cy={ORBIT.cy - ORBIT.r} r="13" fill={ORANGE} />
          <circle cx={ORBIT.cx} cy={ORBIT.cy + ORBIT.r} r="19" fill="#fff" opacity="0.08" />
          {/* Moon: a disc with a bite taken out */}
          <g transform={`rotate(180 ${ORBIT.cx} ${ORBIT.cy})`}>
            <path
              d={`M${ORBIT.cx + 4} ${ORBIT.cy - ORBIT.r - 11}a11 11 0 1 0 7 19a9 9 0 1 1-7-19Z`}
              fill="#f4f4f1"
            />
          </g>
        </motion.g>

        {/* Hill */}
        <path d="M-10 128C40 116 90 112 120 112s80 4 130 16V160H-10Z" fill="#2fa36b" />
        <path d="M-10 136C50 126 100 124 130 125s70 4 120 11V160H-10Z" fill="#26905d" />

        {/* Sprout: grows first, then gives way to the trunk */}
        <motion.g
          initial={{ scale: 0 }}
          animate={growing ? { scale: [0, 1, 1, 0], opacity: [1, 1, 1, 0] } : {}}
          transition={{ duration: GROW, times: [0, 0.12, 0.2, 0.26], ease }}
          style={{ originY: 1 }}
        >
          <path d="M120 113V92" stroke="#3cc283" strokeWidth="4" strokeLinecap="round" />
          <path d="M120 100c-10 0-15-6-15-13 10 0 15 6 15 13Z" fill="#3cc283" />
          <path d="M120 95c9 0 14-5 14-12-9 0-14 5-14 12Z" fill="#3cc283" />
        </motion.g>

        {/* Trunk and branches */}
        <motion.g
          {...grow([0, 0.2, 0.42], [0, 0, 1])}
          style={{ originY: 1 }}
        >
          <path d="M114 114c2-14 3-30 3-50h6c0 20 1 36 3 50Z" fill="#7a5235" />
          <path d="M119 82c-8-4-14-10-17-18M121 74c7-3 12-8 15-15" stroke="#7a5235" strokeWidth="4" strokeLinecap="round" />
        </motion.g>

        {/* Canopy fills in */}
        {[
          { cx: 120, cy: 50, r: 26, fill: "#2fa36b", t: 0.36 },
          { cx: 98, cy: 62, r: 19, fill: "#3cc283", t: 0.42 },
          { cx: 142, cy: 60, r: 20, fill: "#26905d", t: 0.46 },
          { cx: 120, cy: 34, r: 16, fill: "#3cc283", t: 0.5 },
        ].map((c, i) => (
          <motion.circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill={c.fill}
            {...grow([0, c.t, c.t + 0.1], [0, 0, 1])}
          />
        ))}

        {/* Fruit: the sign of a mature tree */}
        {[
          [106, 48],
          [134, 44],
          [146, 66],
          [96, 68],
          [122, 62],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill={ORANGE}
            {...grow([0, 0.64 + i * 0.03, 0.7 + i * 0.03], [0, 0, 1])}
          />
        ))}
      </g>
    </Frame>
  );
}

/** Free assessment: a first draft of your core values being written. Drawn for a royal background. */
export function DraftingArt() {
  const { ref, play } = useLoop();
  const lines = [56, 78, 100];
  return (
    <Frame svgRef={ref}>
      <rect x="40" y="14" width="124" height="126" rx="12" fill="#fff" />
      <text x="58" y="38" fontSize="11" fontWeight="800" fill={ROYAL} fontFamily="var(--font-display)" letterSpacing="1.5">
        DRAFT 1
      </text>
      {lines.map((y, i) => (
        <motion.path
          key={y}
          d={`M58 ${y}h${i === 1 ? 70 : 88}`}
          stroke={i === 0 ? ORANGE : INK}
          strokeOpacity={i === 0 ? 1 : 0.35}
          strokeWidth="9"
          strokeLinecap="round"
          initial={{ pathLength: 1 }}
          animate={play ? { pathLength: [0, 0, 1, 1, 0] } : {}}
          transition={{ duration: 5, times: [0, i * 0.22, i * 0.22 + 0.2, 0.9, 1], repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.g
        initial={{ x: 0, y: 0 }}
        animate={play ? { x: [0, 88, 0, 70, 0, 88, 0], y: [0, 0, 22, 22, 44, 44, 0] } : {}}
        transition={{ duration: 5, times: [0, 0.2, 0.22, 0.42, 0.44, 0.64, 1], repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(58 56) rotate(-40)">
          <rect x="-4" y="-48" width="12" height="42" rx="2" fill={ORANGE} />
          <path d="M-4 -6h12l-6 10Z" fill={INK} />
        </g>
      </motion.g>
      <PersonShape x={200} y={140} size={0.85} tone="mist" />
    </Frame>
  );
}

/**
 * Foundation: a base of principles stacks into place, the arch settles on it,
 * and the stone rolls aside from the doorway (the story in the logo).
 * Builds once when first seen, then stays.
 */
export function FoundationArt() {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const build = seen && !reduce;
  // Reduced motion: everything is simply in place.
  const from = (values: Record<string, number>) => (reduce ? false : values);

  const blocks = [
    { x: 40, y: 118, w: 160, fill: INK },
    { x: 56, y: 100, w: 128, fill: ROYAL },
    { x: 64, y: 82, w: 112, fill: "#9db6ff" },
  ];
  const STONE = { r: 11, y: 82 - 11 - 3, from: 120, to: 160 };

  return (
    <Frame svgRef={ref}>
      {blocks.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height="16"
          rx="5"
          fill={b.fill}
          initial={from({ y: -16, opacity: 0 })}
          animate={build ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 + i * 0.25, ease }}
        />
      ))}

      {/* The arch: the open entrance */}
      <motion.path
        d="M92 82V50a28 28 0 0 1 56 0v32h-16V50a12 12 0 0 0-24 0v32Z"
        fill={ROYAL}
        initial={from({ y: -14, opacity: 0 })}
        animate={build ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.1, ease }}
      />

      {/* The stone: covers the doorway, then rolls aside */}
      <motion.g
        initial={from({ x: 0, opacity: 0 })}
        animate={build ? { opacity: [0, 1, 1], x: [0, 0, STONE.to - STONE.from] } : {}}
        transition={{ duration: 2, delay: 1.7, times: [0, 0.2, 1], ease }}
        style={reduce ? { x: STONE.to - STONE.from } : undefined}
      >
        <circle cx={STONE.from} cy={STONE.y} r={STONE.r} stroke={ORANGE} strokeWidth="6" />
      </motion.g>
    </Frame>
  );
}

/** Booking: picking a time for the discovery call. */
export function BookingArt() {
  const { ref, play } = useLoop();
  const slots = [
    [62, 62],
    [126, 62],
    [62, 92],
    [126, 92],
  ];
  return (
    <Frame svgRef={ref}>
      <rect x="44" y="16" width="152" height="122" rx="14" fill="#fff" />
      <rect x="60" y="32" width="70" height="8" rx="4" fill={INK} opacity="0.6" />
      {slots.map(([x, y], i) => (
        <motion.rect
          key={i}
          x={x}
          y={y}
          width="54"
          height="22"
          rx="7"
          initial={{ fill: i === 2 ? ROYAL : MIST }}
          animate={play && i === 2 ? { fill: [MIST, MIST, ROYAL, ROYAL, MIST] } : {}}
          transition={{ duration: 4, times: [0, 0.45, 0.5, 0.9, 1], repeat: Infinity }}
        />
      ))}
      {/* Cursor */}
      <motion.path
        d="M0 0v20l5-5 4 9 4-2-4-9h7Z"
        fill={INK}
        stroke="#fff"
        strokeWidth="1.5"
        initial={{ x: 100, y: 106 }}
        animate={play ? { x: [180, 100, 100, 180], y: [40, 106, 106, 40] } : {}}
        transition={{ duration: 4, times: [0, 0.4, 0.9, 1], repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.g
        initial={{ scale: 1 }}
        animate={play ? { scale: [0, 0, 1.15, 1, 1, 0] } : {}}
        transition={{ duration: 4, times: [0, 0.5, 0.58, 0.64, 0.9, 1], repeat: Infinity }}
      >
        <circle cx="196" cy="24" r="16" fill="#2fbf71" />
        <path d="M189 24l5 5 9-10" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>
    </Frame>
  );
}

/** Values Formation door: a team, each person picking up a value. */
export function TeamArt() {
  const { ref, play } = useLoop();
  const people = [
    { x: 64, tone: "royal" as const, chip: ORANGE, w: 58 },
    { x: 120, tone: "orange" as const, chip: ROYAL, w: 64 },
    { x: 176, tone: "ink" as const, chip: ORANGE, w: 52 },
  ];
  return (
    <Frame svgRef={ref}>
      {/* Company building behind the team */}
      <rect x="70" y="18" width="100" height="60" rx="8" fill="#fff" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={84 + i * 20} y="32" width="12" height="12" rx="3" fill={MIST} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={`b${i}`} x={84 + i * 20} y="52" width="12" height="12" rx="3" fill={MIST} />
      ))}
      {people.map((p, i) => (
        <g key={p.x}>
          <PersonShape x={p.x} y={146} size={0.72} tone={p.tone} />
          <motion.rect
            x={p.x - p.w / 2}
            y={78}
            width={p.w}
            height={12}
            rx={6}
            fill={p.chip}
            initial={{ opacity: 1, y: 0 }}
            animate={play ? { opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, 0] } : {}}
            transition={{ duration: 4.5, times: [0, 0.1 + i * 0.18, 0.2 + i * 0.18, 0.9, 1], repeat: Infinity, ease }}
          />
        </g>
      ))}
    </Frame>
  );
}

/** Kairos door: a couple, two rings joining and a registered certificate. */
export function CoupleArt() {
  const { ref, play } = useLoop();
  return (
    <Frame svgRef={ref}>
      <PersonShape x={70} y={146} size={0.95} tone="royal" />
      <PersonShape x={124} y={146} size={0.95} tone="orange" hair />
      {/* Rings */}
      <motion.circle
        cx="88"
        cy="30"
        r="13"
        stroke={ORANGE}
        strokeWidth="5"
        initial={{ x: 0 }}
        animate={play ? { x: [-14, 0, 0, -14] } : {}}
        transition={{ duration: 4, times: [0, 0.3, 0.9, 1], repeat: Infinity, ease }}
      />
      <motion.circle
        cx="106"
        cy="30"
        r="13"
        stroke={ROYAL}
        strokeWidth="5"
        initial={{ x: 0 }}
        animate={play ? { x: [14, 0, 0, 14] } : {}}
        transition={{ duration: 4, times: [0, 0.3, 0.9, 1], repeat: Infinity, ease }}
      />
      {/* Certificate */}
      <rect x="160" y="44" width="64" height="84" rx="8" fill="#fff" />
      <rect x="172" y="58" width="40" height="6" rx="3" fill={INK} opacity="0.6" />
      <rect x="172" y="72" width="34" height="5" rx="2.5" fill={INK} opacity="0.2" />
      <rect x="172" y="83" width="38" height="5" rx="2.5" fill={INK} opacity="0.2" />
      <motion.g
        initial={{ scale: 1 }}
        animate={play ? { scale: [0, 0, 1.2, 1, 1, 0] } : {}}
        transition={{ duration: 4, times: [0, 0.35, 0.45, 0.5, 0.9, 1], repeat: Infinity }}
      >
        <circle cx="200" cy="110" r="13" fill="#2fbf71" />
        <path d="M194 110l4 4 8-9" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>
    </Frame>
  );
}

/** Kairos problem: a pile of requirements and an open question. */
export function PaperworkArt() {
  const { ref, play } = useLoop();
  const sheets = [
    { x: 54, y: 40, r: -10 },
    { x: 74, y: 34, r: 6 },
    { x: 94, y: 42, r: -3 },
  ];
  return (
    <Frame svgRef={ref}>
      {sheets.map((s, i) => (
        <motion.g
          key={i}
          initial={false}
          animate={play ? { rotate: [s.r, s.r + 3, s.r] } : {}}
          transition={loop(3 + i * 0.6)}
        >
          <g transform={`rotate(${s.r} ${s.x + 36} ${s.y + 46})`}>
            <rect x={s.x} y={s.y} width="72" height="92" rx="8" fill="#fff" stroke={INK} strokeOpacity="0.12" strokeWidth="2" />
            <rect x={s.x + 12} y={s.y + 16} width="40" height="6" rx="3" fill={INK} opacity="0.3" />
            <rect x={s.x + 12} y={s.y + 30} width="48" height="5" rx="2.5" fill={INK} opacity="0.12" />
            <rect x={s.x + 12} y={s.y + 41} width="44" height="5" rx="2.5" fill={INK} opacity="0.12" />
          </g>
        </motion.g>
      ))}
      <motion.g
        initial={false}
        animate={play ? { y: [0, -6, 0] } : {}}
        transition={loop(2.2)}
      >
        <circle cx="194" cy="58" r="26" fill={ORANGE} />
        <text x="194" y="69" textAnchor="middle" fontSize="32" fontWeight="800" fill="#fff" fontFamily="var(--font-display)">
          ?
        </text>
      </motion.g>
    </Frame>
  );
}

/** Kairos outcome: a certificate, stamped. */
export function CertificateArt() {
  const { ref, play } = useLoop();
  return (
    <Frame svgRef={ref}>
      <rect x="56" y="18" width="128" height="114" rx="10" fill="#fff" />
      <rect x="56" y="18" width="128" height="16" rx="8" fill={ROYAL} />
      <rect x="56" y="26" width="128" height="8" fill={ROYAL} />
      <rect x="76" y="48" width="88" height="7" rx="3.5" fill={INK} opacity="0.55" />
      <rect x="84" y="64" width="72" height="5" rx="2.5" fill={INK} opacity="0.18" />
      <rect x="80" y="76" width="80" height="5" rx="2.5" fill={INK} opacity="0.18" />
      <motion.g
        initial={{ scale: 1, rotate: -12 }}
        animate={play ? { scale: [1.8, 1.8, 0.9, 1, 1, 1.8], opacity: [0, 0, 1, 1, 1, 0], rotate: -12 } : {}}
        transition={{ duration: 4, times: [0, 0.3, 0.4, 0.46, 0.9, 1], repeat: Infinity }}
      >
        <circle cx="150" cy="106" r="20" fill="none" stroke="#2fbf71" strokeWidth="4" />
        <path d="M141 106l6 6 11-12" stroke="#2fbf71" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>
    </Frame>
  );
}

/** Kairos outcome: a home on solid ground. */
export function HomeArt() {
  const { ref, play } = useLoop();
  return (
    <Frame svgRef={ref}>
      <motion.rect
        x="40"
        y="124"
        width="160"
        height="12"
        rx="6"
        fill={INK}
        initial={{ scaleX: 1 }}
        animate={play ? { scaleX: [0, 1, 1, 0] } : {}}
        transition={{ duration: 5, times: [0, 0.2, 0.9, 1], repeat: Infinity, ease }}
      />
      <motion.g
        initial={{ y: 0, opacity: 1 }}
        animate={play ? { y: [-24, -24, 0, 0, -24], opacity: [0, 0, 1, 1, 0] } : {}}
        transition={{ duration: 5, times: [0, 0.2, 0.35, 0.9, 1], repeat: Infinity, ease }}
      >
        <path d="M70 124V74l50-38 50 38v50Z" fill="#fff" />
        <path d="M60 80l60-46 60 46" stroke={ROYAL} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="108" y="92" width="24" height="32" rx="4" fill={ORANGE} />
      </motion.g>
      <PersonShape x={40} y={124} size={0.55} tone="royal" />
      <PersonShape x={200} y={124} size={0.55} tone="orange" hair />
    </Frame>
  );
}
