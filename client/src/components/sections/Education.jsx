import SectionMeta from '../common/SectionMeta.jsx';

export default function Education({ entries }) {
  return (
    <section className="journey section wrap" id="journey">
      <SectionMeta number="04" title="EDUCATION & TRAINING" note="A FOUNDATION TO BUILD ON" />
      {entries.map((entry) => (
        <div className="journey-row reveal-target" key={entry.title}>
          <span className="mono small muted">{entry.label}</span>
          <h3>{entry.title}</h3>
          <div>
            {entry.institution}
            <span
              className={`mono small ${entry.status.startsWith('COMPLETED') ? 'muted' : 'accent'}`}
            >
              {entry.status}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
