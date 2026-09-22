import SourceCitations from "@/app/components/SourceCitations";
import type { ClinicalSourceId } from "@/app/lib/clinicalSources";

type Step = { title: string; body: string; sources: ClinicalSourceId[]; criteria?: React.ReactNode[] };

const steps: Step[] = [
  {
    title: "Establish pneumoperitoneum and place ports.",
    sources: ["appyTechnique"],
    body: "Typically three ports: umbilical (camera), suprapubic, and LLQ working port. Port placement is adjusted based on body habitus and appendix location.",
  },
  {
    title: "Survey the abdomen and locate the appendix.",
    sources: ["appyTechnique"],
    body: "Perform a systematic survey first. Identify the cecum, then follow the taenia coli to the appendiceal base. In retrocecal cases, the cecum may need to be mobilized by incising the lateral peritoneal attachments.",
  },
  {
    title: "Retract the appendix and expose the mesoappendix.",
    sources: ["appyTechnique"],
    body: "Grasp the tip of the appendix and apply gentle traction to place the mesoappendix under tension, exposing the appendiceal artery.",
  },
  {
    title: "Divide the mesoappendix.",
    sources: ["snapAppy"],
    body: "The mesoappendix is divided using an energy device or by clipping and dividing the appendiceal artery individually. Ensure hemostasis before proceeding.",
  },
  {
    title: "Secure and divide the appendiceal base.",
    sources: ["snapAppy", "base"],
    body: "Endoloops or a stapler may be used to secure the base, depending on tissue quality and operative findings. Confirm the stump is well-secured before dividing.",
  },
  {
    title: "Remove the specimen in an Endobag.",
    sources: ["appyTechnique"],
    body: "The appendix is placed in a retrieval bag before extraction to prevent wound contamination -- particularly important in perforated cases.",
  },
  {
    title: "Clear contamination and inspect.",
    sources: ["appyGuideline"],
    body: "Remove contaminated fluid. Suction alone or suction with lavage may be used according to operative findings and surgeon preference; lavage is not mandatory. Inspect the stump, confirm hemostasis, and evaluate for adjacent bowel injury.",
  },
  {
    title: "Close port sites.",
    sources: ["closure"],
    body: "EHS/AHS suggests fascial closure for trocar sites 10 mm or larger, particularly at the umbilicus; evidence for this recommendation is limited.",
  },
];

export default function LapAppyStepsPage() {
  return (
    <>
      <section className="pt-8">
        <h2 className="font-sans tracking-tight text-[20px] text-ink font-semibold">Step-by-Step Overview</h2>
        <p className="mt-2 max-w-2xl text-[14px] text-secondary leading-relaxed">
          A student-level conceptual overview of the case flow -- not a procedural manual.
        </p>

        <div className="mt-6">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 pb-6 relative">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-7 h-7 rounded-full border border-border-warm bg-surface flex items-center justify-center text-[11px] text-ochre font-medium">
                  {i + 1}
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 bg-border-warm mt-1" />}
              </div>
              <div className="pt-0.5">
                <div className="text-[14px] font-medium text-ink">{step.title}</div>
                <div className="text-[14px] text-secondary leading-relaxed mt-1">{step.body}</div>
                <SourceCitations sources={step.sources} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
