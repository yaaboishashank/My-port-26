import SectionMeta from '../common/SectionMeta.jsx';

export default function About({ profile }) {
  const facts = [
    ['BASED IN', profile.location],
    ['LOOKING FOR', 'Software Developer roles'],
    ['EDUCATION', 'MCA · Cloud Computing'],
    ['APPROACH', 'Learn it. Build it. Improve it.'],
  ];
  return (
    <section className="about section wrap" id="about">
      <SectionMeta number="03" title="BEHIND THE CODE" note="A LITTLE ABOUT ME" />
      <div className="about-grid reveal-target">
        <div>
          <h2>
            Thoughtful code.
            <br />
            <em>Useful experiences.</em>
          </h2>
          <div className="monogram" aria-hidden="true">
            <span>ss.</span>
            <span className="mono small">DEVELOPER / LEARNER / BUILDER</span>
          </div>
        </div>
        <div className="about-copy">
          <span className="mono small accent">MY OBJECTIVE</span>
          <p className="career-objective">{profile.objective}</p>
          <p className="education-note">{profile.educationNote}</p>
          <div className="about-facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <span className="mono small muted">{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
