import SourceCitations from "@/app/components/SourceCitations";
import type { ClinicalSourceId } from "@/app/lib/clinicalSources";

type Complication = { complication: string; timeframe: string; mechanism: string; presentation: string; management: string; sources: ClinicalSourceId[] };

const complications: Complication[] = [
  { complication: "Surgical site infection (SSI)", sources: ["ssi"], timeframe: "Days-weeks", mechanism: "Wound contamination, especially in perforated cases", presentation: "Erythema, purulent drainage, tenderness at port sites", management: "Drain an infected wound when indicated; add antibiotics for systemic illness or significant surrounding infection" },
  { complication: "Intra-abdominal abscess", sources: ["appyTechnique", "appyGuideline"], timeframe: "Days-2 weeks postop", mechanism: "Inadequate source control in perforated appendicitis; fecalith spillage", presentation: "Fever, leukocytosis, RLQ or pelvic pain, failure to improve", management: "CT-guided percutaneous drainage; antibiotics; rarely reoperation" },
  { complication: "Appendiceal stump leak", sources: ["stumpLeak"], timeframe: "Early postop (days)", mechanism: "Clip failure, friable base, inadequate staple line", presentation: "Peritonitis, fever, leukocytosis, free air or fluid on CT", management: "Urgent surgical assessment and source control; drainage or repair/resection depends on the leak and patient stability" },
  { complication: "Bleeding", sources: ["snapAppy", "appyTechnique"], timeframe: "Intraop or early postop", mechanism: "Inadequate hemostasis; clip slippage from appendiceal artery", presentation: "Poor visualization intraop; dropping Hgb or peritonitis postop", management: "Intraop control; may require conversion to open; transfusion if needed" },
  { complication: "Right ureter injury (rare)", sources: ["ureter", "appyTechnique"], timeframe: "Intraop or delayed recognition", mechanism: "Injury near a retrocecal appendix or inflamed tissues", presentation: "Urinary leakage, flank pain, or urinary fistula; presentation varies", management: "Prompt urologic assessment; repair or urinary diversion depends on the injury" },
  { complication: "Port-site hernia", sources: ["closure"], timeframe: "Weeks-months", mechanism: "Risk increases at larger trocar sites, particularly the umbilicus", presentation: "Bulge or pain at port site; may present with bowel obstruction", management: "Surgical assessment; urgent evaluation for obstruction or suspected strangulation" },
  { complication: "Ileus", sources: ["ileus"], timeframe: "Early postop", mechanism: "Bowel manipulation; inflammation; opioid use", presentation: "Nausea, distension, delayed return of bowel function", management: "Supportive care; early ambulation; minimize opioids" },
  { complication: "Incidental appendiceal NET", sources: ["neoplasm"], timeframe: "Pathology result", mechanism: "Incidental neuroendocrine tumor on specimen pathology", presentation: "Often an incidental finding; review tumor size, grade, invasion, and margins", management: "Specialist assessment; right hemicolectomy for tumors >2 cm. Smaller tumors require risk-based assessment." },
];

export default function LapAppyComplicationsPage() {
  return (
    <>
      <section className="pt-8">
        <h2 className="font-sans tracking-tight text-[20px] text-ink font-semibold">Complications</h2>
        <p className="mt-2 max-w-3xl text-[14px] text-secondary leading-relaxed">
          Complication risk rises significantly with perforation and delayed presentation. Always review the final pathology report.
        </p>
        <SourceCitations sources={["appyGuideline", "neoplasm"]} />

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border-warm bg-card">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="bg-surface border-b border-border-warm">
                <th className="px-4 py-3 text-[11px] text-muted uppercase tracking-wider font-medium">Complication</th>
                <th className="px-4 py-3 text-[11px] text-muted uppercase tracking-wider font-medium">Timeframe</th>
                <th className="px-4 py-3 text-[11px] text-muted uppercase tracking-wider font-medium">Mechanism</th>
                <th className="px-4 py-3 text-[11px] text-muted uppercase tracking-wider font-medium">Presentation</th>
                <th className="px-4 py-3 text-[11px] text-muted uppercase tracking-wider font-medium">Management</th>
              </tr>
            </thead>
            <tbody>
              {complications.map((c, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-parchment" : "bg-surface"}>
                  <td className="px-4 py-3 font-medium text-ink align-top">{c.complication}</td>
                  <td className="px-4 py-3 text-secondary align-top whitespace-nowrap">{c.timeframe}</td>
                  <td className="px-4 py-3 text-secondary align-top">{c.mechanism}</td>
                  <td className="px-4 py-3 text-secondary align-top">{c.presentation}</td>
                  <td className="px-4 py-3 text-secondary align-top">{c.management}<SourceCitations sources={c.sources} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
