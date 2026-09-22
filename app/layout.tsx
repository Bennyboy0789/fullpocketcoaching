import type { Metadata } from "next";
import { Inter, Sofia_Sans, DM_Serif_Text } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sofia = Sofia_Sans({ variable: "--font-sofia", subsets: ["latin"] });
const dmSerif = DM_Serif_Text({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Full Pocket Coaching | Leadership, Culture & Fractional COO",
  description:
    "We help medical practices streamline operations when we join your team as a part-time management consultant, business consultant, or fractional COO/fractional integrator.",
};

const NAV = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/keynote-speaker",
    children: [
      { label: "Keynote Speaker", href: "/keynote-speaker" },
      { label: "Fractional COO", href: "/fractional-chief-operating-officer" },
      { label: "Fractional CMO", href: "/fractional-chief-marketing-officer" },
      { label: "Workshops", href: "/workshops" },
      { label: "Business Consulting", href: "/business-consulting" },
    ],
  },
  { label: "Reviews", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Media", href: "/media" },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#001D40]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="/" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/2022-Full_Pocket_logo-blue-white.png"
            alt="Full Pocket Coaching"
            className="h-12 w-auto"
          />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 transition hover:text-[#D4AF37]">
                  {item.label}
                </button>
                <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[230px] border-t-2 border-[#D4AF37] bg-white py-2 shadow-xl">
                    {item.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        className="block px-5 py-2.5 text-sm text-[#001D40] transition hover:bg-[#F2F1EF]"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 transition hover:text-[#D4AF37]"
              >
                {item.label}
              </a>
            )
          )}
          <a
            href="/contact"
            className="ml-1 bg-[#D4AF37] px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#001D40] transition hover:bg-[#B8860B]"
          >
            Connect
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#001A38] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/2022-Full_Pocket_logo-blue-white.png"
            alt="Full Pocket Coaching"
            className="mb-5 h-12 w-auto"
          />
          <p className="max-w-xs text-sm leading-relaxed text-white/65">
            Leadership that transforms people, culture, and performance &mdash;
            through keynotes, fractional COO/CMO leadership, and workshops for
            high-performing organizations.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm text-white/75">
            {[...NAV.filter((n) => !n.children), { label: "Connect", href: "/contact" }].map(
              (n) => (
                <li key={n.label}>
                  <a href={n.href} className="transition hover:text-[#D4AF37]">
                    {n.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
            Get in Touch
          </h3>
          <p className="text-sm leading-relaxed text-white/65">
            Want Marni to speak at your next event, or ready to get your team
            aligned? Book a 30-minute discovery call.
          </p>
          <div className="mt-5 flex gap-5 text-sm text-white/75">
            <a href="#" className="transition hover:text-[#D4AF37]">LinkedIn</a>
            <a href="#" className="transition hover:text-[#D4AF37]">YouTube</a>
            <a href="#" className="transition hover:text-[#D4AF37]">Instagram</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/45">
        &copy; {new Date().getFullYear()} Full Pocket Coaching. All rights reserved.
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sofia.variable} ${dmSerif.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
