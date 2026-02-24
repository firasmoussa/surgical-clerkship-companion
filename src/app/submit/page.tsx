"use client";

import { useMemo, useRef, useState } from "react";

type FormState = {
  procedure: string;
  question: string;
  answer: string;
  context: string;
  tags: string;
  anonymous: boolean;
};

export default function SubmitPage() {
  const procedures = useMemo(
    () => [
      "Laparoscopic Cholecystectomy",
      "Laparoscopic Appendectomy (coming soon)",
      "Inguinal Hernia Repair (coming soon)",
    ],
    []
  );

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
    <div className="py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Submit a Pimp Question</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Help build a student-first resource. Please keep submissions de-identified and focused on learning.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 p-6">
        {!submitted ? (
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Honeypot (hidden anti-spam field) */}
            <div className="hidden">
              <label className="text-sm font-medium text-slate-900">Website</label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-900">Procedure</label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
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
              <label className="text-sm font-medium text-slate-900">Question</label>
              <textarea
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                rows={3}
                placeholder="What were you asked?"
                value={form.question}
                onChange={(e) => update("question", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-900">
                Student-level Answer (optional)
              </label>
              <textarea
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                rows={3}
                placeholder="What’s the best concise student answer?"
                value={form.answer}
                onChange={(e) => update("answer", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-900">Context (optional)</label>
              <textarea
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                rows={2}
                placeholder="When was it asked? What part of the case?"
                value={form.context}
                onChange={(e) => update("context", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-900">Tags (optional)</label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                placeholder="anatomy, complications, CVS (comma-separated)"
                value={form.tags}
                onChange={(e) => update("tags", e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="anon"
                type="checkbox"
                className="h-4 w-4"
                checked={form.anonymous}
                onChange={(e) => update("anonymous", e.target.checked)}
              />
              <label htmlFor="anon" className="text-sm text-slate-700">
                Keep my submission anonymous
              </label>
            </div>

            {errorMsg && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={[
                "rounded-xl px-4 py-2 text-sm font-medium text-white",
                loading ? "bg-slate-400" : "bg-slate-900 hover:bg-slate-800",
              ].join(" ")}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <p className="text-xs text-slate-500">Please do not include patient identifiers.</p>
          </form>
        ) : (
          <div>
            <div className="text-lg font-semibold text-slate-900">Thanks — submitted.</div>
            <p className="mt-2 text-sm text-slate-600">
              Your question has been received and will be reviewed before inclusion.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Submit another
              </button>

              <a
                href="/procedures/lap-chole"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
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