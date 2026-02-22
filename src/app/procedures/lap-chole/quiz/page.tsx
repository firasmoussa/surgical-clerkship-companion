"use client";

import { useMemo, useState } from "react";
import StickyTabs from "../_components/StickyTabs";

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
      { id: "D", text: "Identification of Rouviere’s sulcus" },
    ],
    correct: "B",
    explanation:
      "One CVS criterion is freeing the lower third of the gallbladder from the liver bed. CVS also requires clearing Calot’s triangle and confirming only two structures enter the gallbladder before division.",
  },
  {
    id: "q2",
    prompt: "What are the boundaries of Calot’s triangle?",
    options: [
      { id: "A", text: "Cystic duct, common bile duct, and liver edge" },
      { id: "B", text: "Cystic duct, common hepatic duct, and inferior liver edge" },
      { id: "C", text: "Common bile duct, hepatic artery, and cystic duct" },
      { id: "D", text: "Cystic artery, liver edge, and common bile duct" },
    ],
    correct: "B",
    explanation:
      "Calot’s triangle is bounded by the cystic duct, common hepatic duct, and inferior edge of the liver. It is the key space dissected to identify the cystic duct and artery safely.",
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
    explanation:
      "The cystic artery typically branches from the right hepatic artery. Bleeding from this area can quickly obscure visualization during Calot’s triangle dissection.",
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
    explanation:
      "Bile duct injury can lead to bile leak, strictures, recurrent infections, and long-term morbidity, often requiring complex reconstruction.",
  },
  {
    id: "q5",
    prompt: "What is the purpose of retracting the fundus superiorly and the infundibulum laterally?",
    options: [
      { id: "A", text: "To identify the hepatic artery" },
      { id: "B", text: "To open Calot’s triangle and improve visualization" },
      { id: "C", text: "To reduce operative time" },
      { id: "D", text: "To prevent bile leak" },
    ],
    correct: "B",
    explanation:
      "Proper retraction opens Calot’s triangle and exposes the cystic duct and artery. Poor retraction distorts anatomy and increases misidentification risk.",
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
    explanation:
      "Ultrasound is sensitive for gallstones and can show features of cholecystitis. It is noninvasive, quick, and widely available.",
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
    explanation:
      "Bile leaks often present within days with abdominal pain, fever, bilious drain output, or fluid collections. ERCP with stenting is a common management approach.",
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
    explanation:
      "Most bile duct injuries occur when the common bile duct is mistaken for the cystic duct. CVS is designed to prevent this error.",
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
    explanation:
      "Same-admission cholecystectomy after clinical resolution reduces recurrence of pancreatitis and other biliary complications.",
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
    explanation:
      "Subtotal cholecystectomy is a bail-out strategy when anatomy is unsafe. It reduces the risk of major bile duct injury by avoiding dangerous dissection in Calot’s triangle.",
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
    const correct = selected === q.correct;
    if (correct) setScore((s) => s + 1);
    else setIncorrectIds((arr) => [...arr, q.id]);
    setPhase("checked");
  }

  function next() {
    setSelected(null);
    if (idx + 1 >= questions.length) setPhase("finished");
    else {
      setIdx((i) => i + 1);
      setPhase("answering");
    }
  }

  function restart() {
    setIdx(0);
    setPhase("answering");
    setSelected(null);
    setScore(0);
    setIncorrectIds([]);
  }

  return (
    <>
      <StickyTabs />

      <section className="pt-8">
        <h2 className="text-xl font-semibold">Quiz Yourself</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          One question at a time. Submit to reveal the answer and explanation.
        </p>

        {phase !== "finished" ? (
          <div className="mt-6 rounded-2xl border border-slate-200 p-5">
            <div className="text-xs text-slate-500">
              Question {idx + 1} of {questions.length}
            </div>

            <div className="mt-2 text-base font-semibold text-slate-900">{q.prompt}</div>

            <div className="mt-4 space-y-2">
              {q.options.map((opt) => {
                const isChosen = selected === opt.id;
                const showResult = phase === "checked";
                const isCorrect = opt.id === q.correct;
                const chosenWrong = showResult && isChosen && !isCorrect;
                const chosenCorrect = showResult && isChosen && isCorrect;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={phase === "checked"}
                    onClick={() => setSelected(opt.id)}
                    className={[
                      "w-full rounded-xl border px-4 py-3 text-left text-sm transition",
                      isChosen ? "border-slate-900" : "border-slate-200 hover:bg-slate-50",
                      chosenCorrect ? "bg-emerald-50" : "",
                      chosenWrong ? "bg-rose-50" : "",
                    ].join(" ")}
                  >
                    <span className="mr-2 font-medium">{opt.id}.</span> {opt.text}
                  </button>
                );
              })}
            </div>

            {phase === "checked" && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <div className="font-medium text-slate-900">
                  {selected === q.correct ? "Correct ✅" : `Incorrect ❌ (Correct: ${q.correct})`}
                </div>
                <div className="mt-2">{q.explanation}</div>
              </div>
            )}

            <div className="mt-5 flex items-center justify-between">
              <div className="text-sm text-slate-600">Score: {score}</div>

              {phase === "answering" ? (
                <button
                  type="button"
                  onClick={submit}
                  disabled={!selected}
                  className={[
                    "rounded-xl px-4 py-2 text-sm font-medium",
                    selected ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-slate-200 text-slate-500",
                  ].join(" ")}
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={next}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  {idx + 1 === questions.length ? "Finish" : "Next"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-slate-200 p-6">
            <div className="text-sm text-slate-600">Quiz complete</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">
              You scored {score} / {questions.length}
            </div>

            {incorrectIds.length > 0 ? (
              <div className="mt-4 text-sm text-slate-600">
                <div className="font-medium text-slate-900">Review suggestion</div>
                <div className="mt-1">
                  Consider reviewing these topics in the Pimp Questions tab:{" "}
                  <span className="text-slate-700">{incorrectIds.join(", ")}</span>
                </div>
              </div>
            ) : (
              <div className="mt-4 text-sm text-slate-600">
                Nice — no misses. Consider adding a few Level 3 questions later if you want a challenge.
              </div>
            )}

            <div className="mt-6">
              <button
                type="button"
                onClick={restart}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Restart quiz
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}