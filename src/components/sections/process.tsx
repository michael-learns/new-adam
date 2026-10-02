"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { createRef, useMemo, type RefObject } from "react";
import { Art } from "@/components/illustrations/art";
import { ArtPanel, type PanelTone } from "@/components/illustrations/art-panel";
import { Container, SectionHeading } from "@/components/ui";
import type { ProcessSection } from "@/content/types";

const TONES: PanelTone[] = ["royal", "orange", "ink"];

/**
 * "How it works" as a scroll story: a sticky step list on the left whose
 * progress bars fill as each step on the right scrolls past.
 */
export function Process({ section }: { section: ProcessSection }) {
  const refs = useMemo(
    () => section.steps.map(() => createRef<HTMLLIElement>()),
    [section.steps],
  );

  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="relative">
      <Container className="grid gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading {...section} />
            <ol className="mt-12 hidden space-y-1 lg:block" aria-label="Steps">
              {section.steps.map((step, i) => (
                <StepNavItem key={step.title} href={`#${section.id}-step-${i + 1}`} index={i} title={step.title} target={refs[i]} />
              ))}
            </ol>
          </div>
        </div>

        <ol className="space-y-20 lg:col-span-7 lg:col-start-6 lg:space-y-28">
          {section.steps.map((step, i) => (
            <li key={step.title} ref={refs[i]} id={`${section.id}-step-${i + 1}`} className="reveal scroll-mt-32">
              <p className="font-display text-sm font-semibold text-royal tabular-nums">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-serif text-4xl font-normal tracking-[-0.01em] sm:text-5xl">{step.title}</h3>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">{step.body}</p>
              {step.art && (
                <ArtPanel tone={TONES[i % TONES.length]} className="mt-8">
                  <div className="mx-auto max-w-md">
                    <Art name={step.art} />
                  </div>
                </ArtPanel>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function StepNavItem({
  href,
  index,
  title,
  target,
}: {
  href: string;
  index: number;
  title: string;
  target: RefObject<HTMLLIElement | null>;
}) {
  const { scrollYProgress } = useScroll({ target, offset: ["start 70%", "end 50%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return (
    <li>
      <a href={href} className="group block py-3">
        <span className="flex items-baseline gap-3 text-ink-soft transition-colors group-hover:text-ink">
          <span className="font-display text-sm tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-display text-lg font-semibold">{title}</span>
        </span>
        <span className="mt-3 block h-0.5 overflow-hidden rounded bg-line">
          <motion.span className="block h-full origin-left bg-royal" style={{ scaleX: progress }} />
        </span>
      </a>
    </li>
  );
}
