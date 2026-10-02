import { Art } from "@/components/illustrations/art";
import { ArtPanel, type PanelTone } from "@/components/illustrations/art-panel";
import { Spotlight } from "@/components/motion/spotlight";
import { Button, CheckIcon, Container, SectionHeading } from "@/components/ui";
import type { PathsSection } from "@/content/types";

const TONES: PanelTone[] = ["royal", "orange"];

/** The ways in: one large door per program. */
export function Paths({ section }: { section: PathsSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`}>
      <Container className="py-24 sm:py-32">
        <SectionHeading {...section} />
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {section.items.map((item, i) => (
            <li key={item.name} className="reveal">
              <Spotlight className="flex h-full flex-col rounded-[2rem] border border-line bg-white p-5 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-royal/30 sm:p-6">
                {item.art && (
                  <ArtPanel tone={TONES[i % TONES.length]} className="mb-8">
                    <Art name={item.art} />
                  </ArtPanel>
                )}
                <div className="flex flex-1 flex-col px-2 pb-2">
                  <p className="text-sm font-semibold text-royal">{item.eyebrow}</p>
                  <p className="mt-1 font-display text-lg font-semibold text-ink">{item.name}</p>
                  <h3 className="mt-4 text-4xl leading-[1.05]">{item.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-ink-soft">{item.body}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 leading-snug">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                          <CheckIcon className="size-3" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Button link={item.cta} className="mt-8 self-start" />
                </div>
              </Spotlight>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
