import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "New Adam: Lives change when values are lived.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    line1: "Lives change",
    line2: "when values are lived.",
    footer: "Values Formation · Weddings",
  });
}
