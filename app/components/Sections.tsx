"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ *
 * Design tokens (extracted from the live fullpocketcoaching.com CSS)
 *   primary  #001D40   secondary #B8860B   accent #D4AF37
 *   text     #7A7A7A   white     #FFFFFF
 * Sections alternate dark image bands with light content bands.
 * ------------------------------------------------------------------ */

/* Pre-rendered white-on-transparent versions (public/images/logos/).
   The originals are 1080x1080 canvases with a wide wordmark floating in the
   middle, so using them directly squashed the marks into squares. These are
   trimmed to the artwork and recoloured to a single white. */
const AFFILIATIONS = [
  { src: "/images/logos/WakeTech-white.png", alt: "Wake Tech" },
  { src: "/images/logos/ChiropracticPartners-white.png", alt: "Chiropractic Partners" },
  { src: "/images/logos/CarolinaFamilyVision-white.png", alt: "Carolina Family Vision" },
  { src: "/images/logos/CentralCarolinaOralSurgery-white.png", alt: "Central Carolina Oral Surgery" },
  { src: "/images/logos/HollySprings-white.png", alt: "Holly Springs" },
  { src: "/images/logos/Brentwood-white.png", alt: "Brentwood Dental" },
  { src: "/images/logos/SeattleStudyClub-white.png", alt: "Seattle Study Club" },
  { src: "/images/logos/TriangleRestorationDentistry_2-white.png", alt: "Triangle Restoration Dentistry" },
];

const PILLARS = [
  {
    n: "01",
    title: "Shift Mindset",
    body: "Marni pushes leaders to ask a different question: \u201cWhat needs to change so this stops happening?\u201d That one shift is the difference between managing tasks and building a culture where people have the clarity and ownership to solve problems themselves.",
  },
  {
    n: "02",
    title: "Equip Teams",
    body: "Frameworks your team can actually use \u2014 for performance conversations, feedback, and the honest stuff that usually turns defensive. Not the kind of thing that stays in the room once the session is over.",
  },
  {
    n: "03",
    title: "Drive Execution",
    body: "Clear priorities. Measurable goals. Ownership that's actually assigned. Check-ins that keep momentum alive instead of letting it die in week three \u2014 so execution becomes how the team works.",
  },
];

const SERVICES = [
  {
    title: "Fractional Executive Services",
    body: "Multi-session programs for organizations ready to transform culture, strengthen leadership, and create measurable change.",
    img: "/images/0912_FullPocketCoaching-Conference-157-1024x681.jpg",
  },
  {
    title: "Leadership Workshops",
    body: "Half-day or full-day training equipping teams with communication, feedback, conflict resolution, and collaborative problem-solving.",
    img: "/images/0912_FullPocketCoaching-133-681x1024.jpg",
  },
  {
    title: "Keynote Speaking",
    body: "High-impact talks for conferences, retreats, and all-staff meetings that inspire trust, accountability, and teams that execute.",
    img: "/images/0912_FullPocketCoaching-91-681x1024.jpg",
  },
];

const VALUES = [
  "Lead with Servant Heart",
  "Integrity Always",
  "Vulnerability Builds Trust",
  "Empathy & Compassion",
  "Strive to Grow or we Die",
];

function AffiliationsStrip() {
  return (
    <section className="border-y border-white/10 bg-[#00112a] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
          Clients &amp; Affiliations
        </p>
        {/* Marks now share one optical height with width free, so each
            wordmark keeps its true proportions instead of being squared off. */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
          {AFFILIATIONS.map((p) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={p.alt}
              src={p.src}
              alt={p.alt}
              className="h-10 w-auto max-w-[210px] object-contain opacity-90 transition hover:opacity-100 sm:h-11"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#001D40]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/0912_FullPocketCoaching-Conference-39-1-1024x681.jpg"
          alt="Marni Blythe speaking on stage"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001D40] via-[#001D40]/90 to-[#001D40]/35" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-6 py-24">
          <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
            Marni Blythe &middot; Speaker &amp; Fractional COO
          </p>
          <h1 className="max-w-4xl text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-[#A9C6E8] sm:text-6xl lg:text-7xl">
            Leadership that transforms people,{" "}
            <span className="text-[#D4AF37]">culture,</span> and performance
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Programs and keynotes for organizations committed to high-performing
            leadership, thriving cultures, and the human intelligence required to
            lead in a rapidly changing world.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="bg-[#D4AF37] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#001D40] transition hover:bg-[#B8860B]"
            >
              Book Marni to Speak
            </a>
            <a
              href="/contact"
              className="border border-white/40 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Download Speaker Packet
            </a>
          </div>
        </div>
      </section>
      <AffiliationsStrip />
    </>
  );
}

export function IntroSplit() {
  return (
    <section className="bg-[#F2F1EF] py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-14 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-[#001D40] sm:text-5xl">
            Build leadership &amp; culture that creates{" "}
            <span className="bg-[#D4AF37]/25 px-1">traction</span>, not chaos.
          </h2>
          <p className="mt-7 text-base leading-relaxed text-[#7A7A7A]">
            Organizations don&apos;t fail because leaders lack talent. They
            struggle because leaders lack the tools, mindset, and systems to
            translate vision into execution. Marni&apos;s keynotes and programs
            close that gap &mdash; equipping leaders to create clarity,
            strengthen accountability, and build traction that lasts.
          </p>
        </div>
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B8860B]">
            Introducing Marni
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/0912_FullPocketCoaching-125-1024x681.jpg"
            alt="Marni Blythe presenting"
            className="aspect-[3/2] w-full object-cover"
          />
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {PILLARS.map((p) => (
          <div
            key={p.n}
            className="group border-t-4 border-[#D4AF37] bg-white p-8 shadow-[0_1px_2px_rgba(0,29,64,0.06)] transition hover:shadow-[0_12px_32px_rgba(0,29,64,0.12)]"
          >
            <div className="text-5xl font-extrabold leading-none text-[#001D40]/15 transition group-hover:text-[#D4AF37]">
              {p.n}
            </div>
            <h3 className="mt-5 text-lg font-bold uppercase tracking-wide text-[#001D40]">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5c5c5c]">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesCards() {
  return (
    <section className="bg-[#001D40] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-[#A9C6E8] sm:text-5xl">
            Inspiring leaders.{" "}
            <span className="text-[#D4AF37]">Transforming</span> cultures.
          </h2>
          <a
            href="/contact"
            className="bg-[#D4AF37] px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#001D40] transition hover:bg-[#B8860B]"
          >
            Schedule a Consultation
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <a
              key={s.title}
              href="/contact"
              className="group block overflow-hidden border border-white/10 bg-[#002a5c] transition hover:border-[#D4AF37]/50"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <h3 className="text-base font-bold uppercase tracking-wide text-[#D4AF37]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {s.body}
                </p>
                <span className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37] group-hover:text-white">
                  Learn more &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ValuesMission() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.28em] text-[#001D40]">
            Core Values
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#7A7A7A]">
            At Full Pocket Coaching, we don&apos;t just build better businesses
            &mdash; we build better leaders, teams, and lives. We live and lead
            by the L.I.V.E.S. we touch, transform, and change for the better.
          </p>
          <ul className="mt-7 space-y-3">
            {VALUES.map((v) => (
              <li key={v} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#001D40]">
                  &#10003;
                </span>
                <span className="text-sm font-medium text-[#001D40]">{v}</span>
              </li>
            ))}
          </ul>
          <h2 className="mt-12 text-sm font-bold uppercase tracking-[0.28em] text-[#001D40]">
            Mission
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#7A7A7A]">
            To help visionary leaders create businesses where people thrive,
            systems run seamlessly, and growth feels intentional, not chaotic.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/0912_FullPocketCoaching-113-681x1024.jpg"
            alt="Marni Blythe"
            className="col-span-2 aspect-[16/9] w-full object-cover object-top sm:col-span-1 sm:aspect-[3/4]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/0912_FullPocketCoaching-59-681x1024.jpg"
            alt="Marni speaking"
            className="hidden aspect-[3/4] w-full object-cover object-top sm:block"
          />
        </div>
      </div>
    </section>
  );
}

export function QuoteBand() {
  return (
    <section className="bg-[#001D40] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <blockquote className="text-3xl font-extrabold uppercase leading-[1.1] tracking-tight text-[#F3F0E9] sm:text-4xl">
          &ldquo;Marni has had an incredible impact on our office culture.&rdquo;
        </blockquote>
        <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
          Dr. Brent Lelong
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/50">
          Dental Practice Owner
        </p>
      </div>
    </section>
  );
}
