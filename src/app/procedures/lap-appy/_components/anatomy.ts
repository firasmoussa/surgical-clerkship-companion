export const structures = [
  { name: "Appendix", note: "A blind-ended tube arising from the posteromedial cecum. Its position varies; the diagram shows an exposed appendix for orientation." },
  { name: "Appendiceal base", note: "The junction of the appendix and cecum, located by following the converging taenia coli. Assess the tissue at the base before division." },
  { name: "Cecum", note: "The blind pouch at the beginning of the large intestine. It provides the landmarks for locating the appendix." },
  { name: "Taenia coli", note: "Three longitudinal muscle bands converge at the appendiceal base. Follow a visible band toward the base; the posterior course is shown schematically with a dashed line." },
  { name: "Mesoappendix", note: "The peritoneal fold supporting the appendix and connecting it to the mesentery of the terminal ileum. It contains the appendiceal vessels." },
  { name: "Appendiceal artery", note: "Usually arises from the ileocolic arterial system and travels within the mesoappendix. Identify the vascular pedicle before division; branching can vary." },
  { name: "Terminal ileum", note: "The final segment of small bowel entering the cecum. Identify it to orient the ileocecal region and distinguish it from the appendix." },
  { name: "Ileocecal junction", note: "Where the terminal ileum enters the cecum. The appendiceal origin lies inferior to this junction." },
  { name: "Retrocecal position", note: "The appendix lies behind the cecum. Cecal mobilization may be needed for exposure. The inset shows an alternative position, not a second appendix. Reported frequency varies across populations and studies." },
] as const;

export type AppyStructure = (typeof structures)[number]["name"];
