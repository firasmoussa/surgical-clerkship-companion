"use client";

import SourceCitations from "@/app/components/SourceCitations";
import { OR_QUESTIONS as QUESTIONS, type Level } from "../questions";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const LEVEL_LABELS: Record<Level, string> = {
  1: "Core",
  2: "Expected",
};

const LEVEL_TAG_CLASS: Record<Level, string> = {
  1: "text-secondary border-border-warm bg-surface",
  2: "text-ochre border-ochre bg-surface",
};

function QuestionsContent() {
  const params = useSearchParams();
  const [open, setOpen] = useState<string | null>(params.get("question"));
  const [filter, setFilter] = useState<Level | null>(null);
  const filtered = filter ? QUESTIONS.filter((q) => q.level === filter) : QUESTIONS;

  return (
    <>
      <section className="pt-8">
        <h2 className="font-sans tracking-tight text-[20px] text-ink font-semibold">Common OR Questions</h2>
        <p className="mt-2 max-w-2xl text-[14px] text-secondary leading-relaxed">
          13 questions for your M3 clerkship, from anatomy and presentation to diagnosis and management. Open an answer to see its sources.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={filter === null}
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
          {([1, 2] as Level[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              aria-pressed={filter === lvl}
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
              <div id={q.id} key={q.id} className="scroll-mt-48 rounded-2xl border border-border-warm bg-card overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`answer-${q.id}`}
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
                  <span className="flex-1"><span className="block text-[11px] text-muted mb-1">{q.topic}</span><span className="text-[14px] text-ink">{q.question}</span></span>
                  <svg
                    className={["w-4 h-4 text-muted flex-shrink-0 mt-0.5 transition-transform", isOpen ? "rotate-180" : ""].join(" ")}
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isOpen && (
                  <div id={`answer-${q.id}`} className="px-4 pb-4 border-t border-border-warm bg-surface">
                    <div className="pt-3 text-[14px] text-secondary leading-relaxed">{q.answer}</div>
                    {q.pearl && (
                      <div
                        className="mt-3 rounded-md border-l-[3px] p-3"
                        style={{ borderLeftColor: "var(--color-ochre)", backgroundColor: "var(--color-surface)" }}
                      >
                        <span className="text-[11px] text-ochre font-medium">Pearl: </span>
                        <span className="text-[12px] text-secondary">{q.pearl}</span>
                      </div>
                    )}
                    <SourceCitations sources={q.sources} />
                    {q.resource && <a href={q.resource.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-ochre underline underline-offset-4">{q.resource.label}<span className="sr-only"> (opens in a new tab)</span></a>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-lg border border-dashed border-border-warm p-5 text-center">
          <p className="text-[14px] text-secondary">Have a question that stumped you on rounds?</p>
          <a
            href="/submit"
            className="mt-3 inline-block bg-ochre text-parchment rounded-lg px-4 py-2 text-[14px] font-medium hover:opacity-90 transition-opacity"
          >
            Submit an OR question
          </a>
        </div>
      </section>
    </>
  );
}

export default function LapAppyPimpPage() {
  return <Suspense fallback={<p className="pt-8 text-secondary">Loading questions...</p>}><QuestionsContent /></Suspense>;
}
