import type { Block } from "@/content";

/* ------------------------------------------------------------------ *
 * Block renderer
 *
 * The scraped content is a flat list of heading/paragraph/list items with
 * no images or layout metadata. Everything here exists to give that flat
 * text a designed rhythm: a proper type scale, a readable measure, and
 * grouping of consecutive <li> items into real lists.
 * ------------------------------------------------------------------ */

const tagClass: Record<string, string> = {
  h1: "text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-[1.05] text-[#001D40] mt-16 mb-6 first:mt-0",
  h2: "text-2xl md:text-[2rem] font-bold uppercase tracking-tight leading-tight text-[#001D40] mt-16 mb-5 pb-3 border-b border-[#001D40]/10 first:mt-0",
  h3: "text-xl md:text-2xl font-bold text-[#001D40] mt-12 mb-4",
  h4: "text-base font-bold uppercase tracking-[0.12em] text-[#B8860B] mt-10 mb-3",
  h5: "text-base font-semibold text-[#001D40] mt-8 mb-2",
  h6: "text-sm font-semibold uppercase tracking-wide text-[#001D40] mt-6 mb-2",
  p: "text-[1.0625rem] leading-[1.8] text-[#4a4a4a] mb-6",
  li: "text-[1.0625rem] leading-[1.75] text-[#4a4a4a]",
};

export function Block({ tag, text }: { tag: string; text: string }) {
  switch (tag) {
    case "h1":
      return <h1 className={tagClass.h1}>{text}</h1>;
    case "h2":
      return <h2 className={tagClass.h2}>{text}</h2>;
    case "h3":
      return <h3 className={tagClass.h3}>{text}</h3>;
    case "h4":
      return <h4 className={tagClass.h4}>{text}</h4>;
    case "h5":
      return <h5 className={tagClass.h5}>{text}</h5>;
    case "h6":
      return <h6 className={tagClass.h6}>{text}</h6>;
    case "li":
      return (
        <li className="flex gap-3">
          <span
            aria-hidden
            className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]"
          />
          <span className={tagClass.li}>{text}</span>
        </li>
      );
    default:
      return <p className={tagClass.p}>{text}</p>;
  }
}

/**
 * Groups consecutive `li` blocks into a single <ul> so the markers and
 * spacing line up as a real list, then renders everything else in order.
 */
export function BlockList({ blocks }: { blocks: Block[] }) {
  const rendered: React.ReactNode[] = [];
  let i = 0;
  while (i < blocks.length) {
    if (blocks[i].t === "li") {
      const lis: Block[] = [];
      while (i < blocks.length && blocks[i].t === "li") {
        lis.push(blocks[i]);
        i++;
      }
      rendered.push(
        <ul key={`ul-${i}`} className="mb-8 space-y-3 pl-1">
          {lis.map((b, j) => (
            <Block key={j} tag={b.t} text={b.x} />
          ))}
        </ul>
      );
    } else {
      rendered.push(<Block key={`b-${i}`} tag={blocks[i].t} text={blocks[i].x} />);
      i++;
    }
  }
  return <>{rendered}</>;
}

/**
 * Page shell: navy hero band with the page title, then the body content in a
 * readable measure. `eyebrow` sets the small gold label above the title.
 */
export function PageContent({
  title,
  blocks,
  eyebrow = "Full Pocket Coaching",
  intro,
  heroImage,
}: {
  title: string;
  blocks: Block[];
  eyebrow?: string;
  intro?: string;
  heroImage?: string;
}) {
  // Skip a leading h1 that duplicates the page title.
  let start = 0;
  if (blocks[0] && blocks[0].t === "h1") start = 1;
  const body = blocks.slice(start);

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-[#001D40]">
        {heroImage && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#001D40] via-[#001D40]/92 to-[#001D40]/60" />
          </>
        )}
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-24">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80">
              {intro}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <BlockList blocks={body} />
      </div>
    </div>
  );
}
