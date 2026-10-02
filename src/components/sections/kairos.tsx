import { Art } from "@/components/illustrations/art";
import { ArtPanel } from "@/components/illustrations/art-panel";
import { Button, Container, SectionHeading } from "@/components/ui";
import type { KairosSection } from "@/content/types";

export function Kairos({ section }: { section: KairosSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-t border-line bg-white">
      <Container className="grid gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading {...section} />
          <p className="reveal mt-6 text-lg leading-relaxed text-ink">{section.body}</p>
          <ul className="reveal mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {section.points.map((point) => (
              <li key={point.title} className="border-t-2 border-orange pt-4">
                <h3 className="text-2xl">{point.title}</h3>
                <p className="mt-2 text-ink-soft">{point.body}</p>
              </li>
            ))}
          </ul>
          <Button link={section.cta} className="reveal mt-10" />
        </div>
        {section.art && (
          <ArtPanel tone="orange" className="reveal mx-auto w-full max-w-lg lg:col-span-6">
            <Art name={section.art} />
          </ArtPanel>
        )}
      </Container>
    </section>
  );
}
