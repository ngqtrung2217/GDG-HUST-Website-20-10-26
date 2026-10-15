import { motion, AnimatePresence } from "framer-motion";
import type { Wish } from "@/features/wish-garden/types";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishes: Wish[];
  unlockedIds: string[];
  onSelectCode: (code: string) => void;
}

export function HelpModal({
  isOpen,
  onClose,
  wishes,
  unlockedIds,
  onSelectCode,
}: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(44,24,32,0.38)] backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative w-full max-w-[460px] rounded-[20px] bg-[#FFFDF9] p-7 sm:p-8 text-[var(--text-primary)] shadow-2xl border border-[rgba(230,218,222,0.8)]"
        >
          {/* Close button */}
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

          <h3 className="font-display text-xl text-[var(--text-primary)] font-semibold">
            Hướng Dẫn & Trải Nghiệm
          </h3>

          <div className="mt-4 space-y-4 text-xs text-[var(--text-muted)] leading-relaxed">
            <p>
              Mỗi thẻ gỗ treo trên cành cây tượng trưng cho một lời chúc từ các bạn nam.
              Bạn có thể nhấp trực tiếp vào bất kỳ thẻ gỗ nào trên cây để xem hoặc nhập mã mở khóa.
            </p>

            <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[rgba(230,218,222,0.7)] text-[var(--text-primary)]">
              <p className="font-semibold mb-1 text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                Danh sách lời chúc trên cây:
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {wishes.map((w) => {
                  const isUnlocked = unlockedIds.includes(w.id);
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => {
                        onSelectCode(w.code);
                        onClose();
                      }}
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-[rgba(230,218,222,0.8)] text-left hover:border-[var(--accent-blush)] transition-colors"
                    >
                      <span className="font-medium truncate mr-1">{w.boyName}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#FAF0EE] text-[var(--accent-blush-hover)] font-bold">
                        {isUnlocked ? "Đã mở" : w.code}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-5 rounded-full bg-[var(--accent-blush)] text-white text-xs font-medium hover:bg-[var(--accent-blush-hover)] transition-colors"
            >
              Đã hiểu
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

