import { programs } from "./programs";
import type { Page } from "./types";

// Contact buttons are off until there's a channel (no email for now); the
// section that uses them is hidden below.

/**
 * Home page: New Adam as the mission, with Values Formation and Kairos Events
 * as the two ways in. Each program has its own product page.
 *
 * PLACEHOLDERS to replace (search for "PLACEHOLDER"): impact numbers.
 */
export const home: Page = {
  slug: "/",
  seo: {
    title: "New Adam | Transforming lives through values and culture",
    description:
      "New Adam helps people live out the values that shape a good life, through values formation training for companies and Kairos Events for couples in the Philippines.",
  },
  sections: [
    {
      type: "brandHero",
      id: "top",
      eyebrow: "Values Formation · Kairos Events · Philippines",
      title: ["Lives change", "when values are lived."],
      highlight: "are lived.",
      lead: "New Adam helps people live out the values that shape a good life, at work, at home and in every relationship. We do it through values formation for companies and Kairos Events for couples.",
      primaryCta: { label: "Find your way in", href: "#paths" },
      secondaryCta: { label: "Our story", href: "/our-story" },
      before: "Old patterns",
      after: "A new way of living",
    },
    {
      type: "mission",
      id: "mission",
      number: "01",
      label: "Our mission",
      title: "Our mission",
      statement: "Culture is shaped one value at a time. Values are lived one person at a time.",
      body: "That's why we meet people where life actually happens: in the teams they spend their days with and the families they build. When values become everyday habits, people change, and so do the cultures around them.",
    },
    {
      type: "paths",
      id: "paths",
      number: "02",
      label: "Two ways in",
      title: "Where would you like to begin?",
      intro: "Two programs, one aim: lives changed by lived values.",
      items: programs,
    },
    {
      type: "process",
      id: "how-it-works",
      number: "03",
      label: "How lives change",
      title: "Name it. Live it. Make it last.",
      intro: "Whether it's a team or a couple, change follows the same path.",
      steps: [
        {
          title: "Name what matters",
          art: "discover",
          body: "We start by listening, so the values we work on are truly yours: your company's, or your family's.",
        },
        {
          title: "Live it together",
          art: "trust",
          body: "Values become real in practice: in conversations, decisions and the small moments of an ordinary week.",
        },
        {
          title: "Make it last",
          art: "growth",
          body: "A clear commitment marks the new beginning, and follow-through helps it hold.",
        },
      ],
    },
    {
      type: "kairos",
      id: "kairos",
      number: "04",
      label: "Kairos Events",
      title: "The right time to make it official.",
      intro: "Kairos is the Greek word for the right moment.",
      body: "Many couples have built a life together but never had the chance to marry. Kairos Events gives them a wedding ceremony with full government recognition, so their relationship and their family stand on solid ground.",
      points: [
        { title: "Legally recognized", body: "A ceremony with full government recognition." },
        { title: "Meaningful, not rushed", body: "A celebration that honors your story." },
        { title: "A fresh start", body: "A new beginning for you and your whole family." },
      ],
      cta: { label: "Explore Kairos Events", href: "/kairos-events" },
      art: "couple",
    },
    {
      // Hidden until there are real clients to show.
      hidden: true,
      type: "proof",
      id: "impact",
      statement: "Lives, changed.",
      logosLabel: "Trusted by companies and communities",
      // PLACEHOLDER: replace with real partner names and numbers.
      clients: [
        { name: "Partner one" },
        { name: "Partner two" },
        { name: "Partner three" },
        { name: "Partner four" },
        { name: "Partner five" },
      ],
      stats: [
        { value: "00+", label: "Companies trained" },
        { value: "000+", label: "People reached" },
        { value: "00+", label: "Couples married" },
      ],
    },
    {
      // Hidden until there's a contact channel (no email for now).
      hidden: true,
      type: "booking",
      id: "begin",
      number: "05",
      label: "Begin",
      title: "Ready for a new beginning?",
      body: "Tell us whether it's for your team or your relationship, and we'll reply personally.",
      primaryCta: { label: "Book training for your team", href: "#" },
      secondaryCta: { label: "Ask about Kairos Events", href: "#" },
      reassurance: ["Across the Philippines", "On-site or online training", "Personal replies"],
      art: "booking",
    },
  ],
};
