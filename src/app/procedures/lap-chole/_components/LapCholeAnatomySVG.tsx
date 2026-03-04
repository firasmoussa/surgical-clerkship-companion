// src/app/procedures/lap-chole/_components/LapCholeAnatomySVG.tsx

const structureMap: Record<string, string> = {
  "Gallbladder fundus": "gallbladder-fundus",
  "Infundibulum": "infundibulum",
  "Cystic duct": "cystic-duct",
  "Cystic artery": "cystic-artery",
  "Common hepatic duct (CHD)": "chd",
  "Common bile duct (CBD)": "cbd",
  "Inferior liver edge": "liver-edge",
  "Calot's triangle": "calots-triangle",
  "Rouvière's sulcus": "rouvieres-sulcus",
};

const colors: Record<string, { base: string; highlight: string; label: string }> = {
  "gallbladder-fundus": { base: "#4a8c5c", highlight: "#1f5c35", label: "#1f5c35" },
  "infundibulum":       { base: "#3d7a50", highlight: "#1a4f2e", label: "#1a4f2e" },
  "cystic-duct":        { base: "#2d6e40", highlight: "#1a4f2e", label: "#1a4f2e" },
  "cystic-artery":      { base: "#c0392b", highlight: "#922b21", label: "#7b241c" },
  "chd":                { base: "#27ae60", highlight: "#1e8449", label: "#196f3d" },
  "cbd":                { base: "#229954", highlight: "#1a7a42", label: "#196f3d" },
  "liver-edge":         { base: "#8B4513", highlight: "#5c2d0a", label: "#5c2d0a" },
  "calots-triangle":    { base: "#d4e8a0", highlight: "#8aab2a", label: "#5a7a10" },
  "rouvieres-sulcus":   { base: "#9B7BB8", highlight: "#5a2d82", label: "#4a2070" },
};

const GB_PATH = `
  M 175 310
  C 155 315, 118 308, 108 285
  C 98  262, 105 235, 122 220
  C 138 205, 158 202, 172 205
  C 186 208, 198 218, 204 232
  C 210 246, 208 262, 200 272
  C 192 282, 180 285, 172 282
  C 158 278, 148 265, 148 250
  C 148 235, 158 224, 172 220
  C 185 216, 200 220, 210 212
  C 220 204, 226 192, 232 182
  C 238 172, 244 162, 252 158
  C 260 154, 272 156, 278 164
  C 284 172, 282 184, 275 190
  C 268 196, 258 194, 254 188
  L 254 188
`;

export default function LapCholeAnatomySVG({ selected }: { selected: string | null }) {
  const activeKey = selected ? structureMap[selected] ?? null : null;

  function fade(key: string) {
    return activeKey && activeKey !== key ? 0.25 : 1;
  }

  function labelStyle(key: string) {
    const isActive = activeKey === key;
    return {
      fill: isActive ? colors[key].highlight : colors[key].label,
      fontWeight: isActive ? "700" : "500",
      opacity: fade(key),
      transition: "all 0.25s ease",
      fontSize: "11px",
      fontFamily: "Georgia, serif",
    };
  }

  function lineStyle(key: string) {
    const isActive = activeKey === key;
    return {
      stroke: isActive ? colors[key].highlight : "#94a3b8",
      strokeWidth: isActive ? 1.5 : 1,
      strokeDasharray: "3,3",
      opacity: activeKey && activeKey !== key ? 0.2 : 0.85,
      transition: "all 0.25s ease",
    };
  }

  function ductStyle(key: string, w: number, aw: number) {
    const isActive = activeKey === key;
    return {
      stroke: isActive ? colors[key].highlight : colors[key].base,
      strokeWidth: isActive ? aw : w,
      opacity: fade(key),
      transition: "all 0.25s ease",
      strokeLinecap: "round" as const,
    };
  }

  const gbActive = ["gallbladder-fundus", "infundibulum", "cystic-duct"].includes(activeKey ?? "");
  const gbOpacity = activeKey && !gbActive ? 0.25 : 1;

  return (
    <svg
      viewBox="0 0 580 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ maxHeight: 390 }}
    >
      <rect width="580" height="400" fill="#f8f7f4" rx="12" />

      {/* ── LIVER — static, never reacts to clicks ── */}
      <path
        d="M 20 15 Q 120 5 230 14 Q 340 5 420 20 Q 480 28 510 55 Q 530 75 520 108 Q 505 138 465 148 Q 420 158 365 152 Q 310 162 268 155 Q 210 165 168 154 Q 118 160 85 140 Q 48 118 28 88 Z"
        style={{ fill: colors["liver-edge"].base, opacity: 1 }}
      />
      <path d="M 105 28 Q 195 18 295 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <path d="M 125 52 Q 240 42 360 48" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

      {/* ── INFERIOR LIVER EDGE — interactive line only ── */}
      <path
        d="M 85 140 Q 118 160 168 154 Q 210 165 268 155 Q 310 162 365 152 Q 420 158 465 148"
        fill="none"
        style={{
          stroke: activeKey === "liver-edge" ? "#fbbf24" : "rgba(255,255,255,0.45)",
          strokeWidth: activeKey === "liver-edge" ? 6 : 2.5,
          opacity: activeKey && activeKey !== "liver-edge" ? 0.3 : 1,
          transition: "all 0.25s ease",
          strokeLinecap: "round",
        }}
      />

      {/* ── ROUVIÈRE'S SULCUS — left of diagram (patient's anatomical right) ── */}
      <path
        d="M 188 150 Q 210 161 232 155 Q 238 153 240 151"
        fill="none"
        style={{
          stroke: "#5c2d0a",
          strokeWidth: activeKey === "rouvieres-sulcus" ? 5 : 3.5,
          opacity: activeKey && activeKey !== "rouvieres-sulcus" ? 0.25 : 0.9,
          transition: "all 0.25s ease",
          strokeLinecap: "round",
        }}
      />
      <path
        d="M 189 148 Q 210 158 231 153"
        fill="none"
        style={{
          stroke: activeKey === "rouvieres-sulcus" ? colors["rouvieres-sulcus"].highlight : colors["rouvieres-sulcus"].base,
          strokeWidth: activeKey === "rouvieres-sulcus" ? 4 : 2.5,
          opacity: activeKey && activeKey !== "rouvieres-sulcus" ? 0.25 : 1,
          transition: "all 0.25s ease",
          strokeLinecap: "round",
        }}
      />
      {activeKey === "rouvieres-sulcus" && (
        <>
          <path
            d="M 186 152 Q 210 164 234 157 Q 234 175 210 178 Q 186 172 186 152 Z"
            style={{ fill: "#ef4444", opacity: 0.15 }}
          />
          <line x1="210" y1="168" x2="210" y2="142" stroke="#16a34a" strokeWidth="2" strokeDasharray="3,2" />
          <polygon points="210,138 205,148 215,148" fill="#16a34a" />
          <text x="214" y="141" style={{ fontSize: "9px", fill: "#16a34a", fontFamily: "Georgia, serif", fontWeight: "700" }}>safe</text>
          <text x="196" y="177" style={{ fontSize: "9px", fill: "#ef4444", fontFamily: "Georgia, serif", fontWeight: "700" }}>CBD plane</text>
        </>
      )}

      {/* ── CALOT'S TRIANGLE ── */}
      <path
        d="M 300 152 L 292 225 L 256 190 Z"
        style={{
          fill: colors["calots-triangle"].base,
          opacity: activeKey === "calots-triangle" ? 0.7 : activeKey ? 0.15 : 0.55,
          transition: "all 0.25s ease",
        }}
      />
      <path
        d="M 300 152 L 292 225 L 256 190 Z"
        fill="none"
        style={{
          stroke: colors["calots-triangle"].highlight,
          strokeWidth: activeKey === "calots-triangle" ? 2 : 1.2,
          strokeDasharray: "5,3",
          opacity: activeKey && activeKey !== "calots-triangle" ? 0.12 : 0.8,
          transition: "all 0.25s ease",
        }}
      />
      {activeKey === "calots-triangle" && (
        <>
          <text x="302" y="192" style={{ fontSize: "9px", fill: colors["calots-triangle"].highlight, fontFamily: "Georgia, serif", fontStyle: "italic" }}>CHD</text>
          <text x="260" y="218" style={{ fontSize: "9px", fill: colors["calots-triangle"].highlight, fontFamily: "Georgia, serif", fontStyle: "italic" }}>cystic duct</text>
          <text x="262" y="166" style={{ fontSize: "9px", fill: colors["calots-triangle"].highlight, fontFamily: "Georgia, serif", fontStyle: "italic" }}>liver</text>
        </>
      )}

      {/* ── GALLBLADDER — single continuous shape ── */}
      <path d={GB_PATH} style={{ fill: "#3d7a50", opacity: gbOpacity, transition: "all 0.25s ease" }} strokeLinejoin="round" />

      {/* Fundus overlay */}
      <path
        d="M 175 310 C 155 315 118 308 108 285 C 98 262 106 236 122 222 C 136 210 155 206 168 210 C 180 214 190 224 194 238 C 198 252 194 268 184 278 C 172 290 152 295 142 285 C 130 274 128 258 136 246 C 144 234 158 228 170 228 C 182 228 192 236 196 248"
        style={{ fill: colors["gallbladder-fundus"].highlight, opacity: activeKey === "gallbladder-fundus" ? 0.5 : 0, transition: "all 0.25s ease" }}
      />

      {/* Infundibulum overlay */}
      <path
        d="M 208 214 C 220 204 228 190 234 180 C 240 170 246 160 254 156 C 263 152 275 154 281 163 C 287 172 284 186 276 193 C 268 200 256 198 250 192 C 244 186 246 178 252 172 C 246 180 238 192 228 200 C 218 208 210 212 208 214 Z"
        style={{ fill: colors["infundibulum"].highlight, opacity: activeKey === "infundibulum" ? 0.55 : 0, transition: "all 0.25s ease" }}
      />

      {/* Gallbladder outline */}
      <path
        d={GB_PATH}
        fill="none"
        style={{
          stroke: activeKey && gbActive ? colors[activeKey]?.highlight ?? "#1a4f2e" : "#1a4f2e",
          strokeWidth: 1.5,
          opacity: gbOpacity,
          transition: "all 0.25s ease",
        }}
      />

      {/* ── CYSTIC DUCT ── */}
      <path d="M 256 190 Q 268 204 278 214 Q 285 220 292 225" fill="none" style={{ ...ductStyle("cystic-duct", 7, 10) }} />
      <path d="M 259 193 Q 263 190 267 193 Q 271 190 275 193 Q 279 190 283 193" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />

      {/* ── ARTERIAL TREE ──
          Common hepatic + right hepatic = context only (never highlight)
          Cystic artery = interactive
      */}
      <path
        d="M 430 238 Q 400 233 375 228 Q 355 224 338 220 Q 322 216 310 213"
        fill="none"
        style={{ stroke: colors["cystic-artery"].base, strokeWidth: 3.5, opacity: activeKey && activeKey !== "cystic-artery" ? 0.15 : 0.55, transition: "all 0.25s ease", strokeLinecap: "round" }}
      />
      <path
        d="M 310 213 Q 305 200 300 185 Q 294 168 284 158 Q 272 148 258 144 Q 244 140 230 142"
        fill="none"
        style={{ stroke: colors["cystic-artery"].base, strokeWidth: 3.5, opacity: activeKey && activeKey !== "cystic-artery" ? 0.15 : 0.55, transition: "all 0.25s ease", strokeLinecap: "round" }}
      />
      {/* Cystic artery — interactive only */}
      <path
        d="M 284 158 Q 274 155 265 156 Q 258 158 255 166 Q 253 172 256 178"
        fill="none"
        style={{ stroke: activeKey === "cystic-artery" ? colors["cystic-artery"].highlight : colors["cystic-artery"].base, strokeWidth: activeKey === "cystic-artery" ? 5 : 3.5, opacity: fade("cystic-artery"), transition: "all 0.25s ease", strokeLinecap: "round" }}
      />
      <polygon
        points="256,178 250,168 262,168"
        style={{ fill: activeKey === "cystic-artery" ? colors["cystic-artery"].highlight : colors["cystic-artery"].base, opacity: fade("cystic-artery"), transition: "all 0.25s ease" }}
      />
      <circle
        cx="284" cy="158" r="3.5"
        style={{ fill: activeKey === "cystic-artery" ? colors["cystic-artery"].highlight : colors["cystic-artery"].base, opacity: fade("cystic-artery"), transition: "all 0.25s ease" }}
      />
      <text x="432" y="236" style={{ fontSize: "10px", fill: "#94a3b8", fontFamily: "Georgia, serif", opacity: activeKey && activeKey !== "cystic-artery" ? 0.15 : 0.7, transition: "all 0.25s ease" }}>Common hepatic a.</text>
      <text x="215" y="140" style={{ fontSize: "10px", fill: "#94a3b8", fontFamily: "Georgia, serif", opacity: activeKey && activeKey !== "cystic-artery" ? 0.15 : 0.7, transition: "all 0.25s ease" }}>R. hepatic a.</text>

      {/* ── CHD ── */}
      <path d="M 300 152 L 296 188 Q 294 208 292 225" fill="none" style={{ ...ductStyle("chd", 9, 12) }} />
      {/* R. hepatic duct (left of diagram) */}
      <path d="M 240 100 Q 260 116 276 132 Q 288 143 300 152" fill="none" stroke="#27ae60" strokeWidth="8" strokeLinecap="round" style={{ opacity: activeKey && activeKey !== "chd" ? 0.25 : 0.7, transition: "all 0.25s ease" }} />
      {/* L. hepatic duct (right of diagram) */}
      <path d="M 360 105 Q 340 122 320 138 Q 308 146 300 152" fill="none" stroke="#27ae60" strokeWidth="8" strokeLinecap="round" style={{ opacity: activeKey && activeKey !== "chd" ? 0.25 : 0.7, transition: "all 0.25s ease" }} />

      {/* ── CBD ── */}
      <path d="M 292 225 Q 290 252 288 278 Q 286 298 284 325" fill="none" style={{ ...ductStyle("cbd", 11, 14) }} />
      <circle cx="292" cy="225" r="5" fill="#f8f7f4" stroke="#94a3b8" strokeWidth="1.2" style={{ opacity: activeKey ? 0.5 : 1 }} />

      {/* ── LABELS ── */}
      <line x1="125" y1="292" x2="68" y2="318" style={lineStyle("gallbladder-fundus")} />
      <text x="8" y="316" style={labelStyle("gallbladder-fundus")}>Gallbladder</text>
      <text x="8" y="328" style={labelStyle("gallbladder-fundus")}>fundus</text>

      <line x1="240" y1="194" x2="68" y2="358" style={lineStyle("infundibulum")} />
      <text x="8" y="362" style={labelStyle("infundibulum")}>Infundibulum / Neck</text>

      <line x1="270" y1="208" x2="190" y2="358" style={lineStyle("cystic-duct")} />
      <text x="142" y="362" style={labelStyle("cystic-duct")}>Cystic duct</text>

      <line x1="262" y1="162" x2="420" y2="118" style={lineStyle("cystic-artery")} />
      <text x="422" y="115" style={labelStyle("cystic-artery")}>Cystic artery</text>

      <line x1="305" y1="175" x2="445" y2="160" style={lineStyle("chd")} />
      <text x="447" y="164" style={labelStyle("chd")}>Common hepatic</text>
      <text x="447" y="176" style={labelStyle("chd")}>duct (CHD)</text>

      <line x1="298" y1="272" x2="445" y2="260" style={lineStyle("cbd")} />
      <text x="447" y="264" style={labelStyle("cbd")}>Common bile</text>
      <text x="447" y="276" style={labelStyle("cbd")}>duct (CBD)</text>

      <line x1="210" y1="152" x2="390" y2="62" style={lineStyle("liver-edge")} />
      <text x="392" y="60" style={labelStyle("liver-edge")}>Inferior liver edge</text>

      <line x1="282" y1="182" x2="445" y2="205" style={lineStyle("calots-triangle")} />
      <text x="447" y="209" style={labelStyle("calots-triangle")}>Calot's triangle</text>

      <line x1="210" y1="158" x2="68" y2="200" style={lineStyle("rouvieres-sulcus")} />
      <text x="8" y="198" style={labelStyle("rouvieres-sulcus")}>Rouvière's</text>
      <text x="8" y="210" style={labelStyle("rouvieres-sulcus")}>sulcus</text>

      {/* Context labels */}
      <text x="195" y="96" style={{ fontSize: "10px", fill: "#94a3b8", fontFamily: "Georgia, serif" }}>R. hepatic duct</text>
      <text x="330" y="100" style={{ fontSize: "10px", fill: "#94a3b8", fontFamily: "Georgia, serif" }}>L. hepatic duct</text>
      <text x="296" y="244" style={{ fontSize: "9px", fill: "#64748b", fontFamily: "Georgia, serif" }}>Junction</text>

      {/* Footer */}
      <line x1="28" y1="388" x2="78" y2="388" stroke="#94a3b8" strokeWidth="1" />
      <line x1="28" y1="384" x2="28" y2="392" stroke="#94a3b8" strokeWidth="1" />
      <line x1="78" y1="384" x2="78" y2="392" stroke="#94a3b8" strokeWidth="1" />
      <text x="30" y="397" style={{ fontSize: "9px", fill: "#94a3b8", fontFamily: "Georgia, serif" }}>Schematic — not to scale</text>
      <text x="500" y="397" textAnchor="end" style={{ fontSize: "9px", fill: "#94a3b8", fontFamily: "Georgia, serif", fontStyle: "italic" }}>© Surgical Clerkship Companion</text>
    </svg>
  );
}