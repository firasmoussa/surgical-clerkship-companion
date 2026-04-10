"use client";
import { useState } from "react";
import StickyTabs from "../_components/StickyTabs";
const structures = [
  { name: "Appendix", note: "A blind-ended tube arising from the posteromedial cecum. Typically 6-9 cm long. Variable position -- most commonly pelvic or retrocecal." },
  { name: "Appendiceal base", note: "The junction of the appendix and cecum. The clip or staple line is placed here. Confirm healthy tissue at the base before firing." },
  { name: "Mesoappendix", note: "The peritoneal fold attaching the appendix to the mesentery of the terminal ileum. Contains the appendiceal artery." },
  { name: "Appendiceal artery", note: "A branch of the ileocolic artery, running within the mesoappendix. Division controls the main bleeding risk during appendectomy." },
  { name: "Terminal ileum", note: "The last segment of small bowel entering the cecum. Must be identified to confirm cecal anatomy. Inspect for Meckel's diverticulum if the appendix looks grossly normal." },
  { name: "Ileocecal junction", note: "The transition from terminal ileum to cecum. A key orientation landmark -- the appendix arises just distal and inferior to this junction." },
  { name: "Cecum", note: "The blind pouch of the large intestine where the appendix originates. Mobilization is required to expose retrocecal appendices." },
  { name: "Taenia coli", note: "Three longitudinal bands of smooth muscle on the colon wall that converge at the appendiceal base. Following the taenia reliably leads to the appendix." },
  { name: "Retrocecal position", note: "In ~30% of patients the appendix lies behind the cecum. Requires medial rotation of the cecum after incising its lateral peritoneal attachments." },
];
const CHIP_COLORS: Record<string, string> = {
  "Appendix": "#dc2626",
  "Appendiceal base": "#b91c1c",
  "Mesoappendix": "#d97706",
  "Appendiceal artery": "#ef4444",
  "Terminal ileum": "#7c3aed",
  "Ileocecal junction": "#6d28d9",
  "Cecum": "#b45309",
  "Taenia coli": "#92400e",
  "Retrocecal position": "#475569",
};
const checklistItems = [
  "Identify the cecum",
  "Follow the taenia coli to the appendiceal base",
  "Identify the terminal ileum and ileocecal junction",
  "Expose the mesoappendix",
  "Locate the appendiceal artery within the mesoappendix",
  "Confirm the appendix is not retrocecal (or mobilize if it is)",
  "Confirm base is viable before stapling or clipping",
];
export default function LapAppyAnatomyPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const selectedItem = structures.find((s) => s.name === selected);
  const accentColor = selected ? (CHIP_COLORS[selected] ?? "#0f172a") : null;
  function toggleCheck(item: string) {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  }
  return (
    <>
      <StickyTabs />
      <section className="pt-8">
        <h2 className="text-xl font-semibold">Relevant Anatomy</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Click any structure chip to highlight it and read the clinical note.</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-900">Structures you should be able to identify</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {structures.map((s) => {
                  const active = selected === s.name;
                  const color = CHIP_COLORS[s.name] ?? "#0f172a";
                  return (
                    <button key={s.name} type="button" onClick={() => setSelected(active ? null : s.name)} className="rounded-full border px-3 py-1 text-xs transition-colors" style={active ? { backgroundColor: color, borderColor: color, color: "#fff" } : { borderColor: color, color: color, backgroundColor: "transparent" }}>
                      {s.name}
                    </button>
                  );
                })}
              </div>
              {selectedItem && (
                <div className="mt-4 rounded-xl border p-3 text-sm" style={{ borderColor: accentColor ?? "#e2e8f0", backgroundColor: accentColor ? `${accentColor}12` : "#f8fafc" }}>
                  <div className="font-semibold text-slate-900">{selectedItem.name}</div>
                  <div className="mt-1 text-slate-700 leading-relaxed">{selectedItem.note}</div>
                </div>
              )}
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <span className="font-semibold">Note: </span>Interactive anatomy diagram coming soon.
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="text-sm font-semibold text-slate-900">Pre-scrub checklist</div>
            <p className="mt-1 text-xs text-slate-500">Can you identify each of these intraoperatively?</p>
            <ul className="mt-4 space-y-2">
              {checklistItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <button type="button" onClick={() => toggleCheck(item)} className={["mt-0.5 h-4 w-4 flex-shrink-0 rounded border transition-colors", checked[item] ? "bg-slate-900 border-slate-900" : "border-slate-300 bg-white"].join(" ")}>
                    {checked[item] && <svg viewBox="0 0 12 12" fill="none" className="w-full h-full p-0.5"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </button>
                  <span className={["text-xs leading-snug", checked[item] ? "text-slate-400 line-through" : "text-slate-700"].join(" ")}>{item}</span>
                </li>
              ))}
            </ul>
            {Object.values(checked).filter(Boolean).length === checklistItems.length && (
              <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-3 text-xs text-green-800 font-medium">You are ready to scrub.</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
