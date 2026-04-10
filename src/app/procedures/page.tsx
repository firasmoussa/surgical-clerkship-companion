export default function ProceduresPage() {
  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Procedures</h1>
      <p className="mt-3 text-slate-600">Beta procedures available now:</p>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href="/procedures/lap-chole"
          className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Laparoscopic Cholecystectomy
        </a>
        <a
          href="/procedures/lap-appy"
          className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Laparoscopic Appendectomy
        </a>
      </div>
    </div>
  );
}
