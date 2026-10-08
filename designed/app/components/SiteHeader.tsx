"use client";

import { useState } from "react";

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

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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

        {/* desktop nav */}
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

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-white md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="h-6 w-6 fill-none stroke-current stroke-2"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="border-t border-white/10 bg-[#001D40] md:hidden">
          <nav className="mx-auto max-w-6xl px-6 py-4">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-white/10 py-1">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-white"
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className="pb-2 pl-4">
                    {item.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-[13px] text-white/65"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-5 block bg-[#D4AF37] px-6 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.14em] text-[#001D40]"
            >
              Connect
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
