"use client";

import SourceCitations from "@/app/components/SourceCitations";
import type { ClinicalSourceId } from "@/app/lib/clinicalSources";


import { useState } from "react";
import LapCholeAtlasSVG from "../_components/LapCholeAtlasSVG";
import LapCholeIntraopView, { STRUCTURE_COLORS } from "../_components/LapCholeIntraopView";

type Structure = {
  sources: ClinicalSourceId[];
  name: string;
  note: string;
};

const structures: Structure[] = [
  { name: "Gallbladder fundus", sources: ["choleTechnique"], note: "The rounded inferior tip, retracted superiorly during lap chole to expose the RUQ." },
  { name: "Infundibulum", sources: ["choleTechnique", "hartmann"], note: "The widened pouch at the neck; grasped for lateral traction to open Calot's triangle." },
  { name: "Cystic duct", sources: ["cvs"], note: "One of the two structures confirmed in the Critical View of Safety (CVS)." },
  { name: "Cystic artery", sources: ["choleTechnique", "cvs"], note: "Typically a branch of the right hepatic artery; clipped and divided after CVS." },
  { name: "Common hepatic duct (CHD)", sources: ["cvs"], note: "Forms the medial border of Calot's triangle; avoid mistaking it for the cystic duct." },
  { name: "Common bile duct (CBD)", sources: ["safeChole"], note: "Most feared injury in lap chole; confirm CVS before clipping anything." },
  { name: "Inferior liver edge", sources: ["cvs"], note: "Forms the superior border of Calot's triangle." },
  { name: "Calot's triangle", sources: ["cvs", "gupta"], note: "The hepatocystic triangle is bounded by the common hepatic duct, cystic duct, and inferior liver edge. Often called Calot's triangle clinically, it differs from the original description, whose superior boundary was the cystic artery." },
  { name: "Rouvière's sulcus", sources: ["rouviere", "safeChole"], note: "A 2-5 cm fissure on the inferior surface of the right hepatic lobe, sitting to the right of the hilum. Marks the approximate plane of the CBD. This is an orientation landmark, not a substitute for confirming all three CVS criteria." },
];

export default function LapCholeAnatomyPage() {
  const [view, setView] = useState<"illustrated" | "intraop">("illustrated");
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const selectedItem = structures.find((s) => s.name === selected);
  const accentColor = selected && view === "intraop" ? (STRUCTURE_COLORS[selected] ?? null) : null;

  function toggleChecked(name: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">

      {/* Left: image + chips + info card */}
      <div className="lg:col-span-2 flex flex-col gap-4">

        {/* Toggle */}
        <div
          className="inline-flex self-start rounded-lg overflow-hidden text-sm"
          style={{ border: "0.5px solid var(--color-border-warm)" }}
        >
          <button
            type="button"
            onClick={() => setView("illustrated")}
            className={`px-3.5 py-1.5 transition-colors ${
              view === "illustrated"
                ? "bg-ochre text-parchment font-medium"
                : "text-muted hover:text-secondary bg-transparent"
            }`}
          >
            Illustrated
          </button>
          <button
            type="button"
            onClick={() => setView("intraop")}
            className={`px-3.5 py-1.5 transition-colors ${
              view === "intraop"
                ? "bg-ochre text-parchment font-medium"
                : "text-muted hover:text-secondary bg-transparent"
            }`}
          >
            Intraoperative
          </button>
        </div>

        {/* Image panel */}
        <div className="rounded-2xl border border-border-warm bg-card p-4">
          <div className="text-[11px] text-muted mb-3 uppercase tracking-wider">
            {view === "illustrated" ? "Illustrated anatomy" : "Intraoperative view — real OR images"}
          </div>
          {view === "illustrated" ? (
            <LapCholeAtlasSVG selected={selected} />
          ) : (
            <LapCholeIntraopView selected={selected} />
          )}
        </div>

        <SourceCitations sources={["choleTechnique", "cvs", "rouviere"]} />

        {/* Chips */}
        <div className="rounded-2xl border border-border-warm bg-card p-4">
          <div className="text-[11px] text-muted uppercase tracking-wider mb-3">
            Structures to identify
          </div>
          <div className="flex flex-wrap gap-2">
            {structures.map((s) => {
              const active = selected === s.name;
              const color = view === "intraop" ? (STRUCTURE_COLORS[s.name] ?? null) : null;

              return (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setSelected(active ? null : s.name)}
                  className="rounded-full px-3 py-1 text-xs transition-colors border"
                  style={
                    active && color
                      ? { backgroundColor: color, borderColor: color, color: "#fff" }
                      : color
                      ? { borderColor: color, color: color, backgroundColor: "transparent" }
                      : active
                      ? { backgroundColor: "var(--color-ochre)", borderColor: "var(--color-ochre)", color: "var(--color-parchment)" }
                      : { borderColor: "var(--color-border-warm)", color: "var(--color-secondary)", backgroundColor: "transparent" }
                  }
                >
                  {s.name}
                </button>
              );
            })}
          </div>

          {/* Info card */}
          {selectedItem && (
            <div
              className="mt-4 rounded-md border-l-[3px] p-3"
              style={{
                borderLeftColor: accentColor ?? "var(--color-ochre)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <div className="text-[10px] text-muted uppercase tracking-wider mb-1">
                Selected structure
              </div>
              <div className="font-sans tracking-tight text-[16px] text-ink mb-1">
                {selectedItem.name}
              </div>
              <p className="text-[14px] text-secondary leading-relaxed">
                {selectedItem.note}
              </p>
              <SourceCitations sources={selectedItem.sources} />
            </div>
          )}
        </div>
      </div>

      {/* Right: checklist */}
      <div className="rounded-2xl border border-border-warm bg-card p-4 self-start">
        <div className="flex items-center justify-between mb-1">
          <div className="text-[11px] text-muted uppercase tracking-wider">
            Pre-scrub checklist
          </div>
          <div className="text-[11px] text-ochre font-medium">
            {checked.size} / {structures.length}
          </div>
        </div>
        <p className="text-[13px] text-muted mb-4">
          Can you identify each structure?
        </p>

        <div className="flex flex-col">
          {structures.map((s) => {
            const done = checked.has(s.name);
            return (
              <div
                key={s.name}
                onClick={() => toggleChecked(s.name)}
                className="flex items-center gap-2.5 py-2 cursor-pointer border-b border-border-warm last:border-0"
              >
                <div
                  className="w-4 h-4 rounded-[3px] flex-shrink-0 flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: done ? "var(--color-ochre)" : "transparent",
                    border: done ? "none" : "1.5px solid var(--color-border-warm)",
                  }}
                >
                  {done && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="var(--color-parchment)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className={`text-[13px] leading-snug ${done ? "line-through text-muted" : "text-ink"}`}>
                  {s.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* CVS callout */}
        <div className="mt-4 rounded-md p-3 border border-cvs-border bg-cvs-light">
          <div className="text-[11px] text-cvs font-medium mb-1">CVS criteria</div>
          <p className="text-[11px] text-cvs leading-snug">
            Before clipping or division, confirm all three: a cleared hepatocystic triangle, the lower third of the gallbladder separated from the cystic plate, and only two structures entering the gallbladder.
          </p>
          <SourceCitations sources={["cvs"]} />
        </div>
      </div>

    </div>
  );
}