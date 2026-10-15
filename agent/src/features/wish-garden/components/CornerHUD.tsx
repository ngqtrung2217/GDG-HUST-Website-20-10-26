import { useState } from "react";

interface CornerHUDProps {
  wishCount: number;
  showPetals: boolean;
  onTogglePetals: () => void;
  onOpenHelp: () => void;
}

export function CornerHUD({
  wishCount,
  showPetals,
  onTogglePetals,
  onOpenHelp,
}: CornerHUDProps) {
  const [audioMuted, setAudioMuted] = useState(true);

  return (
    <>
      {/* Bottom Left: Instructions Button */}
      <div className="fixed bottom-6 left-6 z-30 flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenHelp}
          className="flex size-10 items-center justify-center rounded-full backdrop-blur-xl bg-[rgba(255,255,255,0.78)] border border-[rgba(255,255,255,0.85)] text-[var(--text-primary)] shadow-sm hover:bg-white transition-all text-xs font-semibold"
          aria-label="Hướng dẫn"
          title="Hướng dẫn"
        >
          ?
        </button>
      </div>

      {/* Bottom Right: Monochromatic Ambient Switches & Counter */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-3">
        {/* Floating Wish Counter */}
        <div className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full backdrop-blur-xl bg-[rgba(255,255,255,0.78)] border border-[rgba(255,255,255,0.85)] text-xs font-medium text-[var(--text-muted)] shadow-sm">
          <span>Số lời chúc: {wishCount}</span>
        </div>

        {/* Petal Animation Switch */}
        <button
          type="button"
          onClick={onTogglePetals}
          className={`flex size-10 items-center justify-center rounded-full backdrop-blur-xl border shadow-sm transition-all text-xs ${
            showPetals
              ? "bg-[rgba(255,255,255,0.78)] border-[rgba(255,255,255,0.85)] text-[var(--text-primary)]"
              : "bg-white/40 border-white/40 text-[var(--text-muted)]/50"
          }`}
          title={showPetals ? "Tắt cánh hoa rơi" : "Bật cánh hoa rơi"}
          aria-label="Cánh hoa"
        >
          {/* Subtle petal outline icon */}
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M8 1C8 5.5 13 8 13 8C13 8 8 10.5 8 15C8 10.5 3 8 3 8C3 8 8 5.5 8 1Z" />
          </svg>
        </button>

        {/* Ambient Wind/Audio Switch */}
        <button
          type="button"
          onClick={() => setAudioMuted(!audioMuted)}
          className={`flex size-10 items-center justify-center rounded-full backdrop-blur-xl border shadow-sm transition-all text-xs ${
            !audioMuted
              ? "bg-[rgba(255,255,255,0.78)] border-[rgba(255,255,255,0.85)] text-[var(--text-primary)]"
              : "bg-white/40 border-white/40 text-[var(--text-muted)]/50"
          }`}
          title={audioMuted ? "Bật âm thanh gió nhẹ" : "Tắt âm thanh"}
          aria-label="Âm thanh"
        >
          {/* Minimal speaker icon */}
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M3 6H6L10 3V13L6 10H3V6Z" />
            {!audioMuted && <path d="M12 5.5C12.8 6.5 12.8 9.5 12 10.5" />}
          </svg>
        </button>
      </div>
    </>
  );
}

