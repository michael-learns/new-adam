import NextLink from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button, Container } from "@/components/ui";
import type { Link } from "@/content/types";

export function SiteHeader({ nav, cta, current }: { nav: Link[]; cta?: Link; current: string }) {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Container className="flex h-14 items-center justify-between gap-6 rounded-full bg-white/80 shadow-[0_8px_30px_-12px_rgba(15,24,40,0.25)] ring-1 ring-black/5 backdrop-blur-md sm:h-16 sm:!px-3 sm:!pl-6">
        <NextLink href="/" className="shrink-0" aria-label="New Adam home">
          <Logo layout="horizontal" title="" className="h-6 w-auto sm:h-7" />
        </NextLink>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {nav.map((item) => {
              const active = item.href === current;
              return (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-4 py-2 transition-colors ${
                      active ? "bg-mist text-royal" : "text-ink-soft hover:text-royal"
                    }`}
                  >
                    {item.label}
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {cta && (
            <span className="hidden sm:block">
              <Button link={cta} className="min-h-10 px-5 text-sm" />
            </span>
          )}
          {/* Phone menu: a native disclosure, so it works without JavaScript. */}
          <details className="group relative md:hidden">
            <summary
              aria-label="Menu"
              className="grid size-10 cursor-pointer list-none place-items-center rounded-full ring-1 ring-line [&::-webkit-details-marker]:hidden"
            >
              <svg viewBox="0 0 20 20" className="size-5 text-ink" fill="none" aria-hidden>
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="group-open:hidden" />
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="hidden group-open:block" />
              </svg>
            </summary>
            <ul className="absolute top-12 right-0 w-72 rounded-2xl bg-white p-2 shadow-[0_20px_40px_-16px_rgba(15,24,40,0.35)] ring-1 ring-black/5">
              {[{ label: "Home", href: "/" }, ...nav].map((item) => (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    aria-current={item.href === current ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-base font-medium ${
                      item.href === current ? "bg-mist text-royal" : "text-ink hover:bg-paper"
                    }`}
                  >
                    {item.label}
                  </NextLink>
                </li>
              ))}
              {cta && (
                <li className="p-2 sm:hidden">
                  <Button link={cta} className="w-full" />
                </li>
              )}
            </ul>
          </details>
        </div>
      </Container>
    </header>
  );
}
