import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Values Formation by New Adam: Your core values are on the wall. Are they in your team?";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    line1: "Your core values are on the wall.",
    line2: "Are they in your team?",
    footer: "Values Formation for companies",
  });
}
