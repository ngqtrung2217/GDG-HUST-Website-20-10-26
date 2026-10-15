import { useState, useId } from "react";
import type { Wish } from "@/features/wish-garden/types";

interface WishingTreeProps {
  wishes: Wish[];
  unlockedIds: string[];
  onOpenWish: (wish: Wish) => void;
  showPetals: boolean;
}

// 12 carefully balanced branch coordinates spread naturally across the tree canopy
const BRANCH_ANCHORS = [
  { x: 230, y: 280, sway: "animate-ema-slow" },
  { x: 360, y: 230, sway: "animate-ema-fast" },
  { x: 500, y: 190, sway: "animate-ema-slow" },
  { x: 640, y: 230, sway: "animate-ema-fast" },
  { x: 770, y: 280, sway: "animate-ema-slow" },
  { x: 290, y: 350, sway: "animate-ema-fast" },
  { x: 710, y: 350, sway: "animate-ema-slow" },
  { x: 420, y: 290, sway: "animate-ema-fast" },
  { x: 580, y: 290, sway: "animate-ema-slow" },
  { x: 190, y: 380, sway: "animate-ema-slow" },
  { x: 810, y: 380, sway: "animate-ema-fast" },
  { x: 500, y: 360, sway: "animate-ema-fast" },
];

export function WishingTree({
  wishes,
  unlockedIds,
  onOpenWish,
  showPetals,
}: WishingTreeProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const filterId = useId();

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
      <svg
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        <defs>
          {/* Trunk Gradient */}
          <linearGradient id="trunkWood" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3F2215" />
            <stop offset="40%" stopColor="#5C3421" />
            <stop offset="75%" stopColor="#6E4029" />
            <stop offset="100%" stopColor="#452618" />
          </linearGradient>

          {/* Grassy Knoll Gradient */}
          <linearGradient id="hillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#708D6E" />
            <stop offset="40%" stopColor="#5A7759" />
            <stop offset="100%" stopColor="#4E684D" />
          </linearGradient>

          {/* Soft Painterly Blossom Gradients */}
          <radialGradient id="foliageDeep" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FDECEF" />
            <stop offset="60%" stopColor="#F5C0CE" />
            <stop offset="100%" stopColor="#E492A6" />
          </radialGradient>
          <radialGradient id="foliageSoft" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFF4F6" />
            <stop offset="65%" stopColor="#F9D4DE" />
            <stop offset="100%" stopColor="#EEAAB9" />
          </radialGradient>
          <radialGradient id="foliageLight" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#FCE4EC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F7CAD5" stopOpacity="0.6" />
          </radialGradient>

          {/* Tag Soft Drop Shadow */}
          <filter id={`tag-shadow-${filterId}`} x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#88495A" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Gentle Sky Horizon Glow */}
        <ellipse cx="500" cy="270" rx="420" ry="260" fill="url(#foliageLight)" opacity="0.3" />

        {/* Grassy Knoll Anchoring the Bottom 20% */}
        <path
          d="M -100 700 Q 250 565, 500 580 Q 750 595, 1100 560 L 1100 700 Z"
          fill="url(#hillGrad)"
        />

        {/* Organic Silhouette Trunk and Graceful Limbs */}
        <g>
          {/* Root Base */}
          <path
            d="M 430 650 Q 450 580, 465 520 Q 460 440, 475 360 L 525 360 Q 540 440, 535 520 Q 550 580, 570 650 Z"
            fill="url(#trunkWood)"
          />

          {/* Left Main Branch Structure */}
          <path
            d="M 475 375 C 440 330, 360 300, 260 280 C 210 270, 160 250, 120 220 C 145 230, 190 245, 250 258 C 340 278, 420 310, 470 345 Z"
            fill="url(#trunkWood)"
          />
          <path
            d="M 330 290 Q 270 230, 210 185 Q 255 210, 310 260 Z"
            fill="url(#trunkWood)"
          />
          <path
            d="M 230 270 Q 180 320, 140 360 Q 175 330, 220 285 Z"
            fill="url(#trunkWood)"
          />

          {/* Right Main Branch Structure */}
          <path
            d="M 525 375 C 560 330, 640 300, 740 280 C 790 270, 840 250, 880 220 C 855 230, 810 245, 750 258 C 660 278, 580 310, 530 345 Z"
            fill="url(#trunkWood)"
          />
          <path
            d="M 670 290 Q 730 230, 790 185 Q 745 210, 690 260 Z"
            fill="url(#trunkWood)"
          />
          <path
            d="M 770 270 Q 820 320, 860 360 Q 825 330, 780 285 Z"
            fill="url(#trunkWood)"
          />

          {/* Center Crown Upward Branches */}
          <path
            d="M 485 355 C 470 270, 425 215, 380 160 C 415 185, 455 240, 480 315 C 495 260, 495 190, 500 130 C 505 190, 505 260, 520 315 C 545 240, 585 185, 620 160 C 575 215, 530 270, 515 355 Z"
            fill="url(#trunkWood)"
          />

          {/* Subtle Bark Texture Lines */}
          <path
            d="M 490 540 Q 485 470, 495 400 M 512 550 Q 507 460, 517 380 M 465 330 Q 400 305, 330 285 M 535 330 Q 600 305, 670 285"
            stroke="#2F180E"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.4"
            fill="none"
          />
        </g>

        {/* Soft Organic Blossom Clouds (Canopy) */}
        <g opacity="0.95">
          {/* Back Layer Canopy */}
          <path
            d="M 160 230 C 130 180, 210 130, 270 145 C 320 100, 410 90, 450 135 C 490 70, 570 80, 600 130 C 660 90, 740 110, 770 160 C 840 140, 890 200, 850 250 C 890 300, 810 370, 750 330 C 700 380, 600 370, 560 320 C 520 360, 420 360, 390 310 C 330 360, 230 350, 200 300 C 130 290, 120 250, 160 230 Z"
            fill="url(#foliageDeep)"
            opacity="0.85"
          />

          {/* Mid Layer Fluffy Blossom Clusters */}
          <circle cx="230" cy="220" r="75" fill="url(#foliageSoft)" />
          <circle cx="340" cy="180" r="85" fill="url(#foliageDeep)" />
          <circle cx="460" cy="155" r="90" fill="url(#foliageSoft)" />
          <circle cx="560" cy="155" r="90" fill="url(#foliageDeep)" />
          <circle cx="670" cy="180" r="85" fill="url(#foliageSoft)" />
          <circle cx="780" cy="220" r="75" fill="url(#foliageDeep)" />
          <circle cx="280" cy="300" r="70" fill="url(#foliageSoft)" />
          <circle cx="720" cy="300" r="70" fill="url(#foliageSoft)" />
          <circle cx="500" cy="240" r="95" fill="url(#foliageLight)" />

          {/* Delicate Outer Edge Blossom Puffs */}
          {[
            [150, 210], [200, 160], [270, 130], [350, 105], [430, 85],
            [500, 75], [570, 85], [650, 105], [730, 130], [800, 160], [850, 210],
            [160, 270], [840, 270], [330, 340], [670, 340]
          ].map(([bx, by], i) => (
            <circle
              key={`puff-${i}`}
              cx={bx}
              cy={by}
              r={16 + (i % 3) * 4}
              fill="url(#foliageLight)"
              opacity="0.9"
            />
          ))}
        </g>

        {/* Floating Petals Drift (when enabled) */}
        {showPetals && (
          <g className="pointer-events-none">
            {[
              { cx: 210, cy: 370, r: 4, rot: 25 },
              { cx: 310, cy: 440, r: 5, rot: 50 },
              { cx: 420, cy: 380, r: 5, rot: 80 },
              { cx: 530, cy: 470, r: 4, rot: 15 },
              { cx: 640, cy: 410, r: 5, rot: 110 },
              { cx: 750, cy: 450, r: 6, rot: 45 },
              { cx: 830, cy: 400, r: 4, rot: 70 },
              { cx: 360, cy: 510, r: 5, rot: 95 },
              { cx: 660, cy: 530, r: 4, rot: 30 },
            ].map((p, idx) => (
              <ellipse
                key={`petal-${idx}`}
                cx={p.cx}
                cy={p.cy}
                rx={p.r}
                ry={p.r * 1.6}
                fill="#E896AA"
                opacity="0.65"
                transform={`rotate(${p.rot} ${p.cx} ${p.cy})`}
              />
            ))}
          </g>
        )}

        {/* HANGING EMA WISHING PLAQUES */}
        {wishes.map((wish, index) => {
          const anchor = BRANCH_ANCHORS[index % BRANCH_ANCHORS.length];
          const isUnlocked = unlockedIds.includes(wish.id);
          const isHovered = hoveredId === wish.id;
          const cordLength = 46 + (index % 3) * 14;
          const tagY = anchor.y + cordLength;

          return (
            <g
              key={wish.id}
              className={`${anchor.sway}`}
              style={{ transformOrigin: `${anchor.x}px ${anchor.y}px` }}
              onMouseEnter={() => setHoveredId(wish.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onOpenWish(wish)}
            >
              {/* Delicate Gold Cord */}
              <line
                x1={anchor.x}
                y1={anchor.y}
                x2={anchor.x}
                y2={tagY}
                stroke="#C5A059"
                strokeWidth="1"
              />

              {/* Cord Tie Knot at Branch */}
              <circle cx={anchor.x} cy={anchor.y} r="2" fill="#C5A059" />

              {/* Tag Body (Ema-inspired Minimal Cream Paper Rectangle) */}
              <g
                transform={`translate(${anchor.x}, ${tagY})`}
                className="ema-tag-node cursor-pointer"
                filter={`url(#tag-shadow-${filterId})`}
              >
                {/* Minimal Cream Paper Rectangle */}
                <rect
                  x="-38"
                  y="0"
                  width="76"
                  height="32"
                  rx="4"
                  fill="#FFFDF9"
                  stroke={isUnlocked ? "rgba(224, 109, 136, 0.4)" : "#E8DCD5"}
                  strokeWidth="1"
                />

                {/* Person's Name in Crisp Dark Typography */}
                <text
                  x="0"
                  y="19"
                  textAnchor="middle"
                  fill="#2C1820"
                  fontSize="11"
                  fontWeight="500"
                  fontFamily="system-ui, sans-serif"
                >
                  {wish.boyName}
                </text>

                {/* Status Indicator */}
                {isUnlocked ? (
                  /* Open Blossom Emblem (Unlocked) */
                  <g transform="translate(24, 8) scale(0.65)">
                    {[0, 72, 144, 216, 288].map((deg) => (
                      <circle
                        key={deg}
                        cx="0"
                        cy="-6"
                        r="3.5"
                        fill="#D4AF37"
                        transform={`rotate(${deg} 0 0)`}
                      />
                    ))}
                    <circle cx="0" cy="0" r="2.5" fill="#FFFDF9" />
                  </g>
                ) : (
                  /* Sealed Wax Dot (Locked) */
                  <g transform="translate(24, 8)">
                    <circle cx="0" cy="0" r="3.5" fill="#CC5572" />
                    <circle cx="-1" cy="-1" r="1.2" fill="#E896AA" />
                  </g>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
