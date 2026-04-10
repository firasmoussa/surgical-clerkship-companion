// src/app/procedures/lap-chole/_components/LapCholeIntraopView.tsx
//
// Images sourced from: Gupta V. "How to achieve the critical view of safety for safe
// laparoscopic cholecystectomy: Technical aspects." Ann Hepatobiliary Pancreat Surg.
// 2023;27(2):201-210. PMC10201064. CC BY-NC 4.0.

"use client";

import { useState, useEffect } from "react";

type HotSpot = {
  structure: string;
  label: string;
  x: number;
  y: number;
  color: string;
};

type Slide = {
  id: string;
  title: string;
  src: string;
  caption: string;
  credit: string;
  hotspots: HotSpot[];
};

const SLIDES: Slide[] = [
  {
    id: "field",
    title: "Surgical field — anterior view",
    src: "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/e58e/10201064/805d30719060/ahbps-27-2-201-f1.jpg",
    caption:
      "Anterior view of the hepatocystic triangle before dissection. The gallbladder fundus and infundibulum are retracted to expose Calot's triangle. Rouvière's sulcus is visible at the inferior liver edge, providing the key orientation landmark (R4U line).",
    credit: "Gupta V, Ann Hepatobiliary Pancreat Surg 2023 — CC BY-NC 4.0",
    hotspots: [
      { structure: "Gallbladder fundus",     label: "GB fundus",         x: 17.1, y: 6.6,  color: "#16a34a" },
      { structure: "Infundibulum",           label: "Infundibulum",      x: 18.1, y: 27.9, color: "#0e7490" },
      { structure: "Cystic duct",            label: "Cystic duct",       x: 32.2, y: 49.5, color: "#2563eb" },
      { structure: "Inferior liver edge",    label: "Liver edge",        x: 17.5, y: 62.9, color: "#92400e" },
      { structure: "Rouvière's sulcus",      label: "Rouvière's sulcus", x: 26.7, y: 44.2, color: "#7c3aed" },
      { structure: "Common bile duct (CBD)", label: "CBD",               x: 37.6, y: 67.9, color: "#b45309" },
    ],
  },
  {
    id: "cvs",
    title: "Critical View of Safety achieved",
    src: "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/e58e/10201064/457a7548d280/ahbps-27-2-201-f6.jpg",
    caption:
      "Panel F: Critical View of Safety (CVS) fully achieved. The hepatocystic triangle is cleared of all fat and fibrous tissue. Only two tubular structures — the cystic duct and cystic artery — remain attached to the gallbladder, with the cystic plate visible superiorly.",
    credit: "Gupta V, Ann Hepatobiliary Pancreat Surg 2023 — CC BY-NC 4.0",
    hotspots: [
      { structure: "Cystic duct",   label: "Cystic duct",   x: 85.1, y: 85.9, color: "#2563eb" },
      { structure: "Cystic artery", label: "Cystic artery", x: 88,   y: 81.5, color: "#dc2626" },
    ],
  },
  {
    id: "calot",
    title: "Calot's triangle dissected",
    src: "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/e58e/10201064/819a0bb42a70/ahbps-27-2-201-f7.jpg",
    caption:
      "Fig 7C: Calot's triangle fully dissected. The cystic artery and cystic duct are clearly separated and ready for clipping.",
    credit: "Gupta V, Ann Hepatobiliary Pancreat Surg 2023 — CC BY-NC 4.0",
    hotspots: [
      { structure: "Cystic artery", label: "Cystic artery", x: 55.3, y: 58,   color: "#dc2626" },
      { structure: "Cystic duct",   label: "Cystic duct",   x: 52.6, y: 73.1, color: "#2563eb" },
    ],
  },
];

// Exported so page.tsx can colour the chip buttons to match the dots
export const STRUCTURE_COLORS: Record<string, string> = {
  "Gallbladder fundus":         "#16a34a",
  "Infundibulum":               "#0e7490",
  "Cystic duct":                "#0f766e",
  "Cystic artery":              "#b91c1c",
  "Common hepatic duct (CHD)":  "#166534",
  "Common bile duct (CBD)":     "#b45309",
  "Inferior liver edge":        "#92400e",
  "Calot's triangle":           "#a16207",
  "Rouvière's sulcus":          "#7c3aed",
};

const STRUCTURE_TO_SLIDE: Record<string, string> = {
  "Gallbladder fundus":         "field",
  "Infundibulum":               "cvs",
  "Cystic duct":                "cvs",
  "Cystic artery":              "cvs",
  "Common hepatic duct (CHD)":  "calot",
  "Common bile duct (CBD)":     "field",
  "Inferior liver edge":        "field",
  "Calot's triangle":           "calot",
  "Rouvière's sulcus":          "field",
};

export default function LapCholeIntraopView({ selected }: { selected: string | null }) {
  const [activeSlideId, setActiveSlideId] = useState<string>(SLIDES[0].id);

  useEffect(() => {
    if (!selected) return;
    const currentSlide = SLIDES.find((s) => s.id === activeSlideId);
    const alreadyVisible = currentSlide?.hotspots.some((h) => h.structure === selected);
    if (!alreadyVisible) {
      const target = STRUCTURE_TO_SLIDE[selected];
      if (target) setActiveSlideId(target);
    }
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  const slide = SLIDES.find((s) => s.id === activeSlideId) ?? SLIDES[0];

  return (
    <div className="mt-3 space-y-3">
      {/* Slide tabs */}
      <div className="flex gap-2 flex-wrap">
        {SLIDES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveSlideId(s.id)}
            className={[
              "rounded-lg border px-3 py-1 text-xs font-medium transition-colors",
              activeSlideId === s.id
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Image with hotspot overlays */}
      <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.src}
          alt={slide.title}
          className="w-full object-contain"
          style={{ maxHeight: 360 }}
        />

        {slide.hotspots.map((hs) => {
          const isActive = selected === hs.structure;
          const isDimmed = selected !== null && !isActive;

          return (
            <div
              key={hs.structure}
              className="absolute flex items-center gap-1 pointer-events-none"
              style={{
                left: `${hs.x}%`,
                top: `${hs.y}%`,
                transform: "translate(-50%, -50%)",
                transition: "opacity 0.25s ease",
                opacity: isDimmed ? 0.15 : 1,
              }}
            >
              <span
                className="inline-block rounded-full border-2 border-white shadow-md flex-shrink-0"
                style={{
                  width: isActive ? 16 : 8,
                  height: isActive ? 16 : 8,
                  backgroundColor: hs.color,
                  transition: "all 0.25s ease",
                }}
              />
              {isActive && (
                <span
                  className="rounded px-1.5 py-0.5 text-[11px] font-semibold text-white shadow-md whitespace-nowrap"
                  style={{ backgroundColor: hs.color }}
                >
                  {hs.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Caption */}
      <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600 leading-relaxed">
        <p>{slide.caption}</p>
        <p className="mt-2 text-[10px] text-slate-400 italic">{slide.credit}</p>
      </div>
    </div>
  );
}