import { PAGES } from "@/content";
import { BlockList } from "../components/Blocks";
import { CTABand, PageHero } from "../components/Shared";

/* The keynote page opens with the 4 named programs as h3s, then a long
   "keynotes, breakout sessions & Workshops" section, then a client list. */
const PROGRAMS = [
  {
    title: "Culture by Design, Not by Default",
    body: "Intentional culture work \u2014 how daily behaviors shape outcomes, and the small shifts that change a team.",
    img: "/images/0912_FullPocketCoaching-125-1024x681.jpg",
  },
  {
    title: "Human Intelligence in an AI World",
    body: "Preserving trust, emotional intelligence, and human connection while technology reshapes the workplace.",
    img: "/images/0912_FullPocketCoaching-Conference-39-1-1024x681.jpg",
  },
  {
    title: "The Formula for Predictable Growth",
    body: "Turning vision into execution with clear priorities, assigned ownership, and check-ins that hold.",
    img: "/images/0912_FullPocketCoaching-Conference-157-1024x681.jpg",
  },
  {
    title: "Navigating High-Stakes Conversations",
    body: "Frameworks for feedback, conflict, and the honest conversations teams usually avoid.",
    img: "/images/0912_FullPocketCoaching-133-681x1024.jpg",
  },
];

const TOPICS = [
  "Culture by design. not by default",
  "Human Intelligence in an AI World",
  "the formula for predictable growth",
  "Navigating high stakes conversations",
];

export default function KeynotePage() {
  const data = PAGES["keynote-speaker"];

  // Pull the client list (the run of `li` blocks after "Presentations")
  const presIdx = data.blocks.findIndex(
    (b) => b.x.toLowerCase().replace(/s$/, "") === "presentation"
  );
  const clients =
    presIdx >= 0
      ? data.blocks.filter((b, i) => i > presIdx && b.t === "li").map((b) => b.x)
      : [];

  // Body prose = the paragraphs/lists before the Presentations list.
  const bodyBlocks = data.blocks
    .slice(0, presIdx >= 0 ? presIdx : data.blocks.length)
    .filter((b) => !(b.t === "h3" && TOPICS.includes(b.x)))
    .filter((b) => b.t !== "h2" || b.x.length > 40);

  return (
    <div>
      <PageHero
        eyebrow="Keynote Speaking"
        title="Build Leaders Who Elevate Performance, Strengthen Culture, and Create Results That Last"
        intro="Talks that create change, not just inspiration."
        image="/images/0912_FullPocketCoaching-Conference-39-1-1024x681.jpg"
      />

      {/* programs */}
      <section className="bg-[#F2F1EF] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
            Signature Programs
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold uppercase leading-tight tracking-tight text-[#001D40] md:text-4xl">
            Keynotes, Breakout Sessions &amp; Workshops
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PROGRAMS.map((p) => (
              <article
                key={p.title}
                className="group overflow-hidden border-t-4 border-[#D4AF37] bg-white transition hover:shadow-[0_12px_32px_rgba(0,29,64,0.12)]"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-base font-bold uppercase tracking-wide text-[#001D40]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5c5c5c]">
                    {p.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* prose */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <BlockList blocks={bodyBlocks} />
        </div>
      </section>

      {/* clients */}
      {clients.length > 0 && (
        <section className="bg-[#001D40] py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
              Where Marni Has Spoken
            </p>
            <h2 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl">
              Presentations
            </h2>
            <ul className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {clients.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 border-b border-white/10 pb-3 text-sm text-white/80"
                >
                  <span
                    aria-hidden
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTABand
        title="Book Marni for Your Next Event"
        body="Keynotes, breakout sessions, and workshops tailored to your organization."
      />
    </div>
  );
}
