import ExternalLink from '../common/ExternalLink.jsx';

function Letters({ text, accentIndex = -1 }) {
  return [...text.toUpperCase()].map((letter, index) => (
    <span className={`letter${index === accentIndex ? ' accent' : ''}`} key={`${letter}-${index}`}>
      {letter}
    </span>
  ));
}

export default function Hero({ profile, profiles }) {
  return (
    <section className="hero wrap" id="home" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-meta mono">
        <span>
          {profile.role.toUpperCase()} <span className="muted"> / AGRA, INDIA</span>
        </span>
        <span className="availability">
          <i /> OPEN TO OPPORTUNITIES
        </span>
      </div>
      <h1 id="hero-title" aria-label={profile.name}>
        <span className="name first" aria-hidden="true">
          <Letters text={profile.firstName} />
        </span>
        <span className="second-line" aria-hidden="true">
          <span className="hero-star">✳</span>
          <span className="name second">
            <Letters text={profile.lastName} accentIndex={4} />
            <span className="period letter">.</span>
          </span>
        </span>
      </h1>
      <div className="hero-bottom">
        <div className="hero-role">
          <span className="mono muted small">MERN STACK / GENERATIVE AI / CLOUD</span>
          <p>
            From the interface
            <br />
            <em>to the infrastructure.</em>
          </p>
        </div>
        <div className="hero-intro">
          <p>
            I’m a <strong>full-stack developer</strong> building responsive interfaces, secure APIs,
            and real-time experiences. Pursuing an <strong>MCA in Cloud Computing</strong> and
            bringing GenAI into my toolkit.
          </p>
          <div className="actions">
            <a className="button primary" href="#work">
              Explore my work <span>↘</span>
            </a>
            <a className="button secondary" href="#profiles">
              Find me online <span>↗</span>
            </a>
          </div>
        </div>
      </div>
      <div className="hero-foot mono small">
        <a href="#work">
          <span className="scroll-line" /> SCROLL TO EXPLORE
        </a>
        <div className="hero-social">
          {['github', 'linkedin']
            .map((id) => profiles.find((item) => item.id === id))
            .filter((item) => item?.url)
            .map((item) => (
              <ExternalLink href={item.url} key={item.id}>
                {item.name.toUpperCase()} ↗
              </ExternalLink>
            ))}
        </div>
      </div>
    </section>
  );
}
