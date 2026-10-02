import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { getPage, getSiteSettings } from "@/lib/content";
import { JsonLd, organizationJsonLd, pageMetadata, serviceJsonLd } from "@/lib/page-meta";

const SLUG = "/values-formation";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  return page ? pageMetadata(page) : {};
}

export default async function ValuesFormationPage() {
  const [page, site] = await Promise.all([getPage(SLUG), getSiteSettings()]);
  if (!page) notFound();

  return (
    <>
      <JsonLd graph={[organizationJsonLd(site), serviceJsonLd(site, page, "Corporate values formation training")]} />
      <PageShell page={page} site={site} />
    </>
  );
}
