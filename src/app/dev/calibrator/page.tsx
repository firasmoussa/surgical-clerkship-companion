"use client";

// src/app/dev/calibrator/page.tsx
// Dev-only tool for calibrating hotspot coordinates on intraop images.
// Navigate to /dev/calibrator while running locally.



import { useState, useRef } from "react";

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
};

const SLIDES: Slide[] = [
  {
    id: "field",
    title: "field — Surgical field anterior view",
    src: "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/e58e/10201064/805d30719060/ahbps-27-2-201-f1.jpg",
  },
  {
    id: "cvs",
    title: "cvs — Critical View of Safety achieved",
    src: "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/e58e/10201064/457a7548d280/ahbps-27-2-201-f6.jpg",
  },
  {
    id: "calot",
    title: "calot — Calot's triangle dissected",
    src: "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/e58e/10201064/819a0bb42a70/ahbps-27-2-201-f7.jpg",
  },
];

const STRUCTURE_OPTIONS: { label: string; structure: string; color: string }[] = [
  { structure: "Gallbladder fundus",     label: "GB fundus",         color: "#16a34a" },
  { structure: "Infundibulum",           label: "Infundibulum",      color: "#0e7490" },
  { structure: "Cystic duct",            label: "Cystic duct",       color: "#2563eb" },
  { structure: "Cystic artery",          label: "Cystic artery",     color: "#dc2626" },
  { structure: "Common hepatic duct (CHD)", label: "CHD",            color: "#9333ea" },
  { structure: "Common bile duct (CBD)", label: "CBD",               color: "#b45309" },
  { structure: "Inferior liver edge",    label: "Liver edge",        color: "#92400e" },
  { structure: "Calot's triangle",       label: "Calot's \u25b3",    color: "#a16207" },
  { structure: "Rouviere's sulcus",      label: "Rouviere's sulcus", color: "#7c3aed" },
];

type SlideHotspots = Record<string, HotSpot[]>;

const EMPTY_HOTSPOTS: SlideHotspots = {
  field: [],
  cvs: [],
  calot: [],
};

export default function CalibratorPage() {
  const [activeSlideId, setActiveSlideId] = useState<string>("field");
  const [hotspots, setHotspots] = useState<SlideHotspots>(EMPTY_HOTSPOTS);
  const [pendingStructure, setPendingStructure] = useState<string>(
    STRUCTURE_OPTIONS[0].structure
  );
  const [copied, setCopied] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const activeSlide = SLIDES.find((s) => s.id === activeSlideId)!;
  const activeHotspots = hotspots[activeSlideId];

  function handleImageClick(e: React.MouseEvent<HTMLDivElement>) {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = parseFloat((((e.clientX - rect.left) / rect.width) * 100).toFixed(1));
    const y = parseFloat((((e.clientY - rect.top) / rect.height) * 100).toFixed(1));

    const opt = STRUCTURE_OPTIONS.find((o) => o.structure === pendingStructure)!;

    const newHotspot: HotSpot = {
      structure: opt.structure,
      label: opt.label,
      x,
      y,
      color: opt.color,
    };

    setHotspots((prev) => ({
      ...prev,
      [activeSlideId]: [...prev[activeSlideId], newHotspot],
    }));
  }

  function removeHotspot(slideId: string, index: number) {
    setHotspots((prev) => ({
      ...prev,
      [slideId]: prev[slideId].filter((_, i) => i !== index),
    }));
  }

  function clearSlide() {
    setHotspots((prev) => ({ ...prev, [activeSlideId]: [] }));
  }

  function clearAll() {
    setHotspots(EMPTY_HOTSPOTS);
  }

  function buildOutput(): string {
    const lines: string[] = [];
    for (const slide of SLIDES) {
      const hs = hotspots[slide.id];
      if (hs.length === 0) continue;
      lines.push(`// ${slide.id}`);
      lines.push(`hotspots: [`);
      for (const h of hs) {
        lines.push(
          `  { structure: "${h.structure}", label: "${h.label}", x: ${h.x}, y: ${h.y}, color: "${h.color}" },`
        );
      }
      lines.push(`],`);
      lines.push(``);
    }
    return lines.join("\n");
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(buildOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const totalCount = Object.values(hotspots).reduce((sum, hs) => sum + hs.length, 0);

  return (
    <div className="py-8 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Hotspot Calibrator</h1>
        <p className="mt-1 text-sm text-slate-500">
          Dev only. Click the image to place a hotspot for the selected structure. Copy output and paste into{" "}
          <code className="text-xs bg-slate-100 px-1 rounded">LapCholeIntraopView.tsx</code>.
        </p>
      </div>

      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Slide picker */}
        <div className="flex gap-2">
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
              {s.id}
              {hotspots[s.id].length > 0 && (
                <span className="ml-1.5 rounded-full bg-blue-500 text-white text-[10px] px-1">
                  {hotspots[s.id].length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Structure picker */}
        <select
          value={pendingStructure}
          onChange={(e) => setPendingStructure(e.target.value)}
          className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-800 bg-white"
        >
          {STRUCTURE_OPTIONS.map((o) => (
            <option key={o.structure} value={o.structure}>
              {o.structure}
            </option>
          ))}
        </select>

        {/* Color preview */}
        <span
          className="inline-block w-3 h-3 rounded-full border border-white shadow"
          style={{
            backgroundColor:
              STRUCTURE_OPTIONS.find((o) => o.structure === pendingStructure)?.color ?? "#000",
          }}
        />

        <button
          type="button"
          onClick={clearSlide}
          className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
        >
          Clear slide
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="rounded-lg border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
        >
          Clear all
        </button>
      </div>

      {/* Image clickable area */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-black cursor-crosshair select-none"
        onClick={handleImageClick}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={activeSlide.src}
          alt={activeSlide.title}
          className="w-full object-contain pointer-events-none"
          style={{ maxHeight: 480 }}
          draggable={false}
        />

        {activeHotspots.map((hs, i) => {
          const opt = STRUCTURE_OPTIONS.find((o) => o.structure === hs.structure);
          return (
            <div
              key={i}
              className="absolute flex items-center gap-1"
              style={{
                left: `${hs.x}%`,
                top: `${hs.y}%`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            >
              <span
                className="inline-block rounded-full border-2 border-white shadow-md"
                style={{ width: 12, height: 12, backgroundColor: hs.color }}
              />
              <span
                className="rounded px-1 py-0.5 text-[10px] font-semibold text-white shadow whitespace-nowrap"
                style={{ backgroundColor: hs.color }}
              >
                {hs.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Hotspot list for active slide */}
      {activeHotspots.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {activeSlideId} hotspots
          </p>
          {activeHotspots.map((hs, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: hs.color }}
                />
                <span className="font-medium text-slate-700">{hs.structure}</span>
                <span className="text-slate-400">
                  x: {hs.x} y: {hs.y}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeHotspot(activeSlideId, i);
                }}
                className="text-slate-400 hover:text-red-500 font-medium ml-4"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Output */}
      {totalCount > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Output ({totalCount} hotspot{totalCount !== 1 ? "s" : ""})
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="rounded-xl border border-slate-200 bg-slate-950 text-green-400 text-xs p-4 overflow-x-auto whitespace-pre leading-relaxed">
            {buildOutput()}
          </pre>
        </div>
      )}
    </div>
  );
}