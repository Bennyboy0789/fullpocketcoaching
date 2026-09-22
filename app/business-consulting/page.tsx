import { PAGES } from "@/content";
import { CTABand, PageHero } from "../components/Shared";

export default function BusinessConsultingPage() {
  const data = PAGES["business-consulting"];

  const question =
    data.blocks.find((b) => b.t === "h2" && b.x.includes("small business owner"))
      ?.x ?? "";

  const para = data.blocks.filter((b) => b.t === "p");
  const intro = para[0]?.x ?? "";
  const closing = para[para.length - 1]?.x ?? "";
  const lead = data.blocks.find((b) => b.t === "p" && b.x.endsWith("\u2026"))?.x ?? "";
  const items = data.blocks.filter((b) => b.t === "li").map((b) => b.x);

  return (
    <div>
      <PageHero
        eyebrow="Business Consulting"
        title="Feeling Like You've Hit the Ceiling?"
        intro="Short-term consulting that brings clarity, systems, and momentum to your business."
        image="/images/0912_FullPocketCoaching-Conference-125-1024x681.jpg"
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold leading-snug text-[#001D40] md:text-3xl">
            {question}
          </h2>
          <p className="mt-7 text-[1.0625rem] leading-[1.8] text-[#4a4a4a]">
            {intro}
          </p>
        </div>
      </section>

      <section className="bg-[#F2F1EF] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
            What We Do Together
          </p>
          <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-4xl">
            As Your Business Consultant, We Will&hellip;
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((it, i) => (
              <div
                key={i}
                className="border-t-4 border-[#D4AF37] bg-white p-7 shadow-[0_1px_2px_rgba(0,29,64,0.06)]"
              >
                <div className="text-3xl font-extrabold leading-none text-[#001D40]/15">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="mt-4 text-[0.975rem] leading-relaxed text-[#4a4a4a]">
                  {it}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-14 max-w-3xl text-center text-[1.0625rem] leading-[1.8] text-[#4a4a4a]">
            {closing}
          </p>
        </div>
      </section>

      <CTABand
        title="Let's Set Up a Complimentary 45-Minute Strategy Session"
        body="We'll see if we're a good match for one another."
      />
    </div>
  );
}
