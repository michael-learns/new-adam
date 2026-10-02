import type { PathsSection } from "./types";

/** The two programs, as shown on the home and story pages. */
export const programs: PathsSection["items"] = [
  {
    eyebrow: "For your company",
    name: "Values Formation",
    title: "Turn your company values into everyday behavior.",
    body: "Custom training built on your company's own core values, mission, vision and culture.",
    points: [
      "Workshops, programs and online sessions",
      "Built on your values, not a generic module",
      "A free assessment if you don't have core values yet",
    ],
    cta: { label: "Explore Values Formation", href: "/values-formation" },
    art: "team",
  },
  {
    eyebrow: "For your relationship",
    name: "Kairos Events",
    title: "Make your relationship official, with dignity.",
    body: "Wedding ceremonies with full government recognition, for couples who live together and are ready to make it official.",
    points: ["A meaningful ceremony", "Full government recognition", "A fresh start for your family"],
    cta: { label: "Explore Kairos Events", href: "/kairos-events" },
    art: "couple",
  },
];
