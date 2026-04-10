
type Comp = {
  complication: string;
  timeframe: string;
  mechanism: string;
  presentation: string;
  management: string;
};

const complications: Comp[] = [
  {
    complication: "Bile duct injury (most feared)",
    timeframe: "Intraop or early postop",
    mechanism: "Misidentification of anatomy; failure to achieve Critical View of Safety",
    presentation: "Bile leak, jaundice, abdominal pain, sepsis",
    management: "Early recognition; specialist evaluation; reconstruction often required (e.g., hepaticojejunostomy)",
  },
  {
    complication: "Major bleeding",
    timeframe: "Intraoperative",
    mechanism: "Injury to cystic artery, right hepatic artery, or liver bed",
    presentation: "Hemodynamic instability, poor visualization, expanding hematoma",
    management: "Immediate control intraoperatively; may require transfusion or conversion",
  },
  {
    complication: "Bile leak (cystic duct stump or accessory duct)",
    timeframe: "Early postop (days)",
    mechanism: "Incomplete clip seal or accessory duct injury",
    presentation: "RUQ pain, fever, bilious drain output, fluid collection",
    management: "ERCP with stent ± percutaneous drainage",
  },
  {
    complication: "Retained common bile duct stone",
    timeframe: "Early–weeks",
    mechanism: "Missed choledocholithiasis",
    presentation: "Jaundice, pancreatitis, cholangitis",
    management: "ERCP",
  },
  {
    complication: "Surgical site infection",
    timeframe: "Days–weeks",
    mechanism: "Contamination during extraction or port-site infection",
    presentation: "Erythema, drainage, tenderness",
    management: "Antibiotics ± drainage",
  },
  {
    complication: "Postoperative ileus",
    timeframe: "Early postop",
    mechanism: "Transient bowel dysmotility",
    presentation: "Distension, nausea/vomiting, delayed flatus",
    management: "Supportive care",
  },
];

export default function LapCholeComplicationsPage() {
  return (
    <>

      <section className="pt-8">
        <h2 className="text-xl font-semibold">Complications</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Laparoscopic cholecystectomy is generally safe, but complications can occur. The most serious complication is
          bile duct injury, most commonly caused by misidentification of anatomy. Achieving the Critical View of Safety
          is the primary strategy for prevention. Timing can help you recognize complications early.
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-medium">Complication</th>
                <th className="px-4 py-3 font-medium">Time frame</th>
                <th className="px-4 py-3 font-medium">Mechanism</th>
                <th className="px-4 py-3 font-medium">Presentation</th>
                <th className="px-4 py-3 font-medium">Management (high-level)</th>
              </tr>
            </thead>
            <tbody>
              {complications.map((c) => (
                <tr key={c.complication} className="border-t">
                  <td className="px-4 py-3 align-top font-medium text-slate-900">{c.complication}</td>
                  <td className="px-4 py-3 align-top text-slate-700">{c.timeframe}</td>
                  <td className="px-4 py-3 align-top text-slate-700">{c.mechanism}</td>
                  <td className="px-4 py-3 align-top text-slate-700">{c.presentation}</td>
                  <td className="px-4 py-3 align-top text-slate-700">{c.management}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Educational summary only. Management varies by clinical context and local practice.
        </p>
      </section>
    </>
  );
}