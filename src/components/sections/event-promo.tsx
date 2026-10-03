import { Container } from "@/components/ui";
import { eventUrl, getEvent } from "@/content/events";
import type { EventPromoSection } from "@/content/types";
import { nowMs } from "@/lib/event-pricing";

/** One big button to an event page, asking the event's headline question. */
export function EventPromo({ section }: { section: EventPromoSection }) {
  const event = getEvent(section.event);
  if (!event || nowMs() > Date.parse(event.schedule.endsAt)) return null;
  const { hero, schedule, venue } = event;

  return (
    <section id={section.id} aria-label={section.label} className="relative">
      <Container className="pt-6 sm:pt-10">
        <a
          href={eventUrl(event)}
          className="group relative block overflow-hidden rounded-[2rem] bg-royal p-7 text-white shadow-[0_30px_60px_-30px_rgba(36,84,214,0.7)] ring-1 ring-royal transition duration-300 hover:-translate-y-1 hover:shadow-[0_40px_70px_-30px_rgba(36,84,214,0.85)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-orange sm:p-12 lg:p-14"
        >
          {/* Soft arch in the corner, echoing the logo. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -bottom-40 size-[26rem] rounded-t-full border-[3.5rem] border-b-0 border-white/[0.07] transition-transform duration-500 group-hover:-translate-y-3 sm:-right-16"
          />

          <span className="relative flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-sm font-semibold text-white/85 sm:text-base">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-white ring-1 ring-white/20">
              <span aria-hidden className="size-2 animate-pulse rounded-full bg-orange" />
              {section.eyebrow}
            </span>
            {schedule.dateLabel} · {venue.city}
          </span>

          <span className="relative mt-7 block font-serif text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-tight text-balance">
            {hero.title}
          </span>

          <span className="relative mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
            <span className="block max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
              <span className="font-semibold text-white">{event.name}.</span> {hero.kicker}
            </span>
            <span className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-orange px-7 py-4 font-display text-lg font-semibold text-ink transition-colors group-hover:bg-white sm:self-auto">
              See the workshop
              <svg aria-hidden viewBox="0 0 20 20" className="size-5 transition-transform duration-300 group-hover:translate-x-1">
                <path d="M4 10h11m-4-4.5L15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </a>
      </Container>
    </section>
  );
}
