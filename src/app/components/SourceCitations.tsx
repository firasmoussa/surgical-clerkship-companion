import { clinicalSources, type ClinicalSourceId } from "@/app/lib/clinicalSources";

type SourceCitationsProps = {
  sources: readonly ClinicalSourceId[];
};

export default function SourceCitations({ sources }: SourceCitationsProps) {
  return (
    <div className="mt-3 text-[12px] font-normal leading-relaxed text-secondary">
      <span className="text-muted">Sources: </span>
      <ul className="inline" aria-label="Clinical sources">
        {sources.map((id, index) => {
          const source = clinicalSources[id];
          return (
            <li key={id} className="inline">
              {index > 0 && <span aria-hidden="true">; </span>}
              <a href={source.url} title={source.citation} target="_blank" rel="noopener noreferrer" className="underline decoration-border-warm underline-offset-4 hover:text-ochre hover:decoration-ochre">
                {source.label}<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
