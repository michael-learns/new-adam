import { Logo } from "@/components/brand/logo";
import { Container, SectionHeading } from "@/components/ui";
import type { MarkSection } from "@/content/types";

const MARKERS = ["rounded-t-full bg-royal", "rounded-full bg-orange", "bg-orange"];

/** The logo, shown large, with what each part means. */
export function Mark({ section }: { section: MarkSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="bg-mist">
      <Container className="grid items-center gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="reveal mx-auto w-full max-w-sm rounded-[2rem] bg-white p-12 shadow-[0_24px_60px_-28px_rgba(36,84,214,0.45)] sm:p-16 lg:col-span-5">
          <Logo layout="stacked" title="The New Adam logo" className="h-auto w-full" />
        </div>
        <div className="lg:col-span-7">
          <SectionHeading {...section} />
          <ol className="mt-10 space-y-8">
            {section.points.map((point, i) => (
              <li key={point.title} className="reveal flex gap-5">
                <span aria-hidden className={`mt-2 size-4 shrink-0 ${MARKERS[i % MARKERS.length]}`} />
                <div>
                  <h3 className="text-3xl">{point.title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-ink-soft">{point.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
