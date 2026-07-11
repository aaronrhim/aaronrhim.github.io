export default function Panel({
  title,
  rightSlot,
  children,
}: {
  title: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-5xl">
      <div className="flex items-end justify-between">
        <h2 className="text-ink text-2xl sm:text-4xl tracking-wide">{title}</h2>
        {rightSlot ? <div className="text-ink-dim text-sm">{rightSlot}</div> : null}
      </div>

      <div className="mt-4 sm:mt-8 rounded-2xl sm:rounded-3xl border-0 md:border bg-transparent md:bg-card p-1.5 sm:p-3 md:p-6">
        {children}
      </div>
    </div>
  );
}
