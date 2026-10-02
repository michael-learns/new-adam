"use client";

import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { HeroSection } from "@/content/types";
import { Person, type PersonTone } from "./person";

const TICK_MS = 1100;
const TONES: PersonTone[] = ["royal", "orange", "ink", "royal"];
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A low, wide strip under the hero: values pinned to a rail ("the wall") drop
 * one by one onto a team member, who turns from grey to full colour.
 *
 * Timeline: tick 0 rests; tick 2k+1 highlights value k; tick 2k+2 drops it.
 * Once every value has landed it holds for a beat, then they return.
 */
export function ValuesInTeam({ poster }: { poster: HeroSection["poster"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const n = poster.values.length;
  const cycle = 2 * n + 3;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const id = setInterval(() => setTick((t) => (t + 1) % cycle), TICK_MS);
    return () => clearInterval(id);
  }, [inView, reduceMotion, cycle]);

  // Reduced motion shows the finished state: every value lived in the team.
  const t = reduceMotion ? 2 * n : tick;
  const landed = Math.min(Math.floor(t / 2), n);
  const highlighted = t % 2 === 1 && t < 2 * n ? (t - 1) / 2 : -1;
  const latest = poster.values[landed - 1];
  const caption =
    t === 0
      ? "Most core values live on a poster."
      : highlighted >= 0
        ? `“${poster.values[highlighted].value}” is on the wall…`
        : t <= 2 * n && latest
          ? `…now ${latest.team} lives it.`
          : "Every value, lived by your team.";

  return (
    <div ref={ref} aria-hidden className="mx-auto w-full max-w-4xl">
      <LayoutGroup>
        {/* The wall: values pinned to a rail */}
        <div className="relative flex flex-wrap items-center justify-center gap-2 border-b-2 border-dashed border-ink/15 pb-5 sm:gap-3">
          <span className="mr-1 text-[0.7rem] font-semibold tracking-[0.16em] text-ink/40 uppercase">On the wall</span>
          {poster.values.map((v, i) =>
            i < landed ? (
              <span
                key={v.value}
                className="rounded-full border-2 border-dashed border-ink/15 px-3 py-1 font-display text-sm font-bold text-ink/20 sm:px-4 sm:text-base"
              >
                {v.value}
              </span>
            ) : (
              <Chip key={v.value} value={v.value} highlighted={i === highlighted} />
            ),
          )}
        </div>

        {/* The team */}
        <ul className="mt-6 grid grid-cols-4 gap-2 sm:gap-6">
          {poster.values.map((v, i) => {
            const lived = i < landed;
            return (
              <li key={v.value} className="flex flex-col items-center">
                <div className="flex h-9 items-end">{lived && <Chip value={v.value} landed />}</div>
                <motion.div
                  className="mt-2 w-11 sm:w-14"
                  animate={lived && !reduceMotion ? { y: [0, -10, 0] } : { y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                >
                  <Person tone={lived ? TONES[i % TONES.length] : "gray"} className="h-auto w-full" />
                </motion.div>
                <p className={`mt-2 text-xs font-medium transition-colors sm:text-sm ${lived ? "text-ink" : "text-ink/40"}`}>
                  {v.team}
                </p>
              </li>
            );
          })}
        </ul>

        {/* Narration */}
        <div className="mx-auto mt-6 flex h-11 max-w-md items-center justify-center rounded-full bg-white text-sm font-medium text-ink shadow-[0_8px_20px_-12px_rgba(36,84,214,0.45)] ring-1 ring-line sm:text-base">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={caption}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease }}
            >
              {caption}
            </motion.span>
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
}

function Chip({ value, highlighted = false, landed = false }: { value: string; highlighted?: boolean; landed?: boolean }) {
  return (
    <motion.span
      layoutId={`team-value-${value}`}
      transition={{ layout: { duration: 0.9, ease } }}
      className={`relative z-10 inline-flex items-center rounded-full font-display font-bold whitespace-nowrap ${
        landed
          ? "bg-royal px-2.5 py-1 text-[0.7rem] text-white sm:px-3 sm:text-sm"
          : `px-3 py-1 text-sm ring-1 sm:px-4 sm:text-base ${
              highlighted ? "bg-orange text-ink ring-orange" : "bg-white text-ink ring-line"
            }`
      }`}
    >
      {value}
    </motion.span>
  );
}
