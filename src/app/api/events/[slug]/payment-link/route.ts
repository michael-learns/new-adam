import { eventUrl, getEvent } from "@/content/events";
import { peso } from "@/lib/event-pricing";
import { isFormHookRequest, signPaymentLink } from "@/lib/payment-links";
import { chargeQuote, paymongoEnabled } from "@/lib/paymongo";

/**
 * POST /api/events/<slug>/payment-link
 * Called by the Apps Script on the registrations sheet when someone submits
 * the Google Form. Body: { seats, registeredAt, ref }.
 * Returns the link to email them and the amount it will charge.
 */
export async function POST(request: Request, { params }: RouteContext<"/api/events/[slug]/payment-link">) {
  if (!isFormHookRequest(request)) return Response.json({ error: "Not allowed" }, { status: 401 });

  const event = getEvent((await params).slug);
  if (!event?.payment.online || !paymongoEnabled()) {
    return Response.json({ error: "Online payment isn't set up for this event." }, { status: 404 });
  }

  const body = (await request.json().catch(() => null)) as { seats?: unknown; registeredAt?: unknown; ref?: unknown } | null;
  const seats = Number(body?.seats);
  if (!Number.isInteger(seats) || seats < 1 || seats > event.seats) {
    return Response.json({ error: `Seats must be a whole number from 1 to ${event.seats}.` }, { status: 400 });
  }
  // The form's timestamp. Never in the future, so early bird can't be stretched.
  const sent = typeof body?.registeredAt === "number" ? body.registeredAt : Date.parse(String(body?.registeredAt));
  const registeredAt = Number.isFinite(sent) ? Math.min(sent, Date.now()) : Date.now();
  const ref = String(body?.ref ?? "").slice(0, 40);

  const q = chargeQuote(event, seats, registeredAt);
  const token = signPaymentLink({ event: event.slug, seats, registeredAt, ref });

  return Response.json({
    url: `${linkBase(request, event.slug) ?? eventUrl(event)}/pay/${token}`,
    seats,
    tier: q.tier,
    perSeat: q.perSeat,
    total: q.total,
    totalLabel: peso(q.total),
  });
}

/** While developing, links point at the local site instead of the public one. */
function linkBase(request: Request, slug: string) {
  const { hostname, port } = new URL(request.url);
  if (hostname !== "localhost" && !hostname.endsWith(".localhost")) return null;
  return `http://${slug}.localhost${port ? `:${port}` : ""}`;
}
