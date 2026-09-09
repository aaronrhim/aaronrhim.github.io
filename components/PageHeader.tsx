import Container from "./Container";

/**
 * The masthead for every page except home.
 *
 * There is deliberately no eyebrow slot on this component, and that absence is
 * the point. The UBC Rover codebase carries the reasoning verbatim: "A small
 * amber label over every H1 on every page is a tic, not information - it
 * restated the title six different ways." Building the component without the
 * slot is what stops the tic coming back later; leaving the slot there and
 * choosing not to use it does not.
 *
 * `lede` is one sentence, optional, and never a summary of the page - it is
 * the thing the title could not fit.
 */
export default function PageHeader({ title, lede }: { title: string; lede?: string }) {
  return (
    <Container className="pt-14 pb-10 sm:pt-20 sm:pb-12">
      <h1 className="text-4xl font-light sm:text-5xl">{title}</h1>
      {lede ? (
        <p className="measure text-text-dim mt-4 text-lg leading-relaxed font-light">{lede}</p>
      ) : null}
    </Container>
  );
}
