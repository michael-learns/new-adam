import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Weddings by New Adam: You've built a life together. Now make it official.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    line1: "You've built a life together.",
    line2: "Now make it official.",
    footer: "Weddings · Government-recognized ceremonies",
  });
}
