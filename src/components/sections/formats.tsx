import { Art } from "@/components/illustrations/art";
import { ArtPanel, type PanelTone } from "@/components/illustrations/art-panel";
import { Spotlight } from "@/components/motion/spotlight";
import { Container, SectionHeading } from "@/components/ui";
import type { FormatsSection } from "@/content/types";

const TONES: PanelTone[] = ["mist", "royal", "orange"];

export function Formats({ section }: { section: FormatsSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`}>
      <Container className="py-24 sm:py-32">
        <SectionHeading {...section} />
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {section.items.map((item, i) => (
            <li key={item.title} className="reveal">
              <Spotlight className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-royal/30">
                {item.art && (
                  <ArtPanel tone={TONES[i % TONES.length]} className="-mx-3 -mt-3 mb-7">
                    <Art name={item.art} />
                  </ArtPanel>
                )}
                <h3 className="text-3xl">{item.title}</h3>
                <p className="mt-3 flex-1 text-lg leading-relaxed text-ink-soft">{item.body}</p>
                <p className="mt-8 border-t border-line pt-5 text-sm">
                  <span className="font-semibold text-royal">Best for: </span>
                  <span className="text-ink-soft">{item.bestFor}</span>
                </p>
              </Spotlight>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
