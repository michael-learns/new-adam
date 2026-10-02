import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { getPage, getSiteSettings } from "@/lib/content";
import { JsonLd, organizationJsonLd, pageMetadata } from "@/lib/page-meta";

const SLUG = "/";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  return page ? pageMetadata(page) : {};
}

export default async function HomePage() {
  const [page, site] = await Promise.all([getPage(SLUG), getSiteSettings()]);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        graph={[
          organizationJsonLd(site),
          {
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
            url: site.url,
            name: site.name,
            publisher: { "@id": `${site.url}/#organization` },
            inLanguage: site.locale,
          },
        ]}
      />
      <PageShell page={page} site={site} />
    </>
  );
}
