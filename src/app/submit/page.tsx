"use client";

import { useMemo, useState } from "react";

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

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const formatted = useMemo(() => {
    return [
      `Procedure: ${form.procedure}`,
      `Question: ${form.question.trim() || "(none)"}`,
      `Answer: ${form.answer.trim() || "(none)"}`,
      `Context: ${form.context.trim() || "(none)"}`,
      `Tags: ${form.tags.trim() || "(none)"}`,
      `Anonymous: ${form.anonymous ? "Yes" : "No"}`,
    ].join("\n");
  }, [form]);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Pimp Question Submission (Beta)");
    const body = encodeURIComponent(formatted);
    return `mailto:?subject=${subject}&body=${body}`;
  }, [formatted]);

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Submit a Pimp Question</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Help build a student-first resource. Please keep submissions de-identified and focused on learning.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 p-6">
        {!submitted ? (
          <form onSubmit={onSubmit} className="space-y-5">
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

            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Submit
            </button>

            <p className="text-xs text-slate-500">
              Please do not include patient identifiers.
            </p>
          </form>
        ) : (
          <div>
            <div className="text-lg font-semibold text-slate-900">
              Thanks — submission saved (beta).
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyToClipboard}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                {copied ? "Copied ✅" : "Copy submission"}
              </button>

              <a
                href={mailtoHref}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Email submission
              </a>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    procedure: "Laparoscopic Cholecystectomy",
                    question: "",
                    answer: "",
                    context: "",
                    tags: "",
                    anonymous: true,
                  });
                }}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Submit another
              </button>
            </div>

            <pre className="mt-5 whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
              {formatted}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}