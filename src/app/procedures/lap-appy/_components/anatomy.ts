import type { ClinicalSourceId } from "@/app/lib/clinicalSources";

type AnatomyStructure = { name: string; note: string; sources: readonly ClinicalSourceId[] };

export const structures = [
  { name: "Appendix", sources: ["appyAnatomy", "appyTechnique"], note: "A blind-ended tube arising from the posteromedial cecum. Its position varies; the diagram shows an exposed appendix for orientation." },
  { name: "Appendiceal base", sources: ["appyAnatomy", "appyTechnique"], note: "The junction of the appendix and cecum, located by following the converging taenia coli. Assess the tissue at the base before division." },
  { name: "Cecum", sources: ["appyAnatomy", "appyTechnique"], note: "The blind pouch at the beginning of the large intestine. It provides the landmarks for locating the appendix." },
  { name: "Taenia coli", sources: ["appyAnatomy", "appyTechnique"], note: "Three longitudinal muscle bands converge at the appendiceal base. Follow a visible band toward the base; the posterior course is shown schematically with a dashed line." },
  { name: "Mesoappendix", sources: ["appyAnatomy", "appyTechnique"], note: "The peritoneal fold supporting the appendix and connecting it to the mesentery of the terminal ileum. It contains the appendiceal vessels." },
  { name: "Appendiceal artery", sources: ["appyAnatomy", "appyTechnique"], note: "Usually arises from the ileocolic arterial system and travels within the mesoappendix. Identify the vascular pedicle before division; branching can vary." },
  { name: "Terminal ileum", sources: ["appyAnatomy", "appyTechnique"], note: "The final segment of small bowel entering the cecum. Identify it to orient the ileocecal region and distinguish it from the appendix." },
  { name: "Ileocecal junction", sources: ["appyAnatomy", "appyTechnique"], note: "Where the terminal ileum enters the cecum. The appendiceal origin lies inferior to this junction." },
  { name: "Retrocecal position", sources: ["appyAnatomy", "appyTechnique", "variation"], note: "The appendix lies behind the cecum. Cecal mobilization may be needed for exposure. The inset shows an alternative position, not a second appendix. Reported frequency varies across populations and studies." },
] as const satisfies readonly AnatomyStructure[];

export type AppyStructure = (typeof structures)[number]["name"];
