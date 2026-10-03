# New Adam: website

Website for New Adam, which transforms lives through values and culture. It has a home page for the parent brand and a product page for each program:

| Route | Page | Content file |
|---|---|---|
| `/` | New Adam (parent brand) | `src/content/home.ts` |
| `/values-formation` | Values Formation for companies | `src/content/values-formation.ts` |
| `/weddings` | Weddings for couples (was `/kairos-events`, which redirects) | `src/content/weddings.ts` |

Header navigation lives in `src/content/site.ts` (`nav`). `/explore` redirects to `/`.

**Stack:** Next.js 16 (App Router, React Server Components, fully static output), TypeScript, Tailwind CSS v4, pnpm. It deploys to Vercel without any configuration.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build, all routes prerendered
pnpm lint
```

## Where things live

```
src/
  content/
    types.ts        Content model: the contract between content and components
    site.ts         Site settings: name, descriptor, contact email, social links
    home.ts, values-formation.ts, weddings.ts   Page copy, one entry per section, in page order
  lib/content.ts    The only place content is loaded (the CMS seam)
  components/
    brand/          Vector logo (symbol, horizontal and stacked; color, blue and white)
    sections/       One component per section type + SectionRenderer
    layout/         Header and footer
    ui.tsx          Container, Button, SectionLabel, brand shapes (Arch, Ring)
  app/
    layout.tsx      Fonts, global metadata
    page.tsx        Home page + JSON-LD structured data
    opengraph-image.tsx, icon.svg, apple-icon.png, manifest.ts, robots.ts, sitemap.ts
assets/brand/       Source brand references (not served)
```

### Editing copy

Edit the page's file in `src/content/`. Sections render top to bottom in array order, so you can reorder, remove or duplicate them. Each section's `type` picks its component.

### Adding a section type

1. Add the type to the `Section` union in `src/content/types.ts`.
2. Create the component in `src/components/sections/`.
3. Add a `case` to `SectionRenderer` in `src/components/sections/index.tsx`. TypeScript will flag a missing case.

## Brand implementation

- **Colors** come from the brand guide's `brand-colors.json` and are defined as Tailwind tokens in `src/app/globals.css` (`royal`, `orange`, `paper`, `mist`, `ink`).
- **Typography:** Manrope is replaced by
  - **Outfit** for headings. Its geometric, round forms and single-storey "a" echo the logo wordmark.
  - **Schibsted Grotesk** for body text. It is a warm, very legible grotesk with Scandinavian roots, which fits the brand's "Scandinavian-inspired clarity".

  Both load via `next/font` (self-hosted, no layout shift). To swap them, edit `src/app/layout.tsx`.
- **Logo:** `src/components/brand/logo-paths.ts` holds vector paths traced from the approved raster logo. The brand guide notes that an official vector master is still outstanding. When it exists, replace the three path constants and their bounding boxes.
- **Motion:** a short CSS scroll-driven fade (`reveal` utility). It needs no JavaScript and respects `prefers-reduced-motion`.

## SEO

- Fully static HTML, semantic landmarks, one `h1`, labelled sections, and good Core Web Vitals (no client JS beyond Next's runtime).
- Metadata API: title, description, canonical, Open Graph and Twitter cards. The social image is generated at build time (`opengraph-image.tsx`).
- `sitemap.xml`, `robots.txt` (preview deployments are `disallow`ed automatically), web manifest and icons.
- JSON-LD `Organization` + `WebSite` structured data in `page.tsx`.

Set **`NEXT_PUBLIC_SITE_URL`** (for example `https://newadam.org`) in Vercel once the custom domain is live. Until then it falls back to Vercel's production URL.

## Connecting a CMS later

All content flows through `src/lib/content.ts` (`getSiteSettings`, `getPage`). To connect a headless CMS such as Sanity, Contentful, Payload or Storyblok:

1. Model the same shapes as `src/content/types.ts` in the CMS. Each section type becomes a block or object type.
2. In `src/lib/content.ts`, fetch from the CMS and map the response onto those types. Components stay unchanged.
3. Keep pages static and add a route handler that calls `revalidatePath("/")` (or `revalidateTag`). Point the CMS publish webhook at it so edits go live in seconds without a redeploy.
4. Add `generateStaticParams` + a `[slug]` route when you need more pages. Add them to `sitemap.ts` too.

## Deploying to Vercel

1. Push this folder to a Git repository and import it in Vercel. The framework is auto-detected as Next.js and pnpm comes from the lockfile.
2. Add the environment variable `NEXT_PUBLIC_SITE_URL` once the domain is connected.
3. Every pull request gets a preview URL, and preview deployments are kept out of search engines.

## Event landing pages

Each event gets its own page on its own subdomain, e.g. `salarystructure.newadam.co`.

- **Content:** one file per event in `src/content/events/` (see `salarystructure.ts`), listed in `src/content/events/index.ts`.
- **Template:** `src/components/events/` renders every event in the same conversion-focused layout (rates and seat picker, group-rate nudge, "message to your boss", FAQ, sticky phone bar). Pricing rules live in `src/lib/event-pricing.ts`.
- **Routing:** `src/proxy.ts` serves `<slug>.<domain>` from `/events/<slug>`, and redirects `newadam.co/events/<slug>` to the subdomain. Locally, open `http://<slug>.localhost:3000`.
- **Registration:** the event's Google Form (`registration.formUrl`). Every "Register now" button opens it; payment details come from the secretariat.

### Live seats from Google Sheets

The countdown bar, hero facts, seat picker and closing section show live seats left, read from the registrations sheet on the server (`/api/events/<slug>/seats`, cached 30 seconds; open pages refresh every minute).

- The CSV link lives in a **server-only environment variable** named by the event's `seatsSheet.env` (for the Salary Structure Workshop: `SEATS_CSV_SALARYSTRUCTURE`). Never put it in the event file: that data is sent to visitors' browsers, and a registrations sheet holds personal data.
- Locally it's in `.env.local` (not committed; see `.env.example`). In Vercel, add it under **Project → Settings → Environment Variables**.
- Counting rules (per event, in `seatsSheet`): only rows with a value in `requiredColumn` count; a number in `seatsColumn` is added up, anything else counts as 1 seat; rows whose `statusColumn` contains a word in `ignoreStatuses` (e.g. cancelled, refunded) are skipped.
- When seats reach 0 the page switches to "Sold out · call for the waitlist".

### Add a new event

1. Copy `src/content/events/salarystructure.ts` to `src/content/events/<slug>.ts` and edit it. The slug becomes the subdomain.
2. Add it to the list in `src/content/events/index.ts`.
3. Put images in `public/events/<slug>/`.
4. Deploy. Nothing to configure in Vercel per event once the wildcard domain is set up.

### One-time Vercel setup

1. In the Vercel project, add the domain `newadam.co` and the wildcard domain `*.newadam.co`. Wildcards need the domain's nameservers pointed to Vercel, so certificates are issued automatically.
2. If events use a different domain, set `NEXT_PUBLIC_EVENTS_DOMAIN` (default `newadam.co`).
3. Optional: add your Meta Pixel and/or Google tag. Event pages already send `form_reserve`, `group_upsell`, `boss_copy` and CTA click events when they're installed.

## Before launch

- [ ] Replace the placeholders in `src/content/*.ts` (search `PLACEHOLDER`): client names/logos, stats and testimonials.
- [ ] Confirm the Weddings process and outcomes in `src/content/weddings.ts` match the real program.
- [ ] Replace the placeholder contact email in `src/content/site.ts`.
- [ ] Add social profile links to `site.social` (they also feed JSON-LD `sameAs`).
- [ ] Swap in the official vector logo when it is available.
- [ ] Decide on a contact or sign-up form provider, if you want one instead of `mailto:`.
- [ ] Add real event photography (with permission) when available. The brand guide's AI mockups are concept references only.
