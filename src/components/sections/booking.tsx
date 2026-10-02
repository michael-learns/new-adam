import { Art } from "@/components/illustrations/art";
import { ArtPanel } from "@/components/illustrations/art-panel";
import { Button, CheckIcon, Container, SectionHeading } from "@/components/ui";
import type { BookingSection } from "@/content/types";

export function Booking({ section }: { section: BookingSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="relative overflow-hidden border-t border-line bg-white">
      <Container className="relative grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading {...section} intro={section.body} />
          <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button link={section.primaryCta} />
            {section.secondaryCta && <Button link={section.secondaryCta} variant="secondary" />}
          </div>
          <ul className="reveal mt-10 flex flex-col gap-3 text-ink-soft sm:flex-row sm:flex-wrap sm:gap-8">
            {section.reassurance.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckIcon className="size-5 text-royal" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        {section.art && (
          <ArtPanel tone="orange" className="reveal mx-auto w-full max-w-md lg:col-span-5">
            <Art name={section.art} />
          </ArtPanel>
        )}
      </Container>
    </section>
  );
}
