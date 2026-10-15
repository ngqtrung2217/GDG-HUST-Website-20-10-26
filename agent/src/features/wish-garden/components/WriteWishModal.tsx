import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FlowerKind, Wish } from "@/features/wish-garden/types";

interface WriteWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitWish: (newWish: Omit<Wish, "id">) => void;
}

const CHARM_OPTIONS: { kind: FlowerKind; label: string }[] = [
  { kind: "blossom", label: "Hoa Anh Đào" },
  { kind: "lotus", label: "Hoa Sen" },
  { kind: "peach", label: "Hoa Đào" },
  { kind: "daisy", label: "Cúc Họa Mi" },
  { kind: "sunflower", label: "Hướng Dương" },
  { kind: "ema", label: "Thẻ Gỗ Ema" },
];

export function WriteWishModal({ isOpen, onClose, onSubmitWish }: WriteWishModalProps) {
  const [boyName, setBoyName] = useState("");
  const [recipient, setRecipient] = useState("Các bạn nữ GDGoC");
  const [flower, setFlower] = useState<FlowerKind>("blossom");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [gift, setGift] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!boyName.trim()) {
      setError("Vui lòng nhập tên người gửi");
      return;
    }
    if (!message.trim()) {
      setError("Vui lòng nhập lời chúc");
      return;
    }

    const finalCode = (code.trim() || `GDG${Math.floor(100 + Math.random() * 900)}`).toUpperCase();

    onSubmitWish({
      boyId: `boy-${Date.now()}`,
      boyName: boyName.trim(),
      recipient: recipient.trim() || "Các bạn nữ GDGoC",
      flower,
      message: message.trim(),
      code: finalCode,
      gift: gift.trim() || undefined,
      createdAt: new Date().toISOString(),
    });

    onClose();
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(44,24,32,0.38)] backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative w-full max-w-[500px] rounded-[20px] bg-[#FFFDF9] p-7 sm:p-9 text-[var(--text-primary)] shadow-2xl border border-[rgba(230,218,222,0.8)] my-8"
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

          {/* Header */}
          <div className="border-b border-[rgba(230,218,222,0.7)] pb-4 pr-6">
            <p className="text-[11px] font-medium tracking-wider uppercase text-[var(--text-muted)]">
              Gửi gắm lời chúc 20/10
            </p>
            <h2 className="mt-1 font-display text-2xl text-[var(--text-primary)] font-semibold">
              Viết Lời Chúc Treo Lên Cây
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {error && (
              <p className="text-xs text-[#CC4B68] font-medium">
                {error}
              </p>
            )}

            <div className="grid sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Tên bạn nam (Người gửi) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Minh Anh, Tuấn..."
                  value={boyName}
                  onChange={(e) => setBoyName(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-[rgba(230,218,222,0.9)] bg-white text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-blush)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Người nhận
                </label>
                <input
                  type="text"
                  placeholder="Các bạn nữ GDGoC..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-[rgba(230,218,222,0.9)] bg-white text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-blush)]"
                />
              </div>
            </div>

            {/* Charm style */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                Biểu tượng đính trên thẻ
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CHARM_OPTIONS.map((item) => (
                  <button
                    key={item.kind}
                    type="button"
                    onClick={() => setFlower(item.kind)}
                    className={`h-9 px-3 rounded-lg text-xs font-medium border transition-all ${
                      flower === item.kind
                        ? "border-[var(--accent-blush)] bg-[#FDF0F3] text-[var(--accent-blush-hover)] font-semibold"
                        : "border-[rgba(230,218,222,0.8)] bg-white text-[var(--text-muted)] hover:border-[var(--text-muted)]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Letter content */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Nội dung lời chúc *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Viết những lời chân thành gửi tới bạn nữ nhân ngày 20/10..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-[rgba(230,218,222,0.9)] bg-white text-sm text-[var(--text-primary)] leading-relaxed placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-blush)] resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Mã nụ hoa mở thư
                </label>
                <input
                  type="text"
                  placeholder="VD: HOA20, SEN..."
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full h-10 px-3.5 rounded-xl border border-[rgba(230,218,222,0.9)] bg-white text-sm font-mono uppercase tracking-wider text-[var(--text-primary)] placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-blush)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Món quà đính kèm (tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="1 cốc trà sữa, bookmark..."
                  value={gift}
                  onChange={(e) => setGift(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-[rgba(230,218,222,0.9)] bg-white text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-blush)]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[rgba(230,218,222,0.7)]">
              <button
                type="button"
                onClick={onClose}
                className="h-10 px-5 rounded-full border border-[rgba(230,218,222,0.9)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="h-10 px-6 rounded-full bg-[var(--accent-blush)] hover:bg-[var(--accent-blush-hover)] text-white text-xs font-medium tracking-wide transition-colors"
              >
                Treo Lên Cây
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
