import { Art } from "@/components/illustrations/art";
import { Button, CheckIcon, Container, Ring } from "@/components/ui";
import type { AssessmentSection } from "@/content/types";

export function Assessment({ section }: { section: AssessmentSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="px-3 sm:px-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-royal text-white sm:rounded-[2.5rem]">
        <Ring className="pointer-events-none absolute -right-28 -bottom-28 size-[22rem] text-orange sm:size-[30rem]" />
        <Container className="relative grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
              <span aria-hidden className="size-1.5 rounded-full bg-orange" />
              {section.eyebrow}
            </p>
            <h2 id={`${section.id}-title`} className="mt-5 text-[2.9rem] leading-[1.02] sm:text-7xl">
              {section.title}
            </h2>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/85">{section.body}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button link={section.cta} variant="onBlue" />
              <p className="text-white/80">{section.note}</p>
            </div>
          </div>
          <div className="reveal lg:col-span-5">
            {section.art && (
              <div className="mb-4 rounded-3xl bg-white/10 p-4 ring-1 ring-white/15">
                <Art name={section.art} />
              </div>
            )}
            <div className="rounded-3xl bg-royal-deep p-7 ring-1 ring-white/10 sm:p-8">
              <p className="text-sm font-semibold tracking-[0.14em] text-white/75 uppercase">What you get</p>
              <ul className="mt-5 space-y-4">
                {section.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-lg leading-snug">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                      <CheckIcon className="size-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
