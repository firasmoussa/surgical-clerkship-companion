"use client";

import { useId, type ReactNode } from "react";

export const atlasStructures = [
  "Gallbladder fundus",
  "Infundibulum",
  "Cystic duct",
  "Cystic artery",
  "Common hepatic duct (CHD)",
  "Common bile duct (CBD)",
  "Inferior liver edge",
  "Calot's triangle",
  "Rouvière's sulcus",
] as const;

type Structure = (typeof atlasStructures)[number];
type Props = { selected: string | null };
type Label = { name: Structure; lines: string[]; x: number; y: number; route: string; point: [number, number] };

const labels: Label[] = [
  { name: "Inferior liver edge", lines: ["Inferior liver edge"], x: 490, y: 69, route: "M490 79 H467 L461 222", point: [461, 222] },
  { name: "Rouvière's sulcus", lines: ["Rouvière’s sulcus"], x: 24, y: 230, route: "M32 240 H154 L250 223", point: [250, 223] },
  { name: "Cystic artery", lines: ["Cystic artery"], x: 24, y: 290, route: "M32 300 H159 L335 250", point: [335, 250] },
  { name: "Gallbladder fundus", lines: ["Gallbladder", "fundus"], x: 24, y: 381, route: "M32 406 H160 L239 366", point: [239, 366] },
  { name: "Infundibulum", lines: ["Infundibulum"], x: 180, y: 476, route: "M188 486 H299 L310 273", point: [310, 273] },
  { name: "Cystic duct", lines: ["Cystic duct"], x: 350, y: 476, route: "M358 486 H441 V376 L354 305", point: [354, 305] },
  { name: "Common hepatic duct (CHD)", lines: ["Common hepatic", "duct (CHD)"], x: 550, y: 265, route: "M540 279 H507 L390 265", point: [390, 265] },
  { name: "Calot's triangle", lines: ["Calot’s triangle"], x: 550, y: 337, route: "M540 347 H485 L371 278", point: [371, 278] },
  { name: "Common bile duct (CBD)", lines: ["Common bile", "duct (CBD)"], x: 550, y: 409, route: "M540 423 H489 L384 406", point: [384, 406] },
];

const gallbladder = "M318 257 C296 251 281 267 264 282 C244 301 223 310 214 334 C204 361 220 389 246 390 C275 391 292 369 295 343 C298 319 285 305 293 289 C300 281 316 282 325 275 C333 269 328 261 318 257 Z";
const liverEdge = "M195 211 Q235 233 283 217 Q326 226 370 217 Q415 230 461 222 Q517 231 566 214";

function Layer({ name, selected, children }: { name: Structure; selected: string | null; children: ReactNode }) {
  return (
    <g data-structure={name} opacity={selected && selected !== name ? 0.22 : 1} className="transition-opacity duration-200 motion-reduce:transition-none">
      {children}
    </g>
  );
}

export default function LapCholeAtlasSVG({ selected }: Props) {
  const id = useId();
  const active = atlasStructures.some((name) => name === selected) ? selected : null;
  const accent = (name: Structure, base: string) => active === name ? "#C17B2F" : base;
  const gallbladderSelected = active === "Gallbladder fundus" || active === "Infundibulum";

  return (
    <svg viewBox="0 0 760 540" role="img" aria-labelledby={`${id}-title ${id}-description`} className="h-auto w-full rounded-md bg-parchment">
      <title id={`${id}-title`}>Cholecystectomy atlas anatomy{active ? `: ${active} highlighted` : ""}</title>
      <desc id={`${id}-description`}>A schematic of the liver edge, gallbladder, cystic duct and artery, and extrahepatic bile ducts. Labels identify nine landmarks. The liver remains as orientation context while a selected structure is highlighted.</desc>
      <defs>
        <linearGradient id={`${id}-liver`} x1="0" y1="0" x2="0.8" y2="1">
          <stop stopColor="#E3BAA4" /><stop offset="0.5" stopColor="#C9917D" /><stop offset="1" stopColor="#A96959" />
        </linearGradient>
        <linearGradient id={`${id}-gallbladder`} x1="0" x2="1">
          <stop stopColor="#A4A078" /><stop offset="0.45" stopColor="#D8D1A6" /><stop offset="1" stopColor="#96956B" />
        </linearGradient>
      </defs>

      <text x="24" y="30" className="fill-muted text-[10px] tracking-wider">HEPATOBILIARY ANATOMY · SCHEMATIC</text>

      {/* The liver provides orientation; selection accents its inferior edge only. */}
      <path d="M151 107 C202 79 263 96 317 100 C384 95 443 97 511 116 C559 127 603 143 608 170 C613 190 593 204 566 214 Q517 231 461 222 Q415 230 370 217 Q326 226 283 217 Q235 233 195 211 C171 201 150 177 145 153 C142 134 144 119 151 107 Z" fill={`url(#${id}-liver)`} stroke="#9E6D59" strokeWidth="1.8" />
      <path d="M178 120 Q226 103 277 116 M188 136 Q220 123 249 129 M461 135 Q527 143 562 166" fill="none" stroke="#F0D7C2" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <text x="198" y="163" className="fill-parchment font-serif italic text-[16px]">Liver</text>

      <Layer name="Inferior liver edge" selected={active}>
        <path d={liverEdge} fill="none" stroke={accent("Inferior liver edge", "#9E6D59")} strokeWidth={active === "Inferior liver edge" ? 5 : 2} strokeLinecap="round" />
      </Layer>
      <Layer name="Rouvière's sulcus" selected={active}>
        <path d="M218 218 Q246 231 274 220 L285 215" fill="none" stroke="#825548" strokeWidth="7" strokeLinecap="round" />
        <path d="M218 216 Q246 227 274 217 L285 212" fill="none" stroke={accent("Rouvière's sulcus", "#D7AF96")} strokeWidth="3" strokeLinecap="round" />
        {active === "Rouvière's sulcus" && (
          <g>
            <path d="M205 201 H480 V219 H205 Z" fill="#D4E8DC" fillOpacity="0.4" />
            <path d="M205 220 H480" fill="none" stroke="#3D6B4F" strokeWidth="1.5" strokeDasharray="5 5" />
            <text x="486" y="210" className="fill-cvs text-[10px]">Sulcus reference plane</text>
          </g>
        )}
      </Layer>
      <Layer name="Calot's triangle" selected={active}>
        <path d="M392 221 L385 326 L326 271 Z" fill="#DFC18A" fillOpacity={active === "Calot's triangle" ? 0.65 : 0.3} stroke={accent("Calot's triangle", "#B79A62")} strokeWidth={active === "Calot's triangle" ? 2 : 1} strokeDasharray="4 4" />
        {active === "Calot's triangle" && (
          <g className="fill-ochre text-[10px]">
            <text x="349" y="213">Liver edge</text>
            <text x="402" y="246">CHD</text>
            <text x="315" y="329">Cystic duct</text>
          </g>
        )}
      </Layer>

      {/* Posterior vascular context is secondary to the selected cystic artery. */}
      <g opacity={active && active !== "Cystic artery" ? 0.16 : 0.5}>
        <path d="M492 306 C461 291 429 289 414 263 Q400 236 360 235" fill="none" stroke="#8B3A3A" strokeWidth="4" strokeLinecap="round" />
      </g>
      <Layer name="Common hepatic duct (CHD)" selected={active}>
        <path d="M347 164 Q367 196 392 221 M447 167 Q413 196 392 221" fill="none" stroke="#999B78" strokeWidth="11" strokeLinecap="round" />
        <path d="M392 221 Q388 270 385 326" fill="none" stroke={accent("Common hepatic duct (CHD)", "#858B64")} strokeWidth={active === "Common hepatic duct (CHD)" ? 15 : 12} strokeLinecap="round" />
        <path d="M389 226 L382 315" fill="none" stroke="#E3DDAD" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
      </Layer>
      <Layer name="Common bile duct (CBD)" selected={active}>
        <path d="M385 326 Q382 377 384 438" fill="none" stroke={accent("Common bile duct (CBD)", "#858B64")} strokeWidth={active === "Common bile duct (CBD)" ? 17 : 14} strokeLinecap="round" />
        <path d="M382 332 Q379 380 381 431" fill="none" stroke="#E3DDAD" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
      </Layer>
      <Layer name="Cystic duct" selected={active}>
        <path d="M325 271 Q343 285 354 305 Q364 319 385 326" fill="none" stroke={accent("Cystic duct", "#96956B")} strokeWidth={active === "Cystic duct" ? 13 : 10} strokeLinecap="round" />
        <path d="M329 270 Q345 287 357 305" fill="none" stroke="#E3DDAD" strokeWidth="2" opacity="0.7" />
      </Layer>
      <g opacity={active && !gallbladderSelected ? 0.22 : 1} className="transition-opacity duration-200 motion-reduce:transition-none">
        <path d={gallbladder} fill={`url(#${id}-gallbladder)`} stroke="#777A58" strokeWidth="1.8" />
        <path d="M257 299 Q231 319 229 342 Q227 360 239 372" fill="none" stroke="#F0E9C4" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
        <path data-structure="Gallbladder fundus" d="M214 334 C204 361 220 389 246 390 C269 391 288 374 293 352" fill="none" stroke="#C17B2F" strokeWidth="4" opacity={active === "Gallbladder fundus" ? 1 : 0} strokeLinecap="round" />
        <path data-structure="Infundibulum" d="M292 272 Q307 250 323 260 Q335 269 319 279 Q304 279 293 289" fill="#DFC18A" fillOpacity="0.35" stroke="#C17B2F" strokeWidth="3" opacity={active === "Infundibulum" ? 1 : 0} />
      </g>
      <Layer name="Cystic artery" selected={active}>
        <path d="M360 235 Q344 235 335 250 L320 266" fill="none" stroke={accent("Cystic artery", "#8B3A3A")} strokeWidth={active === "Cystic artery" ? 6 : 4} strokeLinecap="round" />
      </Layer>

      {labels.map(({ name, lines, x, y, route, point }) => (
        <Layer key={name} name={name} selected={active}>
          <path d={route} fill="none" stroke={accent(name, "#9E8E7E")} strokeWidth="1" />
          <circle cx={point[0]} cy={point[1]} r="2.5" fill={accent(name, "#6B5E50")} />
          <text x={x} y={y} fill={accent(name, "#6B5E50")} className="font-serif italic font-normal text-[14px]">
            {lines.map((line, index) => <tspan key={line} x={x} dy={index ? 17 : 0}>{line}</tspan>)}
          </text>
        </Layer>
      ))}
      <line x1="24" y1="510" x2="736" y2="510" stroke="#C9BBAA" />
      <text x="24" y="529" className="fill-muted text-[10px]">Schematic, not to scale. Structures spread for identification.</text>
      <text x="736" y="529" textAnchor="end" className="fill-muted font-serif italic text-[10px]">Surgical Clerkship Companion</text>
    </svg>
  );
}
