import "server-only";

import type { EventDetails, OnlinePayment } from "@/content/events/types";
import { isEarlyBird, quote } from "@/lib/event-pricing";

/**
 * PayMongo Checkout for event seats. The secret key stays on the server
 * (PAYMONGO_SECRET_KEY: sk_test_… while testing, sk_live_… for real payments).
 */
const API = "https://api.paymongo.com/v1";

/** True with an sk_test_ key: nothing is charged. */
export const paymongoTestMode = () => (process.env.PAYMONGO_SECRET_KEY ?? "").startsWith("sk_test_");

/**
 * The price to charge: quote(), unless PAYMENT_TEST_PRICE (pesos per seat) is
 * set for a small real test payment. That override is ignored in production.
 */
export function chargeQuote(event: EventDetails, seats: number, pricedAt?: number) {
  const q = quote(event.prices, seats, isEarlyBird(event.schedule.earlyBirdEndsAt, pricedAt));
  const testPrice = process.env.VERCEL_ENV === "production" ? NaN : Number(process.env.PAYMENT_TEST_PRICE);
  if (!(testPrice > 0)) return q;
  return { ...q, perSeat: testPrice, total: testPrice * seats, tier: `${q.tier} (test price)` };
}

export function paymongoEnabled() {
  return Boolean(process.env.PAYMONGO_SECRET_KEY);
}

export class CheckoutError extends Error {}

/**
 * Creates a PayMongo checkout for a number of seats and returns its URL. The
 * price comes from quote(), the same rules the page shows, never from the browser.
 * `returnTo` is the event's origin, e.g. https://salarystructure.newadam.co
 */
export async function createCheckout(
  event: EventDetails,
  online: OnlinePayment,
  order: {
    seats: number;
    /** Price as of this moment, e.g. when they registered (default: now). */
    pricedAt?: number;
    /** Their row in the registrations sheet. */
    ref?: string;
    /** Page to come back to after paying or cancelling. */
    returnTo: string;
  },
): Promise<string> {
  const key = process.env.PAYMONGO_SECRET_KEY;
  if (!key) throw new CheckoutError("PAYMONGO_SECRET_KEY isn't set");

  const { seats, ref, returnTo } = order;
  const q = chargeQuote(event, seats, order.pricedAt);
  // In test mode, also offer card so a test payment can be finished with
  // PayMongo's test card (their test bank pages aren't always up).
  const methods = paymongoTestMode() && !online.methods.includes("card") ? [...online.methods, "card"] : online.methods;
  const reference = `${event.slug}-${ref ?? "web"}-${Date.now().toString(36)}`;

  const res = await fetch(`${API}/checkout_sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${key}:`).toString("base64")}`,
    },
    body: JSON.stringify({
      data: {
        attributes: {
          line_items: [
            {
              name: `${event.name} · ${q.tier}`,
              description: `${event.schedule.dateLabel} · ${event.venue.shortLabel}`,
              amount: q.perSeat * 100, // centavos
              currency: "PHP",
              quantity: seats,
            },
          ],
          payment_method_types: methods,
          description: `${seats} ${seats === 1 ? "seat" : "seats"} · ${event.name}`,
          reference_number: reference,
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
          success_url: `${returnTo}/?paid=1#${event.pricing.id}`,
          cancel_url: `${returnTo}/#${event.pricing.id}`,
          metadata: { event: event.slug, seats: String(seats), tier: q.tier, reference, ...(ref ? { sheet_row: ref } : {}) },
        },
      },
    }),
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    console.error("[paymongo] checkout failed", res.status, JSON.stringify(json?.errors ?? json));
    throw new CheckoutError(`PayMongo responded ${res.status}`);
  }
  const url: unknown = json?.data?.attributes?.checkout_url;
  if (typeof url !== "string") throw new CheckoutError("PayMongo returned no checkout URL");
  return url;
}
