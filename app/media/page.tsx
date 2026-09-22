import { PAGES } from "@/content";
import { CTABand, PageHero } from "../components/Shared";

/* media page repeats: h2 (show name) -> 2-4 p (what we discussed) */

const IMAGES = [
  "/images/0912_FullPocketCoaching-Conference-39-1-1024x681.jpg",
  "/images/0912_FullPocketCoaching-125-1024x681.jpg",
  "/images/0912_FullPocketCoaching-Conference-157-1024x681.jpg",
  "/images/0912_FullPocketCoaching-133-681x1024.jpg",
  "/images/0912_FullPocketCoaching-Conference-39-1-1024x681.jpg",
  "/images/0912_FullPocketCoaching-113-681x1024.jpg",
];

type Appearance = { show: string; notes: string[] };

function parseAppearances(blocks: { t: string; x: string }[]): Appearance[] {
  const out: Appearance[] = [];
  const skip = ["media", "check out some of our latest media appearances", "podcast and other media appearances"];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.t === "h2" && !skip.includes(b.x.toLowerCase())) {
      const notes: string[] = [];
      let j = i + 1;
      while (j < blocks.length && blocks[j].t === "p") {
        notes.push(blocks[j].x);
        j++;
      }
      if (notes.length) out.push({ show: b.x, notes });
      i = j;
    } else {
      i++;
    }
  }
  return out;
}

export default function MediaPage() {
  const data = PAGES["media"];
  const appearances = parseAppearances(data.blocks);

  return (
    <div>
      <PageHero
        eyebrow="Media"
        title="Check Out Some of Our Latest Media Appearances"
        intro="Podcasts, interviews, and forums on leadership, culture, and fractional executive work."
        image="/images/0912_FullPocketCoaching-Conference-157-1024x681.jpg"
      />

      <section className="bg-[#F2F1EF] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
            Podcast &amp; Media Appearances
          </p>

          <div className="mt-12 space-y-8">
            {appearances.map((a, i) => (
              <article
                key={`${a.show}-${i}`}
                className={`grid items-center gap-8 bg-white shadow-[0_1px_2px_rgba(0,29,64,0.06)] md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMAGES[i % IMAGES.length]}
                    alt={`Marni Blythe on ${a.show}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-8 md:py-10">
                  <h2 className="text-xl font-bold uppercase tracking-wide text-[#001D40] md:text-2xl">
                    {a.show}
                  </h2>
                  <div className="mt-5 space-y-3">
                    {a.notes.map((n, k) => (
                      <p
                        key={k}
                        className="text-[0.975rem] leading-[1.75] text-[#4a4a4a]"
                      >
                        {n}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Want Marni on Your Show?"
        body="Available for podcasts, interviews, and panels on leadership and culture."
      />
    </div>
  );
}
