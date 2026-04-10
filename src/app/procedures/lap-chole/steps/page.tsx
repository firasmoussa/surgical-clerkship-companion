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
    title: "Dissect Calot's triangle.",
    body: "Fat and fibrous tissue are cleared to skeletonize the cystic duct and cystic artery. Dissect on both the anterior and posterior aspects of the triangle.",
  },
  {
    title: "Achieve the Critical View of Safety.",
    body: "The lower third of the gallbladder is dissected off the liver bed, and only two structures should be seen entering the gallbladder before any are clipped or divided.",
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
      <h2 className="font-serif italic text-[20px] text-ink font-normal">Step-by-Step Overview</h2>
      <p className="mt-2 max-w-2xl text-[13px] text-secondary leading-relaxed">
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
              <div className="text-[13px] font-medium text-ink">{step.title}</div>
              <div className="text-[13px] text-secondary leading-relaxed mt-1">{step.body}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
