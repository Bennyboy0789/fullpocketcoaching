import Link from "next/link";

export default function CrestConnect() {
  return (
    <div>
      <section className="bg-[#001D40] py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]">
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-[#001D40]">
              <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
            </svg>
          </div>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Thank You
          </p>
          <h1 className="mt-5 text-3xl font-extrabold uppercase leading-tight tracking-tight text-white md:text-4xl">
            Thanks for Attending
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80">
            Crest Oral-B DSO Advisory Board &mdash; Connect: Courageous
            Conversations. We&apos;re glad you joined us.
          </p>
          <Link
            href="/"
            className="mt-10 inline-block bg-[#D4AF37] px-9 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#001D40] transition hover:bg-[#B8860B]"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
