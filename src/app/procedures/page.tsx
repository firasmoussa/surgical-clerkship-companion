import Link from "next/link";

const procedures = [
  { name: "Laparoscopic cholecystectomy", href: "/procedures/lap-chole", description: "Biliary anatomy, critical view of safety, and operative preparation.", number: "01" },
  { name: "Laparoscopic appendectomy", href: "/procedures/lap-appy", description: "Appendiceal landmarks, operative steps, and case questions.", number: "02" },
];

export default function ProceduresPage() {
  return (
    <section className="py-10">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-ochre">Procedure library</p>
      <h1 className="text-[32px] font-semibold tracking-tight text-ink">Prepare for your next case</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-secondary">Choose a procedure to review its anatomy, operative steps, and questions before you scrub.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {procedures.map((procedure) => (
          <Link key={procedure.href} href={procedure.href} className="group rounded-2xl border border-border-warm bg-card p-6 shadow-sm transition-colors hover:border-ochre">
            <span className="inline-flex rounded-lg bg-accent-soft px-3 py-2 text-[12px] font-medium text-ochre">{procedure.number}</span>
            <h2 className="mt-5 text-[22px] font-semibold tracking-tight text-ink">{procedure.name}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-secondary">{procedure.description}</p>
            <span className="mt-6 inline-flex items-center gap-3 text-[13px] font-medium text-ochre">Open guide <span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
