import { PageHero } from "../components/Shared";

const WHAT = [
  {
    n: "01",
    t: "Tell us the situation",
    b: "Where you're stuck, what's not working, and what you've already tried.",
  },
  {
    n: "02",
    t: "30-minute discovery call",
    b: "We'll talk through it and tell you straight whether we're the right fit.",
  },
  {
    n: "03",
    t: "A plan to move",
    b: "You leave with clarity on next steps, whether or not we work together.",
  },
];

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Let's Talk"
        title="Get A Hold Of Our Team"
        intro="Fill out the form below and be as thorough as possible — the more we know, the more useful the first call is."
        image="/images/0912_FullPocketCoaching-Conference-39-1-1024x681.jpg"
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1.15fr_1fr]">
          {/* form */}
          <form
            className="space-y-5"
            action="https://formsubmit.co/info@fullpocketcoaching.com"
            method="POST"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#001D40]">
                  Name
                </span>
                <input
                  name="name"
                  required
                  className="mt-2 w-full border border-[#001D40]/20 bg-[#F2F1EF] px-4 py-3 text-sm text-[#001D40] outline-none focus:border-[#D4AF37]"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#001D40]">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full border border-[#001D40]/20 bg-[#F2F1EF] px-4 py-3 text-sm text-[#001D40] outline-none focus:border-[#D4AF37]"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#001D40]">
                  Company / Practice
                </span>
                <input
                  name="company"
                  className="mt-2 w-full border border-[#001D40]/20 bg-[#F2F1EF] px-4 py-3 text-sm text-[#001D40] outline-none focus:border-[#D4AF37]"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#001D40]">
                  Phone
                </span>
                <input
                  name="phone"
                  className="mt-2 w-full border border-[#001D40]/20 bg-[#F2F1EF] px-4 py-3 text-sm text-[#001D40] outline-none focus:border-[#D4AF37]"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#001D40]">
                How can we help?
              </span>
              <textarea
                name="message"
                rows={7}
                required
                className="mt-2 w-full border border-[#001D40]/20 bg-[#F2F1EF] px-4 py-3 text-sm leading-relaxed text-[#001D40] outline-none focus:border-[#D4AF37]"
              />
            </label>

            <button
              type="submit"
              className="bg-[#D4AF37] px-9 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#001D40] transition hover:bg-[#B8860B]"
            >
              Send Message
            </button>
          </form>

          {/* what happens next */}
          <aside>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B8860B]">
              What Happens Next
            </p>
            <div className="mt-7 space-y-6">
              {WHAT.map((s) => (
                <div key={s.n} className="border-t border-[#001D40]/12 pt-5">
                  <div className="text-3xl font-extrabold leading-none text-[#001D40]/15">
                    {s.n}
                  </div>
                  <h3 className="mt-3 text-sm font-bold uppercase tracking-wide text-[#001D40]">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c5c5c]">
                    {s.b}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-[#001D40] p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                Prefer to talk?
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Book a complimentary 45-minute strategy session and we&apos;ll
                dig into where you are and what&apos;s next.
              </p>
              <a
                href="#"
                className="mt-5 inline-block border border-white/40 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Schedule a Call
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
