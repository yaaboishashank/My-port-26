export default function BrandIcon({ name, className = 'tech-icon' }) {
  if (name === 'linkedin')
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="1" y="1" width="22" height="22" rx="3" fill="currentColor" />
        <path
          d="M6 10v8m0-12v.1M10.5 18v-8m0 3.5c0-4.7 7-4.7 7 0V18"
          fill="none"
          stroke="var(--bg)"
          strokeWidth="2.4"
        />
      </svg>
    );
  const mask = `url(/logos/${name}.svg)`;
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    />
  );
}
