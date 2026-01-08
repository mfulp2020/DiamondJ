"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "/#menu", label: "Menu" },
  { href: "/#catering", label: "Catering" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#order", label: "Order" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#e4d6c4] bg-[#f7f1e7]/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="leading-tight">
              <div className="text-lg font-black tracking-tight text-[#2a1a12] sm:text-xl section-title">
                {site.name}
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b1482a]">
                Smoked BBQ & Catering
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="text-sm font-semibold text-[#5c3d2e] hover:text-[#2a1a12] transition"
              >
                {i.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${site.phonePrimary}`}
              className="hidden sm:inline-flex text-sm font-semibold text-[#5c3d2e] hover:text-[#2a1a12]"
            >
              {site.phonePrimary}
            </a>
            <Link
              href="/#contact"
              className="btn btn-primary px-4 py-2 text-xs"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="border-t border-neutral-200 md:hidden">
          <nav className="container flex justify-between py-2">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition"
              >
                {i.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-5 z-50 rounded-full bg-[#b1482a]/80 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-[#b1482a]/30 backdrop-blur transition hover:bg-[#b1482a] hover:opacity-100 opacity-75"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
          aria-label="Back to top"
        >
          ↑ Top
        </button>
      )}
    </>
  );
}
