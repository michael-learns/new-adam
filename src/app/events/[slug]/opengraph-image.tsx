import { getEvent, events } from "@/content/events";
import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "New Adam event";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const event = getEvent((await params).slug);
  return renderOg({
    line1: event?.hero.title ?? "New Adam",
    line2: event?.hero.kicker ?? "",
    footer: event ? `${event.schedule.dateLabel} · ${event.venue.shortLabel}, ${event.venue.city.replace(" City", "")}` : "",
  });
}
