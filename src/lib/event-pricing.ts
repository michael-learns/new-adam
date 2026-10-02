import type { EventPrices } from "@/content/events/types";

export type Quote = { seats: number; perSeat: number; tier: string; total: number; savings: number };

export const peso = (n: number) => `₱${Math.round(n).toLocaleString("en-PH")}`;

/**
 * Price for a number of seats. Group rates apply at any time and replace the
 * early-bird rate (they don't stack). Keep this the single source of truth:
 * a future online checkout must price orders with the same function.
 */
export function quote(prices: EventPrices, seats: number, earlyBird: boolean): Quote {
  const group = [...prices.groups].sort((a, b) => b.minSeats - a.minSeats).find((g) => seats >= g.minSeats);
  const perSeat = group ? group.price : earlyBird ? prices.earlyBird : prices.regular;
  const tier = group ? `Group of ${group.minSeats}+` : earlyBird ? "Early bird" : "Regular";
  return { seats, perSeat, tier, total: perSeat * seats, savings: (prices.regular - perSeat) * seats };
}

/** Whether early bird pricing is still on at the given moment (default: now). */
export function isEarlyBird(endsAt: string, now: number = Date.now()) {
  return now < Date.parse(endsAt);
}

/** The current time, for server rendering (kept out of components so render stays pure). */
export const nowMs = () => Date.now();
