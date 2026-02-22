import StickyTabs from "../_components/StickyTabs";
import Disclosure from "@/app/components/Disclosure";

type Level = "Level 1 – Core" | "Level 2 – Expected" | "Level 3 – Advanced";

function LevelTag({ level }: { level: Level }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-700">
      {level}
    </span>
  );
}

type QA = {
  level: Level;
  q: string;
  a: string;
  explanation: string;
};

function QuestionCard({ item }: { item: QA }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <LevelTag level={item.level} />
        <h3 className="text-sm font-semibold text-slate-900">{item.q}</h3>
      </div>

      <div className="mt-2 text-sm">
        <span className="font-medium text-slate-900">Answer:</span>{" "}
        <span className="text-slate-700">{item.a}</span>
      </div>

      <Disclosure summary="Show explanation">
        {item.explanation}
      </Disclosure>
    </div>
  );
}

const anatomy: QA[] = [
  {
    level: "Level 1 – Core",
    q: "What are the boundaries of Calot’s triangle?",
    a: "Cystic duct, common hepatic duct, and inferior edge of the liver.",
    explanation:
      "Calot’s triangle is the key anatomic space dissected during laparoscopic cholecystectomy. Clearing this triangle allows identification of the cystic duct and cystic artery before division. Misidentification within this region is the most common cause of bile duct injury. Careful dissection here is essential for safe surgery.",
  },
  {
    level: "Level 1 – Core",
    q: "What are the three criteria for the Critical View of Safety?",
    a: "Clear Calot’s triangle; dissect the lower third of the gallbladder off the liver bed; confirm only two structures enter the gallbladder.",
    explanation:
      "The Critical View of Safety ensures that the only structures being divided are the cystic duct and cystic artery. Dissecting the lower third of the gallbladder off the liver bed prevents confusing the common bile duct with the cystic duct. All surrounding tissue must be cleared to fully visualize anatomy. Achieving CVS is the most important step in preventing bile duct injury.",
  },
  {
    level: "Level 2 – Expected",
    q: "What is Rouviere’s sulcus and why is it important?",
    a: "A horizontal cleft in the liver that approximates the plane of the common bile duct.",
    explanation:
      "Rouviere’s sulcus is a natural fissure on the posterior aspect of the liver. It roughly corresponds to the level of the common bile duct. Staying above this plane reduces the risk of bile duct injury, especially in difficult cases where inflammation distorts anatomy.",
  },
  {
    level: "Level 3 – Advanced",
    q: "What is Hartmann’s pouch?",
    a: "An outpouching of the gallbladder infundibulum.",
    explanation:
      "Hartmann’s pouch is a focal bulging of the gallbladder near the cystic duct. Gallstones can become impacted here, distorting anatomy and making dissection more challenging. Inflammation can obscure the cystic duct and nearby biliary structures. Recognizing this helps explain why some cases are technically difficult.",
  },
];

const indications: QA[] = [
  {
    level: "Level 1 – Core",
    q: "What is the most common indication for laparoscopic cholecystectomy?",
    a: "Symptomatic cholelithiasis.",
    explanation:
      "Most elective cholecystectomies are performed for biliary colic caused by gallstones. Asymptomatic stones alone are generally not an indication. Recurrent symptoms or complications such as cholecystitis justify surgery.",
  },
  {
    level: "Level 1 – Core",
    q: "What imaging modality is first-line for suspected gallbladder disease?",
    a: "Right upper quadrant ultrasound.",
    explanation:
      "Ultrasound is sensitive for gallstones and can show gallbladder wall thickening, pericholecystic fluid, and a sonographic Murphy sign. It is noninvasive and widely available, making it the preferred initial test.",
  },
  {
    level: "Level 2 – Expected",
    q: "When should cholecystectomy be performed after mild gallstone pancreatitis?",
    a: "During the same admission after clinical resolution.",
    explanation:
      "Early cholecystectomy reduces the risk of recurrent pancreatitis and other biliary events. Delayed surgery increases recurrence risk. Once the patient stabilizes and inflammation resolves, same-admission surgery is recommended.",
  },
];

const operative: QA[] = [
  {
    level: "Level 1 – Core",
    q: "What is the purpose of retracting the fundus superiorly and the infundibulum laterally?",
    a: "To open Calot’s triangle and improve visualization.",
    explanation:
      "Proper retraction exposes key structures by widening Calot’s triangle. Inadequate retraction can distort anatomy and increase the risk of misidentification. This is a common intraoperative teaching point.",
  },
  {
    level: "Level 2 – Expected",
    q: "Why is achieving the Critical View of Safety essential?",
    a: "To prevent bile duct injury from misidentification of anatomy.",
    explanation:
      "Most bile duct injuries occur when the common bile duct is mistaken for the cystic duct. CVS requires full visualization and confirmation before division. This structured approach minimizes dangerous assumptions.",
  },
  {
    level: "Level 3 – Advanced",
    q: "What is a subtotal cholecystectomy and when is it performed?",
    a: "Partial removal of the gallbladder when safe dissection is not possible.",
    explanation:
      "In severe inflammation or distorted anatomy, dissecting Calot’s triangle may be unsafe. Subtotal cholecystectomy removes most of the gallbladder while avoiding dissection near critical structures. It is a bail-out strategy intended to reduce the risk of major bile duct injury.",
  },
];

const complications: QA[] = [
  {
    level: "Level 1 – Core",
    q: "What is the most feared complication of laparoscopic cholecystectomy?",
    a: "Bile duct injury.",
    explanation:
      "Bile duct injury can lead to bile leak, strictures, recurrent infections, and long-term morbidity. Many injuries require complex reconstruction. Prevention depends on meticulous identification of anatomy and adherence to the Critical View of Safety.",
  },
  {
    level: "Level 1 – Core",
    q: "What is the most common cause of bile duct injury?",
    a: "Misidentification of anatomy.",
    explanation:
      "Most injuries occur when the common bile duct is mistaken for the cystic duct. This is often due to incomplete dissection or failure to achieve CVS. Avoiding assumptions and confirming anatomy are key preventive steps.",
  },
  {
    level: "Level 2 – Expected",
    q: "How does a postoperative bile leak typically present?",
    a: "Abdominal pain, fever, bilious drainage, or signs of peritonitis.",
    explanation:
      "Bile leaks often present within days of surgery. Patients may have increasing abdominal pain, fever, or persistent bilious drain output. Early recognition prevents worsening infection and sepsis.",
  },
  {
    level: "Level 3 – Advanced",
    q: "What is a Roux-en-Y hepaticojejunostomy (and when is it used)?",
    a: "A reconstruction connecting the bile duct to a limb of jejunum to restore bile drainage (often for major bile duct injury).",
    explanation:
      "In a Roux-en-Y hepaticojejunostomy, the injured segment of bile duct is bypassed and the healthy duct is anastomosed to a segment of small intestine (jejunum) so bile can drain into the GI tract. This is typically performed by hepatobiliary specialists and often delayed until inflammation subsides. The goal is to reduce long-term strictures and recurrent infections.",
  },
];

function Category({ title, items }: { title: string; items: QA[] }) {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-4 grid gap-4">
        {items.map((item) => (
          <QuestionCard key={item.q} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function LapCholePimpPage() {
  return (
    <>
      <StickyTabs />

      <section className="pt-8">
        <h2 className="text-xl font-semibold">Pimp Questions</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Organized by category and leveled by difficulty. Expand explanations for deeper understanding.
        </p>

        <Category title="Anatomy" items={anatomy} />
        <Category title="Indications & Workup" items={indications} />
        <Category title="Operative Principles" items={operative} />
        <Category title="Complications" items={complications} />
      </section>
    </>
  );
}