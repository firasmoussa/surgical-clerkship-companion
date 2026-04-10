export default function LapAppyOverviewPage() {
  return (
    <>
      <section className="pt-8">
        <h2 className="text-xl font-semibold">One-Minute Overview</h2>

        <div className="mt-4 grid gap-4">
          <div>
            <div className="text-sm font-medium text-slate-800">Indications</div>
            <div className="mt-1 text-sm text-slate-600">
              Acute appendicitis (uncomplicated and complicated), perforated appendicitis with
              peritonitis, and interval appendectomy after non-operative management.
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-800">Positioning</div>
            <div className="mt-1 text-sm text-slate-600">
              Supine. Trendelenburg with left lateral tilt to displace bowel away from the RLQ and
              improve visualization of the cecum and appendix.
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-800">Key Anatomy to Know Cold</div>
            <div className="mt-1 text-sm text-slate-600">
              Cecum, taenia coli (converge at appendiceal base), mesoappendix, appendiceal artery,
              terminal ileum, ileocecal junction. The appendix is retrocecal in ~30% of patients.
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-800">Critical Concept -- Identifying the Appendix</div>
            <div className="mt-1 text-sm text-slate-600">
              Follow the taenia coli to their convergence at the base of the cecum -- this leads
              reliably to the appendiceal base. In retrocecal cases, the cecum may need to be mobilized medially.
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-800">Major Complications</div>
            <div className="mt-1 text-sm text-slate-600">
              Surgical site infection, intra-abdominal abscess, stump leak, injury to right ureter
              or iliac vessels, ileus.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
