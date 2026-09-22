import { PAGES } from "@/content";
import { BlockList } from "../components/Blocks";
import { CTABand, PageHero } from "../components/Shared";

export default function CertificationPage() {
  const data = PAGES["full-pocket-method-certification-program"];

  // The "Am I the right candidate?" section is a run of paragraphs used as
  // list items, followed by a real <li> block of values.
  const candIdx = data.blocks.findIndex((b) =>
    b.x.toLowerCase().includes("am i the right candidate")
  );

  const hero = data.blocks.filter(
    (b) => b.t === "h3" && b.x.startsWith("\u201c")
  )[0]?.x;

  const bodyBlocks = data.blocks.slice(0, candIdx > 0 ? candIdx : undefined);
  const tail = candIdx > 0 ? data.blocks.slice(candIdx) : [];

  const prereqs =
    tail
      .slice(0, tail.findIndex((b) => b.t === "li") < 0 ? tail.length : tail.findIndex((b) => b.t === "li"))
      .filter((b) => b.t === "p" && b.x.length < 200)
      .map((b) => b.x);

  const values = tail.filter((b) => b.t === "li").map((b) => b.x);

  return (
    <div>
      <PageHero
        eyebrow="Certification"
        title="Full Pocket Method Certification Program"
        intro="A flexible certification for successful business coaches and consultants ready to add a proven operating system to their practice."
        image="/images/0912_FullPocketCoaching-Conference-157-1024x681.jpg"
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          {hero && (
            <blockquote className="mb-14 border-l-4 border-[#D4AF37] bg-[#F2F1EF] p-8 text-xl font-semibold leading-relaxed text-[#001D40] md:text-2xl">
              {hero}
            </blockquote>
          )}
          <BlockList
            blocks={bodyBlocks.filter(
              (b) => !(b.t === "h2" && b.x === "Full Pocket Method Certification Program")
            )}
          />
        </div>
      </section>

      {(prereqs.length > 0 || values.length > 0) && (
        <section className="bg-[#F2F1EF] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
              Prerequisites
            </p>
            <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-4xl">
              Am I the Right Candidate?
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {prereqs.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 border-t-4 border-[#D4AF37] bg-white p-7"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[11px] font-bold text-[#001D40]">
                    &#10003;
                  </span>
                  <p className="text-[0.975rem] leading-relaxed text-[#4a4a4a]">
                    {p}
                  </p>
                </div>
              ))}
            </div>

            {values.length > 0 && (
              <>
                <h3 className="mt-16 text-lg font-bold uppercase tracking-wide text-[#001D40]">
                  Core Values Alignment
                </h3>
                <div className="mt-6 flex flex-wrap gap-3">
                  {values.map((v, i) => (
                    <span
                      key={i}
                      className="bg-[#001D40] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      <CTABand
        title="Ready to Get Certified?"
        body="Reach out to learn whether the Full Pocket Method certification is the right fit for your practice."
      />
    </div>
  );
}
