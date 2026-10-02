import type { Page } from "./types";
import { site } from "./site";

// Contact buttons are off until there's a channel (no email for now); the
// sections that need one are hidden below. Point these at it when ready.
const BOOK_CALL = { label: "Book a discovery call", href: "#" };
const FREE_ASSESSMENT = { label: "Get your free assessment", href: "#" };

/**
 * Values Formation product page, read top to bottom in the order shown on the page.
 * Reorder, remove or add sections here; each `type` maps to a component in
 * src/components/sections.
 *
 * PLACEHOLDERS to replace before launch (search for "PLACEHOLDER"):
 * client names/logos, stats and testimonials.
 */
export const valuesFormation: Page = {
  slug: "/values-formation",
  seo: {
    title: "Values Formation Training for Companies in the Philippines | New Adam",
    description: site.description,
  },
  sections: [
    {
      type: "hero",
      id: "top",
      eyebrow: "Values formation training for Philippine companies",
      title: ["Your core values are on the wall.", "Are they in your team?"],
      highlight: "in your team?",
      lead: "New Adam builds training around your company's own values, mission, vision and culture, then gives your people practical tools to live them out in every meeting, deadline and decision.",
      primaryCta: { label: "See how it works", href: "#how-it-works" },
      secondaryCta: { label: "Does this sound familiar?", href: "#problem" },
      poster: {
        heading: "Our core values",
        company: "Your company",
        values: [
          { value: "Integrity", behavior: "Flagged the delay before the deadline, not after.", team: "Operations" },
          { value: "Teamwork", behavior: "Shared the credit and asked for help early.", team: "Sales" },
          { value: "Excellence", behavior: "Asked for feedback, then acted on it.", team: "Finance" },
          { value: "Respect", behavior: "Listened first in a tense client meeting.", team: "Customer care" },
        ],
      },
    },
    {
      // Hidden until there are real clients to show.
      hidden: true,
      type: "proof",
      id: "clients",
      statement: "Values, lived.",
      logosLabel: "Trusted by teams at",
      // PLACEHOLDER: replace with real client names (and add `logo` paths in /public/clients).
      clients: [
        { name: "Client one" },
        { name: "Client two" },
        { name: "Client three" },
        { name: "Client four" },
        { name: "Client five" },
      ],
      // PLACEHOLDER: replace with real numbers.
      stats: [
        { value: "00+", label: "Companies trained" },
        { value: "000+", label: "Employees reached" },
        { value: "00", label: "Sessions delivered" },
      ],
    },
    {
      type: "problem",
      id: "problem",
      number: "01",
      label: "The problem",
      title: "Does this sound familiar?",
      intro:
        "Most companies have core values. Few teams know what those values look like on an ordinary workday.",
      prompt: "Tap the ones that feel like your team.",
      art: "fading",
      pains: [
        {
          text: "Our values are on the wall, but most people can't name them.",
          theme: "values nobody can name",
          remedy: "turning each value into everyday behaviors people remember",
          single:
            "If people can't name your values, they can't live them. We'd start by turning each value into everyday behaviors your team will actually remember.",
        },
        {
          text: "People avoid hard conversations until someone quits.",
          theme: "avoided conversations",
          remedy: "practicing honest, respectful conversations",
          single:
            "Avoided conversations cost trust first, then people. We'd help your team practice honest, respectful conversations before small issues grow.",
        },
        {
          text: "Deadlines slip, and nobody owns it.",
          theme: "missed commitments",
          remedy: "building simple habits of ownership and follow-through",
          single:
            "When commitments slip without ownership, integrity quietly becomes optional. We'd build simple habits of ownership your team can use the same week.",
        },
        {
          text: "Every manager interprets our values a little differently.",
          theme: "managers reading the values differently",
          remedy: "aligning your leaders on what each value looks like",
          single:
            "When every manager reads the values differently, your culture splits by team. We'd start with your leaders, so everyone means the same thing.",
        },
        {
          text: "We did a training once. Nothing really changed.",
          theme: "training that didn't stick",
          remedy: "designing a program with practice and follow-up between sessions",
          single:
            "One-off training rarely sticks. That's why every New Adam program is built on your values, with practice and follow-up between sessions.",
        },
        {
          text: "Good people are leaving, and we're not sure why.",
          theme: "good people leaving",
          remedy: "listening first, to find where purpose and belonging break down",
          single:
            "When good people leave quietly, culture is usually part of the reason. We'd listen first, to find where purpose and belonging break down.",
        },
      ],
      responses: {
        none: "Pick any that sound like your team.",
        few: "{n} of {total}: {themes}. These usually share one root: values that never became habits. We'd start by {first}, then {then}.",
        many: "{n} of {total}: {themes}. That's a culture pattern, not a bad quarter. We'd start by {first}, then {then}.",
        all: "All {total}. You're describing a culture that's ready for a reset, and that's exactly where we do our best work. Let's start with a discovery call.",
      },
      closing:
        "It isn't a motivation problem. Your team needs practical tools, built around values they recognize as their own.",
    },
    {
      type: "comparison",
      id: "difference",
      number: "02",
      label: "Why New Adam",
      title: "Generic training teaches someone else's values.",
      intro:
        "Off-the-shelf modules are easy to buy and easy to forget. We start from what makes your company yours.",
      them: {
        label: "Generic training",
        art: "slides",
        points: [
          "The same slides for every company",
          "Inspiring for a day, forgotten in a week",
          "Examples from someone else's industry",
          "Ends when the session ends",
        ],
      },
      us: {
        label: "New Adam",
        art: "tailored",
        points: [
          "Built on your core values, mission, vision and culture",
          "Practical tools your team uses the same week",
          "Real scenarios from your own workplace",
          "Follow-up that keeps the values moving",
        ],
      },
    },
    {
      type: "process",
      id: "how-it-works",
      number: "03",
      label: "How it works",
      title: "Discover. Design. Deliver.",
      intro: "Every program is made for one company: yours.",
      steps: [
        {
          title: "Discover",
          art: "discover",
          body: "We sit down with your leaders to understand your values, mission, vision and culture, and where the gaps show up today.",
        },
        {
          title: "Design",
          art: "design",
          body: "We build a custom curriculum with scenarios, language and examples drawn from your own workplace.",
        },
        {
          title: "Deliver",
          art: "deliver",
          body: "We run engaging, practical sessions, then follow up so the new habits last beyond the training day.",
        },
      ],
    },
    {
      type: "formats",
      id: "formats",
      number: "04",
      label: "Formats",
      title: "Training that fits how your team works.",
      intro: "On-site or online, one day or a full journey. Every format is customized.",
      items: [
        {
          title: "One-day workshop",
          art: "workshop",
          body: "A focused half-day or full-day session on one or two of your core values.",
          bestFor: "Kick-offs, planning days and team building",
        },
        {
          title: "Multi-session program",
          art: "program",
          body: "A series of sessions over weeks or months, with practice between each one.",
          bestFor: "Lasting culture change",
        },
        {
          title: "Online sessions",
          art: "online",
          body: "Live, interactive virtual workshops for remote, hybrid or multi-site teams.",
          bestFor: "Teams across cities and provinces",
        },
      ],
    },
    {
      type: "outcomes",
      id: "results",
      number: "05",
      label: "Results",
      title: "What changes when values are lived.",
      items: [
        {
          title: "Values in action",
          art: "lived",
          body: "Your core values move from the wall into daily decisions and behavior.",
        },
        {
          title: "Trust and communication",
          art: "trust",
          body: "People speak up, give honest feedback and resolve conflict well.",
        },
        {
          title: "Integrity and accountability",
          art: "integrity",
          body: "Commitments are kept and work is owned, even when no one is watching.",
        },
        {
          title: "Retention and engagement",
          art: "growth",
          body: "People who see purpose in their work stay longer and give more.",
        },
      ],
    },
    {
      // Hidden until there are real clients to show.
      hidden: true,
      type: "testimonials",
      id: "testimonials",
      number: "06",
      label: "Client stories",
      title: "Leaders who made the change.",
      // PLACEHOLDER: replace with real, approved quotes.
      items: [
        {
          quote: "Client testimonial goes here: one or two sentences on the change they saw in their team.",
          name: "Client name",
          role: "Role",
          company: "Company",
        },
        {
          quote: "Client testimonial goes here: a specific before-and-after works best.",
          name: "Client name",
          role: "Role",
          company: "Company",
        },
        {
          quote: "Client testimonial goes here: mention the customized approach if they valued it.",
          name: "Client name",
          role: "Role",
          company: "Company",
        },
      ],
    },
    {
      // Hidden until there's a contact channel (no email for now).
      hidden: true,
      type: "assessment",
      id: "assessment",
      eyebrow: "No core values yet?",
      title: "Start building them today, for free.",
      body: "If your company doesn't have defined core values yet, or they no longer fit who you are, begin with a free values assessment. We'll help you see what your company already stands for at its best, and turn it into values your team can live by.",
      includes: [
        "A conversation with your leaders about your mission, vision and culture",
        "The values your company already shows at its best",
        "A first draft of your core values, with clear next steps",
      ],
      cta: FREE_ASSESSMENT,
      art: "drafting",
      note: "No cost. No obligation.",
    },
    {
      type: "foundation",
      id: "foundation",
      number: "06",
      label: "Our foundation",
      title: "Built on principles that have stood the test of time.",
      body: [
        "Our training is grounded in biblical values that have shaped good work and strong communities for centuries.",
        "We teach them in plain, practical language that welcomes people of every background, and always connect them to your company's own values. Our name says what we aim for: not just new policies, but people made new.",
      ],
      principles: ["Integrity", "Humility", "Service", "Honesty", "Respect"],
      art: "foundation",
      cta: { label: "Read our story", href: "/our-story" },
    },
    {
      // Hidden until there's a contact channel (no email for now).
      hidden: true,
      type: "booking",
      id: "book",
      number: "07",
      label: "Book",
      title: "Let's bring your values to life.",
      body: "Tell us about your team and what you want to change. We'll reply personally to set up a short discovery call.",
      primaryCta: BOOK_CALL,
      art: "booking",
      secondaryCta: { label: "Request a free assessment", href: FREE_ASSESSMENT.href },
      reassurance: ["Customized for your company", "On-site or online", "For teams across the Philippines"],
    },
    {
      type: "portfolio",
      id: "kairos",
      label: "Also from New Adam",
      name: "Kairos Events",
      body: "Wedding ceremonies with full government recognition, for couples who are ready to make their relationship official.",
      cta: { label: "Learn about Kairos Events", href: "/kairos-events" },
    },
  ],
};
