import "server-only";

import { home } from "@/content/home";
import { kairosEvents } from "@/content/kairos-events";
import { ourStory } from "@/content/our-story";
import { site } from "@/content/site";
import type { Page, SiteSettings } from "@/content/types";
import { valuesFormation } from "@/content/values-formation";

/**
 * The single seam between the site and its content source.
 *
 * Components only ever call these functions. To move to a headless CMS
 * (Sanity, Contentful, Payload, Storyblok, ...), fetch from it here and map the
 * response onto the types in src/content/types.ts. Keep pages statically
 * generated and refresh them with on-demand revalidation from a CMS webhook
 * (see README).
 */

export async function getSiteSettings(): Promise<SiteSettings> {
  return site;
}

const pages: Record<string, Page> = Object.fromEntries(
  [home, valuesFormation, kairosEvents, ourStory].map((page) => [page.slug, page]),
);

/** Every page slug, for the sitemap. */
export async function getPageSlugs(): Promise<string[]> {
  return Object.keys(pages);
}

export async function getPage(slug: string): Promise<Page | null> {
  return pages[slug] ?? null;
}
