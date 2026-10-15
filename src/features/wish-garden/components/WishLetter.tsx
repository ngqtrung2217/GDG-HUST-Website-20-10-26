import { useState } from "react";
import { motion } from "framer-motion";
import type { Wish } from "@/features/wish-garden/types";

interface WishLetterProps {
  wish: Wish;
  isUnlocked: boolean;
  onClose: () => void;
  onUnlockWithCode: (code: string) => void;
  error?: string;
}

export function WishLetter({
  wish,
  isUnlocked,
  onClose,
  onUnlockWithCode,
  error,
}: WishLetterProps) {
  const [inputCode, setInputCode] = useState("");
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!wish.message) return;
    navigator.clipboard.writeText(`"${wish.message}" — Lời chúc 20/10 từ ${wish.boyName}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(44,24,32,0.38)] backdrop-blur-md">
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        className="relative w-full max-w-[480px] rounded-[20px] bg-[#FFFDF9] p-8 sm:p-9 text-[var(--text-primary)] shadow-2xl border border-[rgba(230,218,222,0.8)] overflow-hidden"
      >
        {/* Top Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[#F5E6E8]/50 transition-colors"
          aria-label="Đóng"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1L13 13M1 13L13 1" strokeLinecap="round" />
          </svg>
        </button>

        {isUnlocked ? (
          /* UNLOCKED: Handwritten Postcard Modal */
          <div>
            {/* Header: Sender + Date Stamp */}
            <div className="flex items-start justify-between border-b border-[rgba(230,218,222,0.7)] pb-4 pr-6">
              <div>
                <p className="text-[11px] font-medium tracking-wider uppercase text-[var(--text-muted)]">
                  {wish.recipient ? `Gửi tới ${wish.recipient}` : "Lời chúc 20/10"}
                </p>
                <h2 className="mt-1 font-display text-2xl text-[var(--text-primary)] font-semibold">
                  {wish.boyName}
                </h2>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded border border-[#C57B69]/40 bg-[#FAF0EE] text-[10px] font-serif tracking-widest text-[#B55C4A] uppercase">
                  20.10.2026
                </span>
              </div>
            </div>

            {/* Body: Editorial message */}
            <div className="py-6">
              <p className="text-base text-[var(--text-primary)] leading-[1.75] font-sans whitespace-pre-line">
                {wish.message}
              </p>

              {wish.gift && (
                <div className="mt-5 pt-4 border-t border-[rgba(230,218,222,0.6)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>Món quà đính kèm:</span>
                  <span className="font-medium text-[var(--text-primary)]">{wish.gift}</span>
                </div>
              )}

              {/* Signature */}
              <div className="pt-4 border-t border-dashed border-[rgba(230,218,222,0.7)] flex flex-col items-center justify-center text-center">
                <p className="font-serif text-sm font-bold text-[#431936] tracking-tight">
                  Chúc mừng 20/10
                </p>
                <p className="font-mono text-xs font-bold text-[#E06D88] tracking-wider uppercase mt-0.5">
                  GDGoC-HUST
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[rgba(230,218,222,0.7)]">
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
              >
                <span>{copied ? "Đã sao chép" : "Sao chép lời chúc"}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="h-9 px-5 rounded-full bg-[var(--accent-blush)] text-white text-xs font-medium hover:bg-[var(--accent-blush-hover)] transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          /* LOCKED: Unlock Prompt directly on node */
          <div>
            <div className="border-b border-[rgba(230,218,222,0.7)] pb-4 pr-6">
              <p className="text-[11px] font-medium tracking-wider uppercase text-[var(--text-muted)]">
                Thư tay đang niêm phong
              </p>
              <h2 className="mt-1 font-display text-2xl text-[var(--text-primary)] font-semibold">
                Lời chúc từ {wish.boyName}
              </h2>
            </div>

            <div className="py-5">
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Nhập mã nụ hoa bạn nhận được từ bạn nam để mở khóa lá thư này đơm hoa trên cây.
              </p>

              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputCode.trim()) {
                    onUnlockWithCode(inputCode.trim());
                  }
                }}
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                    placeholder="Nhập mã (VD: MAI, SEN)..."
                    className="flex-1 h-11 px-4 rounded-xl border border-[rgba(230,218,222,0.9)] bg-white text-sm font-mono tracking-wider uppercase placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:border-[var(--accent-blush)]"
                  />
                  <button
                    type="submit"
                    className="h-11 px-5 rounded-xl bg-[var(--accent-blush)] text-white text-xs font-semibold hover:bg-[var(--accent-blush-hover)] transition-colors"
                  >
                    Mở
                  </button>
                </div>
                {error && (
                  <p className="text-xs text-[#CC4B68] font-medium">
                    {error}
                  </p>
                )}
                <p className="text-[11px] text-[var(--text-muted)]">
                  Nhập mã bí mật nhận từ các bạn nam để mở phong thư chúc mừng này.
                </p>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
