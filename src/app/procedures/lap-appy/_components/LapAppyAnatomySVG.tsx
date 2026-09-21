import { useId, type ReactNode } from "react";
import type { AppyStructure } from "./anatomy";

type Props = { selected: AppyStructure | null };
type Label = { name: AppyStructure; x: number; y: number; targetX: number; targetY: number };

const labels: Label[] = [
  { name: "Cecum", x: 24, y: 145, targetX: 172, targetY: 153 },
  { name: "Taenia coli", x: 24, y: 218, targetX: 213, targetY: 218 },
  { name: "Appendiceal base", x: 24, y: 303, targetX: 251, targetY: 282 },
  { name: "Appendix", x: 24, y: 373, targetX: 300, targetY: 355 },
  { name: "Terminal ileum", x: 396, y: 164, targetX: 363, targetY: 207 },
  { name: "Ileocecal junction", x: 396, y: 240, targetX: 281, targetY: 225 },
  { name: "Mesoappendix", x: 396, y: 303, targetX: 325, targetY: 280 },
  { name: "Appendiceal artery", x: 396, y: 365, targetX: 345, targetY: 326 },
];

function Layer({ name, selected, children }: { name: AppyStructure; selected: AppyStructure | null; children: ReactNode }) {
  return <g data-structure={name} opacity={selected && selected !== name ? 0.22 : 1} className="transition-opacity duration-200 motion-reduce:transition-none">{children}</g>;
}

export default function LapAppyAnatomySVG({ selected }: Props) {
  const id = useId();
  const stroke = (name: AppyStructure, base: string) => selected === name ? "#C17B2F" : base;

  return (
    <svg viewBox="0 0 600 600" role="img" aria-labelledby={`${id}-title ${id}-desc`} className="w-full h-auto rounded-md bg-parchment">
      <title id={`${id}-title`}>Appendectomy anatomy{selected ? `: ${selected} highlighted` : ""}</title>
      <desc id={`${id}-desc`}>An anterior schematic of the cecum, terminal ileum and exposed appendix. Taenia coli converge at the appendiceal base. The mesoappendix contains the appendiceal artery. A separate inset shows an appendix behind the cecum.</desc>
      <defs>
        <linearGradient id={`${id}-bowel`} x1="0" x2="1"><stop stopColor="#D7A995" /><stop offset="0.5" stopColor="#EDD0B8" /><stop offset="1" stopColor="#C58B78" /></linearGradient>
      </defs>
      <text x="24" y="30" className="fill-muted text-[10px] tracking-wider">ILEOCECAL REGION · ANTERIOR SCHEMATIC</text>
      <text x="24" y="49" className="fill-secondary text-[10px]">Patient’s right</text>
      <text x="576" y="49" textAnchor="end" className="fill-secondary text-[10px]">Medial</text>
      <Layer selected={selected} name="Cecum">
        <path d="M165 72 Q210 59 268 76 L279 178 Q298 208 282 249 Q275 279 250 288 Q198 316 167 278 Q142 251 153 219 Q135 190 150 163 Q136 133 153 114 Z" fill={`url(#${id}-bowel)`} stroke={stroke("Cecum", "#9E6D59")} strokeWidth={selected === "Cecum" ? 4 : 2} />
        <path d="M154 117 Q184 132 199 117 M149 162 Q176 178 194 164 M153 213 Q178 229 199 215 M164 261 Q185 277 210 264 M227 122 Q252 136 274 123 M232 174 Q255 185 278 175" fill="none" stroke="#B37F6B" strokeWidth="2" />
      </Layer>
      <Layer selected={selected} name="Terminal ileum">
        <path d="M410 168 C369 159 370 190 336 195 L279 205 L279 241 L340 231 C374 230 386 199 417 203 Z" fill={`url(#${id}-bowel)`} stroke={stroke("Terminal ileum", "#9E6D59")} strokeWidth={selected === "Terminal ileum" ? 4 : 2} />
        <path d="M344 194 L349 229 M372 180 L385 211 M400 167 L407 201" stroke="#B37F6B" strokeWidth="1.5" />
      </Layer>
      <Layer selected={selected} name="Mesoappendix">
        <path d="M333 233 Q370 269 365 309 Q358 344 326 358 L255 288 Q297 265 333 233 Z" fill="#DFC18A" stroke={stroke("Mesoappendix", "#B79A62")} strokeWidth={selected === "Mesoappendix" ? 4 : 1.5} />
        <path d="M334 241 L280 294 M342 258 L297 311 M352 283 L316 327" stroke="#B79A62" strokeWidth="1" opacity="0.5" />
      </Layer>
      <Layer selected={selected} name="Appendix">
        <path d="M242 283 C250 315 277 340 303 368 C322 391 351 378 345 359 C342 348 330 350 324 355 C303 333 279 310 261 280 Z" fill={`url(#${id}-bowel)`} stroke={stroke("Appendix", "#9E6D59")} strokeWidth={selected === "Appendix" ? 4 : 2} />
      </Layer>
      <Layer selected={selected} name="Taenia coli">
        <path d="M204 75 Q216 157 211 217 Q211 260 251 282 M262 81 Q251 157 266 210 Q275 255 251 282" fill="none" stroke={stroke("Taenia coli", "#A67944")} strokeWidth={selected === "Taenia coli" ? 6 : 4} strokeLinecap="round" />
        <path d="M169 82 Q178 174 173 233 Q179 275 251 282" fill="none" stroke={stroke("Taenia coli", "#A67944")} strokeWidth="3" strokeDasharray="5 5" />
      </Layer>
      <Layer selected={selected} name="Appendiceal artery">
        <path d="M340 238 Q365 274 351 312 Q343 334 329 350 M352 297 L302 322 M355 275 L288 306 M345 326 L316 338" fill="none" stroke={stroke("Appendiceal artery", "#8B3A3A")} strokeWidth={selected === "Appendiceal artery" ? 5 : 3} strokeLinecap="round" strokeLinejoin="round" />
      </Layer>
      <Layer selected={selected} name="Ileocecal junction"><ellipse cx="281" cy="224" rx="8" ry="19" fill="none" stroke={stroke("Ileocecal junction", "#936F59")} strokeWidth={selected === "Ileocecal junction" ? 5 : 2} /></Layer>
      <Layer selected={selected} name="Appendiceal base"><ellipse cx="252" cy="284" rx="13" ry="8" transform="rotate(-20 252 284)" fill="none" stroke={stroke("Appendiceal base", "#8B3A3A")} strokeWidth={selected === "Appendiceal base" ? 5 : 2} /></Layer>
      {labels.map(({ name, x, y, targetX, targetY }) => (
        <Layer selected={selected} key={name} name={name}>
          <path d={x < 300 ? `M${x + 8} ${y + 7} H135 L${targetX} ${targetY}` : `M${x - 8} ${y + 7} L${targetX} ${targetY}`} fill="none" stroke={selected === name ? "#C17B2F" : "#9E8E7E"} strokeWidth="1" />
          <circle cx={targetX} cy={targetY} r="2.5" fill={selected === name ? "#C17B2F" : "#6B5E50"} />
          <text x={x} y={y} className="font-serif italic text-[13px]" fill={selected === name ? "#C17B2F" : "#6B5E50"}>{name}</text>
        </Layer>
      ))}
      <line x1="24" y1="410" x2="576" y2="410" stroke="#C9BBAA" />
      <Layer selected={selected} name="Retrocecal position">
        <rect x="24" y="430" width="552" height="147" rx="8" fill="#EDE5D8" stroke={stroke("Retrocecal position", "#C9BBAA")} strokeWidth={selected === "Retrocecal position" ? 2 : 1} />
        <path d="M74 449 Q115 438 150 451 L156 512 Q154 551 119 552 Q75 552 75 518 Z" fill="#D7A995" fillOpacity="0.55" stroke="#9E6D59" strokeWidth="1.5" />
        <path d="M127 540 Q146 520 133 499 Q118 480 132 465" fill="none" stroke={stroke("Retrocecal position", "#8B3A3A")} strokeWidth="8" strokeDasharray="6 4" strokeLinecap="round" />
        <text x="195" y="460" className="font-serif italic text-[16px] fill-ink">Retrocecal position</text>
        <text x="195" y="487" className="text-[12px] fill-secondary">Alternative position, behind the cecum.</text>
        <text x="195" y="509" className="text-[12px] fill-secondary">Dashed appendix shows the hidden course.</text>
        <text x="195" y="540" className="text-[11px] fill-muted">Cecum shown translucent for orientation.</text>
      </Layer>
    </svg>
  );
}
