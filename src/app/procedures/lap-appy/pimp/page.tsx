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
  { id: "p1", level: 1, question: "What is the blood supply to the appendix?", answer: "The appendiceal artery, a branch of the ileocolic artery (which comes off the SMA). It runs within the mesoappendix.", pearl: "The ileocolic artery is the terminal branch of the SMA and supplies the cecum, appendix, and terminal ileum." },
  { id: "p2", level: 1, question: "How do you reliably find the appendix laparoscopically?", answer: "Follow the taenia coli to their convergence point on the cecum -- this always leads to the appendiceal base, regardless of appendix position." },
  { id: "p3", level: 1, question: "What is the most common position of the appendix?", answer: "Retrocecal is the most common anatomic position (~65%), followed by pelvic. The pelvic position produces the most classic RLQ presentation.", pearl: "Despite retrocecal being the most common anatomic position, pelvic appendicitis is what most students picture -- know both." },
  { id: "p4", level: 1, question: "What are the classic CT findings of acute appendicitis?", answer: "Dilated appendix > 6 mm, periappendiceal fat stranding, appendiceal wall thickening, possible appendicolith, loss of periappendiceal fat planes." },
  { id: "p5", level: 1, question: "What antibiotics do you give preoperatively for appendicitis?", answer: "Gram-negative and anaerobic coverage. Common regimen: cefoxitin or cefazolin + metronidazole, or piperacillin-tazobactam in complicated cases." },
  { id: "p6", level: 2, question: "What is the Alvarado score and what is its role?", answer: "A clinical scoring system using: migration of pain to RLQ, anorexia, nausea/vomiting, RLQ tenderness, rebound, elevated temperature, leukocytosis, left shift. Score 7-10 is high probability." },
  { id: "p7", level: 2, question: "When is non-operative management appropriate for appendicitis?", answer: "For uncomplicated appendicitis (no perforation, no abscess, no fecalith on CT) in selected patients. The CODA trial showed ~70% success at 1 year.", pearl: "The CODA trial (NEJM 2020) showed antibiotics non-inferior to appendectomy for uncomplicated cases, but 1 in 4 patients crossed over to surgery within 90 days." },
  { id: "p8", level: 2, question: "What is interval appendectomy and when is it done?", answer: "Elective appendectomy performed weeks to months after non-operative management of a periappendiceal abscess. Many centers now omit it given low recurrence rates." },
  { id: "p9", level: 2, question: "What do you do if the appendiceal base is friable or perforated?", answer: "Cannot rely on stapler or clips alone. Options: place endoloops proximal to the diseased tissue, oversew the stump, or perform ileocecal resection if the cecum is involved." },
  { id: "p10", level: 2, question: "What is the appropriate management of a periappendiceal abscess in a stable patient?", answer: "CT-guided percutaneous drainage plus IV antibiotics. Urgent surgery carries higher morbidity. After resolution, interval appendectomy is considered." },
  { id: "p11", level: 3, question: "An appendectomy specimen returns with a 2.5 cm carcinoid at the base. What is your next step?", answer: "Right hemicolectomy. Tumors > 2 cm or at the appendiceal base have significant lymph node metastasis risk (~30%). Appendectomy alone is curative only for tumors <= 2 cm at the tip.", pearl: "Appendiceal NETs <= 2 cm: appendectomy is curative. > 2 cm or base involvement: right hemicolectomy." },
  { id: "p12", level: 3, question: "The appendix looks completely normal intraoperatively. What is your next step?", answer: "Systematic survey: inspect the terminal ileum for Meckel's diverticulum, mesentery for lymph nodes, right ovary and tube in females, terminal ileum for Crohn's, sigmoid for diverticulitis. Remove the appendix regardless." },
  { id: "p13", level: 3, question: "What is pseudomyxoma peritonei and what is its relation to the appendix?", answer: "A syndrome of mucin accumulation in the peritoneal cavity, arising from a low-grade appendiceal mucinous neoplasm (LAMN) in ~90% of cases. Treatment is cytoreductive surgery + HIPEC.", pearl: "If you see gelatinous mucin throughout the peritoneum intraop -- stop and get HPB/surgical oncology involved." },
];

export default function LapAppyPimpPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<Level | null>(null);
  const filtered = filter ? QUESTIONS.filter((q) => q.level === filter) : QUESTIONS;

  return (
    <>
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
    </>
  );
}
