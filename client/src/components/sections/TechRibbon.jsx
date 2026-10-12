import BrandIcon from '../common/BrandIcon.jsx';

export default function TechRibbon({ technologies }) {
  return (
    <section className="tech-ribbon" aria-label="Technologies I work with">
      <div className="wrap tech-ribbon-inner">
        <a className="tech-label mono small" href="#skills">
          BUILT WITH
          <br />
          <span>THE TOOLKIT ↘</span>
        </a>
        <div
          className="tech-window"
          tabIndex={0}
          aria-label="Technology logos; scroll horizontally when animation is paused"
        >
          <div className="tech-track">
            {[false, true].map((duplicate) => (
              <ul
                className="tech-group"
                key={String(duplicate)}
                aria-hidden={duplicate || undefined}
              >
                {technologies.map((technology) => (
                  <li className="tech-item" key={technology.id}>
                    <span className="tech-mark">
                      <BrandIcon name={technology.id} />
                    </span>
                    <span>{technology.label}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
