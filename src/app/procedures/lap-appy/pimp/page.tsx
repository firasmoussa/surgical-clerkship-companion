"use client";

import SourceCitations from "@/app/components/SourceCitations";
import type { ClinicalSourceId } from "@/app/lib/clinicalSources";

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

type Question = { sources: ClinicalSourceId[]; id: string; level: Level; question: string; answer: string; pearl?: string };

const QUESTIONS: Question[] = [
  { id: "p1", sources: ["appyAnatomy"], level: 1, question: "What is the blood supply to the appendix?", answer: "The appendiceal artery, a branch of the ileocolic artery (which comes off the SMA). It runs within the mesoappendix.", pearl: "The ileocolic artery is the terminal branch of the SMA and supplies the cecum, appendix, and terminal ileum." },
  { id: "p2", sources: ["appyTechnique"], level: 1, question: "How do you reliably find the appendix laparoscopically?", answer: "Follow the taenia coli toward their convergence at the appendiceal base. This landmark helps locate an appendix whose tip lies in a variable position." },
  { id: "p3", sources: ["appyTechnique", "variation"], level: 1, question: "What does a retrocecal appendix mean for identification?", answer: "The appendix lies behind the cecum. Its position can make exposure more difficult; cecal mobilization may be needed.", pearl: "Reported frequencies vary by population and study. Learn the relationship rather than a universal percentage." },
  { id: "p4", sources: ["appyImaging"], level: 1, question: "What are the classic CT findings of acute appendicitis?", answer: "Appendiceal enlargement, wall thickening, and surrounding inflammatory fat stranding support the diagnosis; an appendicolith may be present. Diameter alone is not diagnostic." },
  { id: "p5", sources: ["prophylaxis", "wses2020"], level: 1, question: "What antibiotics do you give preoperatively for appendicitis?", answer: "Provide enteric gram-negative and anaerobic coverage. For uncomplicated appendectomy prophylaxis, options include cefoxitin or cefazolin plus metronidazole. Complicated infection requires a treatment regimen chosen for severity, allergies, and local resistance." },
  { id: "p6", sources: ["wses2020"], level: 2, question: "What is the Alvarado score and what is its role?", answer: "A score based on pain migration, anorexia, nausea/vomiting, RLQ tenderness, rebound, fever, leukocytosis, and neutrophil left shift. It supports risk assessment but should not alone confirm appendicitis in adults." },
  { id: "p7", sources: ["coda", "wses2025"], level: 2, question: "When is non-operative management appropriate for appendicitis?", answer: "Antibiotics are an option for selected patients with uncomplicated appendicitis after shared decision-making. Discuss recurrence and later surgery; an appendicolith increases the chance of appendectomy.", pearl: "CODA found noninferior 30-day health status with antibiotics. By 90 days, 29% had undergone appendectomy: 41% with an appendicolith and 25% without. These are 90-day outcomes, not one-year success rates." },
  { id: "p8", sources: ["appyGuideline", "wses2025"], level: 2, question: "What is interval appendectomy and when is it done?", answer: "Appendectomy after initial non-operative treatment has settled the acute episode. Selection incorporates recurrence and neoplasm risk. SAGES conditionally favors interval appendectomy in adults after complicated appendicitis; recommendations vary by age and guideline." },
  { id: "p9", sources: ["base"], level: 2, question: "What do you do if the appendiceal base is friable or perforated?", answer: "Assess the viability of the appendiceal base and adjacent cecum with the supervising surgeon. Closure must involve viable tissue; the extent of cecal involvement determines whether a more extensive resection is needed." },
  { id: "p10", sources: ["wses2020", "appyGuideline", "wses2025"], level: 2, question: "What is the appropriate management of a periappendiceal abscess in a stable patient?", answer: "Treatment is individualized. Antibiotics with drainage of an accessible collection are an option; laparoscopic surgery is also an option where expertise is available. Follow-up after non-operative treatment must address recurrence and possible neoplasm." },
  { id: "p11", sources: ["neoplasm"], level: 3, question: "An appendectomy specimen returns with a 2.5 cm carcinoid at the base. What is your next step?", answer: "Refer for staging and colorectal or surgical oncology assessment for right hemicolectomy. ASCRS recommends right hemicolectomy for appendiceal NETs larger than 2 cm.", pearl: "For smaller tumors, size alone is insufficient: margins, grade, location, and invasion affect the decision. Do not assume every tumor 2 cm or smaller is cured by appendectomy." },
  { id: "p12", sources: ["wses2020", "appyTechnique"], level: 3, question: "The appendix looks completely normal intraoperatively. What is your next step?", answer: "Survey for another explanation, including ileal and pelvic pathology. WSES 2020 suggests removing a normal-appearing appendix in symptomatic patients when no alternative disease is found; this is a weak recommendation, not an unconditional rule." },
  { id: "p13", sources: ["neoplasm"], level: 3, question: "What is pseudomyxoma peritonei and what is its relation to the appendix?", answer: "Mucinous peritoneal disease, often of appendiceal origin. Refer to a specialist peritoneal malignancy team; selected patients are considered for cytoreductive surgery with intraperitoneal chemotherapy.", pearl: "Avoid rupture or mucin spillage and involve colorectal or surgical oncology specialists. Management depends on pathology and extent of disease." },
];

export default function LapAppyPimpPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<Level | null>(null);
  const filtered = filter ? QUESTIONS.filter((q) => q.level === filter) : QUESTIONS;

  return (
    <>
      <section className="pt-8">
        <h2 className="font-sans tracking-tight text-[20px] text-ink font-semibold">Common OR Questions</h2>
        <p className="mt-2 max-w-2xl text-[14px] text-secondary leading-relaxed">
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
              <div key={q.id} className="rounded-2xl border border-border-warm bg-card overflow-hidden">
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
                  <span className="text-[14px] text-ink flex-1">{q.question}</span>
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
                    <div className="pt-3 text-[14px] text-secondary leading-relaxed">{q.answer}</div>
                    <SourceCitations sources={q.sources} />
                    {q.pearl && (
                      <div
                        className="mt-3 rounded-md border-l-[3px] p-3"
                        style={{ borderLeftColor: "var(--color-ochre)", backgroundColor: "var(--color-surface)" }}
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
