import { PAGES } from "@/content";
import { CTABand, PageHero } from "../components/Shared";

const GLUE = [
  "Act as Glue for the Practice",
  "Tie-Breaker for the Leadership Team",
  "Provide Structure and Predictability",
  "Drives Excellence for P&L Results",
  "Drives Execution for the Details Within the Business Plan",
];

const GREAT = [
  "Operates on Sound Logic",
  "Drives Execution",
  "Encourages Resolution",
  "Focuses and Unites the Team to Execute Their Mission",
];

const CATEGORIES = [
  "Focus & Vision Building",
  "Core Values",
  "Mission",
  "Niche",
  "Annual Revenue Plan",
  "Annual and Quarterly Priorities",
  "Tracking Scorecard",
  "Unique Selling Proposition",
  "Mindset and EQ Coaching",
];

const BENEFITS = [
  "Gaining massive traction almost immediately once your business is in line with your Values, Mission and Niche.",
  "Your priorities will become extremely clear. No more wasted time and stress for short or long-term planning.",
  "Making decisions based on facts as well as intuition and experience. Tracking in all categories is what creates magic in your growth.",
  "Turn-key your business systems for more time freedom!",
  "As the Visionary of your company, you can dream again. You decide, and we help you work to make it happen.",
];

const DELIVERABLES = [
  "Turn-key systems",
  "Process documentation",
  "Accountability charting",
  "Profit strategies",
  "Leadership team relationship management",
  "Emotional intelligence and growth mindset training",
  "Structured weekly meeting facilitation",
  "Establishing weekly and monthly metrics tracking",
  "Establishing key priorities",
  "Solving issues once and for all",
  "Leveraging existing resources",
  "A personal plan for profitability and growth",
  "Working smarter, not harder",
  "Team productivity and efficiency",
  "Results-driven strategies",
  "A fun, loyal work culture",
  "Finding the \u201chidden money\u201d in your business",
  "A plan for short and long term goals",
  "Online and offline strategies",
];

/* The proven process is a long run of `li` grouped by phase. The source has
   no phase headings, so group into readable chunks in the order given. */
function parseProcess(blocks: { t: string; x: string }[]) {
  const start = blocks.findIndex((b) =>
    b.x.toLowerCase().includes("proven process")
  );
  if (start < 0) return [];
  const items = blocks.slice(start + 1).filter((b) => b.t === "li").map((b) => b.x);
  const phases: { label: string; items: string[] }[] = [];
  const size = Math.ceil(items.length / 4);
  const labels = ["Diagnose", "Build", "Execute", "Transition"];
  for (let i = 0; i < 4; i++) {
    const chunk = items.slice(i * size, (i + 1) * size);
    if (chunk.length) phases.push({ label: labels[i], items: chunk });
  }
  return phases;
}

export default function FCOOPage() {
  const data = PAGES["fractional-chief-operating-officer"];
  const phases = parseProcess(data.blocks);

  // opening narrative = the paragraphs before "Why Do I Need"
  const whyIdx = data.blocks.findIndex((b) =>
    b.x.toLowerCase().includes("why do i need")
  );
  const intro = data.blocks
    .slice(0, whyIdx > 0 ? whyIdx : 6)
    .filter((b) => b.t === "p")
    .map((b) => b.x);

  return (
    <div>
      <PageHero
        eyebrow="Fractional Integrator & COO"
        title="The Operational Partner Who Gets You Unstuck"
        intro="Embedded operational leadership that turns priorities into systems your team can actually run."
        image="/images/0912_FullPocketCoaching-Conference-157-1024x681.jpg"
      />

      {/* the problem */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
            Sound Familiar?
          </p>
          <h2 className="mt-4 text-3xl font-extrabold uppercase leading-tight tracking-tight text-[#001D40] md:text-4xl">
            You&apos;ve Hit the Ceiling
          </h2>
          <div className="mt-8 space-y-6">
            {intro.slice(0, 2).map((p, i) => (
              <p
                key={i}
                className="text-[1.0625rem] leading-[1.8] text-[#4a4a4a]"
              >
                {p}
              </p>
            ))}
          </div>

          <blockquote className="my-10 border-l-4 border-[#D4AF37] bg-[#F2F1EF] p-8 text-xl font-semibold leading-relaxed text-[#001D40] md:text-2xl">
            It&apos;s called hitting the ceiling &mdash; and it&apos;s usually
            because your founding leadership team has never run a practice this
            size before.
          </blockquote>

          <div className="space-y-6">
            {intro.slice(2).map((p, i) => (
              <p
                key={i}
                className="text-[1.0625rem] leading-[1.8] text-[#4a4a4a]"
              >
                {p}
              </p>
            ))}
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
            What Fractional Integrators Do Best
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="border-t-4 border-[#D4AF37] bg-white p-8">
              <h3 className="text-base font-bold uppercase tracking-wide text-[#001D40]">
                Day to Day
              </h3>
              <ul className="mt-6 space-y-4">
                {GLUE.map((g) => (
                  <li key={g} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#001D40]">
                      &#10003;
                    </span>
                    <span className="text-sm leading-relaxed text-[#4a4a4a]">
                      {g}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t-4 border-[#001D40] bg-white p-8">
              <h3 className="text-base font-bold uppercase tracking-wide text-[#001D40]">
                A Great Integrator
              </h3>
              <ul className="mt-6 space-y-4">
                {GREAT.map((g) => (
                  <li key={g} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#001D40]">
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
        </div>
      </section>

      {/* categories */}
      <section className="bg-[#001D40] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
            Objective &amp; Experienced Partners
          </p>
          <h2 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl">
            The Categories We Work Through Together
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <span
                key={c}
                className="border border-white/20 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* benefits */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
            The Upside
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold uppercase leading-tight tracking-tight text-[#001D40] md:text-4xl">
            The Benefits of Hiring a Fractional COO/Integrator
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className="border-t-4 border-[#D4AF37] bg-[#F2F1EF] p-7"
              >
                <div className="text-3xl font-extrabold leading-none text-[#001D40]/15">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="mt-4 text-[0.975rem] leading-relaxed text-[#4a4a4a]">
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* deliverables */}
      <section className="bg-[#F2F1EF] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
            What We Deliver
          </p>
          <h2 className="mt-4 max-w-3xl text-2xl font-extrabold uppercase leading-tight tracking-tight text-[#001D40] md:text-3xl">
            Helping Visionary Owners Get Out of Their Own Way
          </h2>
          <div className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {DELIVERABLES.map((d) => (
              <div
                key={d}
                className="flex items-start gap-3 border-b border-[#001D40]/10 pb-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#001D40]">
                  &#10003;
                </span>
                <span className="text-sm leading-relaxed text-[#4a4a4a]">
                  {d}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* process */}
      {phases.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
              How It Works
            </p>
            <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-4xl">
              Full Pocket Fractional Integration Process
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {phases.map((ph, i) => (
                <div key={ph.label} className="border-t-4 border-[#D4AF37] pt-6">
                  <div className="text-3xl font-extrabold leading-none text-[#001D40]/15">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 text-base font-bold uppercase tracking-wide text-[#001D40]">
                    {ph.label}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {ph.items.map((it, k) => (
                      <li
                        key={k}
                        className="text-sm leading-relaxed text-[#5c5c5c]"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        title="Ready to Get Unstuck?"
        body="Book a discovery call and we'll map where your operation is losing time and money."
      />
    </div>
  );
}
