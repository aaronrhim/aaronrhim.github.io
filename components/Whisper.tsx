/**
 * al-folio's `.projects h2.category`, and the reason this site can label its
 * sections without ever stacking a subheading on one.
 *
 * The label is set in the DIVIDER COLOUR, right-aligned, sitting on its own
 * hairline. It reads as barely more than a tint against the rule. You do not
 * read it on the way down the page - the content under it already says what it
 * is - you find it when you go looking for where you are. That is the correct
 * amount of presence for a section name whose content explains itself, and it
 * is what a tracked-out accent-coloured eyebrow gets wrong.
 *
 * Right-aligned specifically because a left-aligned label starts the line, and
 * anything that starts the line gets read as the beginning of the content.
 * Pushed to the right margin it reads as an edge annotation instead.
 *
 * `level` exists because the visual weight must not decide the document
 * outline. A section named this way is still an h2 in the outline where the
 * outline needs one.
 */
export default function Whisper({
  children,
  level = 2,
  id,
}: {
  children: React.ReactNode;
  level?: 2 | 3;
  id?: string;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag id={id} className="whisper font-light">
      {children}
    </Tag>
  );
}
