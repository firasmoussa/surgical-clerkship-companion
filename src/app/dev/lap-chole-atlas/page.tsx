"use client";

import Link from "next/link";
import { useState } from "react";
import LapCholeAnatomySVG from "../../procedures/lap-chole/_components/LapCholeAnatomySVG";
import LapCholeAtlasSVG, { atlasStructures } from "../../procedures/lap-chole/_components/LapCholeAtlasSVG";

export default function LapCholeAtlasPreviewPage() {
  const [version, setVersion] = useState<"atlas" | "current">("atlas");
  const [selected, setSelected] = useState<string | null>(null);
  const [enlarged, setEnlarged] = useState(false);

  return (
    <section className="py-6">
      <Link href="/procedures/lap-chole/anatomy" className="text-[12px] text-secondary underline underline-offset-4 hover:text-ochre">Back to lap chole anatomy</Link>
      <div className="mt-5 mb-6">
        <p className="mb-1 text-[11px] uppercase tracking-wider text-muted">Illustration study</p>
        <h1 className="font-serif italic text-[26px] text-ink font-normal">Laparoscopic cholecystectomy</h1>
        <p className="mt-2 text-[13px] text-secondary leading-relaxed">The appendectomy atlas style, applied to the biliary anatomy. Switch versions to compare the illustrations.</p>
      </div>
      <div className="mb-4 inline-flex overflow-hidden rounded-[5px] border border-border-warm" aria-label="Illustration version">
        {(["atlas", "current"] as const).map((value) => (
          <button key={value} type="button" aria-pressed={version === value} onClick={() => setVersion(value)} className={`px-3.5 py-1.5 text-[13px] transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink ${version === value ? "bg-ochre text-parchment font-medium" : "text-secondary hover:bg-surface"}`}>
            {value === "atlas" ? "Atlas preview" : "Current illustration"}
          </button>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
        <figure className="min-w-0 self-start rounded-lg border border-border-warm bg-surface p-4">
          <figcaption className="mb-3 flex items-center justify-between gap-3 text-[11px] text-muted uppercase tracking-wider">
            <span>{version === "atlas" ? "Warm atlas illustration" : "Existing illustration"}</span>
            <span>Lap chole</span>
          </figcaption>
          <button type="button" aria-pressed={enlarged} onClick={() => setEnlarged((previous) => !previous)} className="mb-3 rounded-[6px] border border-border-warm px-3 py-1.5 text-[12px] text-secondary focus-visible:outline-2 focus-visible:outline-ochre sm:hidden">{enlarged ? "Fit illustration" : "Enlarge illustration"}</button>
          <div tabIndex={0} role="region" aria-label="Illustration preview" className="overflow-x-auto rounded-md focus-visible:outline-2 focus-visible:outline-ochre">
            <div className={enlarged ? "w-[760px] sm:w-auto" : "w-full"}>
              {version === "atlas" ? <LapCholeAtlasSVG selected={selected} /> : <LapCholeAnatomySVG selected={selected} />}
            </div>
          </div>
          {enlarged && <p className="mt-2 text-[11px] text-secondary sm:hidden">Scroll horizontally to explore the enlarged illustration.</p>}
          <p className="mt-3 text-[11px] text-secondary leading-relaxed">Illustrated schematic. This preview is separate from the current anatomy page and its intraoperative views.</p>
        </figure>
        <aside className="rounded-lg border border-border-warm p-4 self-start">
          <h2 className="text-[11px] text-muted uppercase tracking-wider">Structures to identify</h2>
          <p className="mt-2 mb-4 text-[12px] text-secondary leading-relaxed">Select a structure to isolate it. Selection carries across both versions.</p>
          <div className="flex flex-wrap gap-2">
            {atlasStructures.map((name) => (
              <button key={name} type="button" aria-pressed={selected === name} onClick={() => setSelected(selected === name ? null : name)} className={`rounded-full border px-3 py-1.5 text-left text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre ${selected === name ? "bg-ochre border-ochre text-parchment" : "border-border-warm text-secondary hover:bg-surface"}`}>{name}</button>
            ))}
          </div>
          <div aria-live="polite" aria-atomic="true" className="mt-4 rounded-md border-l-[3px] border-ochre bg-surface p-3">
            <p className="mb-1 text-[10px] uppercase tracking-wider text-muted">{selected ? "Selected structure" : "Overview"}</p>
            <p className="font-serif italic text-[16px] font-normal text-ink">{selected ?? "All landmarks visible"}</p>
          </div>
          {selected && <button type="button" onClick={() => setSelected(null)} className="mt-3 text-[12px] text-secondary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ochre">Show all structures</button>}
        </aside>
      </div>
    </section>
  );
}
