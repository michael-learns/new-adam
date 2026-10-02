import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Link } from "@/content/types";

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`} {...props} />;
}

/** Small "01 / Why" marker that keeps the page's linear order visible. */
export function SectionLabel({
  number,
  children,
  tone = "light",
}: {
  number?: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-medium tracking-wide ${
        tone === "light" ? "text-ink-soft" : "text-white/80"
      }`}
    >
      <span aria-hidden className="size-2 rounded-full bg-orange" />
      {number && <span className="tabular-nums">{number}</span>}
      {number && <span aria-hidden>/</span>}
      <span>{children}</span>
    </p>
  );
}

const buttonStyles = {
  primary: "bg-royal text-white hover:bg-royal-deep",
  secondary: "text-ink ring-1 ring-ink/15 ring-inset hover:bg-ink/5",
  onBlue: "bg-white text-royal hover:bg-mist",
  ghostDark: "text-white ring-1 ring-white/20 ring-inset hover:bg-white/10",
} as const;

export function Button({
  link,
  variant = "primary",
  className = "",
}: {
  link: Link;
  variant?: keyof typeof buttonStyles;
  className?: string;
}) {
  const classes = `group/btn inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-base font-semibold transition-[background-color,transform] duration-200 active:scale-[0.98] ${buttonStyles[variant]} ${className}`;
  const content = (
    <>
      {link.label}
      {variant !== "secondary" && variant !== "ghostDark" && (
        <svg aria-hidden viewBox="0 0 16 16" className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  // Other pages on this site navigate client-side; anchors and mailto stay plain links.
  return link.href.startsWith("/") ? (
    <NextLink href={link.href} className={classes}>
      {content}
    </NextLink>
  ) : (
    <a href={link.href} className={classes}>
      {content}
    </a>
  );
}

/** Cropped arch: the brand's supporting shape. Keep away from reading areas. */
export function Arch({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 240" className={className} fill="none">
      <path d="M20 240V100a80 80 0 0 1 160 0v140" stroke="currentColor" strokeWidth="40" />
    </svg>
  );
}

/** Ring: the brand's circle accent, from the bowl of the a. */
export function Ring({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={className} fill="none">
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="34" />
    </svg>
  );
}

/** Label + h2 (+ optional intro) used at the top of every numbered section. */
export function SectionHeading({
  id,
  number,
  label,
  title,
  intro,
  tone = "light",
  className = "",
}: {
  id: string;
  number?: string;
  label: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`reveal max-w-3xl ${className}`}>
      <SectionLabel number={number} tone={tone}>
        {label}
      </SectionLabel>
      <h2 id={`${id}-title`} className="mt-5 text-[2.9rem] leading-[1.02] sm:text-7xl">
        {title}
      </h2>
      {intro && (
        <p className={`mt-6 text-xl leading-relaxed ${tone === "light" ? "text-ink-soft" : "text-white/80"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={className} fill="none">
      <path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={className} fill="none">
      <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
