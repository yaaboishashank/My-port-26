import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ExternalLink from '../common/ExternalLink.jsx';

export default function ProjectDialog({ project, email, onClose, smootherRef }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const smoother = smootherRef.current;
    dialog.showModal();
    smoother?.paused(true);
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      smoother?.paused(false);
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
    };
  }, [smootherRef]);

  function closeOnBackdrop(event) {
    if (event.target !== dialogRef.current) return;
    const rect = dialogRef.current.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      onClose();
  }

  // The portal stays outside transformed ScrollSmoother content.
  return createPortal(
    <dialog
      ref={dialogRef}
      id="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={closeOnBackdrop}
    >
      <button id="close-dialog" aria-label="Close project details" onClick={onClose}>
        ×
      </button>
      <span className="mono small accent">{project.category}</span>
      <h2 id="dialog-title">{project.title}</h2>
      <p>{project.intro}</p>
      <h3>Inside the build</h3>
      <ul>
        {project.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="tags">
        {project.stack.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="project-links dialog-project-links">
        <ExternalLink href={project.live}>Live site ↗</ExternalLink>
        <ExternalLink href={project.source}>View source ↗</ExternalLink>
      </div>
      <a
        className="button primary"
        href={`mailto:${email}?subject=${encodeURIComponent(`Let’s talk about ${project.title}`)}`}
      >
        Ask me about this project ↗
      </a>
    </dialog>,
    document.body,
  );
}
