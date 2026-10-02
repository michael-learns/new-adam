"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { PEOPLE, type PersonTone } from "./person";

const W = 480;
const H = 300;
const GROUND = 252;
const MID = W / 2;
const WALK_S = 10;
const GRAY = { body: "#c7cbd3", head: "#aeb4bf" };

type Walker = { offsets: number[]; tones: PersonTone[]; size: number };

// A person, a couple and a small team, each walking through the arch.
const GROUPS: Walker[] = [
  { offsets: [0], tones: ["royal"], size: 1.3 },
  { offsets: [-19, 19], tones: ["orange", "royal"], size: 1.15 },
  { offsets: [-34, 0, 34], tones: ["ink", "orange", "royal"], size: 0.98 },
];

function Figure({ x, size, body, head }: { x: number; size: number; body: string; head: string }) {
  return (
    <g transform={`translate(${x} ${GROUND}) scale(${size})`}>
      {/* White outline so figures stay readable in front of the blue arch. */}
      <path d="M-24 0V-34a24 24 0 0 1 48 0V0Z" fill={body} stroke="#fff" strokeWidth="3" paintOrder="stroke" />
      <circle cx="0" cy="-70" r="13" fill={head} stroke="#fff" strokeWidth="3" paintOrder="stroke" />
    </g>
  );
}

function Group({ group, colored }: { group: Walker; colored: boolean }) {
  return (
    <>
      {group.offsets.map((dx, i) => {
        const tone = colored ? PEOPLE[group.tones[i]] : GRAY;
        return <Figure key={i} x={dx} size={group.size} body={tone.body} head={tone.head} />;
      })}
    </>
  );
}

/**
 * The parent-brand hero: people walk through the New Adam arch (the open tomb)
 * in grey and come out the other side in full colour. Every walker is drawn on
 * two layers, each clipped to one side of the arch's centre line, so the change
 * happens exactly as they pass through.
 */
export function NewBeginning({ before, after }: { before: string; after: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40px" });
  const reduce = useReducedMotion();
  const play = inView && !reduce;

  const walkers = GROUPS.map((group, i) => {
    const delay = (i * WALK_S) / GROUPS.length;
    const animate = play ? { x: [-80, W + 80] } : { x: [90, 400, 330][i] };
    const transition = play ? { duration: WALK_S, delay, repeat: Infinity, ease: "linear" as const } : { duration: 0 };
    return { group, animate, transition, key: i };
  });

  return (
    <div ref={ref} aria-hidden className="relative overflow-hidden rounded-[2rem] bg-mist ring-1 ring-royal/10">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" fill="none">
        <defs>
          <clipPath id="nb-before">
            <rect x="0" y="0" width={MID} height={H} />
          </clipPath>
          <clipPath id="nb-after">
            <rect x={MID} y="0" width={W - MID} height={H} />
          </clipPath>
          <radialGradient id="nb-glow" cx="50%" cy="70%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* The "after" side is warmer: a soft light comes through the doorway. */}
        <rect x={MID} y="0" width={W - MID} height={H} fill="#fff" opacity="0.55" />
        <motion.ellipse
          cx={MID}
          cy="190"
          rx="150"
          ry="120"
          fill="url(#nb-glow)"
          animate={play ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.8 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ground */}
        <path d={`M0 ${GROUND}H${W}`} stroke="var(--color-ink)" strokeOpacity="0.15" strokeWidth="2" />
        <path d={`M${MID} ${GROUND}H${W}`} stroke="var(--color-orange)" strokeOpacity="0.6" strokeWidth="3" />

        {/* The arch: the open entrance, behind the walkers */}
        <path
          d={`M${MID - 106} ${GROUND}V124a106 106 0 0 1 212 0V${GROUND}h-38V124a68 68 0 0 0-136 0V${GROUND}Z`}
          fill="var(--color-royal)"
        />

        {/* Walkers: grey on the way in, in colour on the way out. The clips are
            fixed to the scene, so each side is a static layer the walkers move through. */}
        {(["before", "after"] as const).map((side) => (
          <g key={side} clipPath={`url(#nb-${side})`}>
            {walkers.map(({ group, animate, transition, key }) => (
              <motion.g key={key} initial={false} animate={animate} transition={transition}>
                <Group group={group} colored={side === "after"} />
              </motion.g>
            ))}
          </g>
        ))}

        {/* Entry pillar, drawn over the walkers so they appear to step through
            the doorway: behind the left pillar, then out in front of the right one. */}
        <rect x={MID - 106} y="124" width="38" height={GROUND - 124} fill="var(--color-royal)" />
      </svg>

      <div className="flex items-center justify-between gap-4 px-5 pb-5 text-[0.65rem] font-semibold tracking-[0.1em] whitespace-nowrap uppercase sm:px-8 sm:text-[0.8rem] sm:tracking-[0.14em]">
        <span className="text-ink/40">{before}</span>
        <span className="text-royal">{after} →</span>
      </div>
    </div>
  );
}
