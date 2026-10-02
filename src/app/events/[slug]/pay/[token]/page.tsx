import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { EVENTS_DOMAIN, eventUrl, getEvent } from "@/content/events";
import { verifyPaymentLink } from "@/lib/payment-links";
import { CheckoutError, createCheckout, paymongoEnabled } from "@/lib/paymongo";

export const metadata: Metadata = { title: "Payment", robots: { index: false, follow: false } };

/**
 * The payment link emailed after registering. Each visit opens a fresh
 * PayMongo checkout, so the link doesn't expire; the price stays locked to
 * the moment they registered.
 */
export default async function PayPage({ params }: PageProps<"/events/[slug]/pay/[token]">) {
  const { slug, token } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const link = verifyPaymentLink(token);
  const online = event.payment.online;
  if (!link || link.event !== slug) return <Message event={event} title="This payment link isn't valid" />;
  if (!online || !paymongoEnabled()) return <Message event={event} title="Online payment is paused" />;

  let checkoutUrl: string;
  try {
    checkoutUrl = await createCheckout(event, online, {
      seats: link.seats,
      pricedAt: link.registeredAt,
      ref: link.ref,
      returnTo: await origin(slug, eventUrl(event)),
    });
  } catch (error) {
    if (!(error instanceof CheckoutError)) console.error("[pay]", error);
    return <Message event={event} title="We couldn't open the payment page" retry />;
  }
  redirect(checkoutUrl);
}

/** The event host they came from (localhost while developing), else the public one. */
async function origin(slug: string, fallback: string) {
  const host = (await headers()).get("host") ?? "";
  const name = host.split(":")[0];
  if (name === `${slug}.localhost`) return `http://${host}`;
  if (name === `${slug}.${EVENTS_DOMAIN}`) return `https://${host}`;
  return fallback;
}

function Message({ event, title, retry = false }: { event: NonNullable<ReturnType<typeof getEvent>>; title: string; retry?: boolean }) {
  const { secretariat } = event;
  return (
    <main className="grid min-h-svh place-items-center bg-paper px-5 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 ring-1 ring-line">
        <p className="text-sm font-medium text-royal">{event.name}</p>
        <h1 className="mt-3 text-4xl leading-tight text-ink">{title}</h1>
        <p className="mt-4 text-ink-soft">
          {retry ? "Please try the link again in a minute. " : ""}
          If it keeps happening, contact {secretariat.name} at{" "}
          <a className="font-semibold text-royal underline underline-offset-4" href={`tel:${secretariat.phone}`}>
            {secretariat.phoneLabel}
          </a>{" "}
          (call, text or Viber) and we&apos;ll sort it out.
        </p>
      </div>
    </main>
  );
}
