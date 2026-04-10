"use client";
import StickyTabs from "../_components/StickyTabs";
const complications = [
  { complication: "Surgical site infection (SSI)", timeframe: "Days-weeks", mechanism: "Wound contamination, especially in perforated cases", presentation: "Erythema, purulent drainage, tenderness at port sites", management: "Antibiotics; wound opening and drainage if fluctuant" },
  { complication: "Intra-abdominal abscess", timeframe: "Days-2 weeks postop", mechanism: "Inadequate source control in perforated appendicitis; fecalith spillage", presentation: "Fever, leukocytosis, RLQ or pelvic pain, failure to improve", management: "CT-guided percutaneous drainage; antibiotics; rarely reoperation" },
  { complication: "Appendiceal stump leak", timeframe: "Early postop (days)", mechanism: "Clip failure, friable base, inadequate staple line", presentation: "Peritonitis, fever, leukocytosis, free air or fluid on CT", management: "Return to OR; drainage; may require oversewing or ileocecal resection" },
  { complication: "Bleeding", timeframe: "Intraop or early postop", mechanism: "Inadequate hemostasis; clip slippage from appendiceal artery", presentation: "Poor visualization intraop; dropping Hgb or peritonitis postop", management: "Intraop control; may require conversion to open; transfusion if needed" },
  { complication: "Right ureter or iliac vessel injury", timeframe: "Intraoperative", mechanism: "Dissection too deep, especially in retrocecal or severely inflamed cases", presentation: "Hematoma, hematuria, hemodynamic instability", management: "Immediate control; urology consult for ureteral injury" },
  { complication: "Port-site hernia", timeframe: "Weeks-months", mechanism: "Fascial defect not closed at 10 mm+ port sites", presentation: "Bulge or pain at port site; may present with bowel obstruction", management: "Elective hernia repair; emergent if incarcerated" },
  { complication: "Ileus", timeframe: "Early postop", mechanism: "Bowel manipulation; inflammation; opioid use", presentation: "Nausea, distension, delayed return of bowel function", management: "Supportive care; early ambulation; minimize opioids" },
  { complication: "Incidental carcinoid (appendiceal NET)", timeframe: "Pathology result", mechanism: "Neuroendocrine tumor found in ~1% of appendectomy specimens", presentation: "Asymptomatic; right hemicolectomy needed if tumor > 2 cm", management: "If <= 2 cm at tip: appendectomy curative. If > 2 cm or at base: right hemicolectomy." },
];
export default function LapAppyComplicationsPage() {
  return (
    <>
      <StickyTabs />
      <section className="pt-8">
        <h2 className="text-xl font-semibold">Complications</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">Complication risk rises significantly with perforation and delayed presentation. Always review the final pathology report.</p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Complication</th>
                <th className="px-4 py-3 text-left font-medium">Timeframe</th>
                <th className="px-4 py-3 text-left font-medium">Mechanism</th>
                <th className="px-4 py-3 text-left font-medium">Presentation</th>
                <th className="px-4 py-3 text-left font-medium">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {complications.map((c, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-4 py-3 font-medium text-slate-900 align-top">{c.complication}</td>
                  <td className="px-4 py-3 text-slate-600 align-top whitespace-nowrap">{c.timeframe}</td>
                  <td className="px-4 py-3 text-slate-600 align-top">{c.mechanism}</td>
                  <td className="px-4 py-3 text-slate-600 align-top">{c.presentation}</td>
                  <td className="px-4 py-3 text-slate-600 align-top">{c.management}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
