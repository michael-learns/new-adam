import { NextResponse, type NextRequest } from "next/server";

/*
 * Event subdomains.
 *
 *   salarystructure.newadam.co/            →  serves /events/salarystructure
 *   salarystructure.newadam.co/<path>      →  serves /events/salarystructure/<path>
 *   newadam.co/events/salarystructure      →  308 to salarystructure.newadam.co
 *
 * Locally, salarystructure.localhost:3000 works the same way.
 * Kept self-contained (no content imports), as Next.js recommends for proxy.
 */

const EVENTS_DOMAIN = process.env.NEXT_PUBLIC_EVENTS_DOMAIN ?? "newadam.co";
const ROOT_HOSTS = new Set([EVENTS_DOMAIN, `www.${EVENTS_DOMAIN}`]);
/** Subdomains that are never events. */
const RESERVED = new Set(["www", "app", "api", "admin"]);

function eventSlugFromHost(host: string): string | null {
  for (const base of [EVENTS_DOMAIN, "localhost"]) {
    if (host.endsWith(`.${base}`)) {
      const sub = host.slice(0, -(base.length + 1));
      // Only single-level, simple subdomains (e.g. "salarystructure").
      if (/^[a-z0-9-]+$/.test(sub) && !RESERVED.has(sub)) return sub;
    }
  }
  return null;
}

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const { pathname } = request.nextUrl;

  const slug = eventSlugFromHost(host);
  if (slug) {
    const url = request.nextUrl.clone();
    url.pathname = `/events/${slug}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  // On the main domain, send /events/<slug> to the event's own subdomain.
  const match = pathname.match(/^\/events\/([a-z0-9-]+)(\/.*)?$/);
  if (match && ROOT_HOSTS.has(host)) {
    const [, eventSlug, rest = ""] = match;
    return NextResponse.redirect(`https://${eventSlug}.${EVENTS_DOMAIN}${rest}${request.nextUrl.search}`, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next.js internals, API routes and files with an extension
  // (images, icons, robots.txt, sitemap.xml), which are shared by every host.
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
