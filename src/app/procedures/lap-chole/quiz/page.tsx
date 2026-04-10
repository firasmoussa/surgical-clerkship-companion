"use client";

import { useMemo, useState } from "react";

type Option = { id: "A" | "B" | "C" | "D"; text: string };
type Question = {
  id: string;
  prompt: string;
  options: Option[];
  correct: Option["id"];
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    prompt: "Which of the following is required to achieve the Critical View of Safety?",
    options: [
      { id: "A", text: "Visualization of the common bile duct" },
      { id: "B", text: "Dissection of the lower third of the gallbladder off the liver bed" },
      { id: "C", text: "Routine intraoperative cholangiography" },
      { id: "D", text: "Identification of Rouviere's sulcus" },
    ],
    correct: "B",
    explanation: "One CVS criterion is freeing the lower third of the gallbladder from the liver bed. CVS also requires clearing Calot's triangle and confirming only two structures enter the gallbladder before division.",
  },
  {
    id: "q2",
    prompt: "What are the boundaries of Calot's triangle?",
    options: [
      { id: "A", text: "Cystic duct, common bile duct, and liver edge" },
      { id: "B", text: "Cystic duct, common hepatic duct, and inferior liver edge" },
      { id: "C", text: "Common bile duct, hepatic artery, and cystic duct" },
      { id: "D", text: "Cystic artery, liver edge, and common bile duct" },
    ],
    correct: "B",
    explanation: "Calot's triangle is bounded by the cystic duct, common hepatic duct, and inferior edge of the liver. It is the key space dissected to identify the cystic duct and artery safely.",
  },
  {
    id: "q3",
    prompt: "The cystic artery most commonly arises from which vessel?",
    options: [
      { id: "A", text: "Proper hepatic artery" },
      { id: "B", text: "Common hepatic artery" },
      { id: "C", text: "Right hepatic artery" },
      { id: "D", text: "Gastroduodenal artery" },
    ],
    correct: "C",
    explanation: "The cystic artery typically branches from the right hepatic artery. Bleeding from this area can quickly obscure visualization during Calot's triangle dissection.",
  },
  {
    id: "q4",
    prompt: "What is the most feared complication of laparoscopic cholecystectomy?",
    options: [
      { id: "A", text: "Postoperative ileus" },
      { id: "B", text: "Surgical site infection" },
      { id: "C", text: "Bile duct injury" },
      { id: "D", text: "Retained stone" },
    ],
    correct: "C",
    explanation: "Bile duct injury can lead to bile leak, strictures, recurrent infections, and long-term morbidity, often requiring complex reconstruction.",
  },
  {
    id: "q5",
    prompt: "What is the purpose of retracting the fundus superiorly and the infundibulum laterally?",
    options: [
      { id: "A", text: "To identify the hepatic artery" },
      { id: "B", text: "To open Calot's triangle and improve visualization" },
      { id: "C", text: "To reduce operative time" },
      { id: "D", text: "To prevent bile leak" },
    ],
    correct: "B",
    explanation: "Proper retraction opens Calot's triangle and exposes the cystic duct and artery. Poor retraction distorts anatomy and increases misidentification risk.",
  },
  {
    id: "q6",
    prompt: "What imaging modality is first-line for suspected gallbladder disease?",
    options: [
      { id: "A", text: "CT scan" },
      { id: "B", text: "HIDA scan" },
      { id: "C", text: "MRCP" },
      { id: "D", text: "Right upper quadrant ultrasound" },
    ],
    correct: "D",
    explanation: "Ultrasound is sensitive for gallstones and can show features of cholecystitis. It is noninvasive, quick, and widely available.",
  },
  {
    id: "q7",
    prompt: "A postoperative bile leak most commonly presents with:",
    options: [
      { id: "A", text: "Immediate hypotension" },
      { id: "B", text: "Progressive abdominal pain and bilious drainage" },
      { id: "C", text: "Chronic diarrhea" },
      { id: "D", text: "Isolated elevated AST" },
    ],
    correct: "B",
    explanation: "Bile leaks often present within days with abdominal pain, fever, bilious drain output, or fluid collections. ERCP with stenting is a common management approach.",
  },
  {
    id: "q8",
    prompt: "What is the most common cause of bile duct injury during lap chole?",
    options: [
      { id: "A", text: "Instrument malfunction" },
      { id: "B", text: "Inadequate clipping technique" },
      { id: "C", text: "Misidentification of anatomy" },
      { id: "D", text: "Excessive cautery use" },
    ],
    correct: "C",
    explanation: "Most bile duct injuries occur when the common bile duct is mistaken for the cystic duct. CVS is designed to prevent this error.",
  },
  {
    id: "q9",
    prompt: "When should cholecystectomy be performed after mild gallstone pancreatitis?",
    options: [
      { id: "A", text: "Immediately during pancreatitis" },
      { id: "B", text: "After 6 months" },
      { id: "C", text: "During the same admission after resolution" },
      { id: "D", text: "Only if pancreatitis recurs" },
    ],
    correct: "C",
    explanation: "Same-admission cholecystectomy after clinical resolution reduces recurrence of pancreatitis and other biliary complications.",
  },
  {
    id: "q10",
    prompt: "In severe inflammation where CVS cannot be achieved safely, the best next step is:",
    options: [
      { id: "A", text: "Continue aggressive dissection until anatomy is clear" },
      { id: "B", text: "Convert to open and proceed with normal dissection" },
      { id: "C", text: "Perform a subtotal cholecystectomy" },
      { id: "D", text: "Abort the procedure immediately" },
    ],
    correct: "C",
    explanation: "Subtotal cholecystectomy is a bail-out strategy when anatomy is unsafe. It reduces the risk of major bile duct injury by avoiding dangerous dissection in Calot's triangle.",
  },
];

type Phase = "answering" | "checked" | "finished";

export default function LapCholeQuizPage() {
  const questions = useMemo(() => QUESTIONS, []);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("answering");
  const [selected, setSelected] = useState<Question["correct"] | null>(null);
  const [score, setScore] = useState(0);
  const [incorrectIds, setIncorrectIds] = useState<string[]>([]);

  const q = questions[idx];

  function submit() {
    if (!selected) return;
    if (selected === q.correct) setScore((s) => s + 1);
    else setIncorrectIds((arr) => [...arr, q.id]);
    setPhase("checked");
  }

  function next() {
    setSelected(null);
    if (idx + 1 >= questions.length) setPhase("finished");
    else { setIdx((i) => i + 1); setPhase("answering"); }
  }

  function restart() {
    setIdx(0); setPhase("answering"); setSelected(null); setScore(0); setIncorrectIds([]);
  }

  return (
    <section className="pt-8">
      <h2 className="font-serif italic text-[20px] text-ink font-normal">Quiz Yourself</h2>
      <p className="mt-2 max-w-2xl text-[13px] text-secondary leading-relaxed">
        One question at a time. Submit to reveal the answer and explanation.
      </p>

      {phase !== "finished" ? (
        <div className="mt-6 rounded-lg border border-border-warm p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-surface overflow-hidden">
              <div
                className="h-full rounded-full bg-ochre transition-all"
                style={{ width: `${((idx + (phase === "checked" ? 1 : 0)) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-muted flex-shrink-0">{idx + 1} / {questions.length}</span>
          </div>

          <div className="text-[13px] font-medium text-ink">{q.prompt}</div>

          <div className="mt-4 space-y-2">
            {q.options.map((opt) => {
              const isChosen = selected === opt.id;
              const showResult = phase === "checked";
              const isCorrect = opt.id === q.correct;

              let cls = "w-full rounded-[6px] border px-4 py-3 text-left text-[13px] transition-colors ";
              let inlineStyle: React.CSSProperties | undefined;

              if (!showResult) {
                if (isChosen) {
                  cls += "border-ochre text-ink";
                  inlineStyle = { backgroundColor: "rgba(193,123,47,0.08)" };
                } else {
                  cls += "border-border-warm text-secondary hover:bg-surface";
                }
              } else {
                if (isCorrect) {
                  cls += "border-cvs-border bg-cvs-light text-cvs font-medium";
                } else if (isChosen) {
                  cls += "border-danger text-danger";
                  inlineStyle = { backgroundColor: "rgba(139,58,58,0.06)" };
                } else {
                  cls += "border-border-warm text-muted";
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={showResult}
                  onClick={() => setSelected(opt.id)}
                  className={cls}
                  style={inlineStyle}
                >
                  <span className="font-medium">{opt.id}.</span> {opt.text}
                </button>
              );
            })}
          </div>

          {phase === "checked" && (
            <div
              className="mt-4 rounded-md border-l-[3px] p-3"
              style={{ borderLeftColor: "#C17B2F", backgroundColor: "#EDE5D8" }}
            >
              <div className="text-[11px] text-ochre font-medium mb-1">
                {selected === q.correct ? "Correct" : `Incorrect -- correct answer: ${q.correct}`}
              </div>
              <p className="text-[13px] text-secondary leading-relaxed">{q.explanation}</p>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-muted">Score: {score}</span>
            {phase === "answering" ? (
              <button
                type="button"
                onClick={submit}
                disabled={!selected}
                className={[
                  "rounded-[6px] px-4 py-2 text-[13px] font-medium transition-colors",
                  selected ? "bg-ochre text-parchment" : "bg-surface text-muted cursor-not-allowed",
                ].join(" ")}
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={next}
                className="bg-ochre text-parchment rounded-[6px] px-4 py-2 text-[13px] font-medium"
              >
                {idx + 1 === questions.length ? "Finish" : "Next"}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-border-warm p-6">
          <p className="text-[11px] text-muted uppercase tracking-wider">Quiz complete</p>
          <div className="mt-1 font-serif italic text-[26px] text-ink font-normal">
            {score} / {questions.length}
          </div>

          {incorrectIds.length > 0 ? (
            <p className="mt-4 text-[13px] text-secondary">
              <span className="font-medium text-ink">Review suggestion: </span>
              Consider revisiting these in the Pimp tab: {incorrectIds.join(", ")}
            </p>
          ) : (
            <p className="mt-4 text-[13px] text-secondary">
              Clean sweep. You are ready to be pimped on rounds.
            </p>
          )}

          <div className="mt-6">
            <button
              type="button"
              onClick={restart}
              className="border border-border-warm text-secondary rounded-[6px] px-4 py-2 text-[13px] hover:bg-surface transition-colors"
            >
              Restart quiz
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
