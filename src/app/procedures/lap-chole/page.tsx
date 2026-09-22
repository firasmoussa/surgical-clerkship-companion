import SourceCitations from "@/app/components/SourceCitations";

export default function LapCholeOverviewPage() {
  return (
    <section className="pt-8">
      <h2 className="font-sans tracking-tight text-[20px] text-ink font-semibold">One-Minute Overview</h2>

      <div className="mt-6 grid gap-5">
        <div>
          <div className="text-[14px] font-medium text-ink">Indications</div>
          <div className="mt-1 text-[14px] text-secondary leading-relaxed">
            Symptomatic cholelithiasis, acute cholecystitis, biliary colic, and cholecystectomy
            during the same admission after mild gallstone pancreatitis improves.
          </div>
          <SourceCitations sources={["gallstones", "pancreatitis"]} />
        </div>

        <div>
          <div className="text-[14px] font-medium text-ink">Positioning</div>
          <div className="mt-1 text-[14px] text-secondary leading-relaxed">
            Supine. Reverse Trendelenburg with slight left tilt to expose the gallbladder.
          </div>
          <SourceCitations sources={["choleTechnique"]} />
        </div>

        <div>
          <div className="text-[14px] font-medium text-ink">Key Anatomy to Know Cold</div>
          <div className="mt-1 text-[14px] text-secondary leading-relaxed">
            Hepatocystic triangle (cystic duct, common hepatic duct, inferior liver edge), cystic
            artery, common bile duct.
          </div>
          <SourceCitations sources={["cvs", "choleTechnique"]} />
        </div>

        <div>
          <div className="text-[14px] font-medium text-ink">Critical Concept -- Critical View of Safety (CVS)</div>
          <div className="mt-2 rounded-md p-3 border border-cvs-border bg-cvs-light">
            <div className="text-[11px] text-cvs font-medium mb-2">CVS criteria -- confirm all three before clipping or dividing</div>
            <ol className="list-decimal pl-4 space-y-1">
              <li className="text-[12px] text-cvs leading-snug">Clear fat and fibrous tissue from the hepatocystic triangle</li>
              <li className="text-[12px] text-cvs leading-snug">Dissect the lower third of the gallbladder off the liver bed</li>
              <li className="text-[12px] text-cvs leading-snug">Confirm only two structures enter the gallbladder (cystic duct and cystic artery)</li>
            </ol>
            <p className="mt-2 text-[11px] text-cvs leading-snug opacity-80">
              Failure to achieve CVS risks misidentifying the common bile duct as the cystic duct -- the most common cause of bile duct injury.
            </p>
          </div>
          <SourceCitations sources={["cvs", "safeChole"]} />
        </div>

        <div>
          <div className="text-[14px] font-medium text-ink">Major Complications</div>
          <div className="mt-1 text-[14px] text-secondary leading-relaxed">
            Bile duct injury, bleeding (cystic artery or liver bed), bile leak, retained stones,
            surgical site infection.
          </div>
          <SourceCitations sources={["choleTechnique", "bileLeak"]} />
        </div>
      </div>
    </section>
  );
}
