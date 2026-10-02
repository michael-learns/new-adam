"use client";

import { useRef } from "react";

/**
 * A card with a soft light that follows the cursor (and lights up its border).
 * Pure CSS variables: no re-renders on pointer move.
 */
export function Spotlight({
  children,
  className = "",
  color = "rgba(36, 84, 214, 0.12)",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`group/spot relative isolate overflow-hidden ${className}`}
      style={{ "--spot": color } as React.CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--x) var(--y), var(--spot), transparent 65%)" }}
      />
      {children}
    </div>
  );
}
