export default function SectionHeading({
  index,
  label,
  title,
  aside,
  asideHref,
}: {
  index: string;
  label: string;
  title: string;
  aside?: string;
  asideHref?: string;
}) {
  return (
    <header className="sec">
      <span className="sec-index" aria-hidden="true">
        {index}
      </span>
      <div className="sec-main">
        <p className="sec-label">{label}</p>
        <h2 className="sec-title">{title}</h2>
      </div>
      {aside && asideHref && (
        <a className="sec-aside" href={asideHref} target="_blank" rel="noreferrer">
          {aside} <span aria-hidden="true">↗</span>
        </a>
      )}
    </header>
  );
}