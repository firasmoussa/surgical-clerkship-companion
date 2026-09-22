"use client";

import { useRef, useState } from "react";
import { PROCEDURES, LIMITS } from "@/app/lib/submissions";

type FormState = {
  procedure: string;
  question: string;
  answer: string;
  context: string;
  tags: string;
  anonymous: boolean;
};

type SubmitFormProps = { enabled: boolean };

export default function SubmitForm({ enabled }: SubmitFormProps) {
  const procedures = PROCEDURES;

  const [form, setForm] = useState<FormState>({
    procedure: "Laparoscopic Cholecystectomy",
    question: "",
    answer: "",
    context: "",
    tags: "",
    anonymous: true,
  });

  const startedAtRef = useRef<number>(Date.now());
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/pimp/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          procedure: form.procedure,
          question: form.question,
          answer: form.answer,
          context: form.context,
          tags: form.tags,
          anonymous: form.anonymous,
          honeypot,
          startedAt: startedAtRef.current,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(data?.error ?? "Submission failed.");
        return;
      }

      setSubmitted(true);
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setSubmitted(false);
    setErrorMsg(null);
    setHoneypot("");
    startedAtRef.current = Date.now();
    setForm({
      procedure: "Laparoscopic Cholecystectomy",
      question: "",
      answer: "",
      context: "",
      tags: "",
      anonymous: true,
    });
  }

  return (
    <div className="max-w-3xl py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Submit an OR Question</h1>
      <p className="mt-3 max-w-2xl text-secondary">
        Help build a student-first resource. Share general learning points only. Do not include patient information, names, dates, or details that could identify anyone.
      </p>

      <div className="mt-6 rounded-2xl border border-border-warm bg-card p-6 sm:p-8">
        {!enabled ? (
          <div>
            <h2 className="text-lg font-semibold text-ink">Question submissions are not open yet</h2>
            <p className="mt-2 text-sm text-secondary">You can explore all procedure guides while we prepare submissions for the public launch.</p>
            <a href="/procedures" className="mt-4 inline-block text-sm text-ochre underline underline-offset-4">Explore the procedure guides</a>
          </div>
        ) : !submitted ? (
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Honeypot (hidden anti-spam field) */}
            <div className="hidden">
              <label className="text-sm font-medium text-ink">Website</label>
              <input
                className="mt-2 w-full rounded-lg border border-border-warm bg-parchment px-3 py-2.5 text-sm"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            <div>
              <label htmlFor="procedure" className="text-sm font-medium text-ink">Procedure</label>
              <select
                className="mt-2 w-full rounded-lg border border-border-warm bg-parchment px-3 py-2.5 text-sm"
                id="procedure"
                value={form.procedure}
                onChange={(e) => update("procedure", e.target.value)}
              >
                {procedures.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="question" className="text-sm font-medium text-ink">Question</label>
              <textarea
                className="mt-2 w-full rounded-lg border border-border-warm bg-parchment px-3 py-2.5 text-sm"
                rows={3}
                placeholder="What were you asked?"
                id="question"
                maxLength={LIMITS.question}
                value={form.question}
                onChange={(e) => update("question", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="answer" className="text-sm font-medium text-ink">
                Student-level Answer (optional)
              </label>
              <textarea
                className="mt-2 w-full rounded-lg border border-border-warm bg-parchment px-3 py-2.5 text-sm"
                rows={3}
                placeholder="What’s the best concise student answer?"
                id="answer"
                maxLength={LIMITS.answer}
                value={form.answer}
                onChange={(e) => update("answer", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="context" className="text-sm font-medium text-ink">Context (optional)</label>
              <textarea
                className="mt-2 w-full rounded-lg border border-border-warm bg-parchment px-3 py-2.5 text-sm"
                rows={2}
                placeholder="When was it asked? What part of the case?"
                id="context"
                maxLength={LIMITS.context}
                value={form.context}
                onChange={(e) => update("context", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="tags" className="text-sm font-medium text-ink">Tags (optional)</label>
              <input
                className="mt-2 w-full rounded-lg border border-border-warm bg-parchment px-3 py-2.5 text-sm"
                placeholder="anatomy, complications, CVS (comma-separated)"
                id="tags"
                maxLength={LIMITS.tags}
                value={form.tags}
                onChange={(e) => update("tags", e.target.value)}
              />
            </div>

            <p className="text-xs leading-relaxed text-secondary">We do not ask for your name or email. Your question and optional answer, context, and tags are stored for editorial review. Questions are not published automatically. Your IP address is processed for spam prevention; a keyed hash is stored temporarily by our rate-limiting provider. We do not save your IP address or browser details with the question.</p>

            {errorMsg && (
              <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={[
                "rounded-xl px-4 py-2 text-sm font-medium text-white",
                loading ? "bg-muted" : "bg-ochre hover:bg-charcoal",
              ].join(" ")}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <p className="text-xs text-muted">Please do not include patient identifiers.</p>
          </form>
        ) : (
          <div>
            <div className="text-lg font-semibold text-ink">Thanks, submitted for review.</div>
            <p className="mt-2 text-sm text-secondary">
              Your question has been received and will be reviewed before inclusion.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl bg-ochre px-4 py-2 text-sm font-medium text-white hover:bg-charcoal"
              >
                Submit another
              </button>

              <a
                href="/procedures/lap-chole"
                className="rounded-xl border border-border-warm px-4 py-2 text-sm font-medium hover:bg-surface"
              >
                Back to Lap Chole
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}