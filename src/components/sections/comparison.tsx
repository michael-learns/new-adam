import { Art } from "@/components/illustrations/art";
import { ArtPanel } from "@/components/illustrations/art-panel";
import { CheckIcon, Container, CrossIcon, SectionHeading } from "@/components/ui";
import type { ComparisonSection } from "@/content/types";

export function Comparison({ section }: { section: ComparisonSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="border-t border-line bg-white">
      <Container className="py-24 sm:py-32">
        <SectionHeading {...section} />
        <div className="reveal mt-14 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-red-100 bg-red-50/40 p-6 sm:p-8">
            {section.them.art && (
              <ArtPanel tone="stone" className="mb-8">
                <Art name={section.them.art} />
              </ArtPanel>
            )}
            <h3 className="flex items-center gap-3 text-3xl text-ink">
              <span className="rounded-full bg-red-100 px-3 py-1 font-display text-sm font-semibold text-red-700">Before</span>
              {section.them.label}
            </h3>
            <ul className="mt-6 space-y-4">
              {section.them.points.map((point) => (
                <li key={point} className="flex gap-3 text-lg leading-snug text-ink-soft">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-red-100 text-red-600">
                    <CrossIcon className="size-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-beam rounded-3xl bg-royal p-6 text-white shadow-[0_30px_80px_-30px_rgba(36,84,214,0.7)] sm:p-8">
            {section.us.art && (
              <div className="mb-8 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                <Art name={section.us.art} />
              </div>
            )}
            <h3 className="flex items-center gap-3 text-3xl">
              <span className="rounded-full bg-emerald-400/20 px-3 py-1 font-display text-sm font-semibold text-emerald-200">After</span>
              {section.us.label}
            </h3>
            <ul className="mt-6 space-y-4">
              {section.us.points.map((point) => (
                <li key={point} className="flex gap-3 text-lg leading-snug font-medium">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                    <CheckIcon className="size-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
