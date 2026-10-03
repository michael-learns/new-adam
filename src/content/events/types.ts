/**
 * Content model for an event landing page. One file per event in this folder;
 * the template in src/components/events renders it and the event is served at
 * https://<slug>.<EVENTS_DOMAIN> (see src/proxy.ts).
 */

export type EventPrices = {
  earlyBird: number;
  regular: number;
  /** Per-person rate for groups; replaces early bird, never stacks. */
  groups: { minSeats: number; price: number }[];
};

export type EventDetails = {
  /** Subdomain and URL path: salarystructure → salarystructure.newadam.co */
  slug: string;
  name: string;
  seo: { title: string; description: string; shareTitle: string; shareDescription: string };
  /** Short label for the sticky nav. */
  navLinks: { label: string; href: string }[];

  schedule: {
    /** ISO dates with Philippine offset, e.g. 2026-10-22T09:00:00+08:00 */
    startsAt: string;
    endsAt: string;
    earlyBirdEndsAt: string;
    /** Human labels used in copy, so wording stays natural. */
    dateLabel: string;
    dayLabel: string;
    earlyBirdLabel: string;
    earlyBirdShort: string;
  };
  venue: { name: string; detail: string; city: string; shortLabel: string };
  durationLabel: string;
  /** Total seats for the event. */
  seats: number;
  /**
   * Live seat count from a Google Sheet, read as CSV on the server.
   * The CSV link itself is never stored here: this object is sent to the
   * browser with the page, and a registrations sheet holds personal data.
   * Put the link in the server-only environment variable named by `env`.
   */
  seatsSheet: {
    /** Name of the environment variable holding the CSV link. */
    env: string;
    /** Column holding seats per registration (summed when it's a number; otherwise 1). */
    seatsColumn?: string;
    /** Only rows with a value here count (e.g. "Name"), so notes and blank rows are skipped. */
    requiredColumn?: string;
    /** Column checked for cancellations (default "Status"). */
    statusColumn?: string;
    /** Rows whose status column contains one of these words don't count. */
    ignoreStatuses?: string[];
  };
  prices: EventPrices;

  /** Registration. "form" sends people to a form; online checkout can be added later. */
  registration: { mode: "form"; formUrl: string; note: string };

  hero: {
    title: string;
    kicker: string;
    /** Part of the kicker set with an orange underline. */
    highlight: string;
    lead: string;
    secondaryCta: { label: string; href: string };
    /** `seats: true` shows the live seats-left count in place of `value`. */
    facts: { value: string; label: string; seats?: boolean }[];
    /** The "pay by history → pay by structure" animation beside the headline. */
    chart?: {
      title: string;
      tag: string;
      badge: string;
      before: { label: string; title: string; body: string; hire: string; veteran: string };
      after: { label: string; title: string; body: string; hire: string; veteran: string };
    };
  };
  problem: {
    eyebrow: string;
    title: string;
    quotes: { quote: string; context: string }[];
    turn: string;
    turnEmphasis: string;
  };
  outcomes: {
    id: string;
    eyebrow: string;
    title: string;
    lead: string;
    chartCaption: { lead: string; body: string };
    /** Header of the interactive pay structure chart. */
    chartTitle: string;
    chartTag: string;
    items: { title: string; body: string }[];
    included: string;
  };
  modules: {
    id: string;
    eyebrow: string;
    title: string;
    lead: string;
    parts: { label: string; title: string; items: { title: string; core?: boolean }[] }[];
  };
  speaker: {
    id: string;
    eyebrow: string;
    name: string;
    role: string;
    photo: { src: string; width: number; height: number };
    body: string[];
  };
  audience: {
    eyebrow: string;
    title: string;
    roles: string;
    yes: string[];
    no: string[];
  };
  pricing: {
    id: string;
    eyebrow: string;
    title: string;
    included: string[];
    footnote: string;
  };
  /** The "ask your boss" approval message. {rate} and {url} are filled in. */
  approval: { summary: string; subject: string; message: string; rateEarly: string; rateRegular: string };
  faq: { id: string; eyebrow: string; title: string; items: { q: string; a: string[] }[] };
  final: { title: string; emphasis: string };

  organizer: { presentedBy: string; organizedBy: string };
  secretariat: { name: string; phone: string; phoneLabel: string };
};
