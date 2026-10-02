import { programs } from "./programs";
import type { Page } from "./types";
import { site } from "./site";

const mailto = (subject: string) => `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}`;

/** Our story: where the name, the mark and the mission come from. */
export const ourStory: Page = {
  slug: "/our-story",
  seo: {
    title: "Our story | Named for a new beginning | New Adam",
    description:
      "Why we're called New Adam, what our logo means, and the biblical values behind our programs: Values Formation for companies and Kairos Events for couples.",
  },
  sections: [
    {
      type: "storyHero",
      id: "top",
      eyebrow: "Our story",
      title: ["Named for", "a new beginning."],
      highlight: "a new beginning.",
      lead: "New Adam exists to transform lives through values and culture. Here's where our name, our mark and our mission come from.",
      primaryCta: { label: "Explore our programs", href: "#programs" },
      secondaryCta: { label: "The meaning of our logo", href: "#mark" },
      art: "foundation",
    },
    {
      type: "mission",
      id: "name",
      number: "01",
      label: "The name",
      title: "The name",
      statement: "The Bible calls Christ the last Adam: the beginning of a new humanity.",
      body: "That's where our name comes from (1 Corinthians 15:45), and it's the change we hope for in every person we serve: not just new policies or new habits, but a new way of living. Our faith tagline, “I am a new creation”, is inspired by 2 Corinthians 5:17.",
    },
    {
      type: "mark",
      id: "mark",
      number: "02",
      label: "The mark",
      title: "Our logo tells the same story.",
      intro: "Two simple shapes, one story of a new beginning.",
      points: [
        {
          title: "The entrance",
          body: "The blue arch is the open tomb. It forms the n, and reminds us the way through is already open.",
        },
        {
          title: "The stone",
          body: "The orange a overlaps the entrance, like the stone rolled aside. What once closed the door now marks a new start.",
        },
      ],
    },
    {
      type: "foundation",
      id: "values",
      number: "03",
      label: "What we believe",
      title: "Grounded in biblical values.",
      body: [
        "Our programs are grounded in biblical values that have shaped good work, strong families and healthy communities for centuries.",
        "We teach them in plain, practical language that welcomes people of every background, and always connect them to everyday life: the meeting, the deadline, the dinner table.",
      ],
      principles: ["Integrity", "Humility", "Service", "Faithfulness", "Love"],
      art: "growth",
    },
    {
      type: "paths",
      id: "programs",
      number: "04",
      label: "How we live it out",
      title: "Two ways we help lives change.",
      intro: "Two programs, one aim: lives changed by lived values.",
      items: programs,
    },
    {
      type: "booking",
      id: "begin",
      number: "05",
      label: "Begin",
      title: "Ready for a new beginning?",
      body: "Tell us whether it's for your team or your relationship, and we'll reply personally.",
      primaryCta: { label: "Book training for your team", href: mailto("Values Formation inquiry") },
      secondaryCta: { label: "Ask about Kairos Events", href: mailto("Kairos Events inquiry") },
      reassurance: ["Across the Philippines", "On-site or online training", "Personal replies"],
      art: "booking",
    },
  ],
};
