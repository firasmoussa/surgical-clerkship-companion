export const PROCEDURES = ["Laparoscopic Cholecystectomy", "Laparoscopic Appendectomy", "Inguinal Hernia Repair (coming soon)"] as const;
export const LIMITS = { question: 800, answer: 1200, context: 800, tags: 200 } as const;

export function validateSubmission(value: unknown, now = Date.now()) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid submission.");
  const body = value as Record<string, unknown>;
  if (typeof body.procedure !== "string" || !PROCEDURES.some(p => p === body.procedure)) throw new Error("Choose a supported procedure.");
  if (typeof body.honeypot !== "string" || body.honeypot.length > 200) throw new Error("Invalid submission.");
  if (typeof body.startedAt !== "number" || !Number.isFinite(body.startedAt) || now - body.startedAt < 2500) throw new Error("Please take a moment to review your question before submitting.");
  const fields = { question: "", answer: "", context: "", tags: "" };
  for (const field of Object.keys(fields) as (keyof typeof fields)[]) {
    const input = body[field] ?? "";
    if (typeof input !== "string") throw new Error("Invalid submission.");
    fields[field] = input.trim();
    if (fields[field].length > LIMITS[field]) throw new Error(`${field} exceeds the character limit.`);
  }
  if (!fields.question) throw new Error("Enter a question.");
  if (/https?:\/\//i.test(Object.values(fields).join(" "))) throw new Error("Links are not allowed in submissions.");
  return { procedure: body.procedure, ...fields, spam: body.honeypot.trim().length > 0 };
}
