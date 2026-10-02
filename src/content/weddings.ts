import type { Page } from "./types";

// Contact buttons are off until there's a channel (no email for now).
const INQUIRE = { label: "Ask about the next ceremony", href: "#" };

/**
 * Weddings product page, read top to bottom in the order shown on the page.
 *
 * TO CONFIRM before launch: the process steps and outcomes describe how the
 * program is expected to work; check them against the real program details.
 */
export const weddings: Page = {
  slug: "/weddings",
  seo: {
    title: "Weddings | Legally recognized wedding ceremonies in the Philippines | New Adam",
    description:
      "New Adam gives couples who live together a meaningful wedding ceremony with full government recognition, so their relationship and family stand on solid ground.",
  },
  sections: [
    {
      type: "kairosHero",
      id: "top",
      eyebrow: "Weddings by New Adam",
      title: ["You've built a life together.", "Now make it official."],
      highlight: "make it official.",
      lead: "We give couples who live together a meaningful wedding ceremony with full government recognition, so your relationship and your family stand on solid ground.",
      primaryCta: { label: "See how it works", href: "#how-it-works" },
      secondaryCta: { label: "Does this sound familiar?", href: "#why" },
      certificate: "Officially married",
    },
    {
      type: "problem",
      id: "why",
      number: "01",
      label: "Why couples wait",
      title: "Does this sound familiar?",
      intro: "Many couples share a home, a family and years of life together, but have never married.",
      prompt: "Tap the ones that feel like your story.",
      art: "paperwork",
      pains: [
        {
          text: "We've wanted to marry for years, but a wedding felt too expensive.",
          theme: "the cost of a wedding",
          remedy: "talking through what the ceremony involves",
          single:
            "A wedding shouldn't have to wait for a big budget. We'll talk you through what the ceremony involves, so cost isn't a guess.",
        },
        {
          text: "The requirements seemed confusing, so we kept putting it off.",
          theme: "confusing requirements",
          remedy: "walking you through what's needed, step by step",
          single: "Requirements feel lighter with someone beside you. We'll walk you through what's needed, step by step.",
        },
        {
          text: "Life got busy, and the right time never came.",
          theme: "the right time never coming",
          remedy: "finding a ceremony date that works for your family",
          single: "We'll help you find the right moment for your family, and make it happen.",
        },
        {
          text: "We want our family to have the security of a legal marriage.",
          theme: "wanting security for your family",
          remedy: "making your marriage officially recognized",
          single:
            "That's exactly what our weddings are for: a marriage with full government recognition, so your family stands on solid ground.",
        },
      ],
      responses: {
        none: "Pick any that sound like your story.",
        few: "{n} of {total}: {themes}. You're not alone, and it's not too late. We'd start by {first}, then {then}.",
        many: "{n} of {total}: {themes}. This could be your right moment. We'd start by {first}, then {then}.",
        all: "All {total}. Then this is your right moment. Let's talk about the next ceremony.",
      },
      closing: "It's not too late. We help you make this the right moment.",
    },
    {
      type: "process",
      id: "how-it-works",
      number: "02",
      label: "How it works",
      title: "Reach out. Prepare. Celebrate.",
      intro: "A simple path from your first message to your wedding day.",
      steps: [
        {
          title: "Reach out",
          art: "discover",
          body: "Tell us about yourselves. We'll explain how it works and when the next ceremony is.",
        },
        {
          title: "Prepare together",
          art: "integrity",
          body: "We walk with you through what's needed, so nothing feels confusing on the way to your wedding day.",
        },
        {
          title: "Celebrate",
          art: "couple",
          body: "Say your vows in a meaningful ceremony with full government recognition, surrounded by the people you love.",
        },
      ],
    },
    {
      type: "outcomes",
      id: "what-changes",
      number: "03",
      label: "What changes",
      title: "More than a ceremony.",
      items: [
        { title: "Legally recognized", art: "certificate", body: "Your marriage is officially recognized by the government." },
        { title: "A secure home", art: "home", body: "Your relationship and your family stand on solid ground." },
        { title: "A day to remember", art: "trust", body: "A celebration that honors your story, not a rushed formality." },
        { title: "A fresh start", art: "growth", body: "A new beginning for you, your partner and your whole family." },
      ],
    },
    {
      type: "mission",
      id: "why-we-do-it",
      number: "04",
      label: "Why we do this",
      title: "Why we do this",
      statement: "Every family deserves to stand on solid ground.",
      body: "Our weddings are part of New Adam's mission to transform lives through lived values. We believe commitment, honored and made official, gives a family a stronger foundation for everything that follows.",
    },
    {
      // Hidden until there's a contact channel (no email for now).
      hidden: true,
      type: "booking",
      id: "begin",
      number: "05",
      label: "Begin",
      title: "Ready to make it official?",
      body: "Send us a message and we'll reply personally with the details of the next ceremony.",
      primaryCta: INQUIRE,
      reassurance: ["Personal replies", "Clear guidance", "No pressure"],
      art: "booking",
    },
    {
      type: "portfolio",
      id: "values-formation",
      label: "Also from New Adam",
      name: "Values Formation",
      body: "Custom values formation training for companies, built on your own core values, mission, vision and culture.",
      cta: { label: "Explore Values Formation", href: "/values-formation" },
    },
  ],
};
