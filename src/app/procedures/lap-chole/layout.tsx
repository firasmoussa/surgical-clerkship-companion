import StickyTabs from "./_components/StickyTabs";

export default function LapCholeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-8">
      <div className="mb-4">
        <p className="text-xs text-muted mb-1">Procedures</p>
        <h1 className="font-sans tracking-tight text-[30px] text-ink font-semibold leading-tight">
          Laparoscopic cholecystectomy
        </h1>
      </div>
      <StickyTabs />
      <div className="mt-6">{children}</div>
    </div>
  );
}