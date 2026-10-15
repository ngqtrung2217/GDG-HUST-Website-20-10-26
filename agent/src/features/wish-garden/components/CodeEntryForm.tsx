import { useState } from "react";

export function CodeEntryForm({
  onSubmit,
  error,
}: {
  onSubmit: (code: string) => void;
  error: string;
}) {
  const [code, setCode] = useState("");

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (!code.trim()) return;
        onSubmit(code.trim());
        setCode("");
      }}
    >
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <input
            id="secret-code"
            value={code}
            onChange={(event) => setCode(event.target.value.toUpperCase())}
            autoComplete="off"
            placeholder="Nhập mã bí mật (VD: SEN, MAI, DAO...)"
            className="w-full h-12 rounded-2xl border border-line bg-cream/30 px-4 text-base font-mono uppercase tracking-wider text-ink placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:text-muted/60 focus:bg-paper focus:outline-none focus:ring-2 focus:ring-pink/40"
          />
        </div>
        <button
          type="submit"
          disabled={!code.trim()}
          className="flex items-center justify-center gap-2 h-12 px-7 rounded-2xl bg-gradient-to-r from-plum to-pink text-paper text-sm font-semibold shadow-md shadow-pink/20 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <span>🌸</span>
          <span>Mở Nụ Hoa</span>
        </button>
      </div>

      {error ? (
        <p className="text-xs sm:text-sm text-coral font-medium flex items-center gap-1.5" role="alert">
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      ) : (
        <p className="text-xs text-muted">
          Nhập mã từ bạn nam để đơm hoa và mở lá thư tương ứng trên Cây Nguyện Ước.
        </p>
      )}
    </form>
  );
}
