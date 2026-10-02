/** Small "+" registration marks, placed on the page's guide lines at section edges. */
export function Crosshairs({ tone = "light" }: { tone?: "light" | "dark" }) {
  const color = tone === "light" ? "text-ink/30" : "text-white/30";
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 z-20 hidden overflow-x-clip md:block ${color}`}>
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {["left-0", "right-0"].map((side) => (
          <svg key={side} viewBox="0 0 12 12" className={`absolute ${side} size-3 -translate-y-1/2 ${side === "left-0" ? "-translate-x-1/2" : "translate-x-1/2"}`}>
            <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        ))}
      </div>
    </div>
  );
}
