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
        <h2 className="text-white text-2xl sm:text-4xl font-semibold tracking-wide">{title}</h2>
        {rightSlot ? <div className="text-white/60 text-sm">{rightSlot}</div> : null}
      </div>

      <div className="mt-4 sm:mt-8 rounded-2xl sm:rounded-3xl border-0 md:border md:border-white/15 bg-black md:bg-white/5 p-1.5 sm:p-3 md:p-6 md:backdrop-blur">
        {children}
      </div>
    </div>
  );
}
