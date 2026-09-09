/**
 * The one container on the site.
 *
 * al-folio throws away Bootstrap's responsive width ladder (540/720/960/1140)
 * and sets a flat `max-width: 930px` with constant 15px gutters at every
 * breakpoint. Nothing about the page frame changes as the window grows past
 * that, which is most of why the theme feels like a printed page instead of an
 * app. Reading measure is then imposed per element with `.measure`, never by
 * narrowing the container.
 */
export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-content px-4 ${className}`}>{children}</div>;
}
