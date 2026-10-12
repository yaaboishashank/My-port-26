import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SectionMeta from '../common/SectionMeta.jsx';
import { usePreferences } from '../../context/PreferencesContext.jsx';

export default function Skills({ groups }) {
  const [selectedId, setSelectedId] = useState('React');
  const detailRef = useRef(null);
  const { motionEnabled } = usePreferences();
  const selected =
    groups.flatMap((group) => group.items).find((item) => item.id === selectedId) ||
    groups[0].items[0];
  useLayoutEffect(() => {
    if (!motionEnabled) return undefined;
    const context = gsap.context(() => {
      gsap.fromTo(
        '.skill-copy',
        { y: 9, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.04, clearProps: 'transform,opacity' },
      );
    }, detailRef);
    return () => context.revert();
  }, [selectedId, motionEnabled]);

  return (
    <section className="skills section wrap" id="skills">
      <SectionMeta number="02" title="THE TOOLKIT" note="THE RIGHT TOOLS. THOUGHTFUL EXECUTION." />
      <div className="section-heading reveal-target">
        <h2>
          What’s in
          <br />
          my <em>toolbox.</em>
        </h2>
        <p>
          From the first component to the last API call.
          <br />A focused selection from my technical toolkit. Select a skill to explore it.
        </p>
      </div>
      <div className="skills-layout">
        <div className="skill-groups">
          {groups.map((group) => (
            <div className="skill-row reveal-target" key={group.title}>
              <span className="mono small muted">{group.title}</span>
              <div>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    aria-pressed={item.id === selected.id}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <aside className="skill-detail reveal-target" aria-live="polite" ref={detailRef}>
          <span className="mono small">
            TOOLKIT NOTES <span>↙</span>
          </span>
          <div className="skill-symbol" aria-hidden="true">
            ✳
          </div>
          <h3 className="skill-copy">{selected.name}</h3>
          <p className="skill-copy">{selected.description}</p>
          <a className="skill-copy" href={`#${selected.target}`}>
            Explore {selected.usedIn} <span>↗</span>
          </a>
        </aside>
      </div>
      <div className="learning">
        <span className="mono small">
          <i /> CURRENTLY EXPLORING
        </span>
        <p>
          Generative AI <span>↗</span> Cloud Computing <span>↗</span> DevOps
        </p>
        <span className="mono small muted">STAY CURIOUS. KEEP BUILDING.</span>
      </div>
    </section>
  );
}
