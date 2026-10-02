import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { getPage, getSiteSettings } from "@/lib/content";
import { JsonLd, organizationJsonLd, pageMetadata, serviceJsonLd } from "@/lib/page-meta";

const SLUG = "/weddings";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  return page ? pageMetadata(page) : {};
}

export default async function WeddingsPage() {
  const [page, site] = await Promise.all([getPage(SLUG), getSiteSettings()]);
  if (!page) notFound();

  return (
    <>
      <JsonLd graph={[organizationJsonLd(site), serviceJsonLd(site, page, "Wedding ceremonies")]} />
      <PageShell page={page} site={site} />
    </>
  );
}
