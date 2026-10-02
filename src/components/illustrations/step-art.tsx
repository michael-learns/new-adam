"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/*
 * Small looping illustrations for "How it works" and "Formats".
 * They only animate while visible and stay still for reduced-motion users.
 */

export const ROYAL = "var(--color-royal)";
export const ORANGE = "var(--color-orange)";
export const INK = "var(--color-ink)";
export const MIST = "var(--color-mist)";

export function useLoop() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "-40px" });
  const reduce = useReducedMotion();
  return { ref, play: inView && !reduce };
}

export function Frame({ children, svgRef }: { children: React.ReactNode; svgRef: React.Ref<SVGSVGElement> }) {
  return (
    <svg ref={svgRef} viewBox="0 0 240 150" className="h-auto w-full" aria-hidden fill="none">
      {children}
    </svg>
  );
}

export const loop = (duration: number, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  ease: "easeInOut" as const,
});

/** Discover: a listening conversation, with the reply being typed. */
export function DiscoverArt() {
  const { ref, play } = useLoop();
  return (
    <Frame svgRef={ref}>
      <rect x="18" y="22" width="132" height="54" rx="16" fill="#fff" />
      <path d="M38 76l-6 14 20-14" fill="#fff" />
      <rect x="34" y="38" width="80" height="7" rx="3.5" fill={INK} opacity="0.85" />
      <rect x="34" y="54" width="56" height="7" rx="3.5" fill={INK} opacity="0.35" />

      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={play ? { opacity: [0, 1, 1, 0], y: [8, 0, 0, 0] } : { opacity: 1, y: 0 }}
        transition={loop(4, 0.3)}
      >
        <rect x="104" y="84" width="118" height="46" rx="16" fill={ROYAL} />
        <path d="M200 130l8 12-22-12" fill={ROYAL} />
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={140 + i * 22}
            cy="107"
            r="5"
            fill="#fff"
            animate={play ? { y: [0, -5, 0], opacity: [0.5, 1, 0.5] } : {}}
            transition={loop(0.9, i * 0.15)}
          />
        ))}
      </motion.g>

      <motion.g animate={play ? { x: [0, 14, 0], y: [0, -6, 0] } : {}} transition={loop(5)}>
        <circle cx="186" cy="44" r="18" stroke={ORANGE} strokeWidth="7" />
        <path d="M199 57l13 13" stroke={ORANGE} strokeWidth="8" strokeLinecap="round" />
      </motion.g>
    </Frame>
  );
}

/** Design: custom pieces sliding into a blueprint. */
export function DesignArt() {
  const { ref, play } = useLoop();
  const pieces = [
    { x: 40, y: 30, w: 76, h: 40, fill: ROYAL, from: { x: -30, y: -10 } },
    { x: 124, y: 30, w: 76, h: 40, fill: "#fff", from: { x: 30, y: -16 } },
    { x: 40, y: 78, w: 50, h: 42, fill: "#fff", from: { x: -24, y: 20 } },
    { x: 98, y: 78, w: 102, h: 42, fill: ORANGE, from: { x: 28, y: 22 } },
  ];
  return (
    <Frame svgRef={ref}>
      <defs>
        <pattern id="blueprint" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M12 0H0V12" stroke={ROYAL} strokeOpacity="0.14" />
        </pattern>
      </defs>
      <rect x="28" y="18" width="184" height="114" rx="14" fill="url(#blueprint)" stroke={ROYAL} strokeOpacity="0.3" strokeDasharray="5 5" />
      {pieces.map((p, i) => (
        <motion.rect
          key={i}
          x={p.x}
          y={p.y}
          width={p.w}
          height={p.h}
          rx="9"
          fill={p.fill}
          initial={false}
          animate={
            play
              ? { x: [p.from.x, 0, 0, p.from.x], y: [p.from.y, 0, 0, p.from.y], opacity: [0, 1, 1, 0] }
              : { x: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: 4.5, times: [0, 0.25, 0.85, 1], delay: i * 0.18, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </Frame>
  );
}

/** Deliver: a path of practice that ends in a habit. */
export function DeliverArt() {
  const { ref, play } = useLoop();
  const path = "M26 124 C 70 124, 70 84, 110 84 S 150 44, 192 40";
  const points = [
    [26, 124],
    [110, 84],
    [192, 40],
  ];
  return (
    <Frame svgRef={ref}>
      <path d={path} stroke={ROYAL} strokeOpacity="0.15" strokeWidth="8" strokeLinecap="round" />
      <motion.path
        d={path}
        stroke={ROYAL}
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 1 }}
        animate={play ? { pathLength: [0, 1, 1, 0] } : { pathLength: 1 }}
        transition={{ duration: 4.5, times: [0, 0.55, 0.9, 1], repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Checkpoints light up as the path reaches them. */}
      {points.slice(0, -1).map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={10}
          fill="#fff"
          stroke={ROYAL}
          strokeWidth="5"
          initial={{ scale: 1 }}
          animate={play ? { scale: [0.6, 0.6, 1, 1, 0.6] } : { scale: 1 }}
          transition={{ duration: 4.5, times: [0, i * 0.27, i * 0.27 + 0.1, 0.9, 1], repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      {/* Finish: the orange disc and its check mark appear together, centred on the end of the path. */}
      <motion.g
        initial={{ scale: 1, opacity: 1 }}
        animate={play ? { scale: [0.5, 0.5, 1, 1, 0.5], opacity: [0, 0, 1, 1, 0] } : { scale: 1, opacity: 1 }}
        transition={{ duration: 4.5, times: [0, 0.52, 0.62, 0.9, 1], repeat: Infinity, ease: "easeOut" }}
      >
        <circle cx={points[2][0]} cy={points[2][1]} r={17} fill={ORANGE} />
        <path
          d={`M${points[2][0] - 7} ${points[2][1]}l5 5 9-10`}
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </Frame>
  );
}

/** One-day workshop: a calendar with one highlighted day. */
export function WorkshopArt() {
  const { ref, play } = useLoop();
  return (
    <Frame svgRef={ref}>
      <rect x="50" y="18" width="140" height="116" rx="16" fill="#fff" />
      <rect x="50" y="18" width="140" height="28" rx="14" fill={ROYAL} />
      <rect x="50" y="32" width="140" height="14" fill={ROYAL} />
      {Array.from({ length: 15 }, (_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const highlight = i === 7;
        return (
          <rect
            key={i}
            x={64 + col * 24}
            y={58 + row * 24}
            width="16"
            height="16"
            rx="5"
            fill={highlight ? ORANGE : MIST}
          />
        );
      })}
      <motion.rect
        x="108"
        y="78"
        width="24"
        height="24"
        rx="8"
        stroke={ORANGE}
        strokeWidth="3"
        animate={play ? { opacity: [0, 1, 0], scale: [0.8, 1.25, 1.4] } : { opacity: 0 }}
        transition={loop(2)}
      />
    </Frame>
  );
}

/** Multi-session program: a journey of sessions, filling in over time. */
export function ProgramArt() {
  const { ref, play } = useLoop();
  const xs = [34, 77, 120, 163, 206];
  return (
    <Frame svgRef={ref}>
      <path d="M34 75H206" stroke={ROYAL} strokeOpacity="0.18" strokeWidth="6" strokeLinecap="round" />
      <motion.path
        d="M34 75H206"
        stroke={ROYAL}
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 1 }}
        animate={play ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
        transition={{ duration: 5, times: [0, 0.8, 1], repeat: Infinity, ease: "linear" }}
      />
      {xs.map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy="75"
          r="13"
          stroke={ROYAL}
          strokeWidth="5"
          initial={{ fill: i === xs.length - 1 ? ORANGE : ROYAL }}
          animate={
            play
              ? { fill: ["#fff", "#fff", i === xs.length - 1 ? ORANGE : ROYAL, i === xs.length - 1 ? ORANGE : ROYAL] }
              : {}
          }
          transition={{ duration: 5, times: [0, i * 0.2, i * 0.2 + 0.04, 1], repeat: Infinity }}
        />
      ))}
      {xs.map((x, i) => (
        <rect key={`l-${x}`} x={x - 12} y={i % 2 ? 100 : 36} width="24" height="6" rx="3" fill={INK} opacity="0.2" />
      ))}
    </Frame>
  );
}

/** Online sessions: a video call where the speaker changes. */
export function OnlineArt() {
  const { ref, play } = useLoop();
  const tiles = [
    [62, 28],
    [122, 28],
    [62, 76],
    [122, 76],
  ];
  return (
    <Frame svgRef={ref}>
      <rect x="48" y="14" width="144" height="108" rx="14" fill={INK} />
      <rect x="104" y="122" width="32" height="10" fill={INK} opacity="0.6" />
      <rect x="86" y="132" width="68" height="6" rx="3" fill={INK} opacity="0.6" />
      {tiles.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="56" height="40" rx="8" fill="#26334d" />
          <circle cx={x + 28} cy={y + 16} r="7" fill={i === 1 ? ORANGE : "#9db6ff"} />
          <rect x={x + 16} y={y + 27} width="24" height="7" rx="3.5" fill={i === 1 ? ORANGE : "#9db6ff"} opacity="0.7" />
        </g>
      ))}
      <motion.rect
        width="56"
        height="40"
        rx="8"
        stroke={ORANGE}
        strokeWidth="3"
        initial={{ x: 62, y: 28 }}
        animate={play ? { x: [62, 122, 122, 62, 62], y: [28, 28, 76, 76, 28] } : {}}
        transition={{ duration: 8, times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
      />
    </Frame>
  );
}

