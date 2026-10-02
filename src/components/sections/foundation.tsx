import { Art } from "@/components/illustrations/art";
import { ArtPanel } from "@/components/illustrations/art-panel";
import { Button, Container, SectionHeading } from "@/components/ui";
import type { FoundationSection } from "@/content/types";

export function Foundation({ section }: { section: FoundationSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`}>
      <Container className="grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading {...section} />
          <div className="reveal mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-soft">
            {section.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="reveal mt-8 flex flex-wrap gap-2">
            {section.principles.map((principle) => (
              <li key={principle} className="rounded-full border border-royal/25 px-4 py-2 text-sm font-semibold text-royal">
                {principle}
              </li>
            ))}
          </ul>
          {section.cta && <Button link={section.cta} variant="secondary" className="reveal mt-10" />}
        </div>
        {section.art && (
          <ArtPanel tone="ink" className="reveal mx-auto w-full max-w-md lg:col-span-5 lg:col-start-8">
            <Art name={section.art} />
          </ArtPanel>
        )}
      </Container>
    </section>
  );
}
