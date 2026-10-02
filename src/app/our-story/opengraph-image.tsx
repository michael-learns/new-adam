import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Our story: New Adam, named for a new beginning.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ line1: "Named for", line2: "a new beginning.", footer: "The story behind New Adam" });
}
