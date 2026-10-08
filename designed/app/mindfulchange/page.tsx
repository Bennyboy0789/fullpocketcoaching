import { PAGES } from "@/content";
import { CTABand, PageHero } from "../components/Shared";

/* mindfulchange alternates "Week N" -> title -> description for a 6-week
   course, plus a highlights/benefits section. */
type Week = { n: string; title: string; body: string };

function parseWeeks(blocks: { t: string; x: string }[]): Week[] {
  const out: Week[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (/^week\s*\d+/i.test(b.x)) {
      const title = blocks[i + 1]?.t === "p" ? blocks[i + 1].x : "";
      const body = blocks[i + 2]?.t === "p" ? blocks[i + 2].x : "";
      if (title) out.push({ n: b.x, title, body });
    }
  }
  return out;
}

export default function MindfulChangePage() {
  const data = PAGES["mindfulchange"];
  const weeks = parseWeeks(data.blocks);

  // Beneficial prose = paragraphs before the first "Week".
  const firstWeek = data.blocks.findIndex((b) => /^week\s*\d+/i.test(b.x));
  const intro = data.blocks
    .slice(0, firstWeek > 0 ? firstWeek : data.blocks.length)
    .filter((b) => b.t === "p" || b.t === "h3")
    .slice(0, 8);

  const benefits = data.blocks.filter((b) => b.t === "li").map((b) => b.x);

  return (
    <div>
      <PageHero
        eyebrow="Course"
        title="Mindful Change Management"
        intro="Mastering the art of adaptability in six weeks."
        image="/images/0912_FullPocketCoaching-133-681x1024.jpg"
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          {intro.map((b, i) =>
            b.t === "h3" ? (
              <h2
                key={i}
                className="mt-12 text-2xl font-extrabold uppercase tracking-tight text-[#001D40] first:mt-0"
              >
                {b.x}
              </h2>
            ) : (
              <p
                key={i}
                className="mb-6 text-[1.0625rem] leading-[1.8] text-[#4a4a4a]"
              >
                {b.x}
              </p>
            )
          )}
        </div>
      </section>

      {weeks.length > 0 && (
        <section className="bg-[#F2F1EF] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
              Curriculum
            </p>
            <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-4xl">
              Six Weeks, Step by Step
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {weeks.map((w, i) => (
                <div
                  key={i}
                  className="border-t-4 border-[#D4AF37] bg-white p-7 shadow-[0_1px_2px_rgba(0,29,64,0.06)]"
                >
                  <span className="inline-block bg-[#001D40] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                    {w.n}
                  </span>
                  <h3 className="mt-5 text-base font-bold leading-snug text-[#001D40]">
                    {w.title}
                  </h3>
                  {w.body && (
                    <p className="mt-3 text-sm leading-relaxed text-[#5c5c5c]">
                      {w.body}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {benefits.length > 0 && (
              <div className="mt-16 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 border-b border-[#001D40]/10 pb-4"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#001D40]">
                      &#10003;
                    </span>
                    <span className="text-sm leading-relaxed text-[#4a4a4a]">
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <CTABand
        title="Bring Mindful Change to Your Team"
        body="Six weeks to build resilience and make change stick."
      />
    </div>
  );
}
