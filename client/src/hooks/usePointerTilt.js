import { useEffect, useRef } from 'react';
import { usePreferences } from '../context/PreferencesContext.jsx';

export default function usePointerTilt() {
  const ref = useRef(null);
  const { motionEnabled } = usePreferences();
  useEffect(() => {
    const element = ref.current;
    if (!element || !motionEnabled || !matchMedia('(hover: hover) and (pointer: fine)').matches)
      return undefined;
    let frame;
    const move = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        element.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
        element.style.setProperty('--tilt-y', `${(x - 0.5) * 6}deg`);
        element.style.setProperty('--shine-x', `${x * 100}%`);
        element.style.setProperty('--shine-y', `${y * 100}%`);
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      element.style.removeProperty('--tilt-x');
      element.style.removeProperty('--tilt-y');
    };
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', reset);
    return () => {
      reset();
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset);
    };
  }, [motionEnabled]);
  return ref;
}
