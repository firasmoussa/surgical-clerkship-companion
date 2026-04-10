"use client";

import StickyTabs from "../_components/StickyTabs";

export default function LapAppyStepsPage() {
  return (
    <>
      <StickyTabs />
      <section className="pt-8">
        <h2 className="text-xl font-semibold">Step-by-Step Overview</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          A student-level conceptual overview of the case flow (not a procedural manual).
        </p>
        <ol className="mt-6 space-y-5">
          <li>
            <div className="text-sm font-medium text-slate-900">1. Establish pneumoperitoneum and place ports.</div>
            <div className="mt-1 text-sm text-slate-600">
              Typically three ports: umbilical (camera), suprapubic, and LLQ working port.
              Port placement is adjusted based on body habitus and appendix location.
            </div>
          </li>
          <li>
            <div className="text-sm font-medium text-slate-900">2. Survey the abdomen and locate the appendix.</div>
            <div className="mt-1 text-sm text-slate-600">
              Perform a systematic survey first. Identify the cecum, then follow the taenia coli
              to the appendiceal base. In retrocecal cases, the cecum must be mobilized by incising
              the lateral peritoneal attachments.
            </div>
          </li>
          <li>
            <div className="text-sm font-medium text-slate-900">3. Retract the appendix and expose the mesoappendix.</div>
            <div className="mt-1 text-sm text-slate-600">
              Grasp the tip of the appendix and apply gentle traction to place the mesoappendix
              under tension, exposing the appendiceal artery.
            </div>
          </li>
          <li>
            <div className="text-sm font-medium text-slate-900">4. Divide the mesoappendix.</div>
            <div className="mt-1 text-sm text-slate-600">
              The mesoappendix is divided using an energy device or by clipping and dividing the
              appendiceal artery individually. Ensure hemostasis before proceeding.
            </div>
          </li>
          <li>
            <div className="text-sm font-medium text-slate-900">5. Secure and divide the appendiceal base.</div>
            <div className="mt-1 text-sm text-slate-600">
              Two or three endoloops or a linear stapler are used to secure the base. Confirm
              the stump is well-secured before dividing.
            </div>
          </li>
          <li>
            <div className="text-sm font-medium text-slate-900">6. Remove the specimen in an Endobag.</div>
            <div className="mt-1 text-sm text-slate-600">
              The appendix is placed in a retrieval bag before extraction to prevent wound
              contamination, particularly important in perforated cases.
            </div>
          </li>
          <li>
            <div className="text-sm font-medium text-slate-900">7. Irrigate and inspect.</div>
            <div className="mt-1 text-sm text-slate-600">
              Irrigate the RLQ and pelvis in perforated cases. Inspect the stump, confirm
              hemostasis, and evaluate for adjacent bowel injury.
            </div>
          </li>
          <li>
            <div className="text-sm font-medium text-slate-900">8. Close port sites.</div>
            <div className="mt-1 text-sm text-slate-600">
              Fascial closure is required for any port site 10 mm or larger to prevent port-site hernia.
            </div>
          </li>
        </ol>
      </section>
    </>
  );
}
