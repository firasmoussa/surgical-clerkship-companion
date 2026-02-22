export default function HomePage() {
  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Surgical Clerkship Companion</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Structured case preparation for medical students on general surgery.
      </p>

      <div className="mt-8">
        <a
          href="/procedures/lap-chole"
          className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Start with Laparoscopic Cholecystectomy →
        </a>
      </div>
    </div>
  );
}