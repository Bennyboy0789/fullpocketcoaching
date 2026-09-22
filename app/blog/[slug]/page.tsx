import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, BLOG_LIST } from "@/content";
import { BlockList } from "../../components/Blocks";
import { CTABand } from "../../components/Shared";

export function generateStaticParams() {
  return BLOG_LIST.map((p) => ({ slug: p.slug }));
}

function fmt(d?: string) {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = BLOG_POSTS[slug];
  if (!data) notFound();

  const idx = BLOG_LIST.findIndex((p) => p.slug === slug);
  const next = idx >= 0 ? BLOG_LIST[idx + 1] : undefined;
  const entry = idx >= 0 ? BLOG_LIST[idx] : undefined;

  // leading h1 duplicates the title in the hero
  const blocks = data.blocks.filter(
    (b, i) => !(i === 0 && b.t === "h1")
  );

  return (
    <div>
      <section className="bg-[#001D40]">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <Link
            href="/blog"
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37] hover:text-white"
          >
            &larr; All articles
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-[2.75rem]">
            {data.title}
          </h1>
          {entry?.date && (
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
              {fmt(entry.date)}
            </p>
          )}
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-14 md:py-16">
        <BlockList blocks={blocks} />

        <div className="mt-16 border-t border-[#001D40]/10 pt-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B8860B]">
            Written by
          </p>
          <p className="mt-3 text-lg font-bold text-[#001D40]">Marni Blythe</p>
          <p className="mt-1 text-sm text-[#5c5c5c]">
            Keynote speaker, business strategist, and fractional COO/CMO.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block bg-[#D4AF37] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#001D40] transition hover:bg-[#B8860B]"
          >
            Work with Marni
          </Link>
        </div>

        {next && (
          <Link
            href={`/blog/${next.slug}`}
            className="group mt-14 block border-t-2 border-[#001D40]/15 bg-[#F2F1EF] p-7 transition hover:border-[#D4AF37]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B8860B]">
              Next article
            </p>
            <h2 className="mt-3 text-lg font-bold leading-snug text-[#001D40] transition group-hover:text-[#B8860B]">
              {next.title}
            </h2>
          </Link>
        )}
      </article>

      <CTABand />
    </div>
  );
}
