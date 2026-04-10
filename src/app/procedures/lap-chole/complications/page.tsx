const complications = [
  { complication: "Bile duct injury (most feared)", timeframe: "Intraop or early postop", mechanism: "Misidentification of anatomy; failure to achieve Critical View of Safety", presentation: "Bile leak, jaundice, abdominal pain, sepsis", management: "Early recognition; specialist evaluation; reconstruction often required (e.g., hepaticojejunostomy)" },
  { complication: "Major bleeding", timeframe: "Intraoperative", mechanism: "Injury to cystic artery, right hepatic artery, or liver bed", presentation: "Hemodynamic instability, poor visualization, expanding hematoma", management: "Immediate control intraoperatively; may require transfusion or conversion" },
  { complication: "Bile leak (cystic stump or accessory duct)", timeframe: "Early postop (days)", mechanism: "Incomplete clip seal or accessory duct injury", presentation: "RUQ pain, fever, bilious drain output, fluid collection", management: "ERCP with stent +/- percutaneous drainage" },
  { complication: "Retained common bile duct stone", timeframe: "Early to weeks", mechanism: "Missed choledocholithiasis", presentation: "Jaundice, pancreatitis, cholangitis", management: "ERCP" },
  { complication: "Surgical site infection", timeframe: "Days to weeks", mechanism: "Contamination during extraction or port-site infection", presentation: "Erythema, drainage, tenderness", management: "Antibiotics +/- drainage" },
  { complication: "Postoperative ileus", timeframe: "Early postop", mechanism: "Transient bowel dysmotility", presentation: "Distension, nausea/vomiting, delayed flatus", management: "Supportive care" },
];

export default function LapCholeComplicationsPage() {
  return (
    <section className="pt-8">
      <h2 className="font-serif italic text-[20px] text-ink font-normal">Complications</h2>
      <p className="mt-2 max-w-3xl text-[13px] text-secondary leading-relaxed">
        Laparoscopic cholecystectomy is generally safe, but the most serious complication -- bile duct injury -- can cause lifelong morbidity. Achieving the Critical View of Safety is the primary strategy for prevention.
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-border-warm">
        <table className="w-full text-left text-[12.5px]">
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
                <td className="px-4 py-3 text-secondary align-top">{c.management}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
