import { Person, type PersonTone } from "@/components/illustrations/person";
import { Spotlight } from "@/components/motion/spotlight";
import { Container, SectionHeading } from "@/components/ui";
import type { TestimonialsSection } from "@/content/types";

const TONES: PersonTone[] = ["royal", "orange", "ink"];

export function Testimonials({ section }: { section: TestimonialsSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`}>
      <Container className="py-24 sm:py-32">
        <SectionHeading {...section} />
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {section.items.map((item, i) => (
            <li key={i} className="reveal">
              <Spotlight color="rgba(255, 135, 62, 0.12)" className="h-full rounded-3xl border border-line bg-white">
                <figure className="flex h-full flex-col p-8">
                  <svg aria-hidden viewBox="0 0 32 24" className="h-6 w-8 text-orange" fill="currentColor">
                    <path d="M0 24V14C0 6 4 1 12 0l1 4c-4 1-6 4-6 8h5v12H0zm19 0V14c0-8 4-13 12-14l1 4c-4 1-6 4-6 8h5v12H19z" />
                  </svg>
                  <blockquote className="mt-6 flex-1 text-lg leading-relaxed">{item.quote}</blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-5">
                    <span className="grid size-12 shrink-0 place-items-end justify-center overflow-hidden rounded-full bg-mist">
                      <Person tone={TONES[i % TONES.length]} className="h-10 w-auto translate-y-1" />
                    </span>
                    <span>
                      <span className="block font-semibold">{item.name}</span>
                      <span className="block text-sm text-ink-soft">
                        {item.role}, {item.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Spotlight>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
