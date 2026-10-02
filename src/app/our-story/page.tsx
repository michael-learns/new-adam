import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { getPage, getSiteSettings } from "@/lib/content";
import { JsonLd, organizationJsonLd, pageMetadata } from "@/lib/page-meta";

const SLUG = "/our-story";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  return page ? pageMetadata(page) : {};
}

export default async function OurStoryPage() {
  const [page, site] = await Promise.all([getPage(SLUG), getSiteSettings()]);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        graph={[
          organizationJsonLd(site),
          {
            "@type": "AboutPage",
            "@id": `${site.url}${SLUG}#page`,
            url: `${site.url}${SLUG}`,
            name: page.seo.title,
            description: page.seo.description,
            about: { "@id": `${site.url}/#organization` },
          },
        ]}
      />
      <PageShell page={page} site={site} cta={{ label: "Begin", href: "#begin" }} />
    </>
  );
}
