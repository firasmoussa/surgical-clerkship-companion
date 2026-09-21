"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Procedures", href: "/procedures" },
  { label: "Contribute", href: "/submit" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border-warm bg-charcoal">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-parchment focus:px-4 focus:py-3 focus:text-ink focus:outline-2 focus:outline-ochre">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-5">
        <Link href="/" aria-label="Surgical Clerkship Companion home" className="self-start rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre">
          <span className="block font-serif italic text-[21px] font-normal leading-snug text-parchment sm:text-[23px]">
            Surgical Clerkship Companion
          </span>
          <span className="mt-1.5 block text-[10px] uppercase tracking-[0.14em] text-border-warm">
            A field guide for the surgery rotation
          </span>
        </Link>
        <nav aria-label="Main navigation" className="flex w-full items-center gap-1 border-t border-border-warm/20 pt-1 sm:w-auto sm:shrink-0 sm:border-0 sm:pt-0">
          {navigation.map(({ label, href }) => {
            const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 flex-1 items-center justify-center border-b-2 px-4 py-2.5 text-[13px] transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ochre sm:flex-none ${active ? "border-ochre text-parchment font-medium" : "border-transparent text-border-warm hover:border-border-warm/50 hover:text-parchment"}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
