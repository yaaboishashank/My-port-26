import { createContext, useContext, useEffect, useState } from 'react';

const PreferencesContext = createContext(null);
function stored(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    stored('ss-theme', 'dark') === 'light' ? 'light' : 'dark',
  );
  const [paused, setPaused] = useState(() => stored('ss-motion', 'active') === 'paused');
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const motionEnabled = !paused && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('ss-theme', theme);
    } catch {
      /* Storage can be blocked. */
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? 'active' : 'paused';
    try {
      localStorage.setItem('ss-motion', paused ? 'paused' : 'active');
    } catch {
      /* Optional preference. */
    }
  }, [paused, motionEnabled]);

  return (
    <PreferencesContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme((value) => (value === 'dark' ? 'light' : 'dark')),
        paused,
        toggleMotion: () => setPaused((value) => !value),
        reducedMotion,
        motionEnabled,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error('usePreferences must be inside PreferencesProvider.');
  return value;
}
