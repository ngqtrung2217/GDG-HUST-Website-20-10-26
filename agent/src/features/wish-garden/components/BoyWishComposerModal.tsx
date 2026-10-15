import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dbService } from "@/services/app-database";
import type { Boy, Girl, Group, OrnamentType } from "@/types/database";

interface BoyWishComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWishUpdated: () => void;
}

const ORNAMENT_LIST: { type: OrnamentType; label: string }[] = [
  { type: "lotus", label: "Hoa Sen" },
  { type: "peach", label: "Hoa Đào" },
  { type: "giftbox", label: "Hộp Quà" },
  { type: "snowglobe", label: "Cầu Tuyết" },
  { type: "teddy", label: "Gấu Bông" },
];

export function BoyWishComposerModal({
  isOpen,
  onClose,
  onWishUpdated,
}: BoyWishComposerModalProps) {
  const [accessCode, setAccessCode] = useState("");
  const [loggedGroup, setLoggedGroup] = useState<Group | null>(null);
  const [groupBoys, setGroupBoys] = useState<Boy[]>([]);
  const [assignedGirls, setAssignedGirls] = useState<Girl[]>([]);
  const [selectedBoyId, setSelectedBoyId] = useState("");
  const [personalWish, setPersonalWish] = useState("");
  const [ornamentType, setOrnamentType] = useState<OrnamentType>("lotus");
  const [giftHint, setGiftHint] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!accessCode.trim()) return;

    const result = dbService.loginBoy(accessCode.trim());
    if (!result.success || !result.group) {
      setError("Mã truy cập chưa đúng. Bạn kiểm tra lại mã GDGOC2010 nhé.");
      return;
    }

    setError("");
    setLoggedGroup(result.group);
    setGroupBoys(result.boys || []);
    setAssignedGirls(result.assignedGirls || []);

    if (result.boys && result.boys.length > 0) {
      const first = result.boys[0];
      setSelectedBoyId(first.id);
      setPersonalWish(first.personal_wish || "");
      setOrnamentType(first.ornament_type || "lotus");
      setGiftHint(first.gift_hint || "");
    }
  }

  function handleBoySelect(id: string) {
    setSelectedBoyId(id);
    const boy = groupBoys.find((b) => b.id === id);
    if (boy) {
      setPersonalWish(boy.personal_wish || "");
      setOrnamentType(boy.ornament_type || "lotus");
      setGiftHint(boy.gift_hint || "");
    }
  }

  function handleSaveWish(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedBoyId || !personalWish.trim()) {
      setError("Vui lòng nhập lời chúc gửi tặng bạn nữ nhé!");
      return;
    }

    const ok = dbService.updateBoyWish(selectedBoyId, personalWish, ornamentType, giftHint);
    if (ok) {
      setSuccess(true);
      onWishUpdated();
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1800);
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-[480px] rounded-3xl bg-[#1E243A] text-white p-6 sm:p-7 border border-white/15 shadow-2xl my-6"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>

          {!loggedGroup ? (
            /* BƯỚC 1: ĐĂNG NHẬP MÃ BẠN NAM Ở NHÀ */
            <div>
              <div className="border-b border-white/10 pb-4 pr-6">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                  Dành Cho Bạn Nam
                </span>
                <h2 className="text-xl font-bold text-white">
                  Đăng Nhập Soạn Lời Chúc
                </h2>
                <p className="text-xs text-white/60 mt-1">
                  Nhập mã truy cập nhóm (mặc định: GDGOC2010) để xem danh sách bạn nữ và đính lời chúc lên cây.
                </p>
              </div>

              <form onSubmit={handleLogin} className="mt-5 space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-200">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                    Mã truy cập bạn nam (group_access_code)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: GDGOC2010..."
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                    className="w-full h-11 px-4 rounded-xl bg-white/10 border border-white/20 text-white font-mono uppercase tracking-wider focus:outline-none focus:border-pink-400 placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:text-white/30"
                  />
                  <p className="text-[11px] text-white/40 mt-1">
                    Mã truy cập mặc định: <code className="text-pink-300 font-bold">GDGOC2010</code>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 font-semibold text-sm shadow-lg shadow-pink-500/30 transition-all cursor-pointer"
                >
                  Vào Soạn Lời Chúc
                </button>
              </form>
            </div>
          ) : (
            /* BƯỚC 2: SOẠN LỜI CHÚC VÀ XEM BẠN NỮ ĐƯỢC TẶNG */
            <div>
              <div className="border-b border-white/10 pb-3 pr-6">
                <span className="text-[11px] text-pink-300 font-semibold">
                  {loggedGroup.group_name}
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">
                  Gửi Gắm Lời Chúc 20/10
                </h2>
              </div>

              {/* Thông tin bạn nữ được ghép cặp */}
              <div className="mt-3 p-3 rounded-2xl bg-pink-500/15 border border-pink-400/25">
                <p className="text-[11px] font-semibold text-pink-200 uppercase tracking-wider">
                  Bạn nữ nhận quà của nhóm:
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {assignedGirls.map((g) => (
                    <span
                      key={g.id}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 text-xs text-white font-medium"
                    >
                      <span>🌸</span>
                      <span>{g.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSaveWish} className="mt-4 space-y-3.5">
                {error && (
                  <div className="p-2.5 rounded-xl bg-red-500/20 text-xs text-red-200">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="p-3 rounded-xl bg-emerald-500/25 border border-emerald-400/40 text-xs text-emerald-200 font-semibold text-center">
                    ✓ Đã cập nhật và treo lời chúc lên cây thành công!
                  </div>
                )}

                {/* Chọn bạn nam trong nhóm */}
                <div>
                  <label className="block text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-1">
                    Chọn tên bạn nam
                  </label>
                  <select
                    value={selectedBoyId}
                    onChange={(e) => handleBoySelect(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:border-pink-400"
                  >
                    {groupBoys.map((b) => (
                      <option key={b.id} value={b.id} className="bg-[#1E243A] text-white">
                        {b.name} ({b.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Chọn ornament đính trên cây */}
                <div>
                  <label className="block text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-1">
                    Chọn biểu tượng treo trên cây
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {ORNAMENT_LIST.map((item) => (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() => setOrnamentType(item.type)}
                        className={`h-8 rounded-lg text-[11px] font-medium border transition-all ${
                          ornamentType === item.type
                            ? "bg-pink-500 border-pink-300 text-white font-bold"
                            : "bg-white/5 border-white/15 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lời chúc riêng */}
                <div>
                  <label className="block text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-1">
                    Lời chúc riêng gửi bạn nữ
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Viết những lời chân thành gửi gắm tới bạn nữ nhân ngày 20/10..."
                    value={personalWish}
                    onChange={(e) => setPersonalWish(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs leading-relaxed focus:outline-none focus:border-pink-400 resize-none placeholder:text-white/30"
                  />
                </div>

                {/* Quà tặng đính kèm */}
                <div>
                  <label className="block text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-1">
                    Món quà tặng kèm
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Ly trà sữa, móc khóa, sen đá mini..."
                    value={giftHint}
                    onChange={(e) => setGiftHint(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:border-pink-400 placeholder:text-white/30"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setLoggedGroup(null)}
                    className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white/70 transition-colors"
                  >
                    Đổi nhóm
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-xs font-bold shadow-lg shadow-pink-500/30 transition-all cursor-pointer"
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

