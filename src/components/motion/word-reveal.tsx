/**
 * Reveals text word by word with a soft blur, like a lens coming into focus.
 *
 * Pure CSS (see `.word-reveal` in globals.css), so it starts on first paint
 * without waiting for JavaScript: important for the hero headline, which is
 * the page's Largest Contentful Paint. The full sentence is in the HTML for
 * search engines and screen readers.
 */
export function WordReveal({
  text,
  delay = 0,
  stagger = 0.07,
  className = "",
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="word-reveal inline-block"
          style={{ animationDelay: `${delay + i * stagger}s` }}
        >
          {word}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

/** Fades and lifts children in on page load (for hero elements below the headline). */
export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`fade-up ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
