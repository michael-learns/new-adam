import NextLink from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui";
import type { SiteSettings } from "@/content/types";

export function SiteFooter({ site }: { site: SiteSettings }) {
  return (
    <footer className="bg-ink text-white">
      <Container className="flex flex-col gap-10 py-14 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-5">
          <Logo layout="horizontal" variant="white" className="h-8 w-auto" />
          <p className="text-white/70">{site.descriptor}</p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <li>
                <NextLink href="/" className="text-white/80 hover:text-white">
                  Home
                </NextLink>
              </li>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <NextLink href={item.href} className="text-white/80 hover:text-white">
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="space-y-2 text-sm text-white/70 sm:text-right">
          {/* Contact email hidden until the real inbox is set up (site.contactEmail). */}
          {site.social.length > 0 && (
            <ul className="flex gap-4 sm:justify-end">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="me noopener" className="hover:text-white">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
