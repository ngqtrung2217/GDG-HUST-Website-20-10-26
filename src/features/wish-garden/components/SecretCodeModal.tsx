import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dbService } from "@/services/app-database";
import type { Boy, Group } from "@/types/database";

interface SecretCodeModalProps {
  isOpen: boolean;
  girlToken?: string;
  onClose: () => void;
  onSuccessUnlock: (group: Group, boys: Boy[]) => void;
}

export function SecretCodeModal({
  isOpen,
  girlToken,
  onClose,
  onSuccessUnlock,
}: SecretCodeModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;

    const result = dbService.verifySecretCode(code.trim(), girlToken);
    if (!result.success || !result.group) {
      setError("Mã bí mật chưa chính xác. Bạn kiểm tra lại với bạn nam nhé!");
      return;
    }

    setError("");
    onSuccessUnlock(result.group, result.boys || []);
    onClose();
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-[420px] rounded-3xl bg-[#1E243A] text-white p-6 sm:p-7 border border-white/15 shadow-2xl my-6"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>

          <div className="border-b border-white/10 pb-3 pr-6">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-2">
              Dành Cho Bạn Nữ
            </span>
            <h2 className="text-xl font-bold text-white">
              Nhập Mã Mở Quà & Thư
            </h2>
            <p className="text-xs text-white/60 mt-1">
              Nhập mã bí mật (VD: 2010) nhận được từ bạn nam để mở khóa các món quà và bức thư trên cây.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                Mã bí mật (Secret Code)
              </label>
              <input
                type="text"
                required
                placeholder="VD: 2010..."
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white font-mono uppercase tracking-wider text-base focus:outline-none focus:border-pink-400 placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:text-white/30"
              />
              <p className="text-[11px] text-white/50 mt-1.5">
                Mã bí mật do bạn nam cung cấp sau khi bạn tìm thấy người ấy.
              </p>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 font-semibold text-sm shadow-lg shadow-pink-500/30 transition-all cursor-pointer"
            >
              Mở Khóa Toàn Bộ Quà
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

