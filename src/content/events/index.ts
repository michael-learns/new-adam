import { salaryStructure } from "./salarystructure";
import type { EventDetails } from "./types";

/** Every event landing page. Add a new event file and list it here. */
export const events: EventDetails[] = [salaryStructure];

export function getEvent(slug: string): EventDetails | undefined {
  return events.find((event) => event.slug === slug);
}

/** Domain the event subdomains live on: <slug>.<EVENTS_DOMAIN> */
export const EVENTS_DOMAIN = process.env.NEXT_PUBLIC_EVENTS_DOMAIN ?? "newadam.co";

export function eventUrl(event: EventDetails) {
  return `https://${event.slug}.${EVENTS_DOMAIN}`;
}
