"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button, CheckIcon } from "@/components/ui";
import type { ProblemSection } from "@/content/types";

const ease = [0.22, 1, 0.36, 1] as const;

/** "a", "a and b", "a, b and c" */
function joinList(items: string[]) {
  return items.length < 2 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

/**
 * Builds the reply from what was picked, in the order it was picked: one pick
 * gets its own sentence; more picks name their themes and lead with the
 * remedies for the first two. So each combination reads differently.
 */
function composeResponse(section: ProblemSection, order: number[]) {
  const { pains, responses } = section;
  const total = pains.length;
  const n = order.length;
  if (n === 0) return responses.none;
  if (n === 1) return pains[order[0]].single;

  const picked = order.map((i) => pains[i]);
  const template = n === total ? responses.all : n <= total / 2 ? responses.few : responses.many;
  return template
    .replace("{n}", String(n))
    .replace("{total}", String(total))
    .replace("{themes}", joinList(picked.map((p) => p.theme)))
    .replace("{first}", picked[0].remedy)
    .replace("{then}", picked[1].remedy);
}

/**
 * "Does this sound familiar?" checklist. Each pain is a real checkbox, so it
 * works with keyboard and screen readers, and all text is server-rendered.
 */
export function FamiliarChecklist({ section }: { section: ProblemSection }) {
  // Indexes in the order they were picked; the reply leads with the first ones.
  const [order, setOrder] = useState<number[]>([]);
  const n = order.length;

  const toggle = (i: number) =>
    setOrder((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const response = composeResponse(section, order);

  // The email arrives already listing what the visitor picked.
  const chosen = order.map((i) => section.pains[i].text);
  const cta = section.cta;
  const body = cta && n > 0 ? `${cta.intro}\n\n${chosen.map((p) => `• ${p}`).join("\n")}\n` : "";
  const href = cta
    ? `mailto:${cta.email}?subject=${encodeURIComponent(cta.subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`
    : "";

  return (
    <div>
      <p className="font-display text-sm font-semibold text-royal">{section.prompt}</p>
      <fieldset className="mt-5">
        <legend className="sr-only">{section.prompt}</legend>
        <ul className="grid gap-3 sm:grid-cols-2">
          {section.pains.map((pain, i) => {
            const on = order.includes(i);
            return (
              <li key={pain.text}>
                <label
                  className={`group flex h-full cursor-pointer gap-3 rounded-2xl border p-4 transition-[border-color,background-color,box-shadow,translate] duration-200 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-orange sm:p-5 ${
                    on
                      ? "-translate-y-0.5 border-royal bg-white shadow-[0_14px_30px_-18px_rgba(36,84,214,0.7)]"
                      : "border-line bg-white/60 hover:border-royal/40 hover:bg-white"
                  }`}
                >
                  <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(i)} />
                  <span
                    aria-hidden
                    className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                      on ? "border-royal bg-royal text-white" : "border-ink/20 text-transparent group-hover:border-royal/50"
                    }`}
                  >
                    <CheckIcon className="size-3.5" />
                  </span>
                  <span className={`text-lg leading-snug ${on ? "text-ink" : "text-ink-soft"}`}>“{pain.text}”</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div
        className={`mt-6 flex flex-col gap-4 rounded-2xl p-5 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between sm:p-6 ${
          n > 0 ? "bg-royal text-white" : "bg-mist text-ink"
        }`}
      >
        <div className="flex items-center gap-4" aria-live="polite">
          <span
            className={`grid size-12 shrink-0 place-items-center rounded-full font-serif text-2xl tabular-nums ${
              n > 0 ? "bg-white/15" : "bg-white text-royal"
            }`}
          >
            {n}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={response}
              className="text-base leading-snug sm:text-lg"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease }}
            >
              {response}
            </motion.p>
          </AnimatePresence>
        </div>
        {cta && n > 0 && <Button link={{ label: cta.label, href }} variant="onBlue" className="shrink-0" />}
      </div>
    </div>
  );
}
