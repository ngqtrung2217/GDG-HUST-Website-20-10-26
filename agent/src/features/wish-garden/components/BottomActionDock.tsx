import { useState, useRef, useEffect } from "react";

interface BottomActionDockProps {
  onSubmitCode: (code: string) => void;
  onOpenCompose: () => void;
  error?: string;
}

export function BottomActionDock({ onSubmitCode, onOpenCompose, error }: BottomActionDockProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd+K / Ctrl+K or / to focus input
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    onSubmitCode(code.trim());
    setCode("");
  }

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
      {error && (
        <div className="px-3.5 py-1 rounded-full bg-[rgba(255,255,255,0.9)] backdrop-blur-md border border-[rgba(204,75,104,0.3)] text-[11px] font-medium text-[#C84B68] shadow-sm animate-fade-in">
          {error}
        </div>
      )}

      {/* Unified Single-Unit Pill */}
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center w-[440px] max-w-[calc(100vw-32px)] h-[52px] rounded-full backdrop-blur-xl bg-[rgba(255,255,255,0.78)] border border-[rgba(255,255,255,0.85)] shadow-[0_16px_32px_-8px_rgba(136,73,90,0.12)] p-1.5 transition-all focus-within:shadow-[0_16px_36px_-6px_rgba(224,109,136,0.22)] focus-within:border-[rgba(224,109,136,0.5)]"
      >
        <input
          ref={inputRef}
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Nhập mã nụ hoa (VD: MAI, SEN)..."
          className="flex-1 h-full bg-transparent border-none px-4 text-sm font-sans tracking-wide text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:outline-none"
        />

        <div className="hidden sm:flex items-center gap-1 mr-2 text-[10px] text-[var(--text-muted)] font-mono select-none">
          <kbd className="px-1.5 py-0.5 rounded bg-black/5 border border-black/5">⌘K</kbd>
        </div>

        <button
          type="submit"
          className="h-10 px-5 rounded-full bg-[var(--accent-blush)] hover:bg-[var(--accent-blush-hover)] text-white text-xs font-medium tracking-wide transition-colors cursor-pointer shrink-0"
        >
          Mở Lời Chúc
        </button>
      </form>

      {/* Secondary Discreet Action for Male Letter Writing */}
      <button
        type="button"
        onClick={onOpenCompose}
        className="text-[11px] font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mt-0.5 underline decoration-[rgba(130,106,115,0.3)] hover:decoration-[var(--text-primary)]"
      >
        Bạn nam gửi lời chúc lên cây
      </button>
    </div>
  );
}

