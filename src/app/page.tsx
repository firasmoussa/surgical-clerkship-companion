import Link from "next/link";

const procedures = [
  {
    number: "01",
    name: "Laparoscopic cholecystectomy",
    shortName: "Lap chole",
    href: "/procedures/lap-chole",
    description: "Orient yourself to the biliary anatomy, review the critical view of safety, and walk through the operative sequence.",
    focus: "Biliary anatomy · Critical view of safety",
  },
  {
    number: "02",
    name: "Laparoscopic appendectomy",
    shortName: "Lap appy",
    href: "/procedures/lap-appy",
    description: "Trace the appendiceal landmarks, review the operative steps, and prepare for questions you may hear in the OR.",
    focus: "Ileocecal anatomy · Appendiceal landmarks",
  },
];

const reviewSteps = [
  { title: "Get the big picture", body: "Start with the one-minute overview: indications, positioning, and key concepts." },
  { title: "Know your landmarks", body: "Explore the illustrated anatomy and work through the identification checklist." },
  { title: "Put it together", body: "Review the steps and complications, then test yourself with questions and a quiz." },
];

export default function HomePage() {
  return (
    <div className="py-8 sm:py-12">
      <section aria-labelledby="welcome-heading" className="border-b border-border-warm pb-8 sm:pb-10">
        <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted">
          <span className="h-px w-8 bg-ochre" aria-hidden="true" />
          <span>Your surgical clerkship field guide</span>
        </div>
        <h1 id="welcome-heading" className="max-w-3xl font-sans tracking-[-0.04em] text-[36px] sm:text-[52px] font-semibold leading-tight text-ink">
          A clearer picture.<br />A more prepared you.
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] text-secondary leading-relaxed">
          Surgical Clerkship Companion brings anatomy, operative steps, and case questions into one place. Choose your next procedure and build a focused review before you scrub.
        </p>
        <a href="#procedures" className="mt-6 inline-flex items-center gap-3 rounded-lg bg-ochre px-4 py-2.5 text-[14px] font-medium text-parchment transition-colors hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre">
          Find your next case <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section id="procedures" aria-labelledby="procedures-heading" className="scroll-mt-6 pt-8">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="procedures-heading" className="font-sans tracking-tight text-[20px] font-semibold text-ink">Choose a procedure</h2>
          <span className="text-[11px] text-muted uppercase tracking-wider">Two guides, one place to prepare</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {procedures.map((procedure) => (
            <article key={procedure.href} className="flex flex-col rounded-2xl border border-border-warm bg-card p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="text-[11px] uppercase tracking-wider text-secondary">{procedure.shortName}</span>
                <span aria-hidden="true" className="font-sans tracking-tight text-[14px] font-medium leading-none text-ochre bg-accent-soft rounded-lg px-3 py-2">{procedure.number}</span>
              </div>
              <h3 className="max-w-sm font-sans tracking-tight text-[22px] font-semibold leading-tight text-ink">{procedure.name}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-secondary">{procedure.description}</p>
              <p className="mt-4 mb-6 text-[11px] text-muted">{procedure.focus}</p>
              <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border-warm pt-4">
                <Link href={procedure.href} aria-label={`Open ${procedure.name} guide`} className="inline-flex items-center gap-3 rounded-lg border border-ochre px-4 py-2 text-[14px] text-ochre transition-colors hover:bg-ochre hover:text-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre">
                  Open guide <span aria-hidden="true">→</span>
                </Link>
                <Link href={`${procedure.href}/anatomy`} aria-label={`Explore ${procedure.name} anatomy`} className="px-1 py-2 text-[12px] text-secondary underline underline-offset-4 hover:text-ochre focus-visible:outline-2 focus-visible:outline-ochre">Explore anatomy</Link>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-[12px] text-secondary leading-relaxed">Each guide includes an overview, anatomy, operative steps, complications, pimp questions, and a quiz.</p>
      </section>

      <section aria-labelledby="review-heading" className="mt-10 border-t border-border-warm pt-8">
        <h2 id="review-heading" className="font-sans tracking-tight text-[20px] font-semibold text-ink">Make the most of your review</h2>
        <ol className="mt-5 grid gap-6 sm:grid-cols-3">
          {reviewSteps.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-warm bg-surface text-[11px] font-medium text-ochre">{index + 1}</span>
              <div className="pt-0.5">
                <h3 className="text-[14px] font-medium text-ink">{step.title}</h3>
                <p className="mt-1 text-[15px] text-secondary leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border-warm bg-card p-4">
        <p className="text-[14px] text-secondary">Heard a good question in the OR? Help the next student prepare.</p>
        <Link href="/submit" className="text-[14px] text-ochre underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ochre">Contribute a question <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
