import { ARCH_PATH, MARK_BOX, STONE_PATH, WORD_BOX, WORD_PATH } from "./logo-paths";

type Variant = "color" | "blue" | "white";
type Layout = "symbol" | "horizontal" | "stacked";

const FILLS: Record<Variant, { arch: string; stone: string; word: string }> = {
  color: { arch: "var(--color-royal)", stone: "var(--color-orange)", word: "var(--color-royal)" },
  blue: { arch: "var(--color-royal)", stone: "var(--color-royal)", word: "var(--color-royal)" },
  white: { arch: "#fff", stone: "#fff", word: "#fff" },
};

// Horizontal lockup: wordmark height is half the symbol height, set 200 units to the right.
const H_SCALE = (MARK_BOX.h * 0.5) / WORD_BOX.h;
const H_GAP = 200;
const H_WIDTH = Math.round(MARK_BOX.w + H_GAP + WORD_BOX.w * H_SCALE);

// Stacked lockup: wordmark centred under the symbol, as in the approved artwork.
const S_GAP = 34;
const S_WIDTH = Math.max(MARK_BOX.w, WORD_BOX.w);
const S_HEIGHT = MARK_BOX.h + S_GAP + WORD_BOX.h;

function Mark({ fills }: { fills: (typeof FILLS)[Variant] }) {
  return (
    <g transform={`translate(${-MARK_BOX.x} ${-MARK_BOX.y})`}>
      <path fillRule="evenodd" fill={fills.arch} d={ARCH_PATH} />
      <path fillRule="evenodd" fill={fills.stone} d={STONE_PATH} />
    </g>
  );
}

function Word({ fill, transform }: { fill: string; transform: string }) {
  return (
    <g transform={`${transform} translate(${-WORD_BOX.x} ${-WORD_BOX.y})`}>
      <path fillRule="evenodd" fill={fill} d={WORD_PATH} />
    </g>
  );
}

export function Logo({
  layout = "horizontal",
  variant = "color",
  className,
  title = "New Adam",
}: {
  layout?: Layout;
  variant?: Variant;
  className?: string;
  /** Accessible name. Pass an empty string when the logo is decorative. */
  title?: string;
}) {
  const fills = FILLS[variant];
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };

  if (layout === "symbol") {
    return (
      <svg viewBox={`0 0 ${MARK_BOX.w} ${MARK_BOX.h}`} className={className} {...a11y}>
        <Mark fills={fills} />
      </svg>
    );
  }

  if (layout === "stacked") {
    const markX = (S_WIDTH - MARK_BOX.w) / 2;
    const wordX = (S_WIDTH - WORD_BOX.w) / 2;
    return (
      <svg viewBox={`0 0 ${S_WIDTH} ${S_HEIGHT}`} className={className} {...a11y}>
        <g transform={`translate(${markX} 0)`}>
          <Mark fills={fills} />
        </g>
        <Word fill={fills.word} transform={`translate(${wordX} ${MARK_BOX.h + S_GAP})`} />
      </svg>
    );
  }

  const wordY = (MARK_BOX.h - WORD_BOX.h * H_SCALE) / 2 + 24;
  return (
    <svg viewBox={`0 0 ${H_WIDTH} ${MARK_BOX.h}`} className={className} {...a11y}>
      <Mark fills={fills} />
      <Word
        fill={fills.word}
        transform={`translate(${MARK_BOX.w + H_GAP} ${wordY}) scale(${H_SCALE})`}
      />
    </svg>
  );
}
