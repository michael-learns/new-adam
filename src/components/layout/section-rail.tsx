"use client";

import { useEffect, useState } from "react";

export type RailItem = {
  id: string;
  label: string;
  /** The section has a dark background, so the dashes switch to white over it. */
  dark?: boolean;
};

/**
 * Page outline in the right margin: just a column of dashes, one per section.
 * The current section is longer and blue, read sections are darker, upcoming
 * ones faint. The rail sits at mid-screen, which is where the current section
 * is measured, so over a dark section the dashes turn white. Hover or keyboard
 * focus opens a card with every section's name.
 */
export function SectionRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    // A section is current while it crosses the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = items.findIndex((item) => item.id === entry.target.id);
            if (index >= 0) setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;
  const dark = items[active]?.dark ?? false;

  return (
    <nav
      aria-label="On this page"
      className="group/rail fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 xl:block 2xl:right-8"
    >
      <ol className="flex flex-col items-end gap-2 py-2">
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={i === active ? "location" : undefined} className="block py-1 pl-4">
              <span className="sr-only">{item.label}</span>
              <span
                aria-hidden
                className={`block h-0.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? `w-6 ${dark ? "bg-white" : "bg-royal"}`
                    : `w-3.5 ${i < active ? (dark ? "bg-white/60" : "bg-ink/40") : dark ? "bg-white/25" : "bg-ink/15"}`
                }`}
              />
            </a>
          </li>
        ))}
      </ol>

      {/* Outline card: shown on hover or when a dash has keyboard focus. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-full mr-3 w-64 -translate-y-1/2 translate-x-2 rounded-2xl bg-white p-2 opacity-0 shadow-[0_24px_50px_-20px_rgba(15,24,40,0.4)] ring-1 ring-black/5 transition-[opacity,translate] duration-200 group-hover/rail:pointer-events-auto group-hover/rail:translate-x-0 group-hover/rail:opacity-100 group-focus-within/rail:pointer-events-auto group-focus-within/rail:translate-x-0 group-focus-within/rail:opacity-100"
      >
        <p className="px-3 pt-2 pb-1 text-[0.7rem] font-semibold tracking-[0.14em] text-ink-soft uppercase">On this page</p>
        <ol>
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                tabIndex={-1}
                className={`block rounded-xl px-3 py-2 text-sm transition-colors ${
                  i === active ? "bg-mist font-semibold text-royal" : "text-ink-soft hover:bg-paper hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
