import { useState } from 'react';
import SectionMeta from '../common/SectionMeta.jsx';
import ExternalLink from '../common/ExternalLink.jsx';

export default function Contact({ profile, profiles }) {
  const [status, setStatus] = useState('');
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus('EMAIL COPIED — SAY HELLO!');
    } catch {
      setStatus(`COPY: ${profile.email}`);
    }
  }
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <SectionMeta number="06" title="THE NEXT CHAPTER" note="LET’S MAKE SOMETHING GOOD." />
        <div className="contact-top reveal-target">
          <h2>
            Got an idea?
            <br />
            <em>Let’s talk.</em>
            <span>↗</span>
          </h2>
          <div>
            <span className="contact-note mono small">
              OPEN TO SOFTWARE DEVELOPER
              <br />
              ROLES & COLLABORATIONS.
            </span>
            <p>
              A project, an opportunity,
              <br />
              or just a good conversation.
            </p>
          </div>
        </div>
        <div className="email-row">
          <a href={`mailto:${profile.email}`}>
            {profile.email} <span>↗</span>
          </a>
          <button onClick={copyEmail} aria-label="Copy email address">
            Copy email ⧉
          </button>
        </div>
        <div className="contact-socials">
          {profiles
            .filter((item) => item.url && ['github', 'linkedin'].includes(item.id))
            .map((item) => (
              <ExternalLink href={item.url} key={item.id}>
                {item.name} <span>↗</span>
              </ExternalLink>
            ))}
        </div>
        <div className="contact-bottom mono small">
          <span>{profile.location.toUpperCase()} / OPEN TO CONNECT</span>
          <span role="status">{status}</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </div>
    </section>
  );
}
