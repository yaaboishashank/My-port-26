import ExternalLink from '../common/ExternalLink.jsx';
import HyperClipPreview from './HyperClipPreview.jsx';
import CampusPreview from './CampusPreview.jsx';
import usePointerTilt from '../../hooks/usePointerTilt.js';

export default function ProjectCard({ project, onOpen }) {
  const tiltRef = usePointerTilt();
  const isVideo = project.id === 'hyperclip';
  return (
    <article className="project reveal-target" id={project.id}>
      <button
        ref={tiltRef}
        className={`project-art ${isVideo ? 'hyperclip-art' : 'campus-art'}`}
        onClick={() => onOpen(project)}
        aria-label={`Explore ${project.title} project details`}
      >
        <span className="art-corner mono">
          {isVideo ? '01 / VIDEO PLATFORM' : '02 / REAL-TIME SPACES'}
        </span>
        <span className="art-open">↗</span>
        {isVideo ? <HyperClipPreview /> : <CampusPreview />}
        <span className="art-note mono">INTERFACE CONCEPT / {project.title.toUpperCase()}</span>
      </button>
      <div className="project-info">
        <div>
          <span className="eyebrow mono">{project.eyebrow}</span>
          <h3>
            {project.title}
            <span>↗</span>
          </h3>
          <p>{project.summary}</p>
        </div>
        <div className="project-info-right">
          <div className="tags">
            {project.cardStack.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="project-proof">
            {project.proof.map((text) => (
              <span key={text}>{text}</span>
            ))}
          </div>
          <div className="project-links">
            <ExternalLink href={project.live}>Live site ↗</ExternalLink>
            <ExternalLink href={project.source}>GitHub ↗</ExternalLink>
            <button className="text-link" onClick={() => onOpen(project)}>
              Build details ↗
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
