import type { ClinicalSourceId } from "@/app/lib/clinicalSources";

export type Level = 1 | 2;
export type ORQuestion = {
  id: string;
  topic: string;
  level: Level;
  question: string;
  answer: string;
  sources: ClinicalSourceId[];
  pearl?: string;
  resource?: { label: string; url: string };
};

// Adapted from the supplied M3 question document. See docs/clinical-source-review.md.
export const OR_QUESTIONS: ORQuestion[] = [
  {
    "id": "base",
    "topic": "Anatomy",
    "level": 1,
    "question": "Where is the base of the appendix reliably found?",
    "answer": "At the convergence of the three taeniae coli on the cecum. Follow these longitudinal muscle bands to the base even when the tip is hidden or in an unusual position.",
    "sources": [
      "appyAnatomy"
    ]
  },
  {
    "id": "mcburney",
    "topic": "Anatomy",
    "level": 1,
    "question": "What is McBurney’s point?",
    "answer": "One-third of the distance from the right anterior superior iliac spine (ASIS) toward the umbilicus. Tenderness here supports appendicitis but is not diagnostic on its own.",
    "sources": [
      "appyAnatomy",
      "appyPresentation"
    ]
  },
  {
    "id": "positions",
    "topic": "Anatomy",
    "level": 1,
    "question": "What are the common positions of the appendiceal tip?",
    "answer": "Retrocecal, pelvic, subcecal, pre-ileal, and post-ileal. The base is relatively constant, while the tip varies. A retrocecal appendix lies behind the cecum; a pelvic appendix extends into the pelvis. Position can change the pain pattern and examination.",
    "sources": [
      "appyAnatomy",
      "variation"
    ],
    "pearl": "Reported position frequencies vary by study and population. Do not rely on a single percentage to locate the appendix."
  },
  {
    "id": "artery",
    "topic": "Anatomy",
    "level": 1,
    "question": "What is the arterial supply of the appendix?",
    "answer": "The appendicular (appendiceal) artery arises from the ileocolic arterial system, supplied by the superior mesenteric artery. It travels within the mesoappendix.",
    "sources": [
      "appyAnatomy",
      "appyVariants"
    ]
  },
  {
    "id": "obstruction",
    "topic": "Pathophysiology and presentation",
    "level": 1,
    "question": "How can luminal obstruction lead to appendicitis?",
    "answer": "An appendicolith, lymphoid enlargement, or a tumor can obstruct the lumen. Rising pressure impairs venous drainage and perfusion, promoting bacterial overgrowth, ischemia, necrosis, and possible perforation. This is a classic mechanism, not an inevitable sequence in every patient.",
    "sources": [
      "appyPresentation"
    ]
  },
  {
    "id": "pain",
    "topic": "Pathophysiology and presentation",
    "level": 1,
    "question": "Why can pain migrate from the periumbilical region to the right lower quadrant?",
    "answer": "Early visceral afferent stimulation produces poorly localized periumbilical pain. Irritation of the adjacent parietal peritoneum then produces localized somatic pain, often in the right lower quadrant. The classic migration is not present in every patient.",
    "sources": [
      "appyAnatomy",
      "appyPresentation"
    ]
  },
  {
    "id": "signs",
    "topic": "Pathophysiology and presentation",
    "level": 1,
    "question": "How do you elicit Rovsing, psoas, and obturator signs?",
    "answer": "Rovsing: left lower quadrant palpation elicits right lower quadrant pain. Psoas: passive extension of the right hip elicits pain from psoas irritation, classically with a retrocecal appendix. Obturator: internal rotation of the flexed right hip elicits pain from obturator irritation, classically with a pelvic appendix. These signs support assessment but do not independently confirm or exclude appendicitis.",
    "sources": [
      "appyPresentation",
      "appyExam"
    ]
  },
  {
    "id": "labs",
    "topic": "Diagnosis",
    "level": 1,
    "question": "What laboratory tests help assess suspected appendicitis?",
    "answer": "CBC with differential, often with CRP, helps assess inflammation. Urinalysis evaluates urinary alternatives; a pregnancy test is appropriate when pregnancy is possible. Interpret results alongside the history, examination, and imaging rather than as a stand-alone diagnosis.",
    "sources": [
      "appyDiagnosis",
      "wses2020"
    ]
  },
  {
    "id": "imaging",
    "topic": "Diagnosis",
    "level": 2,
    "question": "How does imaging differ for adults, children, and pregnant patients?",
    "answer": "For a nonpregnant adult who needs imaging, CT abdomen and pelvis with IV contrast is usually appropriate; ultrasound-first pathways are also used. In children, ultrasound is generally first-line when imaging is indicated. In pregnancy, ultrasound or MRI without IV contrast is appropriate; MRI is useful after an inconclusive ultrasound. Selection depends on clinical risk, availability, and local expertise.",
    "sources": [
      "acrRLQ",
      "appyGuideline",
      "wses2020"
    ]
  },
  {
    "id": "scores",
    "topic": "Diagnosis",
    "level": 2,
    "question": "What is the Alvarado score, and how are appendicitis scores used?",
    "answer": "Alvarado is a 10-point score: right lower quadrant tenderness and leukocytosis score 2 each; pain migration, anorexia, nausea/vomiting, rebound tenderness, elevated temperature, and neutrophil left shift score 1 each. It supports risk stratification, not stand-alone confirmation in adults. Other tools include the Appendicitis Inflammatory Response (AIR) score, Adult Appendicitis Score (AAS), and Pediatric Appendicitis Score (PAS).",
    "sources": [
      "alvaradoCalculator",
      "wses2020"
    ],
    "resource": {
      "label": "Open the Alvarado score calculator on MDCalc",
      "url": "https://www.mdcalc.com/calc/617/alvarado-score-acute-appendicitis"
    }
  },
  {
    "id": "ct",
    "topic": "Diagnosis",
    "level": 2,
    "question": "What are the classic CT findings of acute appendicitis?",
    "answer": "An enlarged appendix with wall thickening or enhancement and surrounding inflammatory fat stranding supports appendicitis. An appendicolith may be present. Diameter alone is insufficient; interpret the appendix and secondary inflammatory changes together.",
    "sources": [
      "appyImaging",
      "appyVariants"
    ],
    "resource": {
      "label": "View the published annotated imaging example (Figure 9)",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4324638/figure/F9/"
    }
  },
  {
    "id": "abscess",
    "topic": "Management and evidence",
    "level": 2,
    "question": "How is a periappendiceal abscess managed?",
    "answer": "In selected stable patients, antibiotics with percutaneous drainage of an accessible collection are an option. Drainage is not mandatory for every abscess. Laparoscopic treatment is also an option with appropriate expertise. Plan follow-up after nonoperative care, including assessment of recurrence and neoplasm risk.",
    "sources": [
      "wses2020",
      "appyGuideline",
      "wses2025"
    ]
  },
  {
    "id": "coda",
    "topic": "Management and evidence",
    "level": 2,
    "question": "What was the CODA trial, and what did it show?",
    "answer": "CODA randomized adults with imaging-confirmed appendicitis to antibiotics or appendectomy. Antibiotics were noninferior for 30-day health status (EQ-5D). By 90 days, 29% of the antibiotics group had undergone appendectomy: 41% with an appendicolith and 25% without. These results do not establish equal long-term cure rates.",
    "sources": [
      "coda"
    ],
    "pearl": "The primary trial report is the CODA Collaborative, NEJM 2020. Distinguish its 30-day primary endpoint from the 90-day appendectomy outcome."
  }
];

export type QuizQuestion = { id: string; reviewId: string; prompt: string; options: { id: string; text: string }[]; correct: string; explanation: string; sources: ClinicalSourceId[] };

const quizPrompts: Omit<QuizQuestion, "explanation" | "sources">[] = [
  {
    "id": "base",
    "reviewId": "base",
    "prompt": "Which landmark leads to the appendiceal base when the tip is difficult to see?",
    "options": [
      {
        "id": "A",
        "text": "Ileocecal valve alone"
      },
      {
        "id": "B",
        "text": "Convergence of the three taeniae coli"
      },
      {
        "id": "C",
        "text": "Right ureter"
      },
      {
        "id": "D",
        "text": "Psoas tendon"
      }
    ],
    "correct": "B"
  },
  {
    "id": "mcburney",
    "reviewId": "mcburney",
    "prompt": "Where is McBurney’s point?",
    "options": [
      {
        "id": "A",
        "text": "One-third from the umbilicus toward the left ASIS"
      },
      {
        "id": "B",
        "text": "Halfway from the xiphoid to the umbilicus"
      },
      {
        "id": "C",
        "text": "One-third from the right ASIS toward the umbilicus"
      },
      {
        "id": "D",
        "text": "Directly over the pubic symphysis"
      }
    ],
    "correct": "C"
  },
  {
    "id": "positions",
    "reviewId": "positions",
    "prompt": "What does a retrocecal appendiceal position mean?",
    "options": [
      {
        "id": "A",
        "text": "The appendix lies behind the cecum"
      },
      {
        "id": "B",
        "text": "The appendix lies within the terminal ileum"
      },
      {
        "id": "C",
        "text": "The appendix lies anterior to the stomach"
      },
      {
        "id": "D",
        "text": "The appendix lies in the inguinal canal"
      }
    ],
    "correct": "A"
  },
  {
    "id": "artery",
    "reviewId": "artery",
    "prompt": "Which arterial system gives rise to the appendicular artery?",
    "options": [
      {
        "id": "A",
        "text": "Left colic, from the IMA"
      },
      {
        "id": "B",
        "text": "Middle colic, from the SMA"
      },
      {
        "id": "C",
        "text": "Gastroduodenal, from the celiac axis"
      },
      {
        "id": "D",
        "text": "Ileocolic, from the SMA"
      }
    ],
    "correct": "D"
  },
  {
    "id": "obstruction",
    "reviewId": "obstruction",
    "prompt": "How can appendiceal luminal obstruction contribute to perforation?",
    "options": [
      {
        "id": "A",
        "text": "It lowers intraluminal pressure and increases perfusion"
      },
      {
        "id": "B",
        "text": "It impairs drainage and perfusion as pressure rises"
      },
      {
        "id": "C",
        "text": "It directly obstructs the common bile duct"
      },
      {
        "id": "D",
        "text": "It prevents bacterial growth within the appendix"
      }
    ],
    "correct": "B"
  },
  {
    "id": "pain",
    "reviewId": "pain",
    "prompt": "What explains localization of initially vague periumbilical pain to the right lower quadrant?",
    "options": [
      {
        "id": "A",
        "text": "Improved appendiceal perfusion"
      },
      {
        "id": "B",
        "text": "Resolution of visceral inflammation"
      },
      {
        "id": "C",
        "text": "Irritation of the adjacent parietal peritoneum"
      },
      {
        "id": "D",
        "text": "Stretching of the left hemidiaphragm"
      }
    ],
    "correct": "C"
  },
  {
    "id": "rovsing",
    "reviewId": "signs",
    "prompt": "Left lower quadrant palpation produces right lower quadrant pain. Which sign is this?",
    "options": [
      {
        "id": "A",
        "text": "Rovsing sign"
      },
      {
        "id": "B",
        "text": "Psoas sign"
      },
      {
        "id": "C",
        "text": "Obturator sign"
      },
      {
        "id": "D",
        "text": "Murphy sign"
      }
    ],
    "correct": "A"
  },
  {
    "id": "obturator",
    "reviewId": "signs",
    "prompt": "Which maneuver tests for obturator irritation?",
    "options": [
      {
        "id": "A",
        "text": "Passive extension of the right hip"
      },
      {
        "id": "B",
        "text": "Deep inspiration during right upper quadrant palpation"
      },
      {
        "id": "C",
        "text": "Left lower quadrant palpation"
      },
      {
        "id": "D",
        "text": "Internal rotation of the flexed right hip"
      }
    ],
    "correct": "D"
  },
  {
    "id": "labs",
    "reviewId": "labs",
    "prompt": "Which initial test set helps assess inflammation and important alternative diagnoses?",
    "options": [
      {
        "id": "A",
        "text": "CBC alone, which confirms appendicitis"
      },
      {
        "id": "B",
        "text": "CBC with differential, urinalysis, and pregnancy testing when applicable"
      },
      {
        "id": "C",
        "text": "Lipase alone, which excludes appendicitis"
      },
      {
        "id": "D",
        "text": "No laboratory assessment if Rovsing sign is absent"
      }
    ],
    "correct": "B"
  },
  {
    "id": "imaging-pregnancy",
    "reviewId": "imaging",
    "prompt": "A pregnant patient has suspected appendicitis and an inconclusive ultrasound. Which next study avoids ionizing radiation?",
    "options": [
      {
        "id": "A",
        "text": "Abdominal radiograph"
      },
      {
        "id": "B",
        "text": "CT with oral contrast only"
      },
      {
        "id": "C",
        "text": "MRI without IV contrast"
      },
      {
        "id": "D",
        "text": "Barium enema"
      }
    ],
    "correct": "C"
  },
  {
    "id": "imaging-child",
    "reviewId": "imaging",
    "prompt": "A child with suspected appendicitis needs initial imaging. Which is generally the first study?",
    "options": [
      {
        "id": "A",
        "text": "Ultrasound"
      },
      {
        "id": "B",
        "text": "Routine contrast CT in every child"
      },
      {
        "id": "C",
        "text": "PET-CT"
      },
      {
        "id": "D",
        "text": "Barium enema"
      }
    ],
    "correct": "A"
  },
  {
    "id": "scores",
    "reviewId": "scores",
    "prompt": "Which statement about the Alvarado score is correct?",
    "options": [
      {
        "id": "A",
        "text": "It independently confirms appendicitis in adults"
      },
      {
        "id": "B",
        "text": "Every item is worth two points"
      },
      {
        "id": "C",
        "text": "It distinguishes all uncomplicated from complicated cases"
      },
      {
        "id": "D",
        "text": "It helps stratify risk and is interpreted with the clinical assessment"
      }
    ],
    "correct": "D"
  },
  {
    "id": "ct",
    "reviewId": "ct",
    "prompt": "Which combination of CT findings supports acute appendicitis?",
    "options": [
      {
        "id": "A",
        "text": "Appendiceal diameter alone, regardless of other findings"
      },
      {
        "id": "B",
        "text": "Appendiceal enlargement, wall inflammation, and periappendiceal fat stranding"
      },
      {
        "id": "C",
        "text": "A normal appendix with isolated gallbladder stones"
      },
      {
        "id": "D",
        "text": "An appendicolith alone proves perforation"
      }
    ],
    "correct": "B"
  },
  {
    "id": "abscess",
    "reviewId": "abscess",
    "prompt": "A stable patient with an accessible periappendiceal abscess is selected for nonoperative care. Which plan is appropriate?",
    "options": [
      {
        "id": "A",
        "text": "Drainage alone without reassessment"
      },
      {
        "id": "B",
        "text": "Immediate right hemicolectomy in every case"
      },
      {
        "id": "C",
        "text": "Antibiotics, consideration of drainage, and planned follow-up"
      },
      {
        "id": "D",
        "text": "Observation without treatment because the patient is stable"
      }
    ],
    "correct": "C"
  },
  {
    "id": "coda",
    "reviewId": "coda",
    "prompt": "Which statement accurately describes CODA?",
    "options": [
      {
        "id": "A",
        "text": "Antibiotics were noninferior for 30-day health status; 29% underwent appendectomy by 90 days"
      },
      {
        "id": "B",
        "text": "Its primary endpoint proved equivalent lifetime cure"
      },
      {
        "id": "C",
        "text": "All patients with appendicoliths were excluded"
      },
      {
        "id": "D",
        "text": "No antibiotic-treated patient needed later surgery"
      }
    ],
    "correct": "A"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = quizPrompts.map((question) => {
  const review = OR_QUESTIONS.find((entry) => entry.id === question.reviewId);
  if (!review) throw new Error(`Missing OR question for ${question.id}`);
  return { ...question, explanation: review.answer, sources: review.sources };
});
