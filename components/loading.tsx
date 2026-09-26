export function Loading({ label = "Loading workouts…" }: { label?: string }) {
  return (
    <div
      className="flex min-h-[270px] flex-col items-center justify-center gap-3 text-[9px] uppercase tracking-[.14em] text-[#8a8b8e]"
      role="status"
    >
      <span
        className="loading loading-spinner h-[27px] w-[27px] text-[#ccff00]"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}
