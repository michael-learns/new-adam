import { SectionRenderer } from "@/components/sections";
import { eventUrl, getEvent } from "@/content/events";
import type { Link, Page, Section, SiteSettings } from "@/content/types";
import { nowMs } from "@/lib/event-pricing";
import { SectionRail, type RailItem } from "./section-rail";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/** The name a section goes by in the page outline, or null to leave it out. */
function railLabel(section: Section): string | null {
  switch (section.type) {
    case "hero":
    case "brandHero":
    case "kairosHero":
    case "storyHero":
      return "Introduction";
    case "proof":
      return section.statement.replace(/\.$/, "");
    case "assessment":
      return "Free assessment";
    case "portfolio":
      return null;
    default:
      return section.label;
  }
}

/** The header's event button, while the featured event hasn't ended. */
function featuredEventLink(site: SiteSettings) {
  const featured = site.featuredEvent;
  const event = featured && getEvent(featured.event);
  if (!featured || !event || nowMs() > Date.parse(event.schedule.endsAt)) return undefined;
  return { label: featured.label, shortLabel: featured.shortLabel, href: eventUrl(event) };
}

/** Header, page sections in order, and footer. Shared by every page. */
export function PageShell({ page, site, cta }: { page: Page; site: SiteSettings; cta?: Link }) {
  const sections = page.sections.filter((section) => !section.hidden);
  const outline: RailItem[] = sections.flatMap((section) => {
    const label = railLabel(section);
    const dark = section.type === "mission" || section.type === "proof";
    return label ? [{ id: section.id, label, dark }] : [];
  });

  return (
    <>
      <SiteHeader nav={site.nav} cta={cta} current={page.slug} event={featuredEventLink(site)} />
      <SectionRail items={outline} />
      <main id="main" className="relative">
        {/* Dashed guide lines along the content edges, as on a layout grid. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-30 hidden w-full max-w-6xl -translate-x-1/2 border-x border-dashed border-ink/10 md:block"
        />
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>
      <SiteFooter site={site} />
    </>
  );
}
