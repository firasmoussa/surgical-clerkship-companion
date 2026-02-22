import StickyTabs from "./_components/StickyTabs";

export default function LapCholeOverviewPage() {
  return (
    <>
      <StickyTabs />

      <section className="pt-8">
        <h2 className="text-xl font-semibold">One-Minute Overview</h2>

        <div className="mt-4 grid gap-4">
          <div>
            <div className="text-sm font-medium text-slate-800">Indications</div>
            <div className="mt-1 text-sm text-slate-600">
              Symptomatic cholelithiasis, acute cholecystitis, biliary colic, and interval
              cholecystectomy after gallstone pancreatitis.
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-800">Positioning</div>
            <div className="mt-1 text-sm text-slate-600">
              Supine. Reverse Trendelenburg with slight left tilt to expose the gallbladder.
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-800">Key Anatomy to Know Cold</div>
            <div className="mt-1 text-sm text-slate-600">
              Calot’s triangle (cystic duct, common hepatic duct, inferior liver edge), cystic
              artery, common bile duct.
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-800">
              Critical Concept — Critical View of Safety (CVS)
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Before dividing any structures, confirm CVS:
              <ol className="mt-2 list-decimal pl-5">
                <li>Clear all fat/fibrous tissue from Calot’s triangle</li>
                <li>Dissect the lower third of the gallbladder off the liver bed</li>
                <li>Ensure only two structures enter the gallbladder (cystic duct & artery)</li>
              </ol>
              <div className="mt-2">
                Failure to achieve CVS risks misidentifying the common bile duct as the cystic duct,
                causing catastrophic bile duct injury.
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-800">Major Complications</div>
            <div className="mt-1 text-sm text-slate-600">
              Bile duct injury, bleeding (cystic artery/liver bed), bile leak, retained stones,
              surgical site infection.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}