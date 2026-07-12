export default function Section({
  id,
  children,
  variant = "default",
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  variant?: "default" | "muted";
  className?: string;
}) {
  const bg = variant === "muted" ? "bg-muted/40" : "";

  return (
    <section id={id} className={`w-full ${bg} scroll-mt-24 py-10 ${className}`}>
      <div className="mx-auto max-w-5xl px-2 sm:px-6">
        {children}
      </div>
    </section>
  );
}
