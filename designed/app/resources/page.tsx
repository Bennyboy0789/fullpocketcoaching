import { CTABand, PageHero } from "../components/Shared";

const RESOURCES = [
  {
    title: "10 Touch Points Every Business Needs to Build a Digital Relationship",
    body: "The sequence that keeps you in front of the right people without being annoying about it.",
  },
  {
    title: "16 Critical Mistakes Business Owners Make",
    body: "The recurring missteps we see across practices and small businesses \u2014 and the fix for each.",
  },
  {
    title: "3 Ways to In-Person Sales",
    body: "Practical approaches for converting conversations into revenue when you're face to face.",
  },
  {
    title: "5 Ways to Increase Sales WITHOUT Marketing Externally",
    body: "Grow revenue from the clients and network you already have.",
  },
  {
    title: "The Quick Emotional Intelligence Self-Assessment",
    body: "A fast, honest read on how you show up under pressure as a leader.",
  },
  {
    title: "Hidden Money In Your Business",
    body: "Where profitability is quietly leaking out of your operation \u2014 and how to stop it.",
  },
];

export default function ResourcesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Resources"
        title="Quick Win Resources That Work"
        intro="Practical tools you can put to work this week. No fluff, no fifty-page ebooks."
        image="/images/0912_FullPocketCoaching-Conference-125-1024x681.jpg"
      />

      <section className="bg-[#F2F1EF] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((r) => (
              <div
                key={r.title}
                className="group flex flex-col border-t-4 border-[#D4AF37] bg-white p-7 shadow-[0_1px_2px_rgba(0,29,64,0.06)] transition hover:shadow-[0_12px_32px_rgba(0,29,64,0.12)]"
              >
                <h2 className="text-base font-bold leading-snug text-[#001D40]">
                  {r.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5c5c5c]">
                  {r.body}
                </p>
                <a
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4AF37] transition group-hover:gap-3 group-hover:text-[#B8860B]"
                >
                  Get the guide
                  <span aria-hidden>&rarr;</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Want these applied to your business?"
        body="A strategy session beats a download. Book a call and we'll work through your specific situation."
      />
    </div>
  );
}
