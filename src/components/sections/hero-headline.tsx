import { WordReveal } from "@/components/motion/word-reveal";

const STAGGER = 0.07;

/**
 * Two-line hero headline: a statement, then a royal second line whose
 * `highlight` part is set in italic with a hand-drawn orange underline.
 */
export function HeroHeadline({ title, highlight }: { title: [string, string]; highlight?: string }) {
  const [statement, second] = title;
  // The highlight may be part of the second line or all of it.
  const split = highlight ? second.lastIndexOf(highlight) : -1;
  const before = split >= 0 ? second.slice(0, split).trim() : second;
  const marked = split >= 0 ? highlight! : "";
  const secondDelay = statement.split(" ").length * STAGGER + 0.15;
  const markedDelay = secondDelay + (before ? before.split(" ").length * STAGGER : 0);

  return (
    <h1 id="hero-title" className="text-[clamp(3.1rem,6.6vw,6rem)] leading-[0.98] text-ink">
      <WordReveal text={statement} stagger={STAGGER} className="block" />{" "}
      {/* The space above keeps the two lines apart for screen readers and search engines. */}
      <span className="mt-2 block text-royal">
        {before && <WordReveal text={before} delay={secondDelay} stagger={STAGGER} />}
        {marked && (
          <>
            {before && " "}
            <span className="relative inline-block whitespace-nowrap italic">
              <WordReveal text={marked} delay={markedDelay} stagger={STAGGER} />
              <svg
                aria-hidden
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                className="draw-underline absolute -bottom-2 left-0 h-[0.28em] w-full text-orange"
                style={{ animationDelay: `${markedDelay + 0.5}s` }}
                fill="none"
              >
                <path d="M4 14C70 6 160 4 296 10" stroke="currentColor" strokeWidth="7" strokeLinecap="round" pathLength="1" />
              </svg>
            </span>
          </>
        )}
      </span>
    </h1>
  );
}
