import Link from "next/link";
import { BLOG_LIST } from "@/content";
import { PageHero, CTABand } from "../components/Shared";

function fmt(d?: string) {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const [feature, ...rest] = BLOG_LIST;

  return (
    <div>
      <PageHero
        eyebrow="Insights"
        title="Blog"
        intro="Leadership, culture, and operational thinking for practices and teams that want to grow without the chaos."
        image="/images/0912_FullPocketCoaching-Conference-157-1024x681.jpg"
      />

      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        {feature && (
          <Link
            href={`/blog/${feature.slug}`}
            className="group mb-14 block border-t-4 border-[#D4AF37] bg-[#F2F1EF] p-8 transition hover:bg-white hover:shadow-[0_12px_32px_rgba(0,29,64,0.10)] md:p-10"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B8860B]">
              Latest {feature.date ? `\u00b7 ${fmt(feature.date)}` : ""}
            </p>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold leading-tight text-[#001D40] transition group-hover:text-[#B8860B] md:text-3xl">
              {feature.title}
            </h2>
            <span className="mt-6 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Read article &rarr;
            </span>
          </Link>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col border-t-2 border-[#001D40]/15 bg-white p-6 transition hover:border-[#D4AF37] hover:shadow-[0_10px_28px_rgba(0,29,64,0.10)]"
            >
              {p.date && (
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B8860B]">
                  {fmt(p.date)}
                </p>
              )}
              <h2 className="mt-3 flex-1 text-base font-bold leading-snug text-[#001D40] transition group-hover:text-[#B8860B]">
                {p.title}
              </h2>
              <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                Read &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>

      <CTABand
        title="Want this thinking in your organization?"
        body="Bring Marni in for a keynote, a workshop, or embedded fractional leadership."
      />
    </div>
  );
}
