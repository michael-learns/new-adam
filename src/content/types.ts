/**
 * Content model for the site.
 *
 * These types are the contract between content and components. Today the
 * content lives in local files (see ./home.ts); when a CMS is connected, map
 * its response onto these same types inside src/lib/content.ts and no
 * component needs to change.
 */

export type Link = {
  label: string;
  href: string;
};

export type SiteSettings = {
  name: string;
  /** Short descriptor used in titles and social cards. */
  descriptor: string;
  description: string;
  url: string;
  locale: string;
  /** Leave unset to keep email off the site (buttons and structured data). */
  contactEmail?: string;
  areaServed: string;
  /** Site-wide header navigation. */
  nav: Link[];
  social: Link[];
};

type Numbered = {
  id: string;
  /** Shown as "01 / Label" and used for the header navigation. */
  number: string;
  label: string;
  title: string;
};

export type HeroSection = {
  type: "hero";
  id: string;
  eyebrow: string;
  /** The headline is set as two lines: a statement and a question. */
  title: [string, string];
  /** Part of the second line to underline. */
  highlight?: string;
  lead: string;
  primaryCta: Link;
  secondaryCta?: Link;
  /** The "off the wall" illustration: each value leaves the poster and becomes a behavior in the team. */
  poster: {
    heading: string;
    company: string;
    values: { value: string; behavior: string; team: string }[];
  };
};

export type ProofSection = {
  type: "proof";
  id: string;
  /** Oversized statement that the dark band slides over. */
  statement: string;
  logosLabel: string;
  /** Client names; logos can replace these later. */
  clients: { name: string; logo?: string }[];
  stats: { value: string; label: string }[];
};

/**
 * "Does this sound familiar?": visitors tick the pains they relate to and get
 * a live response, plus an email pre-filled with what they picked.
 */
export type ProblemSection = Numbered & {
  type: "problem";
  intro: string;
  /** Instruction above the checklist, e.g. "Tap the ones that feel like your team." */
  prompt: string;
  art?: ArtName;
  pains: {
    /** Written in the visitor's own voice. */
    text: string;
    /** Short noun phrase used when several are picked, e.g. "avoided conversations". */
    theme: string;
    /** What we'd do, as an -ing phrase that follows "We'd start by…". */
    remedy: string;
    /** The full reply when this is the only one picked. */
    single: string;
  }[];
  /**
   * Replies composed from what was picked, in the order it was picked, so every
   * combination reads differently. Placeholders: {n}, {total}, {themes},
   * {first} and {then} (the remedies of the first two picks).
   */
  responses: { none: string; few: string; many: string; all: string };
  /** Optional email button that lists what was picked. Omit to show the replies only. */
  cta?: { label: string; email: string; subject: string; intro: string };
  closing: string;
};

export type ComparisonSection = Numbered & {
  type: "comparison";
  intro: string;
  them: { label: string; points: string[]; art?: ArtName };
  us: { label: string; points: string[]; art?: ArtName };
};

/** Animated illustrations, registered in src/components/illustrations/art.tsx. */
export type ArtName =
  | "discover"
  | "design"
  | "deliver"
  | "workshop"
  | "program"
  | "online"
  | "fading"
  | "slides"
  | "tailored"
  | "lived"
  | "trust"
  | "integrity"
  | "growth"
  | "drafting"
  | "foundation"
  | "booking"
  | "team"
  | "couple"
  | "paperwork"
  | "certificate"
  | "home";

export type ProcessSection = Numbered & {
  type: "process";
  intro: string;
  steps: { title: string; body: string; art?: ArtName }[];
};

export type FormatsSection = Numbered & {
  type: "formats";
  intro: string;
  items: { title: string; body: string; bestFor: string; art?: ArtName }[];
};

export type OutcomesSection = Numbered & {
  type: "outcomes";
  items: { title: string; body: string; art?: ArtName }[];
};

export type TestimonialsSection = Numbered & {
  type: "testimonials";
  items: { quote: string; name: string; role: string; company: string }[];
};

export type AssessmentSection = {
  type: "assessment";
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  includes: string[];
  cta: Link;
  art?: ArtName;
  note: string;
};

export type FoundationSection = Numbered & {
  type: "foundation";
  body: string[];
  art?: ArtName;
  cta?: Link;
  principles: string[];
};

export type BookingSection = Numbered & {
  type: "booking";
  body: string;
  art?: ArtName;
  primaryCta: Link;
  secondaryCta?: Link;
  reassurance: string[];
};

export type PortfolioSection = {
  type: "portfolio";
  id: string;
  label: string;
  name: string;
  body: string;
  cta?: Link;
};

/** Parent-brand hero: people walk through the arch and come out new. */
export type BrandHeroSection = {
  type: "brandHero";
  id: string;
  eyebrow: string;
  title: [string, string];
  highlight?: string;
  lead: string;
  primaryCta: Link;
  secondaryCta?: Link;
  /** Labels either side of the arch in the illustration. */
  before: string;
  after: string;
};

/** Kairos Events hero: a couple under the arch, made official. */
export type KairosHeroSection = {
  type: "kairosHero";
  id: string;
  eyebrow: string;
  title: [string, string];
  highlight?: string;
  lead: string;
  primaryCta: Link;
  secondaryCta?: Link;
  /** Text on the certificate in the illustration. */
  certificate: string;
};

/** Story page hero: message on the left, an illustration on a textured panel on the right. */
export type StoryHeroSection = {
  type: "storyHero";
  id: string;
  eyebrow: string;
  title: [string, string];
  highlight?: string;
  lead: string;
  primaryCta: Link;
  secondaryCta?: Link;
  art: ArtName;
};

/** The logo, explained part by part. */
export type MarkSection = Numbered & {
  type: "mark";
  intro: string;
  points: { title: string; body: string }[];
};

export type MissionSection = Numbered & {
  type: "mission";
  statement: string;
  body: string;
};

/** The ways in: one card per program. */
export type PathsSection = Numbered & {
  type: "paths";
  intro: string;
  items: {
    eyebrow: string;
    name: string;
    title: string;
    body: string;
    points: string[];
    cta: Link;
    art?: ArtName;
  }[];
};

export type KairosSection = Numbered & {
  type: "kairos";
  intro: string;
  body: string;
  points: { title: string; body: string }[];
  cta: Link;
  art?: ArtName;
};

export type Section =
  | HeroSection
  | ProofSection
  | ProblemSection
  | ComparisonSection
  | ProcessSection
  | FormatsSection
  | OutcomesSection
  | TestimonialsSection
  | AssessmentSection
  | FoundationSection
  | BookingSection
  | PortfolioSection
  | BrandHeroSection
  | MissionSection
  | PathsSection
  | KairosSection
  | KairosHeroSection
  | StoryHeroSection
  | MarkSection;

/** Any section can be kept in the content but left off the page with `hidden: true`. */
export type PageSection = Section & { hidden?: boolean };

export type Page = {
  slug: string;
  seo: { title: string; description: string };
  sections: PageSection[];
};
