import { PAGES } from "@/content";
import { CTABand, PageHero } from "../components/Shared";

/* The workshops page repeats a pattern per course:
   h2/h3 title -> h4 "Summary" -> p -> h4 "Target Outcome" -> p -> ... */
type Course = {
  title: string;
  duration?: string;
  summary: string;
  outcome: string;
  extras: { label: string; body: string }[];
};

function parseCourses(blocks: { t: string; x: string }[]): Course[] {
  const out: Course[] = [];
  let i = 0;
  while (i < blocks.length) {
    // a course starts where an h4 "Summary" appears; its title is the nearest
    // preceding heading, and a duration li may sit just before that.
    if (blocks[i].t === "h4" && blocks[i].x.toLowerCase() === "summary") {
      // walk back for the title
      let title = "";
      let duration: string | undefined;
      const isGeneric = (s: string) =>
        ["summary", "target outcome", "format", "learning objectives", "immediate takeaway tool", "strategic alignment"].includes(
          s.toLowerCase()
        );
      for (let k = i - 1; k >= 0 && k >= i - 6; k--) {
        const b = blocks[k];
        if (b.t === "li" && /\d+\s*(min|hour)/i.test(b.x) && !duration) {
          duration = b.x;
          continue;
        }
        if ((b.t === "h2" || b.t === "h3") && !isGeneric(b.x)) {
          title = b.x;
          break;
        }
      }

      const extras: { label: string; body: string }[] = [];
      let summary = "";
      let outcome = "";
      let j = i + 1;
      let current = "summary";
      const buf: Record<string, string[]> = { summary: [], outcome: [] };

      while (j < blocks.length) {
        const b = blocks[j];
        if (b.t === "h4" && b.x.toLowerCase() === "summary" && buf.summary.length) {
          break; // next course
        }
        if (b.t === "h4") {
          const label = b.x;
          const low = label.toLowerCase();
          if (low === "target outcome") {
            current = "outcome";
            j++;
            continue;
          }
          // other labelled sections (format, objectives, takeaway...)
          const body: string[] = [];
          let k = j + 1;
          while (k < blocks.length && blocks[k].t === "p") {
            body.push(blocks[k].x);
            k++;
          }
          // Only keep labelled sections that actually have copy — some
          // headings in the scrape ("Strategic Alignment") have no body.
          if (body.join(" ").trim()) {
            extras.push({ label, body: body.join(" ") });
          }
          j = k;
          continue;
        }
        if (b.t === "p") {
          if (current === "summary") buf.summary.push(b.x);
          else if (current === "outcome") buf.outcome.push(b.x);
          j++;
          continue;
        }
        break;
      }

      summary = buf.summary.join(" ");
      outcome = buf.outcome.join(" ");
      out.push({ title, duration, summary, outcome, extras });
      i = j;
    } else {
      i++;
    }
  }
  return out;
}

export default function WorkshopsPage() {
  const data = PAGES["workshops"];
  const courses = parseCourses(data.blocks);
  const seen = new Set<string>();
  const unique = courses.filter((c) => {
    const k = c.title.toLowerCase();
    if (!c.title || seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  return (
    <div>
      <PageHero
        eyebrow="Leadership Workshops"
        title="Talks That Create Change, Not Just Inspiration"
        intro="Interactive sessions from 75 minutes to full-day, built so teams leave with frameworks they can use the next morning."
        image="/images/0912_FullPocketCoaching-133-681x1024.jpg"
      />

      <section className="bg-[#F2F1EF] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
            Programs
          </p>
          <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-4xl">
            Workshop Catalogue
          </h2>

          <div className="mt-12 space-y-8">
            {unique.map((c, i) => (
              <article
                key={`${c.title}-${i}`}
                className="border-t-4 border-[#D4AF37] bg-white p-8 shadow-[0_1px_2px_rgba(0,29,64,0.06)] md:p-10"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h3 className="max-w-2xl text-xl font-bold leading-snug text-[#001D40] md:text-2xl">
                    {c.title}
                  </h3>
                  {c.duration && (
                    <span className="shrink-0 bg-[#001D40] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                      {c.duration}
                    </span>
                  )}
                </div>

                {c.summary && (
                  <p className="mt-5 text-[1.0625rem] leading-[1.8] text-[#4a4a4a]">
                    {c.summary}
                  </p>
                )}

                {c.outcome && (
                  <div className="mt-7 border-l-4 border-[#D4AF37] bg-[#F2F1EF] p-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8a6a12]">
                      Target Outcome
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#4a4a4a]">
                      {c.outcome}
                    </p>
                  </div>
                )}

                {c.extras.length > 0 && (
                  <dl className="mt-7 grid gap-6 sm:grid-cols-2">
                    {c.extras.map((e) => (
                      <div key={e.label} className="border-t border-[#001D40]/10 pt-4">
                        <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B8860B]">
                          {e.label}
                        </dt>
                        <dd className="mt-2 text-sm leading-relaxed text-[#5c5c5c]">
                          {e.body}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Bring a Workshop to Your Team"
        body="Tell us where your team is stuck and we'll shape the session around it."
      />
    </div>
  );
}
