import { ValuesInTeam } from "@/components/illustrations/values-in-team";
import { FadeUp } from "@/components/motion/word-reveal";
import { Button, Container } from "@/components/ui";
import type { HeroSection } from "@/content/types";
import { HeroHeadline } from "./hero-headline";

/** Single-column hero: centred message and actions, with the team strip below. */
export function Hero({ section }: { section: HeroSection }) {
  return (
    <section id={section.id} aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="flex flex-col items-center pt-14 pb-20 text-center sm:pt-20 lg:pt-24">
        <FadeUp>
          <p className="mb-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-royal ring-1 ring-line">
            <span aria-hidden className="size-1.5 rounded-full bg-orange" />
            {section.eyebrow}
          </p>
        </FadeUp>
        <div className="max-w-4xl">
          <HeroHeadline title={section.title} highlight={section.highlight} />
        </div>
        <FadeUp delay={1.1}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">{section.lead}</p>
        </FadeUp>
        <FadeUp delay={1.25} className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button link={section.primaryCta} />
          {section.secondaryCta && <Button link={section.secondaryCta} variant="secondary" />}
        </FadeUp>

        <FadeUp delay={0.6} className="mt-16 w-full sm:mt-20">
          <ValuesInTeam poster={section.poster} />
        </FadeUp>
      </Container>
    </section>
  );
}
