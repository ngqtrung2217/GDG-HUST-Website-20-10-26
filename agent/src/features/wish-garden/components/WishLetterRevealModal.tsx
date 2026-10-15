import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Boy } from "@/types/database";

interface WishLetterRevealModalProps {
  boy: Boy | null;
  isUnlocked: boolean;
  onClose: () => void;
  onOpenCodeInput: () => void;
}

export function WishLetterRevealModal({
  boy,
  isUnlocked,
  onClose,
  onOpenCodeInput,
}: WishLetterRevealModalProps) {
  // Opening animation states: "envelope" -> "opening" -> "revealed"
  const [phase, setPhase] = useState<"envelope" | "opening" | "revealed">("envelope");

  useEffect(() => {
    if (boy && isUnlocked) {
      setPhase("envelope");
      // Trigger opening animation sequence
      const t1 = setTimeout(() => setPhase("opening"), 350);
      const t2 = setTimeout(() => setPhase("revealed"), 1100);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      setPhase("envelope");
    }
  }, [boy, isUnlocked]);

  if (!boy) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto font-sans">
        {/* BACKDROP DISMISS */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 24, stiffness: 300 }}
          className="relative z-10 w-full max-w-[500px] my-6"
        >
          {/* TRƯỜNG HỢP CHƯA MỞ KHÓA: HIỂN THỊ PHONG THƯ NIÊM PHONG */}
          {!isUnlocked ? (
            <div className="relative rounded-3xl bg-[#FFFDF9] text-[#2C1820] p-7 border-2 border-pink-200/90 shadow-2xl overflow-hidden text-center">
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-pink-100/60 hover:bg-pink-100 text-[#431936] transition-colors"
              >
                ✕
              </button>

              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-pink-100 text-pink-700 mb-3 shadow-inner">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>

              <span className="inline-block px-3 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold uppercase tracking-wider mb-1">
                Thư chưa mở khóa
              </span>

              <h2 className="text-xl font-bold font-serif text-[#431936] mt-1">
                Lời chúc từ {boy.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Bức thư này có đính kèm một món quà bí mật. Bạn hãy tìm bạn nam theo gợi ý dưới đây để nhận mã mở thư nha!
              </p>

              <div className="my-5 p-4 rounded-2xl bg-[#FAF6F0] border border-pink-150 text-xs text-left text-slate-700 leading-relaxed shadow-sm">
                <span className="font-bold text-pink-700 block mb-1">Gợi ý nhận diện bạn nam:</span>
                {boy.description}
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCodeInput();
                }}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-xs shadow-md shadow-pink-500/20 transition-all cursor-pointer"
              >
                Nhập mã bí mật để mở thư
              </button>
            </div>
          ) : (
            /* TRƯỜNG HỢP ĐÃ MỞ KHÓA: HIỆU ỨNG MỞ PHONG THƯ RỒI REVEAL CHI TIẾT */
            <div className="relative">
              {/* GIAI ĐOẠN 1 & 2: PHONG THƯ MỞ NẮP (OPENING ENVELOPE) */}
              {phase !== "revealed" ? (
                <div className="relative w-full h-[320px] rounded-3xl bg-[#FAF4EE] border-2 border-pink-200/90 shadow-2xl p-6 flex flex-col items-center justify-center text-center overflow-hidden">
                  {/* Con dấu sáp 20/10 */}
                  <motion.div
                    animate={phase === "opening" ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className="size-16 rounded-full bg-gradient-to-tr from-[#C25953] to-[#E06D88] text-white flex flex-col items-center justify-center border-2 border-dashed border-[#FAD2D8] shadow-lg mb-3 z-30"
                  >
                    <span className="text-sm font-bold tracking-tight">20/10</span>
                    <span className="text-[7px] font-semibold tracking-tighter uppercase">GDGoC</span>
                  </motion.div>

                  {/* Nắp phong bì mở 3D */}
                  <motion.div
                    initial={{ rotateX: 0 }}
                    animate={phase === "opening" ? { rotateX: 180 } : { rotateX: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ transformOrigin: "top" }}
                    className="w-64 h-24 bg-[#F2E5D9] border-t-2 border-pink-300/60 rounded-t-2xl shadow-md flex items-center justify-center text-xs font-serif font-bold text-pink-700"
                  >
                    Đang mở phong thư...
                  </motion.div>

                  {/* Tờ thư trượt nhô lên */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={phase === "opening" ? { y: -40, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="w-56 h-28 bg-[#FFFDF9] rounded-xl border border-pink-200 shadow-md p-3 text-[11px] text-[#431936] font-serif"
                  >
                    Thư từ {boy.name}...
                  </motion.div>
                </div>
              ) : (
                /* GIAI ĐOẠN 3: TỜ THƯ TRẢI RA HOÀN CHỈNH (REVEALED LETTER) */
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", damping: 22, stiffness: 260 }}
                  className="relative rounded-3xl bg-[#FFFDF9] text-[#2C1820] p-6 sm:p-8 border-2 border-pink-200/90 shadow-2xl overflow-hidden"
                >
                  {/* Top Stamp Ornament */}
                  <div className="absolute top-5 right-5 flex flex-col items-center justify-center size-14 rounded-lg border-2 border-dashed border-pink-300 bg-pink-50 rotate-3 p-1 shadow-sm">
                    <span className="text-base font-bold text-pink-600">20/10</span>
                    <span className="text-[8px] font-semibold text-pink-800 tracking-tighter uppercase">GDGoC HUST</span>
                  </div>

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-5 left-5 flex size-8 items-center justify-center rounded-full bg-pink-100/60 hover:bg-pink-100 text-[#431936] transition-colors"
                  >
                    ✕
                  </button>

                  <div className="pt-8">
                    {/* Header thông tin người gửi */}
                    <div className="border-b border-pink-150 pb-3">
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-pink-600">
                        Thư chúc mừng 20/10 từ bạn nam
                      </span>
                      <h2 className="text-2xl font-bold font-serif text-[#431936] mt-0.5">
                        {boy.name}
                      </h2>
                      <p className="text-xs text-slate-500 font-mono text-[11px]">{boy.email}</p>
                    </div>

                    {/* Lời chúc chân thành */}
                    <div className="my-5 p-5 rounded-2xl bg-[#FAF6F0] border border-pink-100 shadow-inner">
                      <p className="text-sm leading-relaxed text-[#2C1820] font-sans whitespace-pre-line italic">
                        "{boy.personal_wish || "Chúc bạn ngày 20/10 ngập tràn niềm vui, luôn xinh tươi, rạng rỡ và nhận được thật nhiều yêu thương nhé!"}"
                      </p>
                    </div>

                    {/* Món quà tặng kèm */}
                    {boy.gift_hint && (
                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2.5 mb-4">
                        <span className="text-xl">🎁</span>
                        <div>
                          <span className="font-bold">Món quà tặng bạn:</span>{" "}
                          <span>{boy.gift_hint}</span>
                        </div>
                      </div>
                    )}

                    {/* Đặc điểm nhận dạng */}
                    <div className="p-3.5 rounded-xl bg-pink-50/70 border border-pink-150 text-xs text-slate-600 mb-6">
                      <span className="font-bold text-pink-700">Gợi ý nhận diện bạn nam:</span>{" "}
                      <span>{boy.description}</span>
                    </div>

                    {/* CHỮ KÝ BẮT BUỘC Ở CUỐI MỖI BỨC THƯ THEO YÊU CẦU */}
                    <div className="pt-4 border-t border-dashed border-pink-200 flex flex-col items-center justify-center text-center">
                      <div className="size-8 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-600 mb-1">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </div>
                      <p className="font-serif text-base font-bold text-[#431936] tracking-tight">
                        Chúc mừng 20/10
                      </p>
                      <p className="font-mono text-xs font-bold text-pink-600 tracking-wider uppercase mt-0.5">
                        GDGoC-HUST
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setPhase("envelope");
                          setTimeout(() => setPhase("opening"), 200);
                          setTimeout(() => setPhase("revealed"), 900);
                        }}
                        className="text-[11px] text-pink-600 hover:text-pink-700 font-medium underline underline-offset-4 cursor-pointer"
                      >
                        Mở lại phong thư
                      </button>

                      <button
                        type="button"
                        onClick={onClose}
                        className="h-10 px-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-white font-semibold text-xs shadow-md shadow-pink-500/20 transition-all cursor-pointer"
                      >
                        Gấp thư lại
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
