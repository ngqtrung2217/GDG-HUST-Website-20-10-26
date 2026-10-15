import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dbService } from "@/services/app-database";
import type { OrnamentType } from "@/types/database";

interface BoyWishComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWishUpdated: () => void;
}

const ORNAMENT_LIST: { type: OrnamentType; label: string; icon: string }[] = [
  { type: "lotus", label: "Hoa Sen", icon: "🪷" },
  { type: "peach", label: "Hoa Đào", icon: "🌸" },
  { type: "giftbox", label: "Hộp Quà", icon: "🎁" },
  { type: "snowglobe", label: "Cầu Tuyết", icon: "🔮" },
  { type: "teddy", label: "Gấu Bông", icon: "🧸" },
];

export function BoyWishComposerModal({
  isOpen,
  onClose,
  onWishUpdated,
}: BoyWishComposerModalProps) {
  const [accessCode, setAccessCode] = useState("GDGOC2010");
  const [boyName, setBoyName] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [personalWish, setPersonalWish] = useState("");
  const [ornamentType, setOrnamentType] = useState<OrnamentType>("lotus");
  const [error, setError] = useState("");

  // Trạng thái hiển thị Code Confirmation Box để chụp màn hình
  const [confirmedData, setConfirmedData] = useState<{
    boyName: string;
    secretCode: string;
    ornamentType: OrnamentType;
    wish: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const state = dbService.getState();
  const currentGroup = state.groups[0] || null;

  if (!isOpen) return null;

  function generateRandomCode() {
    const prefixes = ["GDG", "HUST", "HOA", "WISH", "LOVE", "SUN"];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    setSecretCode(`${prefix}${randomNum}`);
    setError("");
  }

  function handleCopyCode() {
    if (confirmedData?.secretCode) {
      navigator.clipboard.writeText(confirmedData.secretCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  function handleSubmitWish(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!accessCode.trim()) {
      setError("Vui lòng nhập mã nhóm truy cập!");
      return;
    }

    if (!boyName.trim()) {
      setError("Vui lòng nhập tên của bạn!");
      return;
    }

    if (!secretCode.trim()) {
      setError("Vui lòng đặt mã bí mật để bạn nữ mở thư!");
      return;
    }

    if (!personalWish.trim()) {
      setError("Vui lòng nhập lời chúc gửi tặng các bạn nữ nhé!");
      return;
    }

    const cleanSecret = secretCode.trim().toUpperCase();

    const result = dbService.submitBoyWish(
      accessCode.trim(),
      boyName.trim(),
      cleanSecret,
      personalWish.trim(),
      ornamentType
    );

    if (!result.success) {
      setError(result.message || "Không thể lưu lời chúc. Bạn kiểm tra lại mã nhé!");
      return;
    }

    // Cập nhật cây ngay lập tức
    onWishUpdated();

    // Hiển thị hộp xác nhận mã để bạn nam chụp màn hình
    setConfirmedData({
      boyName: boyName.trim(),
      secretCode: cleanSecret,
      ornamentType,
      wish: personalWish.trim(),
    });
  }

  function handleCloseAll() {
    setConfirmedData(null);
    setBoyName("");
    setSecretCode("");
    setPersonalWish("");
    setError("");
    onClose();
  }

  const selectedOrnament = ORNAMENT_LIST.find((item) => item.type === (confirmedData?.ornamentType || ornamentType));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-[480px] rounded-3xl bg-[#1E243A] text-white p-6 sm:p-7 border border-white/15 shadow-2xl my-6"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleCloseAll}
            className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer z-20"
          >
            ✕
          </button>

          {/* TRƯỜNG HỢP 1: CODE CONFIRMATION BOX ĐỂ CHỤP MÀN HÌNH (SCREENSHOT) */}
          {confirmedData ? (
            <div className="pt-2 text-center animate-fade-in">
              {/* Badge thông báo */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold uppercase tracking-wider mb-2">
                <span>✓</span> Đã Treo Lời Chúc Lên Cây!
              </span>

              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                Thẻ Xác Nhận Mã Bí Mật
              </h2>
              <p className="text-xs text-pink-200/80 mt-1 max-w-sm mx-auto leading-relaxed">
                Hãy chụp ảnh màn hình thẻ này để gửi riêng cho bạn nữ mở quà trên Cây Ước Nguyện nhé! 📸
              </p>

              {/* TẤM VOUCHER / CARD DÀNH RIÊNG ĐỂ CHỤP MÀN HÌNH */}
              <div
                id="screenshot-voucher"
                className="my-5 p-6 rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#FDF0F3] text-[#2C1820] border-2 border-dashed border-[#E06D88]/70 shadow-2xl relative text-left overflow-hidden"
              >
                {/* Con dấu hoa góc phải */}
                <div className="absolute top-3 right-3 flex flex-col items-center justify-center size-12 rounded-xl bg-pink-100/90 border border-pink-300 text-pink-700 shadow-sm">
                  <span className="text-base font-bold font-serif">20/10</span>
                  <span className="text-[7px] uppercase font-mono font-bold tracking-tighter">GDGoC</span>
                </div>

                <div className="pr-12">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E06D88]">
                    {currentGroup?.group_name || "GDGoC HUST"} · Thư Ước Nguyện
                  </span>
                  <h3 className="text-lg font-bold font-serif text-[#431936] mt-0.5">
                    Món Quà Từ {confirmedData.boyName}
                  </h3>
                </div>

                {/* Hộp mã bí mật nổi bật nhất để chụp hình */}
                <div className="my-4 p-4 rounded-2xl bg-white border-2 border-pink-300 shadow-inner text-center">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-pink-700 mb-1">
                    Mã Bí Mật Mở Quà (Secret Code)
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-[#E06D88] tracking-widest select-all">
                    {confirmedData.secretCode}
                  </div>
                </div>

                {/* Thông tin món quà trên cây */}
                <div className="space-y-2 text-xs text-slate-700 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{selectedOrnament?.icon}</span>
                    <span>
                      <strong>Món quà hiển thị trên cây:</strong> {selectedOrnament?.label}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-pink-50/60 border border-pink-100 italic text-[11px] line-clamp-2">
                    "{confirmedData.wish}"
                  </div>
                </div>

                {/* Lời nhắn gửi bạn nữ */}
                <div className="mt-4 pt-3 border-t border-pink-200/60 flex items-center justify-between text-[10px] text-slate-500">
                  <span>🌸 Bloom With Us 20/10</span>
                  <span className="font-semibold text-pink-700">Chụp màn hình gửi bạn nữ</span>
                </div>
              </div>

              {/* Nút hành động */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="w-full sm:w-1/2 h-11 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>📋</span>
                  <span>{copied ? "Đã sao chép mã!" : "Sao chép mã"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCloseAll}
                  className="w-full sm:w-1/2 h-11 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-pink-500/25 transition-all cursor-pointer"
                >
                  Hoàn Tất & Xem Cây
                </button>
              </div>
            </div>
          ) : (
            /* TRƯỜNG HỢP 2: FORM SOẠN THƯ VÀ ĐẶT MÃ */
            <div>
              {/* Header */}
              <div className="border-b border-white/10 pb-3 pr-6">
                <span className="text-[11px] font-semibold text-pink-300 uppercase tracking-wider">
                  {currentGroup?.group_name || "GDGoC HUST"}
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5 font-serif">
                  Gửi Gắm Lời Chúc 20/10
                </h2>
                <p className="text-xs text-white/60 mt-1">
                  Tự đặt mã bí mật cho bức thư của mình để gửi tặng bạn nữ mở quà trên cây nhé!
                </p>
              </div>

              <form onSubmit={handleSubmitWish} className="mt-4 space-y-3.5">
                {error && (
                  <div className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-200">
                    {error}
                  </div>
                )}

                {/* 1. Nhập Mã Code Nhóm */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                      Mã truy cập nhóm (Group Code) *
                    </label>
                    <button
                      type="button"
                      onClick={() => setAccessCode("GDGOC2010")}
                      className="text-[10px] text-pink-300 hover:text-pink-200 underline cursor-pointer"
                    >
                      Mã test: GDGOC2010
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                    placeholder="VD: GDGOC2010"
                    className="w-full h-11 px-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-mono uppercase tracking-wider text-xs focus:outline-none focus:border-pink-400 placeholder:text-white/30"
                  />
                </div>

                {/* 2. Tự nhập tên bạn nam (Không có nút bấm sẵn) */}
                <div>
                  <label className="block text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-1">
                    Tên bạn nam *
                  </label>
                  <input
                    type="text"
                    required
                    value={boyName}
                    onChange={(e) => setBoyName(e.target.value)}
                    placeholder="Nhập họ và tên của bạn..."
                    className="w-full h-11 px-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:border-pink-400 placeholder:text-white/30"
                  />
                </div>

                {/* 3. Tự đặt mã bí mật để mở quà/thư */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                      Đặt mã bí mật để mở quà/thư *
                    </label>
                    <button
                      type="button"
                      onClick={generateRandomCode}
                      className="text-[10px] text-pink-300 hover:text-pink-200 underline cursor-pointer"
                    >
                      🎲 Tạo mã nhanh
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value.toUpperCase())}
                    placeholder="VD: HUY2010, LOVE2010, GDG88..."
                    className="w-full h-11 px-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-mono uppercase tracking-wider text-xs focus:outline-none focus:border-pink-400 placeholder:text-white/30 placeholder:normal-case placeholder:font-sans"
                  />
                  <p className="text-[10px] text-white/40 mt-1">
                    Mã này sẽ hiển thị ở thẻ xác nhận để bạn chụp màn hình gửi riêng cho bạn nữ.
                  </p>
                </div>

                {/* 4. Chọn biểu tượng quà tặng hiển thị trên cây */}
                <div>
                  <label className="block text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-1">
                    Chọn biểu tượng quà tặng treo trên cây *
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {ORNAMENT_LIST.map((item) => (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() => setOrnamentType(item.type)}
                        className={`h-11 rounded-xl text-[11px] font-medium border flex flex-col items-center justify-center transition-all cursor-pointer ${
                          ornamentType === item.type
                            ? "bg-pink-500 border-pink-300 text-white font-bold shadow-md shadow-pink-500/30 scale-105"
                            : "bg-white/5 border-white/15 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        <span className="text-sm">{item.icon}</span>
                        <span className="text-[10px] mt-0.5">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Lời chúc gửi bạn nữ */}
                <div>
                  <label className="block text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-1">
                    Lời chúc gửi bạn nữ *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Viết những lời chân thành gửi gắm tới các bạn nữ nhân ngày 20/10..."
                    value={personalWish}
                    onChange={(e) => setPersonalWish(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs leading-relaxed focus:outline-none focus:border-pink-400 resize-none placeholder:text-white/30"
                  />
                </div>

                {/* Nút hành động */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full h-11 rounded-2xl bg-gradient-to-r from-[#FF2B6D] via-[#FF3366] to-[#E91E63] hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-pink-500/30 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Treo Lời Chúc Lên Cây
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
