import { PAGES } from "@/content";
import { CTABand, PageHero } from "../components/Shared";

/* The scraped testimonials page is a flat run of: paragraph (the quote),
   h2 (person), h2 (role/company), repeated 8 times. Parse that shape back
   into structured entries so they can be laid out as cards. */
type Entry = { quote: string; name: string; role: string };

function parseTestimonials(blocks: { t: string; x: string }[]): Entry[] {
  const out: Entry[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.t === "p" && b.x.startsWith("\u201c")) {
      // A single testimonial can span several consecutive <p> blocks before its
      // attribution (Dr. Sullivan's runs to 7). Collect every paragraph up to
      // the next heading so long quotes stay with their name.
      const parts: string[] = [b.x];
      let j = i + 1;
      while (j < blocks.length && blocks[j].t === "p") {
        parts.push(blocks[j].x);
        j++;
      }
      const name = blocks[j]?.t === "h2" ? blocks[j].x : "";
      const role = blocks[j + 1]?.t === "h2" ? blocks[j + 1].x : "";
      out.push({ quote: parts.join(" "), name, role });
      i = j + 2;
    } else {
      i++;
    }
  }
  return out;
}

/* The trailing "Testimonial Videos" run is a bare list of names with no
   video media in the scrape — render it as a simple credit list instead. */
function parseVideoCredits(blocks: { t: string; x: string }[]): string[] {
  const idx = blocks.findIndex((b) => b.x.toLowerCase() === "testimonial videos");
  if (idx < 0) return [];
  return blocks
    .slice(idx + 1)
    .filter((b) => b.t === "h4" || b.t === "h3")
    .map((b) => b.x);
}

export default function TestimonialsPage() {
  const data = PAGES["testimonials"];
  const entries = parseTestimonials(data.blocks);

  // Drop anyone already shown as a full card so the credits list adds names
  // rather than repeating them.
  const shown = new Set(entries.map((e) => e.name.toUpperCase()));
  const credits = parseVideoCredits(data.blocks).filter(
    (c) => !shown.has(c.toUpperCase())
  );

  return (
    <div>
      <PageHero
        eyebrow="Reviews"
        title="Testimonials"
        intro="What practice owners, executives, and leadership teams say about working with Marni."
        image="/images/0912_FullPocketCoaching-Conference-157-1024x681.jpg"
      />

      <section className="bg-[#F2F1EF] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {entries.map((e, i) => (
              <figure
                key={`${e.name}-${i}`}
                className={`flex flex-col border-t-4 bg-white p-8 shadow-[0_1px_2px_rgba(0,29,64,0.06)] ${
                  // alternate the top rule so the grid has rhythm
                  i % 2 === 0 ? "border-[#D4AF37]" : "border-[#001D40]"
                } ${e.quote.length > 900 ? "md:col-span-2" : ""}`}
              >
                <svg
                  aria-hidden
                  viewBox="0 0 32 24"
                  className="mb-5 h-6 w-6 fill-[#D4AF37]"
                >
                  <path d="M0 24V14C0 6 4 1 12 0v5C8 6 6 9 6 13h6v11H0zm18 0V14C18 6 22 1 30 0v5c-4 1-6 4-6 8h6v11H18z" />
                </svg>
                <blockquote className="flex-1 text-[0.975rem] leading-[1.75] text-[#3f3f3f]">
                  {e.quote}
                </blockquote>
                {e.name && (
                  <figcaption className="mt-6 border-t border-[#001D40]/10 pt-5">
                    <p className="text-sm font-bold uppercase tracking-wide text-[#001D40]">
                      {e.name}
                    </p>
                    {e.role && (
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6a12]">
                        {e.role}
                      </p>
                    )}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {credits.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
              Also Trusted By
            </p>
            <h2 className="mt-4 text-2xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-3xl">
              More Voices
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-x-10 gap-y-4">
              {credits.map((c) => (
                <span
                  key={c}
                  className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#001D40]/70"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        title="Ready to be the next success story?"
        body="Book a 30-minute discovery call and see what's possible for your organization."
      />
    </div>
  );
}
