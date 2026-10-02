import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Payment links emailed after someone registers through the Google Form:
 * https://<slug>.<EVENTS_DOMAIN>/pay/<token>
 *
 * The token carries the seats and the registration time, signed with a key
 * derived from PAYMENT_LINK_SECRET so nobody can change them. It holds no
 * personal data. The Apps Script on the registrations sheet sends the secret
 * itself to ask for links.
 */
export type PaymentLink = {
  /** Event slug. */
  event: string;
  seats: number;
  /** When they registered (ms). Early bird is locked to this moment. */
  registeredAt: number;
  /** Their row in the registrations sheet, so payments can be matched up. */
  ref: string;
};

const secret = () => process.env.PAYMENT_LINK_SECRET ?? "";

export function paymentLinksEnabled() {
  return secret().length >= 32;
}

const hmac = (label: string, data: string) => createHmac("sha256", `${label}:${secret()}`).update(data).digest();

function sameBytes(a: Buffer, b: Buffer) {
  return a.length === b.length && timingSafeEqual(a, b);
}

export function signPaymentLink(link: PaymentLink): string {
  const body = Buffer.from(JSON.stringify([link.event, link.seats, link.registeredAt, link.ref])).toString("base64url");
  return `${body}.${hmac("link", body).toString("base64url")}`;
}

/** The link's contents, or null if the token was changed or isn't ours. */
export function verifyPaymentLink(token: string): PaymentLink | null {
  if (!paymentLinksEnabled()) return null;
  const [body, sig, extra] = token.split(".");
  if (!body || !sig || extra !== undefined) return null;
  if (!sameBytes(Buffer.from(sig, "base64url"), hmac("link", body))) return null;
  try {
    const [event, seats, registeredAt, ref] = JSON.parse(Buffer.from(body, "base64url").toString());
    if (typeof event !== "string" || !Number.isInteger(seats) || typeof registeredAt !== "number" || typeof ref !== "string") return null;
    return { event, seats, registeredAt, ref };
  } catch {
    return null;
  }
}

/** Checks the "Authorization: Bearer …" header the Apps Script sends. */
export function isFormHookRequest(request: Request) {
  if (!paymentLinksEnabled()) return false;
  const sent = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  return sameBytes(Buffer.from(sent), Buffer.from(secret()));
}
