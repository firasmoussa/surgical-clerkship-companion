export default function LapAppyOverviewPage() {
  return (
    <>
      <section className="pt-8">
        <h2 className="font-serif italic text-[20px] text-ink font-normal">One-Minute Overview</h2>

        <div className="mt-6 grid gap-5">
          <div>
            <div className="text-[13px] font-medium text-ink">Indications</div>
            <div className="mt-1 text-[13px] text-secondary leading-relaxed">
              Acute appendicitis (uncomplicated and complicated), perforated appendicitis with
              peritonitis, and interval appendectomy after non-operative management.
            </div>
          </div>

          <div>
            <div className="text-[13px] font-medium text-ink">Positioning</div>
            <div className="mt-1 text-[13px] text-secondary leading-relaxed">
              Supine. Trendelenburg with left lateral tilt to displace bowel away from the RLQ and
              improve visualization of the cecum and appendix.
            </div>
          </div>

          <div>
            <div className="text-[13px] font-medium text-ink">Key Anatomy to Know Cold</div>
            <div className="mt-1 text-[13px] text-secondary leading-relaxed">
              Cecum, taenia coli (converge at appendiceal base), mesoappendix, appendiceal artery,
              terminal ileum, ileocecal junction. The appendix is retrocecal in ~30% of patients.
            </div>
          </div>

          <div>
            <div className="text-[13px] font-medium text-ink">Critical Concept -- Identifying the Appendix</div>
            <div className="mt-2 rounded-md border-l-[3px] border-ochre bg-surface p-3 text-[13px] text-secondary leading-relaxed">
              Follow the taenia coli to their convergence at the base of the cecum -- this leads
              reliably to the appendiceal base. In retrocecal cases, the cecum may need to be mobilized medially.
            </div>
          </div>

          <div>
            <div className="text-[13px] font-medium text-ink">Major Complications</div>
            <div className="mt-1 text-[13px] text-secondary leading-relaxed">
              Surgical site infection, intra-abdominal abscess, stump leak, injury to right ureter
              or iliac vessels, ileus.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
