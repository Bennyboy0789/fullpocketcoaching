"use client";

/* Shared building blocks used across the site's inner pages. */

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
  align?: "left" | "center";
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#001D40]">
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001D40] via-[#001D40]/92 to-[#001D40]/55" />
        </>
      )}
      <div
        className={`relative mx-auto max-w-6xl px-6 py-20 md:py-28 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        {eyebrow && (
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
            {eyebrow}
          </p>
        )}
        <h1
          className={`text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-5xl ${
            align === "center" ? "mx-auto max-w-4xl" : "max-w-3xl"
          }`}
        >
          {title}
        </h1>
        {intro && (
          <p
            className={`mt-6 text-base leading-relaxed text-white/80 md:text-lg ${
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function CTABand({
  title = "Let's Talk",
  body = "Want Marni to speak at your next event? Ready to get your team aligned and your business unstuck? Book a 30-minute discovery call.",
  primary = { label: "Schedule a Call", href: "/contact" },
  secondary,
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-[#001D40] py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-extrabold uppercase leading-tight tracking-tight text-white md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75">
          {body}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a
            href={primary.href}
            className="bg-[#D4AF37] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#001D40] transition hover:bg-[#B8860B]"
          >
            {primary.label}
          </a>
          {secondary && (
            <a
              href={secondary.href}
              className="border border-white/40 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              {secondary.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function ServiceGrid({
  items,
}: {
  items: { title: string; body: string; href: string; img?: string }[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <a
          key={s.title}
          href={s.href}
          className="group flex flex-col border-t-4 border-[#D4AF37] bg-white p-8 shadow-[0_1px_2px_rgba(0,29,64,0.06)] transition hover:shadow-[0_12px_32px_rgba(0,29,64,0.12)]"
        >
          <h3 className="text-base font-bold uppercase tracking-wide text-[#001D40]">
            {s.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5c5c5c]">
            {s.body}
          </p>
          <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37] group-hover:text-[#B8860B]">
            Learn more &rarr;
          </span>
        </a>
      ))}
    </div>
  );
}
