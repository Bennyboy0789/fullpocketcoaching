import { notFound } from "next/navigation";
import { PAGES } from "@/content";
import { BlockList, PageContent } from "../components/Blocks";
import { PageHero, CTABand } from "../components/Shared";

/* Per-route presentation. Anything not listed falls back to the generic
   PageContent shell. */
const HERO_IMAGE = "/images/0912_FullPocketCoaching-Conference-157-1024x681.jpg";
const PORTRAIT = "/images/Marni-636x1024.png";

const CUSTOM: Record<
  string,
  { eyebrow?: string; intro?: string; image?: string; portrait?: boolean }
> = {
  about: {
    eyebrow: "About Marni",
    intro:
      "Keynote speaker, business strategist, and fractional COO/CMO/integrator \u2014 helping healthcare and leadership teams turn vision into execution.",
    image: "/images/0912_FullPocketCoaching-Conference-39-1-1024x681.jpg",
  },
  "keynote-speaker": {
    eyebrow: "Keynote Speaking",
    intro:
      "High-impact talks for conferences, retreats, and all-staff meetings that inspire trust, accountability, and teams that execute.",
    image: "/images/0912_FullPocketCoaching-125-1024x681.jpg",
  },
  "fractional-chief-operating-officer": {
    eyebrow: "Fractional COO",
    intro:
      "Embedded operational leadership that turns priorities into systems your team can actually run.",
    image: "/images/0912_FullPocketCoaching-Conference-157-1024x681.jpg",
  },
  "fractional-chief-marketing-officer": {
    eyebrow: "Fractional CMO",
    intro:
      "Marketing leadership and clarity so the right people find you, and the pipeline stops depending on luck.",
    image: HERO_IMAGE,
  },
  workshops: {
    eyebrow: "Leadership Workshops",
    intro:
      "Half-day and full-day training that equips teams with communication, feedback, conflict resolution, and collaborative problem-solving.",
    image: "/images/0912_FullPocketCoaching-133-681x1024.jpg",
  },
  testimonials: {
    eyebrow: "Reviews",
    intro:
      "What practice owners and leadership teams say about working with Marni.",
    image: HERO_IMAGE,
  },
  media: {
    eyebrow: "Media",
    intro: "Press, features, and appearances.",
    image: HERO_IMAGE,
  },
  team: {
    eyebrow: "Our Team",
    intro: "The people behind Full Pocket Coaching.",
    image: HERO_IMAGE,
  },
  resources: {
    eyebrow: "Resources",
    intro: "Tools and downloads to help your team lead better.",
    image: HERO_IMAGE,
  },
  "business-consulting": {
    eyebrow: "Business Consulting",
    intro:
      "Practical consulting for practices and organizations ready to grow without adding chaos.",
    image: HERO_IMAGE,
  },
  "full-pocket-method-certification-program": {
    eyebrow: "Certification",
    intro:
      "Become certified in the Full Pocket Method and bring it into your organization.",
    image: HERO_IMAGE,
  },
  contact: {
    eyebrow: "Let's Talk",
    intro:
      "Want Marni to speak at your next event, or ready to get your team aligned? Start here.",
    image: HERO_IMAGE,
  },
  cc_book: { eyebrow: "Book", intro: "", image: PORTRAIT },
  "terms-of-use": { eyebrow: "Legal", intro: "" },
};

/* Routes that have their own designed page component. The [slug] catch-all
   must not also claim these, or Next will warn about duplicate paths. */
const DEDICATED = new Set([
  "home",
  "about",
  "testimonials",
  "team",
  "resources",
  "contact",
  "keynote-speaker",
  "workshops",
  "media",
  "business-consulting",
  "crest-connect",
  "full-pocket-method-certification-program",
  "cc-book",
  "mindfulchange",
]);

export function generateStaticParams() {
  return Object.keys(PAGES)
    .filter((s) => !DEDICATED.has(s))
    .map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = PAGES[slug];
  if (!data) notFound();

  const cfg = CUSTOM[slug];

  // Non-content pages (contact, terms, the book short-link) keep the plain shell.
  if (slug === "terms-of-use" || slug === "crest-connect") {
    return <PageContent title={data.title} blocks={data.blocks} />;
  }

  return (
    <div>
      <PageHero
        eyebrow={cfg?.eyebrow}
        title={data.title}
        intro={cfg?.intro}
        image={cfg?.image}
      />

      {slug === "about" ? (
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div className="max-w-3xl">
              <BlockList blocks={data.blocks} />
            </div>
            <aside className="lg:sticky lg:top-24 lg:self-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PORTRAIT}
                alt="Marni Blythe"
                className="w-full border-t-4 border-[#D4AF37] object-cover"
              />
              <div className="mt-6 bg-[#F2F1EF] p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B8860B]">
                  Work with Marni
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#5c5c5c]">
                  Keynotes, fractional COO/CMO leadership, and workshops for
                  high-performing organizations.
                </p>
                <a
                  href="/contact"
                  className="mt-5 inline-block bg-[#D4AF37] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#001D40] transition hover:bg-[#B8860B]"
                >
                  Schedule a Call
                </a>
              </div>
            </aside>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <BlockList blocks={data.blocks} />
        </div>
      )}

      <CTABand />
    </div>
  );
}
