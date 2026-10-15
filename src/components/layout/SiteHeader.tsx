import { Link, useRouterState } from "@tanstack/react-router";

export function SiteHeader() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <header className="fixed top-4 left-6 right-6 z-40 h-14 flex items-center justify-between px-6 rounded-full backdrop-blur-xl bg-[rgba(255,255,255,0.78)] border border-[rgba(255,255,255,0.85)] shadow-[0_16px_32px_-8px_rgba(136,73,90,0.12)]">
      {/* Left: Branding */}
      <Link to="/" className="flex items-center gap-3 no-underline group">
        <span className="font-display text-lg tracking-tight text-[var(--text-primary)] font-semibold">
          Bloom With Us
        </span>
        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border border-[rgba(212,175,55,0.5)] bg-[rgba(212,175,55,0.12)] text-[#916b14]">
          20/10
        </span>
      </Link>

      {/* Right: Clean Text Navigation Tabs */}
      <nav className="flex items-center gap-1 sm:gap-2 text-sm font-medium">
        <Link
          to="/"
          className={`px-4 py-1.5 rounded-full transition-all no-underline ${
            currentPath === "/" || currentPath === "/boy"
              ? "bg-[#F7E6EC] text-[var(--accent-blush-hover)] font-semibold"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/50"
          }`}
        >
          Cây ước nguyện
        </Link>
        <Link
          to="/play"
          className={`px-4 py-1.5 rounded-full transition-all no-underline ${
            currentPath === "/play"
              ? "bg-[#F7E6EC] text-[var(--accent-blush-hover)] font-semibold"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/50"
          }`}
        >
          Thử thách
        </Link>
        <Link
          to="/dashboard"
          className={`hidden sm:inline-block px-4 py-1.5 rounded-full transition-all no-underline ${
            currentPath === "/dashboard"
              ? "bg-[#F7E6EC] text-[var(--accent-blush-hover)] font-semibold"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/50"
          }`}
        >
          Điều phối
        </Link>
      </nav>
    </header>
  );
}
