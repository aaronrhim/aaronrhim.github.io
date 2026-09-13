import Container from "./Container";
export default function PageHeader({ title, lede }: { title: string; lede?: string }) {
  return (
    <Container className="pt-12 pb-10 sm:pt-20 sm:pb-12">
      <h1 className="max-w-[900px] text-4xl sm:text-6xl">{title}</h1>
      {lede ? <p className="measure text-text-dim mt-6 text-lg leading-relaxed">{lede}</p> : null}
    </Container>
  );
}
