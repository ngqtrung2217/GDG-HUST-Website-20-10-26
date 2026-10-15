import { useState } from "react";
import type { Boy } from "@/types/database";

interface ViralTree2010Props {
  treeTitle: string;
  recipientName?: string;
  boys: Boy[];
  isUnlocked: boolean;
  isBoyUnlocked?: (boy: Boy) => boolean;
  onSelectBoy: (boy: Boy) => void;
  onOpenSecretCodeModal: () => void;
  onOpenBoyLoginModal: () => void;
  onOpenGirlAccountModal: () => void;
  onDirectUnlockCode?: (code: string) => boolean | void;
}

const ORNAMENT_ICONS: Record<string, string> = {
  lotus: "🪷",
  peach: "🌸",
  giftbox: "🎁",
  snowglobe: "🔮",
  teddy: "🧸",
};

// 12 organically distributed coordinates along the natural curve of the bonsai boughs.
// Slots 0, 1, 2, 3, 4 are primary focal boughs for 5 boys, balanced across left, center, right.
const BRANCH_COORDINATES = [
  { x: 26, y: 38 }, // Left Mid Bough
  { x: 50, y: 22 }, // High Crown Peak
  { x: 74, y: 38 }, // Right Mid Bough
  { x: 38, y: 28 }, // Upper-Left Bough
  { x: 62, y: 28 }, // Upper-Right Bough
  { x: 18, y: 48 }, // Far-Left Low Hanging
  { x: 82, y: 48 }, // Far-Right Low Hanging
  { x: 50, y: 40 }, // Mid-Center Heart
  { x: 32, y: 52 }, // Lower-Left Droop
  { x: 68, y: 52 }, // Lower-Right Droop
  { x: 44, y: 16 }, // Top-Left Spire
  { x: 56, y: 16 }, // Top-Right Spire
];

export function ViralTree2010({
  treeTitle,
  recipientName,
  boys,
  isUnlocked,
  isBoyUnlocked,
  onSelectBoy,
  onOpenSecretCodeModal,
  onOpenBoyLoginModal,
  onOpenGirlAccountModal,
  onDirectUnlockCode,
}: ViralTree2010Props) {
  const [inputCode, setInputCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(boys.length / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBoys = boys.slice(startIndex, startIndex + itemsPerPage);

  function handleQuickSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inputCode.trim()) {
      onOpenSecretCodeModal();
      return;
    }
    if (onDirectUnlockCode) {
      onDirectUnlockCode(inputCode.trim());
      setInputCode("");
    } else {
      onOpenSecretCodeModal();
    }
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#FAF7F2] via-[#F6ECE9] to-[#F1DEE3] text-[#2C1820] overflow-x-hidden font-sans select-none pb-24">
      {/* Background Atmosphere: Ambient Warm Light & Natural Petal Flutter */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[760px] h-[480px] bg-[#FCE8ED]/40 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#FAD2DC]/25 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#FDF0E6]/35 rounded-full blur-[120px]" />

        {/* Fluttering Petals */}
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#E06D88]/20 pointer-events-none"
            style={{
              top: `${(i * 7) % 94}%`,
              left: `${(i * 14) % 96}%`,
              width: `${(i % 3) + 4}px`,
              height: `${(i % 3) + 7}px`,
              transform: `rotate(${i * 28}deg)`,
              animation: `petalFallGentle ${8 + (i % 4)}s linear infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* TOP SECTION: Clean, Poetic Header (Well below SiteHeader) */}
      <div className="relative z-10 pt-24 sm:pt-28 px-6 max-w-4xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="h-px w-6 bg-[#C5A059]/60" />
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#826A73]">
            {treeTitle || "GDGoC HUST"} · 20 Tháng 10
          </span>
          <span className="h-px w-6 bg-[#C5A059]/60" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1820] tracking-tight">
          Cây Ước Nguyện
        </h1>

        <p className="text-xs sm:text-sm text-[#826A73] mt-1.5 max-w-lg mx-auto font-sans leading-relaxed">
          {recipientName
            ? `Thương gửi đến bạn ${recipientName}`
            : "Những lời chúc và món quà kỷ niệm 20/10 từ GDGoC HUST gửi tặng bạn"}
        </p>

        {/* Account indicator if needed */}
        <div className="mt-2.5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onOpenGirlAccountModal}
            className="text-[11px] text-[#826A73] hover:text-[#C25953] transition-colors underline underline-offset-4 cursor-pointer"
          >
            {recipientName ? "Đổi tài khoản nhận quà" : "Bạn nữ đăng ký nhận quà"}
          </button>
        </div>
      </div>

      {/* CENTRAL BONSAI VIEWPORT: Handcrafted Botanical Bonsai */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 my-2">
        <div className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] max-h-[66vh]">
          {/* Organic Bonsai Tree SVG */}
          <svg
            viewBox="0 0 1000 640"
            className="w-full h-full drop-shadow-[0_24px_48px_rgba(136,73,90,0.12)] select-none pointer-events-none"
          >
            <defs>
              {/* Natural Ink Bark Gradient */}
              <linearGradient id="barkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2E1C14" />
                <stop offset="30%" stopColor="#4D2E20" />
                <stop offset="70%" stopColor="#633C2A" />
                <stop offset="100%" stopColor="#321D15" />
              </linearGradient>

              {/* Soft Watercolor Blossom Radiance */}
              <radialGradient id="blossomSoft" cx="45%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#FFF8FA" />
                <stop offset="60%" stopColor="#FAD4E0" />
                <stop offset="100%" stopColor="#E27494" />
              </radialGradient>
              <radialGradient id="blossomDeep" cx="35%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#FDE6ED" />
                <stop offset="65%" stopColor="#EE96B1" />
                <stop offset="100%" stopColor="#C2496E" />
              </radialGradient>
              <radialGradient id="blossomLight" cx="40%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#FFEAF1" />
                <stop offset="100%" stopColor="#F7B2C6" />
              </radialGradient>

              {/* Subtle Hill Base */}
              <linearGradient id="softHill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6B8E70" />
                <stop offset="50%" stopColor="#537357" />
                <stop offset="100%" stopColor="#3B543E" />
              </linearGradient>
            </defs>

            {/* Earth knoll */}
            <path
              d="M -100 640 Q 250 560, 500 570 Q 750 580, 1100 550 L 1100 640 Z"
              fill="url(#softHill)"
            />

            {/* Natural Gnarled Bonsai Trunk & Graceful Boughs */}
            <g>
              {/* Base roots and trunk */}
              <path
                d="M 450 580 C 460 520, 465 450, 455 390 C 445 330, 470 280, 490 250 L 515 250 C 530 280, 555 330, 545 390 C 535 450, 540 520, 550 580 Z"
                fill="url(#barkGradient)"
              />

              {/* Left Sweeping Bough */}
              <path
                d="M 465 350 C 385 300, 275 270, 160 230 C 210 240, 310 260, 410 300 C 450 320, 470 340, 465 350 Z"
                fill="url(#barkGradient)"
              />
              <path
                d="M 290 260 Q 210 190, 150 160 Q 220 180, 300 230 Z"
                fill="url(#barkGradient)"
              />

              {/* Upper-Left Limb */}
              <path
                d="M 480 290 C 430 230, 360 180, 280 120 C 330 150, 400 200, 460 250 Z"
                fill="url(#barkGradient)"
              />

              {/* Central Upright Branch */}
              <path
                d="M 490 250 C 480 180, 450 140, 420 90 C 450 115, 485 160, 500 215 C 515 160, 550 115, 580 90 C 550 140, 520 180, 515 250 Z"
                fill="url(#barkGradient)"
              />

              {/* Upper-Right Limb */}
              <path
                d="M 520 290 C 570 230, 640 180, 720 120 C 670 150, 600 200, 540 250 Z"
                fill="url(#barkGradient)"
              />

              {/* Right Sweeping Bough */}
              <path
                d="M 535 350 C 615 300, 725 270, 840 230 C 790 240, 690 260, 590 300 C 550 320, 530 340, 535 350 Z"
                fill="url(#barkGradient)"
              />
              <path
                d="M 710 260 Q 790 190, 850 160 Q 780 180, 700 230 Z"
                fill="url(#barkGradient)"
              />
            </g>

            {/* Layered Blossom Canopies (Tán hoa mềm mại, không xếp hình tròn cứng) */}
            <g opacity="0.94">
              {/* Background Depth Clouds */}
              <ellipse cx="240" cy="210" rx="130" ry="85" fill="url(#blossomDeep)" opacity="0.75" />
              <ellipse cx="760" cy="210" rx="130" ry="85" fill="url(#blossomDeep)" opacity="0.75" />
              <ellipse cx="500" cy="160" rx="150" ry="100" fill="url(#blossomDeep)" opacity="0.8" />

              {/* Midground Soft Petal Clouds */}
              <circle cx="190" cy="230" r="90" fill="url(#blossomSoft)" />
              <circle cx="310" cy="200" r="100" fill="url(#blossomSoft)" />
              <circle cx="430" cy="150" r="105" fill="url(#blossomSoft)" />
              <circle cx="570" cy="150" r="105" fill="url(#blossomSoft)" />
              <circle cx="690" cy="200" r="100" fill="url(#blossomSoft)" />
              <circle cx="810" cy="230" r="90" fill="url(#blossomSoft)" />
              <circle cx="500" cy="220" r="110" fill="url(#blossomSoft)" />

              {/* High Blossom Highlights */}
              <circle cx="370" cy="130" r="75" fill="url(#blossomLight)" opacity="0.9" />
              <circle cx="500" cy="100" r="80" fill="url(#blossomLight)" opacity="0.95" />
              <circle cx="630" cy="130" r="75" fill="url(#blossomLight)" opacity="0.9" />

              {/* Delicate Botanical Leaves */}
              {[
                [130, 220], [220, 140], [340, 80], [500, 45], [660, 80], [780, 140], [870, 220]
              ].map(([lx, ly], idx) => (
                <ellipse
                  key={`botanical-leaf-${idx}`}
                  cx={lx}
                  cy={ly}
                  rx="12"
                  ry="6"
                  fill="#5A8F65"
                  opacity="0.85"
                  transform={`rotate(${idx * 30} ${lx} ${ly})`}
                />
              ))}
            </g>
          </svg>

          {/* HANGING WISHING PLAQUES (Ema-inspired Japanese/Vietnamese wish tags) */}
          {currentBoys.map((boy, idx) => {
            const coord = BRANCH_COORDINATES[idx % BRANCH_COORDINATES.length];
            const unlocked = isBoyUnlocked ? isBoyUnlocked(boy) : isUnlocked;
            const giftIcon = ORNAMENT_ICONS[boy.ornament_type] || "🌸";
            return (
              <div
                key={boy.id}
                onClick={() => onSelectBoy(boy)}
                style={{ top: `${coord.y}%`, left: `${coord.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group transition-transform duration-300 hover:scale-115 hover:-rotate-2 z-20"
              >
                {/* Slender Vertical Silk Cord */}
                <div className="w-[1px] h-6 bg-[#C5A059] shadow-sm -mb-0.5" />

                {/* Minimalist Birchwood Wish Plaque with chosen gift displayed */}
                <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFDF9] border border-[#E8D7DC] shadow-[0_8px_20px_-4px_rgba(136,73,90,0.14)] group-hover:border-[#E06D88] group-hover:shadow-[0_12px_28px_-4px_rgba(224,109,136,0.3)] transition-all">
                  {/* The Gift Displayed on the Tree */}
                  <span className="shrink-0 flex items-center justify-center size-5 rounded-full bg-[#FAF0EE] border border-[#F0D5DA] text-xs">
                    {giftIcon}
                  </span>

                  {/* Boy Name in Crisp Typography */}
                  <span className="text-xs font-serif font-semibold text-[#2C1820] tracking-tight whitespace-nowrap">
                    {boy.name}
                  </span>

                  {/* Lock/Unlock status indicator */}
                  <span className={`size-1.5 rounded-full ${unlocked ? "bg-emerald-500" : "bg-[#C25953]"}`} />
                </div>
              </div>
            );
          })}

          {/* Empty state when tree has no letters yet */}
          {boys.length === 0 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E8D7DC] shadow-xl text-center max-w-[280px] pointer-events-auto animate-fade-in">
              <span className="text-3xl mb-1.5">🌸</span>
              <h3 className="text-sm font-serif font-bold text-[#2C1820]">
                Cây Đang Chờ Lời Chúc
              </h3>
              <p className="text-[11px] text-[#826A73] mt-1 leading-relaxed">
                Chưa có bức thư nào được treo. Các bạn nam hãy bấm bên dưới để gửi gắm lời chúc đầu tiên nhé!
              </p>
              <button
                type="button"
                onClick={onOpenBoyLoginModal}
                className="mt-3.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-white text-xs font-semibold shadow-md shadow-pink-500/20 cursor-pointer transition-all active:scale-95"
              >
                Gửi lời chúc ngay ✨
              </button>
            </div>
          )}
        </div>

        {/* Multi-page Navigation if > 12 gifts */}
        {totalPages > 1 && (
          <div className="flex items-center gap-3 mt-2 z-20">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="size-7 rounded-full bg-white/90 border border-[#E8D7DC] flex items-center justify-center text-xs text-[#2C1820] disabled:opacity-30 hover:bg-white shadow-sm transition-colors cursor-pointer"
            >
              ‹
            </button>
            <div className="px-3.5 py-0.5 rounded-full bg-white/95 border border-[#E8D7DC] text-[11px] font-serif font-medium text-[#826A73] shadow-sm">
              Trang {currentPage} / {totalPages}
            </div>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="size-7 rounded-full bg-white/90 border border-[#E8D7DC] flex items-center justify-center text-xs text-[#2C1820] disabled:opacity-30 hover:bg-white shadow-sm transition-colors cursor-pointer"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* BOTTOM ACTION DOCK (Clean, Unified Glassmorphic Pill) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 max-w-[94vw] w-full sm:w-auto">
        <form
          onSubmit={handleQuickSubmit}
          className="flex items-center w-full sm:w-[460px] h-13 px-2 py-1.5 rounded-full backdrop-blur-xl bg-white/85 border border-white/90 shadow-[0_16px_36px_-8px_rgba(136,73,90,0.18)]"
        >
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            placeholder="Nhập mã bí mật nhận quà (VD: 2010)..."
            className="flex-1 h-full px-4 bg-transparent text-xs sm:text-sm text-[#2C1820] placeholder:text-[#826A73]/60 focus:outline-none font-mono uppercase tracking-wider"
          />

          <button
            type="submit"
            className="h-10 px-5 rounded-full bg-gradient-to-r from-[#E06D88] to-[#CC5572] hover:from-[#CC5572] hover:to-[#B83E5D] text-white text-xs font-semibold shadow-md shadow-pink-900/15 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Mở Lời Chúc
          </button>
        </form>

        {/* Discreet link for boys to compose wish */}
        <div className="flex items-center gap-4 text-[11px] text-[#826A73]">
          <button
            type="button"
            onClick={onOpenBoyLoginModal}
            className="hover:text-[#2C1820] transition-colors cursor-pointer underline underline-offset-4"
          >
            Dành cho bạn nam gửi lời chúc →
          </button>
          <span>·</span>
          <span>{boys.length} lời chúc trên cây</span>
        </div>
      </div>
    </div>
  );
}
