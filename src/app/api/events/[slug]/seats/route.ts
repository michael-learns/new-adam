import { getEvent } from "@/content/events";
import { getSeatCount } from "@/lib/event-seats";

/**
 * GET /api/events/<slug>/seats → { total, taken, left, updatedAt } or { left: null }.
 * Reached from the event subdomain too (the proxy leaves /api alone).
 */
export async function GET(_request: Request, { params }: RouteContext<"/api/events/[slug]/seats">) {
  const event = getEvent((await params).slug);
  if (!event) return Response.json({ error: "Unknown event" }, { status: 404 });

  const count = await getSeatCount(event);
  return Response.json(count ?? { total: event.seats, left: null }, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
  });
}
