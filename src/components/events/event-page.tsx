import Image from "next/image";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/logo";
import type { EventDetails } from "@/content/events/types";
import { peso } from "@/lib/event-pricing";
import {
  ApprovalBox,
  ClickTracker,
  CountdownBar,
  EarlyBirdOnly,
  EarlyBirdProvider,
  PriceNow,
  RateRow,
  SeatPicker,
  SeatsProvider,
  SeatsText,
  FloatingRegister,
  StickyDock,
} from "./event-client";
import { PayStructureChart, PayrollChart } from "./payroll-chart";
import "./event.css";

/** Renders "[label](href)" links inside plain content strings. */
function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    parts.push(text.slice(last, m.index));
    const external = m[2].startsWith("http");
    parts.push(
      <a key={m.index} href={m[2]} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
        {m[1]}
      </a>,
    );
    last = (m.index ?? 0) + m[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

/** Underlines `highlight` inside `text` with the orange marker. */
function Marked({ text, highlight }: { text: string; highlight: string }) {
  const i = text.lastIndexOf(highlight);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark>{highlight}</mark>
      {text.slice(i + highlight.length)}
    </>
  );
}

export function EventPage({
  event,
  url,
  earlyBirdAtBuild,
  renderedAt,
  payOnline,
}: {
  event: EventDetails;
  url: string;
  earlyBirdAtBuild: boolean;
  /** When the server rendered the page; the countdown starts from here until the browser takes over. */
  renderedAt: number;
  /** Whether online payment (PayMongo) is set up on the server. */
  payOnline: boolean;
}) {
  const { hero, problem, outcomes, modules, speaker, audience, pricing, faq, final, schedule, prices } = event;
  const groups = [...prices.groups].sort((a, b) => a.minSeats - b.minSeats);
  const groupLine = groups.map((g) => `${peso(g.price)} each for ${g.minSeats}+`).join(", ");
  // Modules are numbered straight through both parts (01–10).
  const partStarts = modules.parts.map((_, i) =>
    modules.parts.slice(0, i).reduce((sum, part) => sum + part.items.length, 0),
  );

  return (
    <EarlyBirdProvider endsAt={schedule.earlyBirdEndsAt} serverValue={earlyBirdAtBuild}>
      <SeatsProvider slug={event.slug} total={event.seats}>
        <div className="ev">
          <ClickTracker />

          <div className="ev-head">
            <CountdownBar event={event} serverNow={renderedAt} />
            <nav className="nav" aria-label="Main">
              <div className="wrap">
                <a className="brand" href="#top" aria-label={`${event.name}, back to top`}>
                  <Logo layout="symbol" title="New Adam" />
                  <span>{event.name}</span>
                </a>
                <div className="nav-links">
                  {event.navLinks.map((l) => (
                    <a key={l.href} href={l.href}>
                      {l.label}
                    </a>
                  ))}
                </div>
                <a className="btn btn-sun" href={`#${pricing.id}`} data-track="nav_cta">
                  Register now
                </a>
              </div>
            </nav>
          </div>

          <main id="top">
            {/* Hero: the blue cover */}
            <header className={`hero${hero.chart ? " has-chart" : ""}`}>
              <div className="wrap">
                <div className={hero.chart ? "hero-grid" : undefined}>
                  <div>
                    <h1>{hero.title}</h1>
                    <span className="h1b">
                      <Marked text={hero.kicker} highlight={hero.highlight} />
                    </span>
                    <p className="sub">{hero.lead}</p>
                    <div className="cta-row">
                      <a className="btn btn-sun" href={`#${pricing.id}`} data-track="hero_cta">
                        Register now · <PriceNow event={event} />
                      </a>
                      <a className="btn btn-ghost" href={hero.secondaryCta.href}>
                        {hero.secondaryCta.label}
                      </a>
                    </div>
                    <a className="hero-speaker" href={`#${speaker.id}`} data-track="hero_speaker">
                      <Image src={speaker.photo.src} alt="" width={112} height={112} sizes="56px" />
                      <span>
                        <small>Your coach</small>
                        <b>{speaker.name}</b>
                        <span>{speaker.role}</span>
                      </span>
                    </a>
                  </div>
                  {hero.chart && <PayrollChart chart={hero.chart} />}
                </div>
                <div className="facts">
                  {hero.facts.map((f) => (
                    <div key={f.value}>
                      <b>{f.seats ? <SeatsText short /> : f.value}</b>
                      {f.label}
                    </div>
                  ))}
                </div>
              </div>
            </header>

            {/* Modules */}
            <section className="sec" id={modules.id} aria-labelledby="h-path">
              <div className="wrap">
                <div className="sec-head">
                  <span className="eyebrow">{modules.eyebrow}</span>
                  <h2 id="h-path">{modules.title}</h2>
                  <p className="lead">{modules.lead}</p>
                </div>
                <div className="mods">
                  {modules.parts.map((part, p) => (
                    <div key={part.label} className="part">
                      <h3>
                        <span>{part.label}</span>
                        {part.title}
                      </h3>
                      <ol className="steps">
                        {part.items.map((item, i) => (
                          <li key={item.title}>
                            <span>{String(partStarts[p] + i + 1).padStart(2, "0")}</span>
                            <b>
                              {item.title}
                              {item.core && <span className="core">Core</span>}
                            </b>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
                <div className="mods-cta">
                  <a className="btn btn-sun" href={`#${pricing.id}`} data-track="modules_cta">
                    Register now · <PriceNow event={event} /> <span aria-hidden>→</span>
                  </a>
                  <p>
                    <b>
                      <SeatsText />
                    </b>{" "}
                    · {schedule.dateLabel} · {event.venue.shortLabel}, {event.venue.city.replace(" City", "")}
                  </p>
                </div>
              </div>
            </section>

            {/* Coach */}
            <section className="sec" id={speaker.id} aria-labelledby="h-speaker">
              <div className="wrap">
                <div className="speaker">
                  <div className="sp-photo">
                    <Image
                      src={speaker.photo.src}
                      alt={speaker.name}
                      width={speaker.photo.width}
                      height={speaker.photo.height}
                      sizes="(max-width: 640px) 100vw, 400px"
                    />
                  </div>
                  <div>
                    <span className="eyebrow">{speaker.eyebrow}</span>
                    <h2 id="h-speaker" style={{ marginTop: 14 }}>
                      {speaker.name}
                    </h2>
                    <p className="sp-role">{speaker.role}</p>
                    <div className="sp-body">
                      {speaker.body.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Problem */}
            <section className="sec" aria-labelledby="h-problem">
              <div className="wrap">
                <div className="sec-head">
                  <span className="eyebrow">{problem.eyebrow}</span>
                  <h2 id="h-problem">{problem.title}</h2>
                </div>
                <div className="quotes">
                  {problem.quotes.map((q) => (
                    <blockquote key={q.quote} className="quote">
                      <p>{q.quote}</p>
                      <span>{q.context}</span>
                    </blockquote>
                  ))}
                </div>
                <p className="turn">
                  {problem.turn} <em>{problem.turnEmphasis}</em>
                </p>
              </div>
            </section>

            {/* What you take home */}
            <section className="sec" id={outcomes.id} aria-labelledby="h-build">
              <div className="wrap">
                <div className="sec-head">
                  <span className="eyebrow">{outcomes.eyebrow}</span>
                  <h2 id="h-build">{outcomes.title}</h2>
                  <p className="lead">{outcomes.lead}</p>
                </div>
                <div className="take">
                  <PayStructureChart title={outcomes.chartTitle} tag={outcomes.chartTag} caption={outcomes.chartCaption} />
                  <ol className="list">
                    {outcomes.items.map((item) => (
                      <li key={item.title}>
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <p className="plus">
                  <b>Also included:</b> {outcomes.included}
                </p>
              </div>
            </section>

            {/* Who */}
            <section className="sec" aria-labelledby="h-who">
              <div className="wrap">
                <div className="sec-head">
                  <span className="eyebrow">{audience.eyebrow}</span>
                  <h2 id="h-who">{audience.title}</h2>
                </div>
                <p className="roles">{audience.roles}</p>
                <div className="fit">
                  <div className="yes">
                    <h3>This is for you if…</h3>
                    <ul>
                      {audience.yes.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="no">
                    <h3>It&apos;s not for you if…</h3>
                    <ul>
                      {audience.no.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Rates and registration */}
            <section className="sec" id={pricing.id} aria-labelledby="h-seat">
              <div className="wrap">
                <div className="sec-head">
                  <span className="eyebrow">{pricing.eyebrow}</span>
                  <h2 id="h-seat">{pricing.title}</h2>
                  <EarlyBirdOnly>
                    <p className="lead">
                      Early bird is <b>{peso(prices.earlyBird)}</b> until <b>{schedule.earlyBirdLabel}</b>. After that it&apos;s{" "}
                      {peso(prices.regular)}.
                    </p>
                  </EarlyBirdOnly>
                  <EarlyBirdOnly after>
                    <p className="lead">
                      Regular rate is {peso(prices.regular)}. Group rates still apply: {groupLine}.
                    </p>
                  </EarlyBirdOnly>
                </div>

                <SeatPicker event={event} payOnline={payOnline} />

                <div className="rates">
                  <div>
                    <table aria-label="Rates per seat">
                      <tbody>
                        <RateRow kind="early">
                          <td>
                            <b>Early bird</b>
                            <small>Until {schedule.earlyBirdShort}</small>
                          </td>
                          <td>{peso(prices.earlyBird)}</td>
                        </RateRow>
                        <RateRow kind="regular">
                          <td>
                            <b>Regular</b>
                            <small>From {schedule.earlyBirdShort}</small>
                          </td>
                          <td>{peso(prices.regular)}</td>
                        </RateRow>
                        {groups.map((g) => (
                          <RateRow key={g.minSeats} kind="group">
                            <td>
                              <b>Group of {g.minSeats}+</b>
                              <small>Any time · per person</small>
                            </td>
                            <td>{peso(g.price)}</td>
                          </RateRow>
                        ))}
                      </tbody>
                    </table>
                    <p className="rates-foot">{pricing.footnote}</p>
                  </div>
                  <div className="inc">
                    <h4>Every seat includes</h4>
                    <ul>
                      {pricing.included.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <ApprovalBox event={event} url={url} />
              </div>
            </section>

            {/* FAQ */}
            <section className="sec" id={faq.id} aria-labelledby="h-faq">
              <div className="wrap">
                <div className="sec-head">
                  <span className="eyebrow">{faq.eyebrow}</span>
                  <h2 id="h-faq">{faq.title}</h2>
                </div>
                <div className="faq">
                  {faq.items.map((item) => (
                    <details key={item.q}>
                      <summary>{item.q}</summary>
                      <div className="a">
                        {item.a.map((p, i) => (
                          <p key={i}>
                            <RichText text={p} />
                          </p>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* Final call to action */}
            <section className="sec final" aria-labelledby="h-final">
              <div className="wrap">
                <h2 id="h-final">
                  {final.title} <em>{final.emphasis}</em>
                </h2>
                <p className="lead">
                  {schedule.dateLabel} · {event.venue.name}, {event.venue.city.replace(" City", "")} · <SeatsText />
                </p>
                <div className="cta-row">
                  <a className="btn btn-sun" href={`#${pricing.id}`} data-track="final_cta">
                    Register now · <PriceNow event={event} />
                  </a>
                </div>
                <EarlyBirdOnly>
                  <p className="deadline">
                    <b>Early bird</b> ends {schedule.earlyBirdLabel}.
                  </p>
                </EarlyBirdOnly>
                <EarlyBirdOnly after>
                  {groups[0] && (
                    <p className="deadline">
                      Groups of {groups[0].minSeats}+ pay {peso(groups[0].price)} each.
                    </p>
                  )}
                </EarlyBirdOnly>
              </div>
            </section>
          </main>

          <footer>
            <div className="wrap">
              <div className="f-brand">
                <Logo layout="stacked" title="New Adam" />
              </div>
              <div>
                <b>{event.name}</b>
                <br />
                {schedule.dateLabel}, {schedule.startsAt.slice(0, 4)} · {event.venue.name}, {event.venue.city}
                <br />
                Presented by {event.organizer.presentedBy} · Organized by {event.organizer.organizedBy}
              </div>
              <div>
                <b>Event Secretariat</b>
                <br />
                {event.secretariat.name}
                <br />
                <a href={`tel:${event.secretariat.phone}`}>{event.secretariat.phoneLabel}</a> · call, text or Viber
              </div>
            </div>
          </footer>

          <FloatingRegister event={event} />
          <StickyDock event={event} />
        </div>
      </SeatsProvider>
    </EarlyBirdProvider>
  );
}

