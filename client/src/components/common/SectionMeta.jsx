export default function SectionMeta({ number, title, note }) {
  return (
    <div className="section-meta mono small">
      <span>
        <b>{number}</b> / {title}
      </span>
      <span>{note}</span>
    </div>
  );
}
