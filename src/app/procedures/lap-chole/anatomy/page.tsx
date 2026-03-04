"use client";

import { useState } from "react";
import StickyTabs from "../_components/StickyTabs";
import LapCholeAnatomySVG from "../_components/LapCholeAnatomySVG";

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
  { name: "Rouvière's sulcus", note: "A 2–5 cm fissure on the inferior surface of the right hepatic lobe, sitting to the right of the hilum. It marks the approximate plane of the CBD, which lies inferior and posterior to it. During lap chole, stay superior and anterior to this landmark to avoid CBD injury." },
];

export default function LapCholeAnatomyPage() {
  const [view, setView] = useState<"illustrated" | "intraop">("illustrated");
  const [selected, setSelected] = useState<string | null>(null);

  const selectedItem = structures.find((s) => s.name === selected);

  return (
    <>
      <StickyTabs />

      <section className="pt-8">
        <h2 className="text-xl font-semibold">Relevant Anatomy</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Toggle between illustrated and intraoperative views. Click any structure chip to highlight it on the diagram.
        </p>

        <div className="mt-5 inline-flex rounded-xl border border-slate-200 p-1 text-sm">
          <button
            type="button"
            onClick={() => setView("illustrated")}
            className={[
              "rounded-lg px-3 py-1.5",
              view === "illustrated" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50",
            ].join(" ")}
          >
            Illustrated view
          </button>
          <button
            type="button"
            onClick={() => setView("intraop")}
            className={[
              "rounded-lg px-3 py-1.5",
              view === "intraop" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50",
            ].join(" ")}
          >
            Intraoperative view
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-medium text-slate-600">
                {view === "illustrated" ? "Illustrated anatomy" : "Intraoperative view (placeholder)"}
              </div>

              {view === "illustrated" ? (
                <LapCholeAnatomySVG selected={selected} />
              ) : (
                <div className="mt-3 flex h-[360px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-sm text-slate-500">
                  Add intraoperative labeled images here
                </div>
              )}
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-900">Structures you should be able to identify</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {structures.map((s) => {
                  const active = selected === s.name;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setSelected(active ? null : s.name)}
                      className={[
                        "rounded-full border px-3 py-1 text-xs",
                        active
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>

              {selectedItem && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <div className="font-medium text-slate-900">{selectedItem.name}</div>
                  <div className="mt-1">{selectedItem.note}</div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="text-sm font-semibold text-slate-900">Checklist</div>
            <p className="mt-1 text-xs text-slate-600">
              Quick self-check before scrubbing.
            </p>
            <div className="mt-4 space-y-3">
              {structures.map((s) => (
                <label key={s.name} className="flex items-start gap-2 text-sm text-slate-700">
                  <input type="checkbox" className="mt-1" />
                  <span>{s.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
