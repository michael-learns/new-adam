"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts a stat like "120+" up from zero when it scrolls into view. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (!inView || !match || reduceMotion || !ref.current) return;
    const [, digits, suffix] = match;
    const target = Number(digits);
    const node = ref.current;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = `${String(Math.round(v)).padStart(digits.length, "0")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
