"use client";

import { useState } from "react";
import LapCholeAnatomySVG from "../_components/LapCholeAnatomySVG";
import LapCholeIntraopView, { STRUCTURE_COLORS } from "../_components/LapCholeIntraopView";

type Structure = {
  name: string;
  note: string;
};

const structures: Structure[] = [
  { name: "Gallbladder fundus", note: "The rounded inferior tip, retracted superiorly during lap chole to expose the RUQ." },
  { name: "Infundibulum", note: "The widened pouch at the neck; grasped for lateral traction to open Calot's triangle." },
  { name: "Cystic duct", note: "One of the two structures confirmed in the Critical View of Safety (CVS)." },
  { name: "Cystic artery", note: "Typically a branch of the right hepatic artery; clipped and divided after CVS." },
  { name: "Common hepatic duct (CHD)", note: "Forms the medial border of Calot's triangle; avoid mistaking it for the cystic duct." },
  { name: "Common bile duct (CBD)", note: "Most feared injury in lap chole; confirm CVS before clipping anything." },
  { name: "Inferior liver edge", note: "Forms the superior border of Calot's triangle." },
  { name: "Calot's triangle", note: "Space bounded by CHD (medial), cystic duct (inferior), liver edge (superior). Apex points toward liver." },
  { name: "Rouvière's sulcus", note: "A 2-5 cm fissure on the inferior surface of the right hepatic lobe, sitting to the right of the hilum. Marks the approximate plane of the CBD. Stay superior and anterior to this landmark to avoid CBD injury." },
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
          className="inline-flex self-start rounded-[5px] overflow-hidden text-sm"
          style={{ border: "0.5px solid #C9BBAA" }}
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
        <div className="rounded-lg border border-border-warm bg-surface p-4">
          <div className="text-[11px] text-muted mb-3 uppercase tracking-wider">
            {view === "illustrated" ? "Illustrated anatomy" : "Intraoperative view — real OR images"}
          </div>
          {view === "illustrated" ? (
            <LapCholeAnatomySVG selected={selected} />
          ) : (
            <LapCholeIntraopView selected={selected} />
          )}
        </div>

        {/* Chips */}
        <div className="rounded-lg border border-border-warm p-4">
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
                      ? { backgroundColor: "#C17B2F", borderColor: "#C17B2F", color: "#F5EFE4" }
                      : { borderColor: "#C9BBAA", color: "#6B5E50", backgroundColor: "transparent" }
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
                borderLeftColor: accentColor ?? "#C17B2F",
                backgroundColor: "#EDE5D8",
              }}
            >
              <div className="text-[10px] text-muted uppercase tracking-wider mb-1">
                Selected structure
              </div>
              <div className="font-serif italic text-[16px] text-ink mb-1">
                {selectedItem.name}
              </div>
              <p className="text-[13px] text-secondary leading-relaxed">
                {selectedItem.note}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right: checklist */}
      <div className="rounded-lg border border-border-warm p-4 self-start">
        <div className="flex items-center justify-between mb-1">
          <div className="text-[11px] text-muted uppercase tracking-wider">
            Pre-scrub checklist
          </div>
          <div className="text-[11px] text-ochre font-medium">
            {checked.size} / {structures.length}
          </div>
        </div>
        <p className="text-[11.5px] text-muted mb-4">
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
                    backgroundColor: done ? "#C17B2F" : "transparent",
                    border: done ? "none" : "1.5px solid #C9BBAA",
                  }}
                >
                  {done && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="#F5EFE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className={`text-[11.5px] leading-snug ${done ? "line-through text-muted" : "text-ink"}`}>
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
            Two structures enter the gallbladder, and only two.
          </p>
        </div>
      </div>

    </div>
  );
}