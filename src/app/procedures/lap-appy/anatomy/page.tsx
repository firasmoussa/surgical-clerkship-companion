"use client";

import { useState } from "react";
import LapAppyAnatomySVG from "../_components/LapAppyAnatomySVG";
import { structures, type AppyStructure } from "../_components/anatomy";

// Keep selection independent of the illustration so a licensed photo view can reuse it.
export default function LapAppyAnatomyPage() {
  const [enlarged, setEnlarged] = useState(false);
  const [selected, setSelected] = useState<AppyStructure | null>(null);
  const [checked, setChecked] = useState<Set<AppyStructure>>(new Set());
  const selectedItem = structures.find((s) => s.name === selected);

  function toggleChecked(name: AppyStructure) {
    setChecked((previous) => {
      const next = new Set(previous);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 min-w-0 flex flex-col gap-4">
        <div className="self-start rounded-[5px] border border-ochre bg-ochre px-3.5 py-1.5 text-sm font-medium text-parchment">Illustrated</div>
        <figure className="rounded-lg border border-border-warm bg-surface p-4">
          <figcaption className="text-[11px] text-muted mb-3 uppercase tracking-wider">Illustrated anatomy</figcaption>
          <button
            type="button"
            aria-pressed={enlarged}
            aria-controls="anatomy-illustration"
            onClick={() => setEnlarged((previous) => !previous)}
            className="mb-3 rounded-[6px] border border-border-warm px-3 py-1.5 text-[12px] text-secondary focus-visible:outline-2 focus-visible:outline-ochre sm:hidden"
          >
            {enlarged ? "Fit illustration" : "Enlarge illustration"}
          </button>
          <div id="anatomy-illustration" role="region" aria-label="Anatomy illustration" tabIndex={0} className="overflow-x-auto rounded-md focus-visible:outline-2 focus-visible:outline-ochre">
            <div className={enlarged ? "w-[600px] sm:w-auto" : "w-full"}>
              <LapAppyAnatomySVG selected={selected} />
            </div>
          </div>
          {enlarged && <p className="mt-2 text-[11px] text-secondary sm:hidden">Scroll horizontally to explore the enlarged illustration.</p>}
          <p className="mt-3 text-[11px] text-secondary leading-relaxed">Schematic, not to scale. Appendix and mesoappendix spread for teaching. The inset shows the alternative retrocecal position.</p>
        </figure>
        <section aria-labelledby="structure-heading" className="rounded-lg border border-border-warm p-4">
          <h2 id="structure-heading" className="text-[11px] text-muted uppercase tracking-wider mb-2">Structures to identify</h2>
          <p className="mb-3 text-[12px] text-secondary">Select a structure to highlight it. Select it again to show all anatomy.</p>
          <div className="flex flex-wrap gap-2">
            {structures.map((s) => (
              <button key={s.name} type="button" aria-pressed={selected === s.name} aria-controls="structure-note" onClick={() => setSelected(selected === s.name ? null : s.name)} className={`rounded-full px-3 py-1 text-xs transition-colors border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre ${selected === s.name ? "bg-ochre border-ochre text-parchment" : "border-border-warm text-secondary bg-transparent hover:bg-surface"}`}>{s.name}</button>
            ))}
          </div>
          <div id="structure-note" aria-live="polite" aria-atomic="true" className="mt-4 rounded-md border-l-[3px] border-ochre bg-surface p-3">
            <div className="text-[10px] text-muted uppercase tracking-wider mb-1">{selectedItem ? "Selected structure" : "Orientation"}</div>
            <h3 className="font-serif italic font-normal text-[16px] text-ink mb-1">{selectedItem?.name ?? "Find the base first"}</h3>
            <p className="text-[13px] text-secondary leading-relaxed">{selectedItem?.note ?? "Follow the taenia coli toward their convergence at the appendiceal base, then trace the appendix and its mesoappendix."}</p>
          </div>
        </section>
        <p className="text-[11px] text-muted leading-relaxed">Anatomy reference: <a className="underline underline-offset-2 hover:text-secondary" href="https://www.ncbi.nlm.nih.gov/books/NBK459205/">StatPearls: Anatomy, Abdomen and Pelvis, Appendix</a>. Illustrated view only; no intraoperative photographs are included.</p>
      </div>
      <aside className="rounded-lg border border-border-warm p-4 self-start" aria-labelledby="checklist-heading">
        <div className="flex items-center justify-between gap-3 mb-1">
          <h2 id="checklist-heading" className="text-[11px] text-muted uppercase tracking-wider">Pre-scrub checklist</h2>
          <span className="text-[11px] text-ochre font-medium" aria-live="polite">{checked.size} / {structures.length}</span>
        </div>
        <p className="text-[11.5px] text-muted mb-4">Can you identify each structure and explain its relevance?</p>
        <div className="flex flex-col">
          {structures.map((s) => {
            const done = checked.has(s.name);
            return (
              <button key={s.name} type="button" role="checkbox" aria-checked={done} onClick={() => toggleChecked(s.name)} className="flex items-center gap-2.5 py-2.5 text-left border-b border-border-warm last:border-0 focus-visible:outline-2 focus-visible:outline-ochre focus-visible:outline-offset-2">
                <span aria-hidden="true" className={`w-4 h-4 rounded-[3px] shrink-0 flex items-center justify-center border transition-colors ${done ? "bg-ochre border-ochre" : "border-border-warm"}`}>
                  {done && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="#F5EFE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                <span className={`text-[11.5px] leading-snug ${done ? "line-through text-muted" : "text-ink"}`}>{s.name}</span>
              </button>
            );
          })}
        </div>
        {checked.size === structures.length && <p role="status" className="mt-4 text-[12px] text-ochre">Identification review complete.</p>}
        {checked.size > 0 && <button type="button" onClick={() => setChecked(new Set())} className="mt-3 text-[11px] text-secondary underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-ochre">Reset checklist</button>}
        <div className="mt-4 rounded-md p-3 border border-cvs-border bg-cvs-light">
          <h3 className="text-[11px] text-cvs font-medium mb-1">Before division</h3>
          <p className="text-[11px] text-cvs leading-snug">Confirm the appendiceal base, assess tissue viability, and identify adjacent bowel and the mesoappendiceal vessels with your supervising surgeon.</p>
        </div>
      </aside>
    </div>
  );
}
