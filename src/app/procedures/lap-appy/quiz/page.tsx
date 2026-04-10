"use client";
import { useMemo, useState } from "react";
type Question = { id: string; prompt: string; options: { id: string; text: string }[]; correct: string; explanation: string };

const QUESTIONS: Question[] = [
  { id: "q1", prompt: "Which landmark most reliably leads you to the appendiceal base during laparoscopy?", options: [{ id: "A", text: "Ileocecal valve" }, { id: "B", text: "Terminal ileum" }, { id: "C", text: "Taenia coli" }, { id: "D", text: "Psoas muscle" }], correct: "C", explanation: "The three taenia coli converge at the appendiceal base. Following them is the most reliable way to locate the appendix regardless of its position." },
  { id: "q2", prompt: "Approximately what percentage of patients have a retrocecal appendix?", options: [{ id: "A", text: "10%" }, { id: "B", text: "30%" }, { id: "C", text: "50%" }, { id: "D", text: "65%" }], correct: "D", explanation: "Retrocecal is the most common anatomic position (~65%), though it may produce an atypical presentation with flank or back pain." },
  { id: "q3", prompt: "The appendiceal artery is a branch of which vessel?", options: [{ id: "A", text: "Right colic artery" }, { id: "B", text: "Superior mesenteric artery (directly)" }, { id: "C", text: "Ileocolic artery" }, { id: "D", text: "Middle colic artery" }], correct: "C", explanation: "The appendiceal artery branches from the ileocolic artery, a terminal branch of the SMA. It runs within the mesoappendix." },
  { id: "q4", prompt: "An appendectomy specimen shows a 2.5 cm neuroendocrine tumor at the base. What is the next step?", options: [{ id: "A", text: "Observation with serial imaging" }, { id: "B", text: "Radiation therapy" }, { id: "C", text: "Right hemicolectomy" }, { id: "D", text: "Appendectomy was curative" }], correct: "C", explanation: "Appendiceal NETs > 2 cm or at the base carry significant lymph node metastasis risk. Right hemicolectomy is indicated. Tumors <= 2 cm at the tip are cured by appendectomy alone." },
  { id: "q5", prompt: "The CODA trial compared antibiotics vs. appendectomy for uncomplicated appendicitis. Which statement best reflects its findings?", options: [{ id: "A", text: "Surgery was clearly superior at 30 days" }, { id: "B", text: "Antibiotics were non-inferior, but 1 in 4 patients crossed over to surgery within 90 days" }, { id: "C", text: "Antibiotics had higher complication rates" }, { id: "D", text: "Antibiotics failed in > 50% of patients" }], correct: "B", explanation: "The CODA trial (NEJM 2020) showed antibiotics non-inferior for health status at 30 days, but ~30% of patients eventually required surgery. Patients with an appendicolith had significantly higher failure rates." },
  { id: "q6", prompt: "During an appendectomy, the appendix looks grossly normal. What is the most important next step?", options: [{ id: "A", text: "Close and abort" }, { id: "B", text: "Remove the appendix and close" }, { id: "C", text: "Survey for other pathology, then remove the appendix" }, { id: "D", text: "Consult GI for colonoscopy" }], correct: "C", explanation: "A normal-appearing appendix warrants a systematic survey: terminal ileum for Meckel's, right ovary and tube in women, mesenteric lymph nodes, sigmoid. The appendix should still be removed." },
  { id: "q7", prompt: "What CT finding most significantly increases the failure rate of non-operative management?", options: [{ id: "A", text: "Appendiceal diameter > 6 mm" }, { id: "B", text: "Periappendiceal fat stranding" }, { id: "C", text: "Appendicolith" }, { id: "D", text: "Pelvic appendix position" }], correct: "C", explanation: "An appendicolith significantly increases the risk of progression to perforation and failure of antibiotic management. Most guidelines recommend operative management when a fecalith is present." },
  { id: "q8", prompt: "Port-site hernia is most likely to occur at ports of what size or larger?", options: [{ id: "A", text: "5 mm" }, { id: "B", text: "8 mm" }, { id: "C", text: "10 mm" }, { id: "D", text: "15 mm" }], correct: "C", explanation: "Fascial closure is standard for all port sites 10 mm or larger. Port-site hernias at these sizes can lead to bowel incarceration." },
  { id: "q9", prompt: "What is the appropriate initial management of a periappendiceal abscess in a stable patient?", options: [{ id: "A", text: "Immediate appendectomy" }, { id: "B", text: "Antibiotics alone" }, { id: "C", text: "Percutaneous drainage plus antibiotics, followed by interval appendectomy consideration" }, { id: "D", text: "Laparotomy with right hemicolectomy" }], correct: "C", explanation: "A contained periappendiceal abscess in a stable patient is managed with CT-guided drainage and IV antibiotics. After resolution, interval appendectomy is considered." },
  { id: "q10", prompt: "You encounter gelatinous mucin throughout the peritoneum during an appendectomy. What is the most likely diagnosis?", options: [{ id: "A", text: "Perforated gastric ulcer" }, { id: "B", text: "Pseudomyxoma peritonei from a low-grade appendiceal mucinous neoplasm" }, { id: "C", text: "Mucinous ovarian cystadenoma" }, { id: "D", text: "Ischemic colitis" }], correct: "B", explanation: "Pseudomyxoma peritonei arises from a low-grade appendiceal mucinous neoplasm in ~90% of cases. Stop the operation and get HPB/surgical oncology involved." },
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
              <p className="mt-4 text-[13px] text-secondary">Clean sweep. You are ready to be pimped on rounds.</p>
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
    </>
  );
}
