import SectionMeta from '../common/SectionMeta.jsx';
import ProjectCard from '../projects/ProjectCard.jsx';

export default function SelectedWork({ projects, onOpen }) {
  return (
    <section className="work section wrap" id="work">
      <SectionMeta number="01" title="SELECTED WORK" note="FROM IDEA TO INTERACTION" />
      <div className="section-heading reveal-target">
        <h2>
          Built to <em>work.</em>
          <br />
          Made to <em>feel.</em>
        </h2>
        <p>
          Two projects. One focus: connecting thoughtful interfaces with authentication, APIs, and
          real-time experiences.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard project={project} onOpen={onOpen} key={project.id} />
        ))}
      </div>
    </section>
  );
}
