import Image from "next/image";
import { CountUp } from "@/components/motion/count-up";
import { Container } from "@/components/ui";
import { Crosshairs } from "@/components/ui-lines";
import type { ProofSection } from "@/content/types";

export function Proof({ section }: { section: ProofSection }) {
  // Rendered twice for a seamless loop; the copy is hidden from assistive tech.
  const logos = (hidden: boolean) =>
    section.clients.map((client, i) => (
      <li key={`${client.name}-${i}`} aria-hidden={hidden || undefined} className="shrink-0">
        {client.logo ? (
          <Image
            src={client.logo}
            alt={hidden ? "" : client.name}
            width={140}
            height={48}
            className="h-9 w-auto object-contain opacity-80 brightness-0 invert"
          />
        ) : (
          <span className="inline-flex h-11 items-center rounded-xl border border-dashed border-white/25 px-5 font-display text-sm font-semibold whitespace-nowrap text-white/55">
            {client.name}
          </span>
        )}
      </li>
    ));

  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="relative">
      <div className="grain relative bg-ink text-white">
        <Crosshairs tone="dark" />
        <Container className="py-20 sm:py-28">
          <h2 id={`${section.id}-title`} className="reveal text-center text-[clamp(3.5rem,11vw,9rem)] leading-none tracking-[-0.02em]">
            {section.statement}
          </h2>
          <p className="mt-8 text-center text-lg text-white/70">{section.logosLabel}</p>
          <div className="marquee mt-10 overflow-hidden">
            <ul className="marquee-track flex w-max gap-4 pr-4">
              {logos(false)}
              {logos(true)}
            </ul>
          </div>
          <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
            {section.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-ink p-6 sm:p-8">
                <dt className="text-sm text-white/60">{stat.label}</dt>
                <dd className="order-first font-serif text-6xl text-white tabular-nums">
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
