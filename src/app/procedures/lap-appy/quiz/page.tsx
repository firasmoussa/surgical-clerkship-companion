"use client";

import SourceCitations from "@/app/components/SourceCitations";
import type { ClinicalSourceId } from "@/app/lib/clinicalSources";

import { useMemo, useState } from "react";
type Question = { sources: ClinicalSourceId[]; id: string; prompt: string; options: { id: string; text: string }[]; correct: string; explanation: string };

const QUESTIONS: Question[] = [
  { id: "q1", sources: ["appyTechnique"], prompt: "Which landmark most reliably leads you to the appendiceal base during laparoscopy?", options: [{ id: "A", text: "Ileocecal valve" }, { id: "B", text: "Terminal ileum" }, { id: "C", text: "Taenia coli" }, { id: "D", text: "Psoas muscle" }], correct: "C", explanation: "The three taenia coli converge at the appendiceal base. Following them is the most reliable way to locate the appendix regardless of its position." },
  { id: "q2", sources: ["appyAnatomy", "variation"], prompt: "Where is a retrocecal appendix located?", options: [{ id: "A", text: "Anterior to the stomach" }, { id: "B", text: "Within the ileal lumen" }, { id: "C", text: "Above the liver" }, { id: "D", text: "Behind the cecum" }], correct: "D", explanation: "Retrocecal means behind the cecum. Reported frequencies vary between populations and studies, so a single universal percentage is not taught here." },
  { id: "q3", sources: ["appyAnatomy"], prompt: "The appendiceal artery is a branch of which vessel?", options: [{ id: "A", text: "Right colic artery" }, { id: "B", text: "Superior mesenteric artery (directly)" }, { id: "C", text: "Ileocolic artery" }, { id: "D", text: "Middle colic artery" }], correct: "C", explanation: "The appendiceal artery branches from the ileocolic artery, a terminal branch of the SMA. It runs within the mesoappendix." },
  { id: "q4", sources: ["neoplasm"], prompt: "An appendectomy specimen shows a 2.5 cm neuroendocrine tumor. Which operation should be considered with the specialist team after staging?", options: [{ id: "A", text: "Cholecystectomy" }, { id: "B", text: "Splenectomy" }, { id: "C", text: "Right hemicolectomy" }, { id: "D", text: "No further assessment is needed" }], correct: "C", explanation: "ASCRS recommends right hemicolectomy for appendiceal NETs larger than 2 cm. Management of smaller tumors also depends on histology, margins, and other risk features." },
  { id: "q5", sources: ["coda"], prompt: "Which statement accurately describes the CODA randomized trial in adults with appendicitis?", options: [{ id: "A", text: "The trial excluded all patients with appendicoliths" }, { id: "B", text: "Antibiotics were noninferior for 30-day health status; 29% underwent appendectomy by 90 days" }, { id: "C", text: "No patient assigned antibiotics later underwent appendectomy" }, { id: "D", text: "Its primary endpoint was one-year cure without surgery" }], correct: "B", explanation: "CODA assessed health status at 30 days. Appendectomy by 90 days occurred in 29% of the antibiotics group, including 41% with an appendicolith and 25% without." },
  { id: "q6", sources: ["wses2020"], prompt: "During surgery for suspected appendicitis, the appendix looks normal. What should be assessed before deciding how to proceed?", options: [{ id: "A", text: "Whether the patient can be discharged immediately" }, { id: "B", text: "Only the appendix tip" }, { id: "C", text: "Other possible causes of the symptoms in the abdomen and pelvis" }, { id: "D", text: "Whether a cholecystectomy is needed in every case" }], correct: "C", explanation: "Inspect for alternative pathology. WSES 2020 suggests removal when the patient is symptomatic and no other disease is found, but the recommendation is weak and requires clinical judgment." },
  { id: "q7", sources: ["coda"], prompt: "What CT finding most significantly increases the failure rate of non-operative management?", options: [{ id: "A", text: "Appendiceal diameter > 6 mm" }, { id: "B", text: "Periappendiceal fat stranding" }, { id: "C", text: "Appendicolith" }, { id: "D", text: "Pelvic appendix position" }], correct: "C", explanation: "In CODA, appendectomy by 90 days was more frequent with an appendicolith (41%) than without one (25%). This finding is important when discussing antibiotic treatment." },
  { id: "q8", sources: ["closure"], prompt: "Port-site hernia is most likely to occur at ports of what size or larger?", options: [{ id: "A", text: "5 mm" }, { id: "B", text: "8 mm" }, { id: "C", text: "10 mm" }, { id: "D", text: "15 mm" }], correct: "C", explanation: "EHS/AHS suggests closing fascial defects at trocar sites 10 mm or larger, particularly at the umbilicus. This is a weak recommendation based on very low-certainty evidence." },
  { id: "q9", sources: ["wses2020", "appyGuideline", "wses2025"], prompt: "For a stable patient with a periappendiceal abscess selected for non-operative treatment, which approach is appropriate?", options: [{ id: "A", text: "Discharge without treatment or follow-up" }, { id: "B", text: "Routine right hemicolectomy" }, { id: "C", text: "Antibiotics, drainage when appropriate, and planned follow-up" }, { id: "D", text: "Drainage without any consideration of antibiotics" }], correct: "C", explanation: "Drainage depends on collection accessibility and the clinical situation. Laparoscopic surgery is an alternative in experienced hands. Follow-up after non-operative care should address recurrence and neoplasm risk." },
  { id: "q10", sources: ["neoplasm"], prompt: "You encounter gelatinous mucin throughout the peritoneum during an appendectomy. What is the most likely diagnosis?", options: [{ id: "A", text: "Perforated gastric ulcer" }, { id: "B", text: "Pseudomyxoma peritonei from a low-grade appendiceal mucinous neoplasm" }, { id: "C", text: "Mucinous ovarian cystadenoma" }, { id: "D", text: "Ischemic colitis" }], correct: "B", explanation: "Pseudomyxoma peritonei is mucinous peritoneal disease often arising from an appendiceal neoplasm. Avoid spillage and involve a specialist peritoneal malignancy team." },
];

type Phase = "answering" | "checked" | "finished";

export default function LapAppyQuizPage() {
  const questions = useMemo(() => QUESTIONS, []);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("answering");
  const [selected, setSelected] = useState<string | null>(null);
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
    <>
      <section className="pt-8">
        <h2 className="font-sans tracking-tight text-[20px] text-ink font-semibold">Quiz Yourself</h2>
        <p className="mt-2 max-w-2xl text-[14px] text-secondary leading-relaxed">
          One question at a time. Submit to reveal the answer and explanation.
        </p>

        {phase !== "finished" ? (
          <div className="mt-6 rounded-2xl border border-border-warm bg-card p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full bg-surface overflow-hidden">
                <div
                  className="h-full rounded-full bg-ochre transition-all"
                  style={{ width: `${((idx + (phase === "checked" ? 1 : 0)) / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-muted flex-shrink-0">{idx + 1} / {questions.length}</span>
            </div>

            <div className="text-[14px] font-medium text-ink">{q.prompt}</div>

            <div className="mt-4 space-y-2">
              {q.options.map((opt) => {
                const isChosen = selected === opt.id;
                const showResult = phase === "checked";
                const isCorrect = opt.id === q.correct;

                let cls = "w-full rounded-lg border px-4 py-3 text-left text-[14px] transition-colors ";
                let inlineStyle: React.CSSProperties | undefined;

                if (!showResult) {
                  if (isChosen) {
                    cls += "border-ochre text-ink";
                    inlineStyle = { backgroundColor: "var(--color-accent-soft)" };
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
                style={{ borderLeftColor: "var(--color-ochre)", backgroundColor: "var(--color-surface)" }}
              >
                <div className="text-[11px] text-ochre font-medium mb-1">
                  {selected === q.correct ? "Correct" : `Incorrect -- correct answer: ${q.correct}`}
                </div>
                <p className="text-[14px] text-secondary leading-relaxed">{q.explanation}</p>
                <SourceCitations sources={q.sources} />
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
                    "rounded-lg px-4 py-2 text-[14px] font-medium transition-colors",
                    selected ? "bg-ochre text-parchment" : "bg-surface text-muted cursor-not-allowed",
                  ].join(" ")}
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={next}
                  className="bg-ochre text-parchment rounded-lg px-4 py-2 text-[14px] font-medium"
                >
                  {idx + 1 === questions.length ? "Finish" : "Next"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-border-warm bg-card p-6">
            <p className="text-[11px] text-muted uppercase tracking-wider">Quiz complete</p>
            <div className="mt-1 font-sans tracking-tight text-[30px] text-ink font-semibold">
              {score} / {questions.length}
            </div>

            {incorrectIds.length > 0 ? (
              <p className="mt-4 text-[14px] text-secondary">
                <span className="font-medium text-ink">Review suggestion: </span>
                Consider revisiting these in the OR Questions tab: {incorrectIds.join(", ")}
              </p>
            ) : (
              <p className="mt-4 text-[14px] text-secondary">All answers correct. Review the explanations to reinforce your understanding.</p>
            )}

            <div className="mt-6">
              <button
                type="button"
                onClick={restart}
                className="border border-border-warm text-secondary rounded-lg px-4 py-2 text-[14px] hover:bg-surface transition-colors"
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
