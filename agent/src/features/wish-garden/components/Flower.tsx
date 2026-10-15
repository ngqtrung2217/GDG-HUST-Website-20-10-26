import type { FlowerKind } from "@/features/wish-garden/types";

interface FlowerProps {
  kind: FlowerKind;
  unlocked: boolean;
  label: string;
  onOpen?: () => void;
}

export function Flower({ kind, unlocked, label, onOpen }: FlowerProps) {
  const petal = kind === "lotus" ? "text-pink" : kind === "daisy" ? "text-coral" : "text-lavender";
  return (
    <button
      type="button"
      disabled={!unlocked}
      onClick={onOpen}
      aria-label={unlocked ? `Mở thư của ${label}` : `Nụ hoa của ${label} vẫn khóa`}
      className={
        "group flex w-28 flex-col items-center gap-2 border-0 bg-transparent p-1 disabled:cursor-default"
      }
    >
      <span
        className={
          "relative grid size-24 place-items-center " +
          (unlocked ? "drop-shadow-[0_0_16px_rgb(217_107_140_/_0.45)]" : "")
        }
      >
        <svg viewBox="0 0 80 80" className={`size-24 ${petal}`} aria-hidden="true">
          {unlocked ? <Bloom kind={kind} /> : <Bud />}
        </svg>
      </span>
      <span className="text-sm text-ink">{label}</span>
    </button>
  );
}

function Bud() {
  return (
    <>
      <path d="M40 70 C40 48 28 40 40 18 C52 40 40 48 40 70" fill="currentColor" className="text-bud" />
      <ellipse cx="40" cy="28" rx="10" ry="14" fill="#6b8f5a" />
      <ellipse cx="40" cy="26" rx="6" ry="9" fill="#8fb56f" />
    </>
  );
}

function Bloom({ kind }: { kind: FlowerKind }) {
  if (kind === "daisy") {
    return (
      <>
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="40"
            cy="22"
            rx="7"
            ry="14"
            fill="currentColor"
            transform={`rotate(${i * 45} 40 40)`}
          />
        ))}
        <circle cx="40" cy="40" r="8" fill="#f2c14e" />
        <path d="M40 52 v18" stroke="#3f6b4e" strokeWidth="3" />
      </>
    );
  }
  if (kind === "blossom") {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <ellipse
            key={i}
            cx="40"
            cy="20"
            rx="9"
            ry="16"
            fill="currentColor"
            transform={`rotate(${i * 72} 40 40)`}
          />
        ))}
        <circle cx="40" cy="40" r="6" fill="#fffaf3" />
        <path d="M40 50 v20" stroke="#3f6b4e" strokeWidth="3" />
      </>
    );
  }
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse
          key={i}
          cx="40"
          cy="24"
          rx="8"
          ry="16"
          fill="currentColor"
          opacity={0.85 - i * 0.05}
          transform={`rotate(${i * 30} 40 42)`}
        />
      ))}
      <circle cx="40" cy="42" r="5" fill="#f6e27a" />
      <path d="M40 52 v18" stroke="#3f6b4e" strokeWidth="3" />
    </>
  );
}
