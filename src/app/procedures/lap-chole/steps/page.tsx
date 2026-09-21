import TooltipTerm from "@/app/components/TooltipTerm";

const steps = [
  {
    title: "Establish pneumoperitoneum and place ports.",
    body: "CO2 insufflation creates working space. Four ports are standard: umbilical (camera), epigastric, and two RUQ working ports positioned for triangulation toward the gallbladder.",
  },
  {
    title: "Expose the gallbladder.",
    body: "The fundus is retracted superiorly while the infundibulum is pulled laterally. Proper retraction opens Calot's triangle and reduces the risk of bile duct misidentification.",
  },
  {
    title: "Dissect the hepatocystic triangle.",
    body: "Fat and fibrous tissue are cleared to skeletonize the cystic duct and cystic artery. Dissect on both the anterior and posterior aspects of the triangle.",
  },
  {
    title: "Confirm all three Critical View of Safety criteria.",
    body: "Pause before placing any clip or dividing the cystic duct or artery. Confirm all three criteria together:",
    criteria: [
      <>
        The <TooltipTerm term="hepatocystic triangle" definition="The hepatocystic triangle is defined as the triangle formed by the cystic duct, the common hepatic duct, and inferior edge of the liver." /> is cleared of fat and fibrous tissue.
      </>,
      <>
        The lower third of the gallbladder is separated from the <TooltipTerm term="cystic plate" definition="The cystic plate is also known as liver bed of the gallbladder and lies in the gallbladder fossa." />, exposing the plate.
      </>,
      "Only two structures are seen entering the gallbladder: the cystic duct and cystic artery.",
    ],
  },
  {
    title: "Clip and divide the cystic duct.",
    body: "Division should only occur once the Critical View is confirmed. Two clips are placed proximally, one distally, then the duct is divided between them.",
  },
  {
    title: "Clip and divide the cystic artery.",
    body: "Confirm anatomy and maintain visualization while controlling bleeding risk. The artery is clipped and divided with the same technique.",
  },
  {
    title: "Separate the gallbladder from the liver bed.",
    body: "Dissection proceeds along the hepatic bed using electrocautery or an energy device, with attention to bleeding and bile leakage from accessory ducts.",
  },
  {
    title: "Inspect the field and remove the gallbladder.",
    body: "Confirm hemostasis, inspect clips, and remove the specimen via the umbilical or epigastric port site, using a retrieval bag if needed.",
  },
];

export default function LapCholeStepsPage() {
  return (
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
              {step.criteria && (
                <div className="mt-3 rounded-md border border-cvs-border bg-cvs-light p-4 text-[14px] text-cvs leading-relaxed">
                  <div className="font-medium">CVS checkpoint: all three required</div>
                  <ol className="mt-2 list-decimal space-y-2 pl-5">
                    {step.criteria.map((criterion, criterionIndex) => <li key={criterionIndex}>{criterion}</li>)}
                  </ol>
                  <p className="mt-3 font-medium">Seeing two structures alone is not sufficient to establish CVS.</p>
                  <a className="mt-2 inline-block text-[12px] underline underline-offset-4" href="https://www.sages.org/safe-cholecystectomy-program/">
                    Reference: SAGES Safe Cholecystectomy Program
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
