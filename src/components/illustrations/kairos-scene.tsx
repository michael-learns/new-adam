"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { PersonShape } from "./person";

const ease = [0.22, 1, 0.36, 1] as const;
const LOOP = 7;

/**
 * Kairos Events hero: a couple under a soft arch. Their rings join, a little
 * celebration rises, and the certificate arrives: officially married.
 * Uses the quieter Kairos expression from the brand guide: light surfaces,
 * gentle blue, a small touch of orange.
 */
export function KairosScene({ certificate }: { certificate: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40px" });
  const reduce = useReducedMotion();
  const play = inView && !reduce;
  const t = (times: number[]) => ({ duration: LOOP, times, repeat: Infinity, ease });

  return (
    <div ref={ref} aria-hidden className="relative overflow-hidden rounded-[2rem] bg-mist ring-1 ring-royal/10">
      <svg viewBox="0 0 480 360" className="block h-auto w-full" fill="none">
        {/* Soft arch */}
        <path d="M120 310V170a120 120 0 0 1 240 0v140h-34V170a86 86 0 0 0-172 0v140Z" fill="#c9d6fb" />
        <path d="M60 310H420" stroke="var(--color-royal)" strokeOpacity="0.2" strokeWidth="2" />

        {/* The couple: groom and bride */}
        <PersonShape x={201} y={310} size={1.45} tone="royal" />
        <PersonShape x={279} y={310} size={1.45} tone="orange" hair />

        {/* Rings join above them */}
        <motion.circle
          cx="228"
          cy="96"
          r="18"
          stroke="var(--color-orange)"
          strokeWidth="6"
          initial={false}
          animate={play ? { x: [-30, 0, 0, -30], opacity: [0, 1, 1, 0] } : { x: 0, opacity: 1 }}
          transition={t([0, 0.25, 0.9, 1])}
        />
        <motion.circle
          cx="252"
          cy="96"
          r="18"
          stroke="var(--color-royal)"
          strokeWidth="6"
          initial={false}
          animate={play ? { x: [30, 0, 0, 30], opacity: [0, 1, 1, 0] } : { x: 0, opacity: 1 }}
          transition={t([0, 0.25, 0.9, 1])}
        />

        {/* A little celebration */}
        {[
          [170, 120, "var(--color-orange)"],
          [310, 110, "var(--color-royal)"],
          [150, 180, "var(--color-royal)"],
          [330, 170, "var(--color-orange)"],
          [196, 62, "var(--color-royal)"],
          [286, 58, "var(--color-orange)"],
        ].map(([cx, cy, fill], i) => (
          <motion.circle
            key={i}
            cx={cx as number}
            cy={cy as number}
            r="5"
            fill={fill as string}
            initial={false}
            animate={play ? { opacity: [0, 0, 1, 0], y: [10, 10, -12, -24] } : { opacity: 0.8 }}
            transition={t([0, 0.28 + i * 0.02, 0.45 + i * 0.02, 0.75])}
          />
        ))}
      </svg>

      {/* The certificate arrives */}
      <motion.div
        className="absolute right-5 bottom-5 w-44 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-18px_rgba(24,36,58,0.5)] ring-1 ring-black/5 sm:right-8 sm:bottom-8 sm:w-52"
        initial={false}
        animate={play ? { opacity: [0, 0, 1, 1, 0], y: [24, 24, 0, 0, 12] } : { opacity: 1, y: 0 }}
        transition={t([0, 0.45, 0.55, 0.92, 1])}
      >
        <div className="flex items-center gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
            <svg viewBox="0 0 20 20" className="size-3.5" fill="none">
              <path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-display text-sm font-semibold text-ink">{certificate}</span>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-full rounded bg-ink/10" />
          <div className="h-1.5 w-3/4 rounded bg-ink/10" />
        </div>
        <p className="mt-3 text-[0.7rem] font-medium text-royal">Government recognized</p>
      </motion.div>
    </div>
  );
}
