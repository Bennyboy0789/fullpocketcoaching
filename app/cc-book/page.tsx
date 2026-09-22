import { PAGES } from "@/content";

const REASONS: { title: string; body: string }[] = [
  {
    title: "Immediate Impact",
    body: "Discover proven techniques for reducing workplace stress and achieving better outcomes.",
  },
  {
    title: "Stronger Teams",
    body: "Learn how to build an environment of trust, communication, and collaboration.",
  },
  {
    title: "Leadership Growth",
    body: "Gain tools to boost emotional intelligence and inspire greatness.",
  },
];

export default function BookPage() {
  const data = PAGES["cc-book"];
  const title = data.blocks.find((b) => b.t === "h1")?.x ?? "Get Your Free Download";
  const intro = data.blocks.find((b, i) => b.t === "p" && i > 0)?.x ?? "";
  const closing = [...data.blocks].reverse().find((b) => b.t === "p")?.x ?? "";

  return (
    <div>
      {/* split hero: book cover + signup */}
      <section className="relative isolate overflow-hidden bg-[#001D40]">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              Free Download
            </p>
            <h1 className="mt-5 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-5xl">
              {title}
            </h1>
            <p className="mt-7 text-base leading-relaxed text-white/80 md:text-lg">
              {intro}
            </p>

            <form
              className="mt-9 flex flex-col gap-3 sm:flex-row"
              action="https://formsubmit.co/marni@fullpocketcoaching.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="Culture Catalyst download request" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://fullpocketcoaching.com/cc-book?sent=1" />
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="flex-1 border border-white/25 bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="bg-[#D4AF37] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#001D40] transition hover:bg-[#B8860B]"
              >
                Send It To Me
              </button>
            </form>
            <p className="mt-4 text-xs text-white/45">
              We&apos;ll email your copy right away. No spam, unsubscribe anytime.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Catalyst-Book-Mockup-4.png"
              alt="Culture Catalyst book"
              className="w-64 drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)] md:w-80"
            />
          </div>
        </div>
      </section>

      {/* why sign up */}
      <section className="bg-[#F2F1EF] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
            Inside the Book
          </p>
          <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-[#001D40] md:text-4xl">
            Why Sign Up?
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REASONS.map((r, i) => (
              <div
                key={r.title}
                className="border-t-4 border-[#D4AF37] bg-white p-8"
              >
                <div className="text-3xl font-extrabold leading-none text-[#001D40]/15">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-base font-bold uppercase tracking-wide text-[#001D40]">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5c5c5c]">
                  {r.body}
                </p>
              </div>
            ))}
          </div>

          {closing && (
            <p className="mx-auto mt-14 max-w-3xl text-center text-[1.0625rem] leading-[1.8] text-[#4a4a4a]">
              {closing}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
