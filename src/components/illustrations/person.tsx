/**
 * A person drawn from the brand's two shapes: an arch for the body and a
 * circle for the head. Use inside an <svg>; (x, y) is the bottom-centre.
 */
export const PEOPLE = {
  royal: { body: "var(--color-royal)", head: "var(--color-orange)" },
  ink: { body: "var(--color-ink)", head: "#9db6ff" },
  orange: { body: "var(--color-orange)", head: "var(--color-royal)" },
  mist: { body: "#c9d6fb", head: "var(--color-ink)" },
  /** Not yet changed: used before a value is lived. */
  gray: { body: "#c7cbd3", head: "#aeb4bf" },
} as const;

export type PersonTone = keyof typeof PEOPLE;

const HAIR = "#18243a";

export function PersonShape({
  x,
  y,
  size = 1,
  tone = "royal",
  hair = false,
}: {
  x: number;
  y: number;
  size?: number;
  tone?: PersonTone;
  /** Shoulder-length hair, e.g. to tell the bride from the groom. */
  hair?: boolean;
}) {
  const { body, head } = PEOPLE[tone];
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <path d="M-24 0V-34a24 24 0 0 1 48 0V0Z" fill={body} className="transition-[fill] duration-700" />
      {/* Long hair: falls from the sides of the head onto the shoulders, top of the head left clear. */}
      {hair && <path d="M-17 -64a9 9 0 0 1 9-9h16a9 9 0 0 1 9 9v18a4 4 0 0 1-4 4h-26a4 4 0 0 1-4-4Z" fill={HAIR} />}
      <circle cx="0" cy="-70" r="13" fill={head} className="transition-[fill] duration-700" />
    </g>
  );
}

/** A standalone person, for HTML layouts. */
export function Person({
  tone = "royal",
  hair = false,
  className = "",
}: {
  tone?: PersonTone;
  hair?: boolean;
  className?: string;
}) {
  return (
    <svg viewBox="-30 -90 60 90" className={className} aria-hidden>
      <PersonShape x={0} y={0} tone={tone} hair={hair} />
    </svg>
  );
}
