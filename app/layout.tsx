import type { Metadata } from "next";
import { Inter, Sofia_Sans, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./components/SiteHeader";

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
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
