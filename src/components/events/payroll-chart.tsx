"use client";

import { useEffect, useRef, useState } from "react";
import type { EventDetails } from "@/content/events/types";
import { track } from "./event-client";

type Chart = NonNullable<EventDetails["hero"]["chart"]>;

/**
 * Tilts a card a few degrees toward the pointer (mouse and pen only, never
 * touch), easing back to flat when the pointer leaves.
 */
function useTilt<T extends HTMLElement>(ref: React.RefObject<T | null>, maxDeg = 4) {
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add("tilting");
      el.style.setProperty("--ry", `${(x * maxDeg * 2).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * maxDeg * 2).toFixed(2)}deg`);
    };
    const leave = () => {
      el.classList.remove("tilting");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [ref, maxDeg]);
}
type State = "before" | "after";

/*
 * "Your payroll, plotted": 30 salaries by job level. Before, pay follows
 * history (a new hire out-earns a 5-year supervisor two levels up). After,
 * every salary snaps into its grade's pay band. Ported from the original
 * event page; positions use a fixed seed so the picture never changes.
 */

const G = 6;
const X0 = 58;
const X1 = 548;
const Y0 = 18;
const Y1 = 318;
const PMIN = 10000;
const PMAX = 80000;
const gx = (g: number) => X0 + ((g - 0.5) * (X1 - X0)) / G;
const py = (p: number) => Y1 - ((p - PMIN) / (PMAX - PMIN)) * (Y1 - Y0);
const BANDS = [
  [15, 21],
  [19, 27.5],
  [24, 35],
  [31, 45],
  [40, 58],
  [52, 75],
].map((b) => b.map((v) => v * 1000));

type Dot = { g: number; x: number; before: number; after: number; kind: "" | "hire" | "vet"; k: number };

const DOTS: Dot[] = (() => {
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const OFF = [-20, -10, 0, 10, 20];
  const dots: Dot[] = [];
  for (let g = 1; g <= G; g++) {
    const [lo, hi] = BANDS[g - 1];
    for (let i = 0; i < 5; i++) {
      let before = Math.min(70000, Math.max(14000, 15000 + rnd() * 40000 + (g - 1) * 2600));
      let after = lo + (hi - lo) * (0.12 + (0.76 * i) / 4) + (rnd() - 0.5) * 1400;
      let kind: Dot["kind"] = "";
      if (g === 3 && i === 1) {
        before = 49000;
        after = 27500;
        kind = "hire";
      }
      if (g === 5 && i === 3) {
        before = 36000;
        after = 52500;
        kind = "vet";
      }
      dots.push({ g, x: gx(g) + OFF[i], before, after, kind, k: dots.length });
    }
  }
  return dots;
})();

const HIRE = DOTS.find((d) => d.kind === "hire")!;
const VET = DOTS.find((d) => d.kind === "vet")!;

export function PayrollChart({ chart }: { chart: Chart }) {
  const [state, setState] = useState<State>("before");
  const auto = useRef(true);
  const card = useRef<HTMLDivElement>(null);
  useTilt(card);

  // Plays on its own (before → after → before…) while visible, until someone
  // uses the toggle. Reduced motion simply shows the "after" picture.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setState("after"), 0);
      return () => clearTimeout(id);
    }
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (card.current) io.observe(card.current);
    let current: State = "before";
    let timer: ReturnType<typeof setTimeout>;
    const step = (delay: number) => {
      timer = setTimeout(() => {
        if (!auto.current) return;
        if (visible && !document.hidden) {
          current = current === "before" ? "after" : "before";
          setState(current);
        }
        step(current === "before" ? 3200 : 4200);
      }, delay);
    };
    step(1600);
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  const choose = (s: State) => {
    auto.current = false;
    setState(s);
    track("chart_toggle", { state: s });
  };
  const copy = chart[state];

  return (
    <div className={`chart-card${state === "after" ? " after" : ""}`} ref={card}>
      <svg className="badge-spin" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="58" fill="#FF873E" />
        <g className="ring">
          <defs>
            <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text fontSize="12.5" fontWeight="600" letterSpacing="3.2" fill="#18243A">
            <textPath href="#badge-circle">{chart.badge}</textPath>
          </text>
        </g>
        <g transform="translate(60 60)" stroke="#18243A" strokeWidth="3" strokeLinecap="round">
          <line x1="0" y1="-18" x2="0" y2="18" />
          <line x1="-18" y1="0" x2="18" y2="0" />
          <line x1="-13" y1="-13" x2="13" y2="13" />
          <line x1="-13" y1="13" x2="13" y2="-13" />
        </g>
      </svg>

      <div className="chart-top">
        <div className="chart-title">
          {chart.title} <i>{chart.tag}</i>
        </div>
        <div className="seg" role="group" aria-label="Compare pay before and after the workshop">
          {(["before", "after"] as const).map((s) => (
            <button key={s} type="button" aria-pressed={state === s} onClick={() => choose(s)}>
              {chart[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart">
        <svg viewBox="0 0 560 356" role="img" aria-labelledby="chartDesc">
          <desc id="chartDesc">
            A scatter of 30 employee salaries by job level. Today they are scattered, and a new hire earns more than a
            five-year supervisor. After the workshop every salary sits inside a pay band for its grade.
          </desc>
          {[20000, 40000, 60000, 80000].map((v) => (
            <g key={v}>
              <line className="gl" x1={X0} x2={X1} y1={py(v)} y2={py(v)} />
              <text className="ax" x={X0 - 8} y={py(v) + 3.5} textAnchor="end">
                ₱{v / 1000}k
              </text>
            </g>
          ))}
          <line className="gl" x1={X0} x2={X1} y1={Y1} y2={Y1} style={{ stroke: "rgba(24,36,58,.3)" }} />
          {BANDS.map(([lo, hi], i) => {
            const g = i + 1;
            return (
              <g key={g}>
                <rect
                  className="band"
                  x={gx(g) - 30}
                  y={py(hi)}
                  width="60"
                  height={py(lo) - py(hi)}
                  rx="7"
                  style={{ transitionDelay: `${i * 60}ms` }}
                />
                <text className="band-lab" x={gx(g)} y={py(hi) - 7} textAnchor="middle">
                  G{g}
                </text>
                <text className="ax" x={gx(g)} y={Y1 + 17} textAnchor="middle">
                  {g}
                </text>
              </g>
            );
          })}
          <text className="axt" x={(X0 + X1) / 2} y={Y1 + 36} textAnchor="middle">
            Job level →
          </text>
          <line className="inv" x1={HIRE.x} y1={py(HIRE.before)} x2={VET.x} y2={py(VET.before)} />
          {DOTS.map((d) => {
            const label = d.kind === "hire" ? copy.hire : d.kind === "vet" ? copy.veteran : "";
            const side = d.kind === "vet" ? { x: -10, anchor: "end" as const } : { x: 10, anchor: "start" as const };
            return (
              <g
                key={d.k}
                className={`pt ${d.kind}`}
                style={{
                  transform: `translate(${d.x}px, ${py(d[state])}px)`,
                  transitionDelay: `${(d.k % 10) * 28}ms`,
                }}
              >
                <circle r={d.kind ? 7 : 5.5} />
                {label && (
                  <>
                    <text className="tag-bg" x={side.x} y={-9} textAnchor={side.anchor}>
                      {label}
                    </text>
                    <text x={side.x} y={-9} textAnchor={side.anchor}>
                      {label}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className={`chart-cap ${state}-cap`} aria-live="polite">
        <span className="ic" aria-hidden="true">
          {state === "before" ? "!" : "✓"}
        </span>
        <span>
          <b>{copy.title}</b> {copy.body}
        </span>
      </div>
    </div>
  );
}

/*
 * "Your pay structure": the finished result, in the same style as the hero
 * chart. When it scrolls into view the grade bands rise, the midpoints draw
 * and the 30 people drop into their bands. Hovering or tapping a grade shows
 * its range in the caption.
 */

const kpeso = (v: number) => `₱${Number((v / 1000).toFixed(1))}k`;

export function PayStructureChart({
  title,
  tag,
  caption,
}: {
  title: string;
  tag: string;
  caption: { lead: string; body: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref, 3);
  const [built, setBuilt] = useState(false);
  const [grade, setGrade] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setBuilt(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = grade !== null ? BANDS[grade - 1] : null;
  const people = grade !== null ? DOTS.filter((d) => d.g === grade).length : 0;

  return (
    <div ref={ref} className={`chart-card structure${built ? " after" : ""}`}>
      <div className="chart-top">
        <div className="chart-title">
          {title} <i>{tag}</i>
        </div>
        <div className="legend" aria-hidden>
          <span>
            <i className="lg-band" /> Pay band
          </span>
          <span>
            <i className="lg-mid" /> Midpoint
          </span>
          <span>
            <i className="lg-dot" /> Employee
          </span>
        </div>
      </div>

      <div className="chart">
        <svg viewBox="0 0 560 356" role="img" aria-labelledby="structureDesc" onMouseLeave={() => setGrade(null)}>
          <desc id="structureDesc">
            Six salary grades, each with a pay band from minimum to maximum and a midpoint. Every employee&apos;s salary
            sits inside the band for their grade.
          </desc>
          {[20000, 40000, 60000, 80000].map((v) => (
            <g key={v}>
              <line className="gl" x1={X0} x2={X1} y1={py(v)} y2={py(v)} />
              <text className="ax" x={X0 - 8} y={py(v) + 3.5} textAnchor="end">
                ₱{v / 1000}k
              </text>
            </g>
          ))}
          <line className="gl" x1={X0} x2={X1} y1={Y1} y2={Y1} style={{ stroke: "rgba(24,36,58,.3)" }} />
          {BANDS.map(([lo, hi], i) => {
            const g = i + 1;
            const mid = (lo + hi) / 2;
            const on = grade === g;
            return (
              <g
                key={g}
                className={`grade${on ? " on" : ""}${grade !== null && !on ? " dim" : ""}`}
                tabIndex={0}
                role="button"
                aria-label={`Grade ${g}: ${kpeso(lo)} to ${kpeso(hi)}, midpoint ${kpeso(mid)}`}
                onMouseEnter={() => setGrade(g)}
                onFocus={() => setGrade(g)}
                onBlur={() => setGrade(null)}
                onClick={() => setGrade(on ? null : g)}
              >
                {/* Wide invisible hit area, so the whole column responds. */}
                <rect x={gx(g) - 40} y={Y0} width="80" height={Y1 - Y0} fill="transparent" />
                <rect
                  className="band"
                  x={gx(g) - 30}
                  y={py(hi)}
                  width="60"
                  height={py(lo) - py(hi)}
                  rx="7"
                  style={{ transitionDelay: `${i * 110}ms` }}
                />
                <line
                  className="mid"
                  x1={gx(g) - 22}
                  x2={gx(g) + 22}
                  y1={py(mid)}
                  y2={py(mid)}
                  style={{ transitionDelay: `${500 + i * 110}ms` }}
                />
                <text className="band-lab" x={gx(g)} y={py(hi) - 7} textAnchor="middle" style={{ transitionDelay: `${400 + i * 110}ms` }}>
                  G{g}
                </text>
                <text className="ax" x={gx(g)} y={Y1 + 17} textAnchor="middle">
                  {g}
                </text>
              </g>
            );
          })}
          <text className="axt" x={(X0 + X1) / 2} y={Y1 + 36} textAnchor="middle">
            Job level →
          </text>
          {/* People drop into their bands from just above, fading in as they fall. */}
          {DOTS.map((d) => (
            <g
              key={d.k}
              className={`drop${grade !== null && d.g !== grade ? " dim" : ""}`}
              style={{
                transform: `translate(${d.x}px, ${py(d.after) - (built ? 0 : 48)}px)`,
                opacity: built ? undefined : 0,
                transitionDelay: `${900 + (d.g - 1) * 110 + (d.k % 5) * 50}ms`,
              }}
            >
              <circle r="5.5" />
            </g>
          ))}
        </svg>
      </div>

      <div className="chart-cap after-cap" aria-live="polite">
        <span className="ic" aria-hidden="true">
          ✓
        </span>
        {active && grade !== null ? (
          <span>
            <b>Grade {grade}.</b> {kpeso(active[0])} to {kpeso(active[1])} a month, midpoint{" "}
            {kpeso((active[0] + active[1]) / 2)}. {people} people placed, every one inside the band.
          </span>
        ) : (
          <span>
            <b>{caption.lead}</b> {caption.body}
          </span>
        )}
      </div>
    </div>
  );
}
