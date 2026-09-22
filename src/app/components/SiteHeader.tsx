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
    <header className="border-b border-border-warm bg-card">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-3 focus:text-ink">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-5">
        <Link href="/" aria-label="ScrubReady home" className="self-start rounded-sm">
          <span className="block text-[26px] font-semibold tracking-[-0.05em] leading-none text-ink sm:text-[28px]">
            Scrub<span className="text-ochre">Ready</span>
          </span>
          <span className="mt-1 block text-[11px] text-muted">Your surgical clerkship field guide</span>
        </Link>
        <nav aria-label="Main navigation" className="flex w-full items-center gap-1 rounded-xl bg-parchment p-1 sm:w-auto sm:shrink-0">
          {navigation.map(({ label, href }) => {
            const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-lg px-4 py-2 text-[13px] font-medium transition-colors sm:flex-none ${active ? "bg-accent-soft text-ochre" : "text-secondary hover:bg-surface hover:text-ink"}`}>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
