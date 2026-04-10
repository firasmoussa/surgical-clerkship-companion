"use client";
import { useState } from "react";

type Level = 1 | 2 | 3;

const LEVEL_LABELS: Record<Level, string> = {
  1: "Core",
  2: "Expected",
  3: "Advanced",
};

const LEVEL_TAG_CLASS: Record<Level, string> = {
  1: "text-secondary border-border-warm bg-surface",
  2: "text-ochre border-ochre bg-surface",
  3: "text-danger border-danger bg-surface",
};

type Question = { id: string; level: Level; question: string; answer: string; pearl?: string };

const QUESTIONS: Question[] = [
  // Anatomy
  { id: "a1", level: 1, question: "What are the boundaries of Calot's triangle?", answer: "Cystic duct (inferior), common hepatic duct (medial), and inferior edge of the liver (superior).", pearl: "Calot's triangle is the key anatomic space dissected during lap chole. Clearing this triangle allows identification of the cystic duct and cystic artery before division. Misidentification within this region is the most common cause of bile duct injury." },
  { id: "a2", level: 1, question: "What are the three criteria for the Critical View of Safety?", answer: "Clear Calot's triangle of all fat and fibrous tissue; dissect the lower third of the gallbladder off the liver bed; confirm only two structures enter the gallbladder.", pearl: "CVS ensures that the only structures divided are the cystic duct and cystic artery. Dissecting the lower third of the gallbladder off the liver bed prevents confusing the CBD with the cystic duct. Achieving CVS is the most important step in preventing bile duct injury." },
  { id: "a3", level: 2, question: "What is Rouviere's sulcus and why is it important?", answer: "A horizontal cleft on the inferior surface of the right hepatic lobe that approximates the plane of the common bile duct.", pearl: "Rouviere's sulcus is a natural fissure that roughly corresponds to the level of the CBD. Staying superior and anterior to this plane reduces the risk of bile duct injury, especially when inflammation distorts anatomy." },
  { id: "a4", level: 3, question: "What is Hartmann's pouch and why does it matter operatively?", answer: "An outpouching of the gallbladder infundibulum near the cystic duct, where gallstones can become impacted and distort anatomy.", pearl: "Hartmann's pouch can obscure the cystic duct and nearby biliary structures, making dissection technically difficult. Recognizing it helps explain why some cases are harder to achieve CVS." },
  // Indications & Workup
  { id: "i1", level: 1, question: "What is the most common indication for laparoscopic cholecystectomy?", answer: "Symptomatic cholelithiasis (biliary colic).", pearl: "Most elective cholecystectomies are for biliary colic caused by gallstones. Asymptomatic stones alone are generally not an indication unless there is a specific risk factor (e.g., porcelain gallbladder, immunosuppression)." },
  { id: "i2", level: 1, question: "What imaging modality is first-line for suspected gallbladder disease?", answer: "Right upper quadrant ultrasound.", pearl: "Ultrasound is sensitive for gallstones and can show gallbladder wall thickening, pericholecystic fluid, and a sonographic Murphy sign. It is noninvasive and widely available." },
  { id: "i3", level: 2, question: "When should cholecystectomy be performed after mild gallstone pancreatitis?", answer: "During the same admission after clinical resolution.", pearl: "Early cholecystectomy reduces the risk of recurrent pancreatitis and other biliary events. Delayed surgery increases recurrence risk. Once the patient stabilizes and inflammation resolves, same-admission surgery is recommended." },
  // Operative Principles
  { id: "o1", level: 1, question: "What is the purpose of retracting the fundus superiorly and the infundibulum laterally?", answer: "To open Calot's triangle and expose the cystic duct and artery for dissection.", pearl: "Proper retraction is the most important initial step -- inadequate retraction can distort anatomy and increase misidentification risk. This is a common intraoperative teaching point." },
  { id: "o2", level: 2, question: "Why is achieving the Critical View of Safety essential before clipping?", answer: "To prevent bile duct injury from misidentification -- most injuries occur when the CBD is mistaken for the cystic duct.", pearl: "CVS requires full visualization and confirmation before any structure is divided. This structured approach minimizes dangerous assumptions and is the standard of care." },
  { id: "o3", level: 3, question: "What is a subtotal cholecystectomy and when is it performed?", answer: "Partial removal of the gallbladder when anatomy is too inflamed or distorted to safely complete a total cholecystectomy.", pearl: "Subtotal cholecystectomy is a bail-out strategy intended to reduce the risk of major bile duct injury. It is performed by experienced surgeons when CVS cannot be safely achieved." },
  // Complications
  { id: "c1", level: 1, question: "What is the most feared complication of laparoscopic cholecystectomy?", answer: "Bile duct injury.", pearl: "Bile duct injury can lead to bile leak, strictures, recurrent cholangitis, and long-term morbidity. Many injuries require complex reconstruction. Prevention depends on meticulous anatomic identification and CVS." },
  { id: "c2", level: 1, question: "What is the most common cause of bile duct injury during lap chole?", answer: "Misidentification of anatomy -- most commonly mistaking the CBD for the cystic duct.", pearl: "This error typically occurs due to incomplete dissection or failure to achieve CVS. Avoiding assumptions and confirming anatomy before clipping are the key preventive steps." },
  { id: "c3", level: 2, question: "How does a postoperative bile leak typically present?", answer: "Abdominal pain, fever, bilious drain output, or signs of peritonitis within days of surgery.", pearl: "Bile leaks most commonly arise from the cystic duct stump or an unrecognized accessory duct. ERCP with stenting is the usual management. Early recognition prevents worsening sepsis." },
  { id: "c4", level: 3, question: "What is a Roux-en-Y hepaticojejunostomy and when is it used after lap chole?", answer: "A reconstruction connecting the injured bile duct to a limb of jejunum to restore biliary-enteric drainage -- used for major bile duct transection or injury.", pearl: "This is typically performed by hepatobiliary specialists and often delayed until inflammation resolves. The goal is to reduce long-term strictures and recurrent infections." },
];

export default function LapCholePimpPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<Level | null>(null);
  const filtered = filter ? QUESTIONS.filter((q) => q.level === filter) : QUESTIONS;

  return (
    <section className="pt-8">
      <h2 className="font-serif italic text-[20px] text-ink font-normal">Pimp Questions</h2>
      <p className="mt-2 max-w-2xl text-[13px] text-secondary leading-relaxed">
        Click a question to reveal the answer. Filter by level to focus.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter(null)}
          className={[
            "rounded-full border px-3 py-1 text-xs transition-colors",
            filter === null
              ? "bg-ochre border-ochre text-parchment font-medium"
              : "border-border-warm text-secondary bg-transparent hover:text-ink",
          ].join(" ")}
        >
          All
        </button>
        {([1, 2, 3] as Level[]).map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => setFilter(filter === lvl ? null : lvl)}
            className={[
              "rounded-full border px-3 py-1 text-xs transition-colors",
              filter === lvl
                ? "bg-ochre border-ochre text-parchment font-medium"
                : "border-border-warm text-secondary bg-transparent hover:text-ink",
            ].join(" ")}
          >
            Level {lvl} -- {LEVEL_LABELS[lvl]}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((q) => {
          const isOpen = open === q.id;
          return (
            <div key={q.id} className="rounded-lg border border-border-warm overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : q.id)}
                className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-surface transition-colors"
              >
                <span
                  className={[
                    "mt-0.5 flex-shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                    LEVEL_TAG_CLASS[q.level],
                  ].join(" ")}
                >
                  L{q.level}
                </span>
                <span className="text-[13px] text-ink flex-1">{q.question}</span>
                <svg
                  className={["w-4 h-4 text-muted flex-shrink-0 mt-0.5 transition-transform", isOpen ? "rotate-180" : ""].join(" ")}
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 border-t border-border-warm bg-surface">
                  <div className="pt-3 text-[13px] text-secondary leading-relaxed">{q.answer}</div>
                  {q.pearl && (
                    <div
                      className="mt-3 rounded-md border-l-[3px] p-3"
                      style={{ borderLeftColor: "#C17B2F", backgroundColor: "#EDE5D8" }}
                    >
                      <span className="text-[11px] text-ochre font-medium">Pearl: </span>
                      <span className="text-[12px] text-secondary">{q.pearl}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-border-warm p-5 text-center">
        <p className="text-[13px] text-secondary">Have a question that stumped you on rounds?</p>
        <a
          href="/submit"
          className="mt-3 inline-block bg-ochre text-parchment rounded-[6px] px-4 py-2 text-[13px] font-medium hover:opacity-90 transition-opacity"
        >
          Submit a pimp question
        </a>
      </div>
    </section>
  );
}
