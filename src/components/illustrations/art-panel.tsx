import type { ReactNode } from "react";

export type PanelTone = "royal" | "orange" | "ink" | "mist" | "stone";

const TONES: Record<PanelTone, string> = {
  royal: "bg-[radial-gradient(120%_120%_at_0%_0%,#4b76ee_0%,#2454d6_45%,#1a3fa8_100%)]",
  orange: "bg-[radial-gradient(120%_120%_at_0%_0%,#ffb27f_0%,#ff873e_45%,#e8692a_100%)]",
  ink: "bg-[radial-gradient(120%_120%_at_0%_0%,#34445f_0%,#18243a_55%,#0f1828_100%)]",
  mist: "bg-[radial-gradient(120%_120%_at_0%_0%,#ffffff_0%,#eaf0ff_45%,#d3defc_100%)]",
  stone: "bg-[radial-gradient(120%_120%_at_0%_0%,#f4f4f1_0%,#e4e5df_55%,#d5d7cf_100%)]",
};

/**
 * Art direction for illustrations: a grainy colour panel with a halftone
 * corner, and a light "app window" card that bleeds off the bottom edge.
 */
export function ArtPanel({
  children,
  tone = "royal",
  className = "",
  bleed = true,
  chrome = true,
}: {
  children: ReactNode;
  tone?: PanelTone;
  className?: string;
  /** Let the inner card run off the bottom edge. */
  bleed?: boolean;
  /** Show the window dots at the top of the inner card. */
  chrome?: boolean;
}) {
  return (
    <div
      className={`grain relative isolate overflow-hidden rounded-3xl ${TONES[tone]} px-5 pt-6 sm:px-7 sm:pt-8 ${bleed ? "pb-0" : "pb-6 sm:pb-8"} ${className}`}
    >
      <div aria-hidden className="halftone absolute inset-0 -z-0" />
      <div
        className={`relative z-10 bg-white/95 shadow-[0_24px_60px_-20px_rgba(15,24,40,0.45)] ring-1 ring-black/5 backdrop-blur ${
          bleed ? "translate-y-px rounded-t-2xl" : "rounded-2xl"
        }`}
      >
        {chrome && (
          <div aria-hidden className="flex gap-1.5 px-4 pt-3.5">
            <span className="size-2 rounded-full bg-ink/15" />
            <span className="size-2 rounded-full bg-ink/15" />
            <span className="size-2 rounded-full bg-ink/15" />
          </div>
        )}
        <div className="p-3 sm:p-4">{children}</div>
      </div>
    </div>
  );
}
