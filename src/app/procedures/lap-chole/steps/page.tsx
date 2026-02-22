import StickyTabs from "../_components/StickyTabs";
import TooltipTerm from "@/app/components/TooltipTerm";

export default function LapCholeStepsPage() {
  return (
    <>
      <StickyTabs />

      <section className="pt-8">
        <h2 className="text-xl font-semibold">Step-by-Step Overview</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          This is a student-level overview of the conceptual flow of the case (not a procedural manual).
        </p>

        <ol className="mt-6 space-y-5">
          <li>
            <div className="text-sm font-medium text-slate-900">
              1. Establish{" "}
              <TooltipTerm
                term="pneumoperitoneum"
                definition="Insufflation of gas into the peritoneal cavity to create operative space."
              />{" "}
              and place ports.
            </div>
            <div className="mt-1 text-sm text-slate-600">
              CO₂ insufflation creates working space. Ports are positioned to allow proper instrument{" "}
              <TooltipTerm
                term="triangulation"
                definition="Positioning instruments to approach the target from two angles for optimal control and visualization."
              />{" "}
              in the right upper quadrant.
            </div>
          </li>

          <li>
            <div className="text-sm font-medium text-slate-900">2. Expose the gallbladder.</div>
            <div className="mt-1 text-sm text-slate-600">
              The fundus is retracted superiorly while the infundibulum is pulled laterally. Proper retraction opens
              Calot’s triangle and reduces the risk of bile duct misidentification.
            </div>
          </li>

          <li>
            <div className="text-sm font-medium text-slate-900">3. Dissect Calot’s triangle.</div>
            <div className="mt-1 text-sm text-slate-600">
              Fat and fibrous tissue are cleared to{" "}
              <TooltipTerm
                term="skeletonize"
                definition="To carefully remove surrounding tissue to fully isolate and visualize a structure."
              />{" "}
              the cystic duct and cystic artery.
            </div>
          </li>

          <li>
            <div className="text-sm font-medium text-slate-900">4. Achieve the Critical View of Safety.</div>
            <div className="mt-1 text-sm text-slate-600">
              The lower third of the gallbladder is dissected off the liver bed, and only two structures should be seen
              entering the gallbladder before any are clipped or divided.
            </div>
          </li>

          <li>
            <div className="text-sm font-medium text-slate-900">
              5. Clip and{" "}
              <TooltipTerm
                term="divide"
                definition="To surgically cut a structure after it has been secured (often with clips)."
              />{" "}
              the cystic duct.
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Division should only occur once the Critical View is confirmed.
            </div>
          </li>

          <li>
            <div className="text-sm font-medium text-slate-900">6. Clip and divide the cystic artery.</div>
            <div className="mt-1 text-sm text-slate-600">
              Confirm anatomy and maintain visualization while controlling bleeding risk.
            </div>
          </li>

          <li>
            <div className="text-sm font-medium text-slate-900">7. Separate the gallbladder from the liver bed.</div>
            <div className="mt-1 text-sm text-slate-600">
              Dissection proceeds along the hepatic bed with attention to bleeding and bile leakage.
            </div>
          </li>

          <li>
            <div className="text-sm font-medium text-slate-900">8. Inspect the field and remove the gallbladder.</div>
            <div className="mt-1 text-sm text-slate-600">
              Confirm hemostasis, inspect clips, and remove the specimen via a port site.
            </div>
          </li>
        </ol>
      </section>
    </>
  );
}