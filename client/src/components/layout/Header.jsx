import { useEffect, useState } from 'react';
import { usePreferences } from '../../context/PreferencesContext.jsx';

const links = [
  ['work', 'Work'],
  ['skills', 'Skills'],
  ['about', 'About'],
  ['profiles', 'Profiles'],
  ['contact', 'Contact ↗'],
];
export default function Header({ name }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme, motionEnabled, toggleMotion, reducedMotion } = usePreferences();
  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  return (
    <header className="nav wrap">
      <a className="brand" href="#home" aria-label={`${name} home`}>
        ss<span>®</span>
      </a>
      <span className="record">
        <i /> PORTFOLIO / 2026
      </span>
      <div className="nav-right">
        <nav id="navigation" className={menuOpen ? 'open' : ''} aria-label="Main navigation">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <button
          id="theme"
          className="theme"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          <span aria-hidden="true">◐</span>
        </button>
        <button
          id="motion"
          className="motion-toggle"
          onClick={toggleMotion}
          disabled={reducedMotion}
          aria-pressed={!motionEnabled}
          aria-label={
            reducedMotion
              ? 'Animations disabled by system preference'
              : motionEnabled
                ? 'Pause animations'
                : 'Play animations'
          }
        >
          <span aria-hidden="true">{motionEnabled ? 'Ⅱ' : '▷'}</span>
        </button>
        <button
          id="menu"
          aria-expanded={menuOpen}
          aria-controls="navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  );
}
