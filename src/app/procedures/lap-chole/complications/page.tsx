import SourceCitations from "@/app/components/SourceCitations";
import type { ClinicalSourceId } from "@/app/lib/clinicalSources";

type Complication = { complication: string; timeframe: string; mechanism: string; presentation: string; management: string; sources: ClinicalSourceId[] };

const complications: Complication[] = [
  { complication: "Bile duct injury (most feared)", sources: ["safeChole", "bileRepair"], timeframe: "Intraop or early postop", mechanism: "Misidentification of anatomy; failure to achieve Critical View of Safety", presentation: "Bile leak, jaundice, abdominal pain, sepsis", management: "Early recognition; specialist evaluation; reconstruction often required (e.g., hepaticojejunostomy)" },
  { complication: "Major bleeding", sources: ["choleTechnique"], timeframe: "Intraoperative", mechanism: "Injury to cystic artery, right hepatic artery, or liver bed", presentation: "Hemodynamic instability, poor visualization, expanding hematoma", management: "Immediate control intraoperatively; may require transfusion or conversion" },
  { complication: "Bile leak (cystic stump or accessory duct)", sources: ["bileLeak"], timeframe: "Early postop (days)", mechanism: "Incomplete clip seal or accessory duct injury", presentation: "RUQ pain, fever, bilious drain output, fluid collection", management: "ERCP with stent +/- percutaneous drainage" },
  { complication: "Retained common bile duct stone", sources: ["gallstones"], timeframe: "Early to weeks", mechanism: "Missed choledocholithiasis", presentation: "Jaundice, pancreatitis, cholangitis", management: "ERCP" },
  { complication: "Surgical site infection", sources: ["ssi"], timeframe: "Days to weeks", mechanism: "Contamination during extraction or port-site infection", presentation: "Erythema, drainage, tenderness", management: "Drainage when indicated; antibiotics for systemic illness or significant surrounding infection" },
  { complication: "Postoperative ileus", sources: ["ileus"], timeframe: "Early postop", mechanism: "Transient bowel dysmotility", presentation: "Distension, nausea/vomiting, delayed flatus", management: "Supportive care" },
];

export default function LapCholeComplicationsPage() {
  return (
    <section className="pt-8">
      <h2 className="font-sans tracking-tight text-[20px] text-ink font-semibold">Complications</h2>
      <p className="mt-2 max-w-3xl text-[14px] text-secondary leading-relaxed">
        Laparoscopic cholecystectomy is generally safe, but the most serious complication -- bile duct injury -- can cause lifelong morbidity. Achieving the Critical View of Safety is the primary strategy for prevention.
      </p>
        <SourceCitations sources={["safeChole"]} />

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
  );
}
