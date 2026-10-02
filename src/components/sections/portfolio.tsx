import { Button, Container } from "@/components/ui";
import type { PortfolioSection } from "@/content/types";

export function Portfolio({ section }: { section: PortfolioSection }) {
  return (
    <aside id={section.id} aria-label={section.label} className="border-t border-line bg-paper">
      <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:gap-10">
        <p className="shrink-0 text-sm font-medium text-ink-soft">{section.label}</p>
        <div className="flex-1">
          <p className="font-display text-xl font-semibold">{section.name}</p>
          <p className="mt-1 text-ink-soft">{section.body}</p>
        </div>
        {section.cta && (
          <Button link={section.cta} variant="secondary" className="shrink-0" />
        )}
      </Container>
    </aside>
  );
}
