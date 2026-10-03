import { NewBeginning } from "@/components/illustrations/new-beginning";
import { FadeUp } from "@/components/motion/word-reveal";
import { Button, Container, RichText } from "@/components/ui";
import type { BrandHeroSection } from "@/content/types";
import { HeroHeadline } from "./hero-headline";

export function BrandHero({ section }: { section: BrandHeroSection }) {
  return (
    <section id={section.id} aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="grid items-center gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:gap-14 lg:pt-12 lg:pb-14">
        <div className="lg:col-span-6">
          <FadeUp>
            <p className="mb-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-royal ring-1 ring-line">
              <span aria-hidden className="size-1.5 rounded-full bg-orange" />
              {section.eyebrow}
            </p>
          </FadeUp>
          <HeroHeadline title={section.title} highlight={section.highlight} />
          <FadeUp delay={1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              <RichText text={section.lead} />
            </p>
          </FadeUp>
          <FadeUp delay={1.15} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button link={section.primaryCta} />
            {section.secondaryCta && <Button link={section.secondaryCta} variant="secondary" />}
          </FadeUp>
        </div>

        <FadeUp delay={0.4} className="mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
          <NewBeginning before={section.before} after={section.after} />
        </FadeUp>
      </Container>
    </section>
  );
}
