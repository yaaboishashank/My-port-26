export default function Footer({ name }) {
  return (
    <footer className="wrap mono small">
      <span>
        © {new Date().getFullYear()} {name.toUpperCase()}
      </span>
      <span>
        BUILT WITH INTENTION. <span className="accent">✳</span>
      </span>
    </footer>
  );
}
