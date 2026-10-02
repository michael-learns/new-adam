import { Container, SectionLabel } from "@/components/ui";
import { Crosshairs } from "@/components/ui-lines";
import type { MissionSection } from "@/content/types";

export function Mission({ section }: { section: MissionSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="grain relative bg-ink text-white">
      <Crosshairs tone="dark" />
      <Container className="py-24 sm:py-32">
        <div className="reveal">
          <SectionLabel number={section.number} tone="dark">
            {section.label}
          </SectionLabel>
        </div>
        <h2
          id={`${section.id}-title`}
          className="reveal mt-8 max-w-5xl text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.02em]"
        >
          {section.statement}
        </h2>
        <p className="reveal mt-10 max-w-2xl text-xl leading-relaxed text-white/70">{section.body}</p>
      </Container>
    </section>
  );
}
