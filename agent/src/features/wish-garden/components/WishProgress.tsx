export function WishProgress({ opened, total }: { opened: number; total: number }) {
  const percent = total === 0 ? 0 : Math.round((opened / total) * 100);

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-paper">
      <span>🌿</span>
      <span>{opened}/{total} đã mở ({percent}%)</span>
    </span>
  );
}
