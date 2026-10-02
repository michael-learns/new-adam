import { Art } from "@/components/illustrations/art";
import { ArtPanel } from "@/components/illustrations/art-panel";
import { Container, SectionHeading } from "@/components/ui";
import type { ProblemSection } from "@/content/types";
import { FamiliarChecklist } from "./familiar-checklist";

export function Problem({ section }: { section: ProblemSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`}>
      <Container className="grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading {...section} />
            {section.art && (
              <ArtPanel tone="stone" className="reveal mt-10 hidden lg:block">
                <Art name={section.art} />
              </ArtPanel>
            )}
          </div>
        </div>
        <div className="reveal lg:col-span-8">
          <FamiliarChecklist section={section} />
          <p className="mt-12 max-w-2xl font-display text-2xl leading-snug font-semibold text-royal sm:text-3xl">
            {section.closing}
          </p>
        </div>
      </Container>
    </section>
  );
}
