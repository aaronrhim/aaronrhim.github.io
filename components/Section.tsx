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
  const bg = variant === "muted" ? "bg-white/2" : "";

  return (
    <section id={id} className={`w-full ${bg} py-16 ${className}`}>
      <div className="mx-auto max-w-5xl px-2 sm:px-6">
        {children}
      </div>
    </section>
  );
}
