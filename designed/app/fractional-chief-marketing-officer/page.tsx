import { PAGES } from "@/content";
import { CTABand, PageHero } from "../components/Shared";

const WHAT = [
  "Develop umbrella strategy",
  "Develop branding and design",
  "Communication strategies development",
  "Work with sales leaders to ensure consistency of messaging",
  "Liaise with key execution partners",
  "Develop KPIs",
  "Develop tracking systems",
  "Develop weekly accountability agendas",
  "High-level project management to ensure all moving pieces are coordinated and executed flawlessly",
  "Review analytics to make informed strategic decisions",
  "Maximize efforts and dollars",
  "Develop systematic approaches and core processes developed",
  "Develop Follow-up strategies with clear timelines and milestones for success",
];

const GREAT = [
  "Always operates on data and analytics",
  "Drives execution through a partnership with your internal team and external agencies",
  "Encourages resolution",
  "Focuses and unites the team to execute their mission",
];

export default function CMOPage() {
  const data = PAGES["fractional-chief-marketing-officer"];

  // The 24 "Transforms your practice..." statements are the trailing run of
  // paragraphs after the "get out of their own way" heading.
  const start = data.blocks.findIndex((b) =>
    b.x.toLowerCase().includes("get out of their own way")
  );
  const outcomes =
    start >= 0
      ? data.blocks.slice(start + 1).filter((b) => b.t === "p").map((b) => b.x)
      : [];

  const whyIdx = data.blocks.findIndex((b) =>
    b.x.toLowerCase().includes("why do i need")
  );
  const intro = data.blocks
    .slice(0, whyIdx > 0 ? whyIdx : 6)
    .filter((b) => b.t === "p" && !b.x.toLowerCase().startsWith("enter the fractional"))
    .map((b) => b.x);

  return (
    <div>
      <PageHero
        eyebrow="Fractional CMO"
        title="Turn Your Marketing from Expense to Revenue Driver"
        intro="Executive-level marketing leadership without a full-time salary."
        image="/images/0912_FullPocketCoaching-125-1024x681.jpg"
      />

      {/* the problem */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
            Sound Familiar?
          </p>
          <h2 className="mt-4 text-3xl font-extrabold uppercase leading-tight tracking-tight text-[#001D40] md:text-4xl">
            It&apos;s Time to Grow
          </h2>
          <div className="mt-8 space-y-6">
            {intro.map((p, i) => (
              <p
                key={i}
                className="text-[1.0625rem] leading-[1.8] text-[#4a4a4a]"
              >
                {p}
              </p>
            ))}
          </div>
          <div className="mt-10 border-l-4 border-[#D4AF37] bg-[#F2F1EF] p-8">
            <p className="text-xl font-semibold leading-relaxed text-[#001D40] md:text-2xl">
              Enter the Fractional CMO.
            </p>
          </div>
        </div>
      </section>

      {/* what they do */}
      <section className="bg-[#F2F1EF] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
            The Role
          </p>
          <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-4xl">
            What Fractional CMOs Do
          </h2>

          <div className="mt-12 grid gap-x-10 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
            {WHAT.map((w, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border-b border-[#001D40]/10 pb-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#001D40]">
                  &#10003;
                </span>
                <span className="text-sm leading-relaxed text-[#4a4a4a]">
                  {w}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t-4 border-[#001D40] bg-white p-8 md:p-10">
            <h3 className="text-base font-bold uppercase tracking-wide text-[#001D40]">
              A Great Fractional CMO
            </h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {GREAT.map((g) => (
                <li key={g} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#001D40] text-[10px] font-bold text-[#D4AF37]">
                    &#10003;
                  </span>
                  <span className="text-sm leading-relaxed text-[#4a4a4a]">
                    {g}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* outcomes */}
      {outcomes.length > 0 && (
        <section className="bg-[#001D40] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
              What You Get
            </p>
            <h2 className="mt-4 max-w-3xl text-2xl font-extrabold uppercase leading-tight tracking-tight text-white md:text-3xl">
              Helping Visionary Owners Get Out of Their Own Way
            </h2>

            <div className="mt-12 grid gap-x-10 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
              {outcomes.map((o, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]"
                  />
                  <span className="text-sm leading-relaxed text-white/80">
                    {o}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* partners */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
            Why Full Pocket
          </p>
          <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-4xl">
            Objective and Experienced Partners
          </h2>
          <div className="mt-8 space-y-6">
            {data.blocks
              .filter(
                (b) =>
                  b.t === "p" &&
                  (b.x.includes("marketing moves faster") ||
                    b.x.includes("isn\u2019t a luxury") ||
                    b.x.includes("isn't a luxury") ||
                    b.x.includes("Accountability and Measurable") ||
                    b.x.includes("years of successful experience"))
              )
              .map((b, i) => (
                <p
                  key={i}
                  className="text-[1.0625rem] leading-[1.8] text-[#4a4a4a]"
                >
                  {b.x}
                </p>
              ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to Make Marketing Pay for Itself?"
        body="Book a discovery call and we'll audit where your marketing dollars are actually going."
      />
    </div>
  );
}
