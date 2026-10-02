import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getPageSlugs } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPageSlugs();
  return slugs.map((slug) => ({
    url: `${site.url}${slug === "/" ? "" : slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: slug === "/" ? 1 : 0.8,
  }));
}
