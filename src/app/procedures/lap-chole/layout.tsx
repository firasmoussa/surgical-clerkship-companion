export default function LapCholeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Laparoscopic Cholecystectomy</h1>
        <p className="mt-2 text-sm text-slate-600">
          Structured operative preparation for medical students.
        </p>
      </div>
      {children}
    </div>
  );
}