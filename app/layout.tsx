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
    href: "/about",
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
    <header className="bg-navy text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img
            src="/images/2022-Full_Pocket_logo-blue-white.png"
            alt="Full Pocket Coaching"
            className="h-14 w-auto"
          />
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button className="py-2 text-sm font-medium hover:text-gold">
                  {item.label}
                </button>
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                  <div className="bg-white text-navy rounded shadow-lg py-2 min-w-[220px]">
                    {item.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        className="block px-4 py-2 text-sm hover:bg-cream"
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
                className="py-2 text-sm font-medium hover:text-gold"
              >
                {item.label}
              </a>
            )
          )}
          <a
            href="/contact"
            className="ml-2 bg-gold text-navy px-5 py-2 rounded-full text-sm font-semibold hover:bg-gold-dark transition-colors"
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
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <img
            src="/images/2022-Full_Pocket_logo-blue-white.png"
            alt="Full Pocket Coaching"
            className="h-12 w-auto mb-4"
          />
          <p className="text-sm text-white/70 leading-relaxed">
            Leadership that transforms people, culture, and performance —
            through keynotes, fractional COO/CMO leadership, and workshops for
            high-performing organizations.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-gold uppercase tracking-widest text-sm mb-4">
            Explore
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {NAV.filter((n) => !n.children).map((n) => (
              <li key={n.label}>
                <a href={n.href} className="hover:text-gold">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/contact" className="hover:text-gold">
                Connect
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-gold uppercase tracking-widest text-sm mb-4">
            Let&apos;s Talk
          </h3>
          <p className="text-sm text-white/70 mb-4">
            Want Marni to speak at your next event? Ready to get your team
            aligned and your business unstuck? Book a 30-minute discovery call.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gold text-navy px-6 py-3 rounded-full text-sm font-semibold hover:bg-gold-dark transition-colors"
          >
            Schedule A Call
          </a>
          <div className="flex gap-4 mt-6 text-sm text-white/70">
            <a href="#" className="hover:text-gold">LinkedIn</a>
            <a href="#" className="hover:text-gold">YouTube</a>
            <a href="#" className="hover:text-gold">Instagram</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Full Pocket Coaching. All rights reserved.
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
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
