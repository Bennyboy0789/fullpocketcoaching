import { PAGES } from "@/content";
import { CTABand, PageHero } from "../components/Shared";

/* team page content is: h2 "Our Team", h2 tagline, then repeating
   h2 (name) / h3 (role) / p (bio) for each person. */
const PHOTOS: Record<string, string> = {
  "Marni Blythe": "/images/Marni-636x1024.png",
  "Sam Poley": "/images/Sam-Poley.jpg",
  "Cassie Saquing": "/images/Cassie-Saquing.png",
};

type Member = { name: string; role: string; bio: string };

function parseTeam(blocks: { t: string; x: string }[]): Member[] {
  const out: Member[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.t === "h2" && blocks[i + 1]?.t === "h3") {
      const bio: string[] = [];
      let j = i + 2;
      while (j < blocks.length && blocks[j].t === "p") {
        bio.push(blocks[j].x);
        j++;
      }
      out.push({ name: b.x, role: blocks[i + 1].x, bio: bio.join(" ") });
      i = j;
    } else {
      i++;
    }
  }
  return out;
}

export default function TeamPage() {
  const data = PAGES["team"];
  const members = parseTeam(data.blocks);

  return (
    <div>
      <PageHero
        eyebrow="Our Team"
        title="The Operational Partner Who Gets You Unstuck"
        intro="Fractional executives and specialists who step in, build the systems, and hand your team something that runs."
        image="/images/0912_FullPocketCoaching-Conference-157-1024x681.jpg"
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl space-y-16 px-6">
          {members.map((m, i) => (
            <article
              key={m.name}
              className={`grid items-start gap-10 lg:grid-cols-[320px_1fr] ${
                i % 2 === 1 ? "lg:grid-cols-[1fr_320px]" : ""
              }`}
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PHOTOS[m.name] ?? "/images/2022-Full_Pocket_logo-blue-white.png"}
                  alt={m.name}
                  className="aspect-[3/4] w-full border-t-4 border-[#D4AF37] object-cover object-top"
                />
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="text-3xl font-extrabold uppercase tracking-tight text-[#001D40]">
                  {m.name}
                </h2>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B8860B]">
                  {m.role}
                </p>
                <p className="mt-6 text-[1.0625rem] leading-[1.8] text-[#4a4a4a]">
                  {m.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTABand
        title="Not sure who you need?"
        body="Tell us where you're stuck and we'll point you at the right person."
      />
    </div>
  );
}
