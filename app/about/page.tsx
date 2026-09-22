import { PAGES } from "@/content";
import { CTABand } from "../components/Shared";

export default function AboutPage() {
  const data = PAGES["about"];
  const b = data.blocks;

  const para = (s: string) =>
    b.filter((x) => x.t === "p" && x.x.startsWith(s)).map((x) => x.x);
  const listItems = () => b.filter((x) => x.t === "li").map((x) => x.x);

  // ---- section slices, in the original's order -------------------------
  const intro = b
    .slice(0, b.findIndex((x) => x.t === "h2" && x.x === "What I Do"))
    .filter((x) => x.t === "p");
  const foundation = listItems().filter(
    (x) => /^(Mindset|Tools|Execution|Evaluation|Traction)\s*[–-]/.test(x)
  );
  const whatIDo = b
    .slice(
      b.findIndex((x) => x.t === "h2" && x.x === "What I Do"),
      b.findIndex((x) => x.x.includes("Why We Do"))
    )
    .filter((x) => x.t === "p");
  const whyWeDo = b
    .slice(
      b.findIndex((x) => x.x.includes("Why We Do")),
      b.findIndex((x) => x.t === "h2" && x.x === "About Marni Blythe")
    )
    .filter((x) => x.t === "p");
  const bio = b
    .slice(
      b.findIndex((x) => x.t === "h2" && x.x === "About Marni Blythe"),
      b.findIndex((x) => x.t === "h2" && x.x === "Speaking Topics")
    )
    .filter((x) => x.t === "p");

  // Speaking topics: four Summary/Target Outcome pairs
  const topicStart = b.findIndex((x) => x.t === "h2" && x.x === "Speaking Topics");
  const topics: { bullets: string[]; outcome: string }[] = [];
  if (topicStart >= 0) {
    let i = topicStart, cur: { bullets: string[]; outcome: string } | null = null;
    while (i < b.length && !b[i].x.toLowerCase().includes("book")) {
      const x = b[i];
      if (x.t === "h4" && /summary/i.test(x.x)) {
        if (cur) topics.push(cur);
        cur = { bullets: [], outcome: "" };
      } else if (x.t === "h4" && /target outcome/i.test(x.x)) {
        // next paragraph is the outcome
      } else if (x.t === "li" && cur) {
        cur.bullets.push(x.x);
      } else if (x.t === "p" && cur && /Target Outcome/i.test(b[i - 1]?.x ?? "")) {
        cur.outcome = x.x;
      }
      i++;
    }
    if (cur) topics.push(cur);
  }

  const TOPIC_TITLES = [
    "Bulletproof Mindset",
    "The Formula for Predictable Growth",
    "Culture by Design, Not Default",
    "Communicating with Clarity, Confidence & Compassion",
  ];

  return (
    <div>
      {/* ---------------- hero ---------------- */}
      <section className="relative isolate overflow-hidden bg-[#001D40]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/0912_FullPocketCoaching-133-681x1024.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001D40] via-[#001D40]/92 to-[#001D40]/60" />
        <div className="relative mx-auto flex min-h-[48vh] max-w-6xl flex-col justify-center px-6 py-24">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            About Marni
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">
            Meet Marni Blythe
          </h1>
          <p className="mt-6 max-w-2xl text-sm font-semibold uppercase tracking-[0.18em] text-[#A9C6E8] md:text-base">
            Keynote Speaker&nbsp;|&nbsp;Business Strategist&nbsp;|&nbsp;Fractional
            COO/CMO/Integrator
          </p>
        </div>
      </section>

      {/* ---------------- opening statement + method ---------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 className="text-2xl font-extrabold uppercase leading-tight tracking-tight text-[#001D40] md:text-3xl">
              Your Leaders Shape Your Culture.
              <br />
              Your Culture Shapes Everything.
            </h2>
            <p className="mt-6 text-lg font-semibold leading-relaxed text-[#001D40]">
              Creating Psychological Safety
            </p>
          </div>
          <div className="space-y-6">
            {intro.map((p, i) => (
              <p key={i} className="text-[1.0625rem] leading-[1.8] text-[#4a4a4a]">
                {p.x}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Full Pocket Method ---------------- */}
      {foundation.length > 0 && (
        <section className="bg-[#F2F1EF] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
              The Framework
            </p>
            <h2 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-3xl">
              The Full Pocket Method&trade;
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {foundation.map((f) => {
                const [head, ...rest] = f.split(/\s*[–-]\s*/);
                return (
                  <div
                    key={f}
                    className="border-t-4 border-[#D4AF37] bg-white p-6"
                  >
                    <h3 className="text-sm font-bold uppercase tracking-wide text-[#001D40]">
                      {head}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#5c5c5c]">
                      {rest.join(" — ")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- What I Do (text + image after) ---------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
              What I Do
            </p>
            <h2 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-3xl">
              Done Being Stuck
            </h2>
            <div className="mt-8 space-y-5">
              {whatIDo.map((p, i) => (
                <p
                  key={i}
                  className="text-[1.0625rem] leading-[1.8] text-[#4a4a4a]"
                >
                  {p.x}
                </p>
              ))}
            </div>
          </div>
          {/* original places this image after the What-I-Do prose */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/0912_FullPocketCoaching-133-681x1024.jpg"
            alt="Marni Blythe presenting"
            className="h-full max-h-[46rem] w-full border-t-4 border-[#D4AF37] object-cover object-top lg:sticky lg:top-24"
          />
        </div>
      </section>

      {/* ---------------- Why We Do What We Do ---------------- */}
      <section className="bg-[#001D40] py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.5fr]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/0912_FullPocketCoaching-71-820x1024.jpg"
            alt="Marni Blythe"
            className="h-full max-h-[44rem] w-full border-t-4 border-[#D4AF37] object-cover object-top"
          />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
              Why We Do What We Do
            </p>
            <h2 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl">
              I&apos;ve Been Where You Are
            </h2>
            <div className="mt-8 space-y-5">
              {whyWeDo.map((p, i) => (
                <p
                  key={i}
                  className="text-[1.0625rem] leading-[1.8] text-white/80"
                >
                  {p.x}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- About Marni (bio) ---------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
            Bio
          </p>
          <h2 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-3xl">
            About Marni Blythe
          </h2>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8a6a12]">
            Professional Speaker &middot; Fractional COO/CMO/Integrator &middot;
            Best Selling Author
          </p>
          <div className="mt-9 space-y-5">
            {bio.map((p, i) => (
              <p key={i} className="text-[1.0625rem] leading-[1.8] text-[#4a4a4a]">
                {p.x}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Speaking Topics ---------------- */}
      {topics.length > 0 && (
        <section className="bg-[#F2F1EF] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
              Programs
            </p>
            <h2 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-3xl">
              Speaking Topics
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {topics.map((t, i) => (
                <article
                  key={i}
                  className="border-t-4 border-[#D4AF37] bg-white p-8"
                >
                  <h3 className="text-base font-bold uppercase tracking-wide text-[#001D40]">
                    {TOPIC_TITLES[i] ?? `Topic ${i + 1}`}
                  </h3>
                  {t.bullets.length > 0 && (
                    <ul className="mt-5 space-y-3">
                      {t.bullets.map((li, k) => (
                        <li key={k} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#001D40]">
                            &#10003;
                          </span>
                          <span className="text-sm leading-relaxed text-[#4a4a4a]">
                            {li}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {t.outcome && (
                    <div className="mt-6 border-l-4 border-[#001D40] bg-[#F2F1EF] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a6a12]">
                        Target Outcome
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#4a4a4a]">
                        {t.outcome}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Book ---------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
              Bestselling Book
            </p>
            <h2 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-3xl">
              Read Marni&apos;s Bestselling Book
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.8] text-[#4a4a4a]">
              {b.find((x) => x.t === "p" && x.x.includes("Ordering books"))
                ?.x ?? ""}
            </p>
            <a
              href="/cc-book"
              className="mt-8 inline-block bg-[#D4AF37] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#001D40] transition hover:bg-[#B8860B]"
            >
              Get Your Copy
            </a>
          </div>
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Catalyst-Book-Mockup-4.png"
              alt="Culture Catalyst book"
              className="w-56 drop-shadow-[0_24px_48px_rgba(0,29,64,0.30)] md:w-72"
            />
          </div>
        </div>
      </section>

      {/* ---------------- Let's Talk ---------------- */}
      <section className="relative isolate overflow-hidden bg-[#001D40]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/0912_FullPocketCoaching-Conference-39-1-1024x681.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001D40] via-[#001D40]/90 to-[#001D40]/65" />
        <div className="relative mx-auto max-w-5xl px-6 py-24">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Start the Conversation
          </p>
          <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">
            Let&apos;s Talk
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">
            Want Marni to speak at your next event? Ready to get your team
            aligned and your business unstuck? Book a 30-minute discovery call.
            We&apos;ll discuss your challenges and see if we&apos;re a match.
          </p>
          <a
            href="/contact"
            className="mt-9 inline-block bg-[#D4AF37] px-9 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#001D40] transition hover:bg-[#B8860B]"
          >
            Schedule a Call
          </a>
        </div>
      </section>
    </div>
  );
}
