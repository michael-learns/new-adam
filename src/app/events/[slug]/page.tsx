import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { EventPage } from "@/components/events/event-page";
import { eventUrl, events, getEvent } from "@/content/events";
import { isEarlyBird, nowMs } from "@/lib/event-pricing";
import { JsonLd } from "@/lib/page-meta";

// Pre-render every event, and refresh hourly so server-rendered prices and
// "early bird" wording stay current even before the browser takes over.
export const revalidate = 3600;
export const dynamicParams = false;

// Event pages open on a blue cover, so the browser chrome matches it.
export const viewport: Viewport = { themeColor: "#2454D6" };

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const event = getEvent((await params).slug);
  if (!event) return {};
  const url = eventUrl(event);
  return {
    title: { absolute: event.seo.title },
    description: event.seo.description,
    // The subdomain is the one public address; /events/<slug> on the main site points to it.
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: event.seo.shareTitle,
      description: event.seo.shareDescription,
    },
    twitter: { card: "summary_large_image", title: event.seo.shareTitle, description: event.seo.shareDescription },
  };
}

export default async function EventRoute({ params }: PageProps<"/events/[slug]">) {
  const event = getEvent((await params).slug);
  if (!event) notFound();
  const url = eventUrl(event);
  const offers = [
    { name: "Early bird", price: event.prices.earlyBird, validThrough: event.schedule.earlyBirdEndsAt },
    { name: "Regular", price: event.prices.regular },
    ...event.prices.groups.map((g) => ({ name: `Group of ${g.minSeats}+ (per person)`, price: g.price })),
  ];

  return (
    <>
      <JsonLd
        graph={[
          {
            "@type": "Event",
            name: event.name,
            description: event.seo.description,
            startDate: event.schedule.startsAt.slice(0, 10),
            endDate: event.schedule.endsAt.slice(0, 10),
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: event.venue.name,
              address: { "@type": "PostalAddress", addressLocality: event.venue.city, addressCountry: "PH" },
            },
            image: [`${url}/opengraph-image`],
            url,
            organizer: { "@type": "Organization", name: event.organizer.organizedBy },
            performer: { "@type": "Person", name: event.speaker.name },
            offers: offers.map((o) => ({
              "@type": "Offer",
              name: o.name,
              price: String(o.price),
              priceCurrency: "PHP",
              availability: "https://schema.org/LimitedAvailability",
              url,
              ...("validThrough" in o ? { validThrough: o.validThrough } : {}),
            })),
          },
        ]}
      />
      <EventPage
        event={event}
        url={url}
        earlyBirdAtBuild={isEarlyBird(event.schedule.earlyBirdEndsAt)}
        renderedAt={nowMs()}
      />
    </>
  );
}
