import { Art } from "@/components/illustrations/art";
import { ArtPanel, type PanelTone } from "@/components/illustrations/art-panel";
import { Spotlight } from "@/components/motion/spotlight";
import { Container, SectionHeading } from "@/components/ui";
import type { OutcomesSection } from "@/content/types";

const TONES: PanelTone[] = ["royal", "orange", "ink", "mist"];

export function Outcomes({ section }: { section: OutcomesSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-t border-line bg-white">
      <Container className="py-24 sm:py-32">
        <SectionHeading {...section} />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {section.items.map((item, i) => (
            <li key={item.title} className="reveal">
              <Spotlight className="flex h-full flex-col rounded-3xl border border-line bg-paper p-5 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-royal/30">
                {item.art && (
                  <ArtPanel tone={TONES[i % TONES.length]} chrome={false} className="-mx-2 -mt-2 mb-6">
                    <Art name={item.art} />
                  </ArtPanel>
                )}
                <p className="font-display text-sm font-semibold text-royal tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-3xl">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{item.body}</p>
              </Spotlight>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
