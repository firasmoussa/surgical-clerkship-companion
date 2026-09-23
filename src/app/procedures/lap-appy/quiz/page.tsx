"use client";

import SourceCitations from "@/app/components/SourceCitations";
import Link from "next/link";
import { QUIZ_QUESTIONS as QUESTIONS, OR_QUESTIONS } from "../questions";

import { useMemo, useState } from "react";
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
    if (!selected || phase !== "answering") return;
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
          15 questions based on the OR Questions material. Submit to reveal the explanation and clinical sources.
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
                    aria-pressed={isChosen}
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
              <div className="mt-4 text-[14px] text-secondary">
                <p className="font-medium text-ink">Review these OR Questions:</p>
                <ul className="mt-2 space-y-2">
                  {Array.from(new Set(questions.filter((item) => incorrectIds.includes(item.id)).map((item) => item.reviewId))).map((id) => (
                    <li key={id}><Link className="text-ochre underline underline-offset-4" href={`/procedures/lap-appy/pimp?question=${id}#${id}`}>{OR_QUESTIONS.find((item) => item.id === id)?.question}</Link></li>
                  ))}
                </ul>
              </div>
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
