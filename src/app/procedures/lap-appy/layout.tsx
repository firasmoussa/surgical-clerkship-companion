import StickyTabs from "./_components/StickyTabs";

export default function LapAppyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-6">
      <div className="mb-1">
        <p className="text-xs text-muted mb-1">Procedures</p>
        <h1 className="font-serif italic text-[26px] text-ink font-normal leading-tight">
          Laparoscopic appendectomy
        </h1>
      </div>
      <StickyTabs />
      <div className="mt-6">{children}</div>
    </div>
  );
}
