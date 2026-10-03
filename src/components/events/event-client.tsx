"use client";

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import type { EventDetails } from "@/content/events/types";
import { peso, quote } from "@/lib/event-pricing";

/* ---------- analytics ---------- */

type Tracker = (name: string, data?: Record<string, unknown>) => void;
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends an event to Meta Pixel and/or Google Analytics, if either is installed. */
export const track: Tracker = (name, data = {}) => {
  try {
    window.fbq?.("trackCustom", name, data);
    window.gtag?.("event", name, data);
  } catch {
    /* analytics must never break the page */
  }
};

/** Tracks clicks on any element with data-track="name". */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (el?.dataset.track) track(el.dataset.track);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

/* ---------- early bird ---------- */

const EarlyBirdContext = createContext(false);

/**
 * Whether early bird is still on. The page is pre-rendered, so the server's
 * answer is used while hydrating, then the browser's clock takes over and the
 * page flips to regular pricing the moment early bird ends.
 */
export function EarlyBirdProvider({ endsAt, serverValue, children }: { endsAt: string; serverValue: boolean; children: ReactNode }) {
  const end = Date.parse(endsAt);
  const value = useSyncExternalStore(
    (notify) => {
      const left = end - Date.now();
      if (left <= 0 || left > 2 ** 31 - 1) return () => {};
      const id = setTimeout(notify, left + 500);
      return () => clearTimeout(id);
    },
    () => Date.now() < end,
    () => serverValue,
  );
  return <EarlyBirdContext.Provider value={value}>{children}</EarlyBirdContext.Provider>;
}

export const useEarlyBird = () => useContext(EarlyBirdContext);

/** Shows children only while early bird is on (or only after, with `after`). */
export function EarlyBirdOnly({ children, after = false }: { children: ReactNode; after?: boolean }) {
  const eb = useEarlyBird();
  return eb !== after ? <>{children}</> : null;
}

/** The current single-seat price. */
export function PriceNow({ event }: { event: EventDetails }) {
  return <>{peso(quote(event.prices, 1, useEarlyBird()).perSeat)}</>;
}

/** Highlights the current rate row in the rates table. */
export function RateRow({ kind, children }: { kind: "early" | "regular" | "group"; children: ReactNode }) {
  const eb = useEarlyBird();
  const className = kind === "early" ? (eb ? "now" : "gone") : kind === "regular" && !eb ? "now" : undefined;
  return <tr className={className}>{children}</tr>;
}

/* ---------- seat picker ---------- */

/** Eases a displayed number toward its target, so totals roll instead of jumping. */
function useRollingNumber(target: number, ms = 450) {
  const [shown, setShown] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setShown(target));
      return () => cancelAnimationFrame(id);
    }
    const start = performance.now();
    const begin = from.current;
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = begin + (target - begin) * eased;
      from.current = value;
      setShown(value);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, ms]);

  return shown;
}

/** Briefly adds "pop" to an element whenever `key` changes. */
function usePop(key: string) {
  const ref = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;
    el.classList.remove("pop");
    void el.offsetWidth; // restart the animation
    el.classList.add("pop");
  }, [key]);
  return ref;
}

export function SeatPicker({ event }: { event: EventDetails }) {
  const eb = useEarlyBird();
  const live = useSeats();
  const [wanted, setSeats] = useState(1);
  const max = Math.max(1, live.left ?? event.seats);
  const soldOut = live.left === 0;
  const seats = Math.min(wanted, max);
  const q = quote(event.prices, seats, eb);
  const groups = [...event.prices.groups].sort((a, b) => a.minSeats - b.minSeats);

  // Nudge toward the next group rate when it's close (within 3 seats).
  const next = groups.find((g) => seats < g.minSeats && g.minSeats - seats <= 3 && seats >= 2);
  const nextQuote = next ? quote(event.prices, next.minSeats, eb) : null;

  const total = useRollingNumber(q.total);
  const tierRef = usePop(q.tier);

  const reserve = () => {
    track("form_reserve", { seats, tier: q.tier, value: q.total, currency: "PHP" });
    window.open(event.registration.formUrl, "_blank", "noopener");
  };

  return (
    <div className="buy">
      <div className="buy-top">
        <span className="tier-pill" ref={tierRef}>
          {q.tier}
        </span>
        <span className="seats-left">
          <SeatsText />
        </span>
      </div>
      <div className="qty">
        <span className="qty-l">How many are coming?</span>
        <div className="stepper">
          <button type="button" aria-label="One fewer seat" disabled={seats <= 1} onClick={() => setSeats(seats - 1)}>
            −
          </button>
          <output aria-live="polite">{seats}</output>
          <button type="button" aria-label="One more seat" disabled={seats >= max} onClick={() => setSeats(seats + 1)}>
            +
          </button>
        </div>
      </div>
      <div className="total">
        <span className="amt" aria-live="polite">
          {peso(total)}
        </span>
        {q.savings > 0 && <span className="was">{peso(event.prices.regular * seats)}</span>}
      </div>
      <p className="per">
        <b>{peso(q.perSeat)}</b> per seat{q.savings > 0 && ` · you save ${peso(q.savings)}`}
      </p>
      {next && nextQuote && (
        <p className="nudge">
          Add {next.minSeats - seats} more and everyone pays {peso(nextQuote.perSeat)}.{" "}
          <button
            type="button"
            onClick={() => {
              setSeats(next.minSeats);
              track("group_upsell", { seats: next.minSeats });
            }}
          >
            Make it {next.minSeats}
          </button>
        </p>
      )}
      {soldOut ? (
        <a className="btn btn-blue btn-block" href={`tel:${event.secretariat.phone}`} data-track="waitlist_call">
          Sold out · call {event.secretariat.name.split(" ")[0]} for the waitlist
        </a>
      ) : (
        <button className="btn btn-blue btn-block" type="button" onClick={reserve}>
          Register now{seats > 1 ? ` · ${seats} seats` : ""} →
        </button>
      )}
      <p className="pay-meth">{event.registration.note}</p>
    </div>
  );
}

/* ---------- approval message for the boss ---------- */

export function ApprovalBox({ event, url }: { event: EventDetails; url: string }) {
  const eb = useEarlyBird();
  const [toast, setToast] = useState("");
  const message = event.approval.message
    .replace("{rate}", eb ? event.approval.rateEarly : event.approval.rateRegular)
    .replace("{url}", `\nDetails: ${url}\n`);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const t = document.createElement("textarea");
      t.value = message;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setToast("Copied. Paste it to your boss.");
    setTimeout(() => setToast(""), 2600);
  };

  return (
    <details className="boss">
      <summary>{event.approval.summary}</summary>
      <pre>{message}</pre>
      <div className="boss-actions">
        <button className="btn btn-blue" type="button" onClick={copy} data-track="boss_copy">
          Copy message
        </button>
        <a className="btn btn-ghost" href={`viber://forward?text=${encodeURIComponent(message)}`} data-track="boss_viber">
          Send on Viber
        </a>
        <a
          className="btn btn-ghost"
          href={`mailto:?subject=${encodeURIComponent(event.approval.subject)}&body=${encodeURIComponent(message)}`}
          data-track="boss_email"
        >
          Email it
        </a>
      </div>
      <div className={`toast${toast ? " on" : ""}`} role="status">
        {toast}
      </div>
    </details>
  );
}

/* ---------- sticky dock (phones): after the hero, hidden over the rates ---------- */

/** True once the hero has scrolled away, and false again over the registration section. */
function useShowStickyCta(seatSectionId: string) {
  const [pastHero, setPastHero] = useState(false);
  const [atSeat, setAtSeat] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".ev .hero");
    const seat = document.getElementById(seatSectionId);
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const o = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting));
      o.observe(hero);
      observers.push(o);
    }
    if (seat) {
      const o = new IntersectionObserver(([e]) => setAtSeat(e.isIntersecting), { threshold: 0.15 });
      o.observe(seat);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [seatSectionId]);

  return pastHero && !atSeat;
}

export function StickyDock({ event }: { event: EventDetails }) {
  const eb = useEarlyBird();
  const show = useShowStickyCta(event.pricing.id);
  const group = [...event.prices.groups].sort((a, b) => a.minSeats - b.minSeats)[0];

  return (
    <div className={`dock${show ? " show" : ""}`} aria-hidden={!show}>
      <div className="d-l">
        <b>
          <PriceNow event={event} />
        </b>
        <span>
          {eb
            ? `Early bird ends ${event.schedule.earlyBirdShort}`
            : group
              ? `Groups of ${group.minSeats}+ from ${peso(group.price)} each`
              : event.schedule.dateLabel}
        </span>
      </div>
      <a className="btn btn-sun" href={`#${event.pricing.id}`} tabIndex={show ? 0 : -1} data-track="dock_cta">
        Register now
      </a>
    </div>
  );
}

/* ---------- live seats (from the registrations sheet) ---------- */

type Seats = { total: number; left: number | null };
const SeatsContext = createContext<Seats>({ total: 0, left: null });

/**
 * Polls /api/events/<slug>/seats every minute and when the tab regains focus.
 * `left` stays null until a sheet is connected, and the page shows the total.
 */
export function SeatsProvider({ slug, total, children }: { slug: string; total: number; children: ReactNode }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`/api/events/${slug}/seats`, { cache: "no-store" });
        const data = (await res.json()) as { left: number | null };
        if (!cancelled && typeof data.left === "number") setLeft(data.left);
      } catch {
        /* keep the last known value */
      }
    };
    load();
    const id = setInterval(load, 60_000);
    const onFocus = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [slug]);

  return <SeatsContext.Provider value={{ total, left }}>{children}</SeatsContext.Provider>;
}

export const useSeats = () => useContext(SeatsContext);

/** "12 of 30 seats left", "Only 30 seats", or the sold-out line. */
export function SeatsText({ short = false }: { short?: boolean }) {
  const { total, left } = useSeats();
  if (left === null) return <>{short ? `${total} seats` : `Only ${total} seats`}</>;
  if (left === 0) return <>{short ? "Sold out" : "Sold out · call for the waitlist"}</>;
  return <>{short ? `${left} seats left` : `${left} of ${total} seats left`}</>;
}

/* ---------- countdown to the event ---------- */

function useNow(intervalMs: number, serverNow: number) {
  return useSyncExternalStore(
    (notify) => {
      const id = setInterval(notify, intervalMs);
      return () => clearInterval(id);
    },
    () => Math.floor(Date.now() / intervalMs) * intervalMs,
    () => serverNow,
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Sticky bar above the nav: a live countdown to the first day and the seats
 * left. After the event starts it says so instead.
 */
export function CountdownBar({ event, serverNow }: { event: EventDetails; serverNow: number }) {
  const now = useNow(1000, serverNow);
  const start = Date.parse(event.schedule.startsAt);
  const end = Date.parse(event.schedule.endsAt);
  const left = Math.max(0, start - now);
  const d = Math.floor(left / 864e5);
  const h = Math.floor(left / 36e5) % 24;
  const m = Math.floor(left / 6e4) % 60;
  const s = Math.floor(left / 1e3) % 60;

  return (
    <div className="topbar" role="status" aria-live="off">
      <div className="wrap">
        {now < start ? (
          <span className="tb-time">
            <span className="tb-label">Workshop starts in</span>
            <span className="tb-clock num" aria-label={`${d} days, ${h} hours, ${m} minutes`}>
              <span>
                <b>{d}</b>d
              </span>
              <span>
                <b>{pad(h)}</b>h
              </span>
              <span>
                <b>{pad(m)}</b>m
              </span>
              <span className="tb-sec">
                <b>{pad(s)}</b>s
              </span>
            </span>
          </span>
        ) : (
          <span className="tb-time">{now < end ? "Happening now" : "This workshop has ended"}</span>
        )}
        <span className="tb-seats">
          <span className="tb-dot" aria-hidden />
          <SeatsText short />
        </span>
      </div>
    </div>
  );
}

/* ---------- floating "Register now" (desktop and tablet; phones use the dock) ---------- */

export function FloatingRegister({ event }: { event: EventDetails }) {
  const show = useShowStickyCta(event.pricing.id);
  const eb = useEarlyBird();
  const group = [...event.prices.groups].sort((a, b) => a.minSeats - b.minSeats)[0];
  const tag = eb
    ? `Early bird promo · until ${event.schedule.earlyBirdShort}`
    : group
      ? `Groups of ${group.minSeats}+ save`
      : null;

  return (
    <a
      className={`fab${show ? " show" : ""}`}
      href={`#${event.pricing.id}`}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      data-track="fab_cta"
    >
      {tag && (
        <span className="fab-tag">
          <span className="fab-tag-dot" aria-hidden />
          {tag}
        </span>
      )}
      Register now
      <span className="arr" aria-hidden>
        →
      </span>
    </a>
  );
}
