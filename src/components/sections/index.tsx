import type { Section } from "@/content/types";
import { Assessment } from "./assessment";
import { Booking } from "./booking";
import { BrandHero } from "./brand-hero";
import { Comparison } from "./comparison";
import { Formats } from "./formats";
import { Foundation } from "./foundation";
import { Hero } from "./hero";
import { Kairos } from "./kairos";
import { KairosHero } from "./kairos-hero";
import { Mark } from "./mark";
import { Mission } from "./mission";
import { Outcomes } from "./outcomes";
import { Paths } from "./paths";
import { Portfolio } from "./portfolio";
import { Problem } from "./problem";
import { Process } from "./process";
import { Proof } from "./proof";
import { StoryHero } from "./story-hero";
import { Testimonials } from "./testimonials";

/** Maps each content section to its component. Add new section types here. */
export function SectionRenderer({ section }: { section: Section }) {
  switch (section.type) {
    case "hero":
      return <Hero section={section} />;
    case "proof":
      return <Proof section={section} />;
    case "problem":
      return <Problem section={section} />;
    case "comparison":
      return <Comparison section={section} />;
    case "process":
      return <Process section={section} />;
    case "formats":
      return <Formats section={section} />;
    case "outcomes":
      return <Outcomes section={section} />;
    case "testimonials":
      return <Testimonials section={section} />;
    case "assessment":
      return <Assessment section={section} />;
    case "foundation":
      return <Foundation section={section} />;
    case "booking":
      return <Booking section={section} />;
    case "portfolio":
      return <Portfolio section={section} />;
    case "brandHero":
      return <BrandHero section={section} />;
    case "mission":
      return <Mission section={section} />;
    case "paths":
      return <Paths section={section} />;
    case "kairos":
      return <Kairos section={section} />;
    case "kairosHero":
      return <KairosHero section={section} />;
    case "storyHero":
      return <StoryHero section={section} />;
    case "mark":
      return <Mark section={section} />;
  }
}
