import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { dbService, type AppDatabaseService } from "@/services/app-database";
import type { Girl, Question, OptionKey } from "@/types/database";

export function QuizPlay({
  token,
  customDb,
}: {
  token: string;
  customDb?: AppDatabaseService;
}) {
  const activeDb = customDb || dbService;
  const [girl, setGirl] = useState<Girl | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pickedKey, setPickedKey] = useState<OptionKey | null>(null);
  const [feedback, setFeedback] = useState<"idle" | "wrong_1" | "wrong_2_reveal" | "correct">("idle");
  const [loading, setLoading] = useState(true);

  // State cho việc nhập mã thử thách
  const [inputCode, setInputCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const TEST_CODES = [
    { label: "Lan Chi", token: "lanchi_2010" },
    { label: "Thu Hà", token: "thuha_2010" },
    { label: "Phương Thảo", token: "thao_hust" },
    { label: "GDGoC Test", token: "GDGOC2010" },
  ];

  useEffect(() => {
    let resolvedToken = token;
    if (!resolvedToken && typeof localStorage !== "undefined") {
      resolvedToken = localStorage.getItem("active_girl_token") || "";
    }

    if (resolvedToken) {
      loadGirlByToken(resolvedToken);
    }
    setLoading(false);
  }, [token, activeDb]);

  function loadGirlByToken(userToken: string) {
    const clean = userToken.trim();
    if (!clean) return;

    let found = activeDb.getGirlByToken(clean);
    if (!found) {
      // Khi chưa có Supabase, tự động khởi tạo profile test cho token này
      found = activeDb.getOrCreateGirl(clean);
    }

    setGirl(found);
    const list = activeDb.getQuestionsForGirl(found);
    setQuestions(list);
    setCurrentIndex(found.current_question_index || 0);

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("active_girl_token", found.token);
    }
  }

  function handleLoginWithCode(e?: React.FormEvent, customToken?: string) {
    if (e) e.preventDefault();
    const tokenToUse = customToken || inputCode;
    const clean = tokenToUse.trim();

    if (!clean) {
      setCodeError("Vui lòng nhập mã tham gia của bạn!");
      return;
    }

    setCodeError("");
    loadGirlByToken(clean);
  }

  function handleResetTest() {
    if (!girl) return;
    girl.current_question_index = 0;
    girl.wrong_attempts = 0;
    girl.stage = "quiz";
    activeDb.saveToStorage();
    setCurrentIndex(0);
    setFeedback("idle");
    setPickedKey(null);
  }

  function handleSwitchAccount() {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("active_girl_token");
    }
    setGirl(null);
    setInputCode("");
    setFeedback("idle");
    setPickedKey(null);
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#FFF5F7] flex items-center justify-center text-[#431936] text-sm">
        Đang tải thử thách...
      </div>
    );
  }

  // BƯỚC 1: BẤM VÀO THỬ THÁCH YÊU CẦU NHẬP MÃ TRƯỚC (CÓ SẴN CODE TẠM ĐỂ TEST)
  if (!girl) {
    return (
      <main className="w-full min-h-screen bg-gradient-to-b from-[#FFF5F7] via-[#FDE8EF] to-[#F7D5DF] text-[#381A2B] flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-[440px] rounded-3xl bg-[#FFFDFB] p-7 border border-pink-200/90 shadow-2xl text-center">
          {/* Icon Badge */}
          <div className="size-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center text-xl mx-auto mb-3 font-serif font-bold shadow-md shadow-pink-500/20">
            20/10
          </div>

          <span className="inline-block px-3 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold uppercase tracking-wider mb-1">
            Thử Thách Minigame
          </span>

          <h1 className="text-2xl font-bold font-serif text-[#431936] mt-1">
            Nhập Mã Tham Gia Thử Thách
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-xs mx-auto">
            Nhập mã cá nhân để giải 4 câu hỏi minigame và mở gợi ý nhận quà từ các bạn nam trên cây.
          </p>

          {/* Form nhập mã trực tiếp */}
          <form onSubmit={handleLoginWithCode} className="mt-5 space-y-3">
            {codeError && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                {codeError}
              </div>
            )}

            <div>
              <input
                type="text"
                autoFocus
                required
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value);
                  setCodeError("");
                }}
                placeholder="Nhập mã của bạn (VD: lanchi_2010, GDGOC2010...)"
                className="w-full h-11 px-4 rounded-xl border border-pink-200 bg-white font-mono text-xs text-slate-800 focus:outline-none focus:border-pink-500 shadow-sm placeholder:normal-case placeholder:font-sans placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-pink-500/25 transition-all active:scale-[0.98] cursor-pointer"
            >
              Vào Thử Thách →
            </button>
          </form>

          {/* KHỐI MÃ TẠM ĐỂ TEST KHI CHƯA CÓ SUPABASE */}
          <div className="mt-5 pt-4 border-t border-pink-100 text-left">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs">💡</span>
              <span className="text-[11px] font-semibold text-pink-800 uppercase tracking-wider">
                Mã test tạm thời (Chưa cần Supabase):
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-2.5">
              Bấm vào bất kỳ bạn nữ nào dưới đây để bắt đầu trải nghiệm ngay:
            </p>

            <div className="grid grid-cols-2 gap-2">
              {TEST_CODES.map((item) => (
                <button
                  key={item.token}
                  type="button"
                  onClick={() => handleLoginWithCode(undefined, item.token)}
                  className="p-2.5 rounded-xl bg-pink-50/80 hover:bg-pink-100/90 border border-pink-200/80 text-left transition-all active:scale-95 cursor-pointer group"
                >
                  <div className="text-xs font-bold text-[#431936] group-hover:text-pink-700 flex items-center justify-between">
                    <span>🌸 {item.label}</span>
                    <span className="text-[10px] text-pink-400">→</span>
                  </div>
                  <div className="text-[10px] font-mono text-pink-600 mt-0.5">
                    {item.token}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // NẾU ĐÃ LÀM XONG 4 CÂU HỎI
  const isFinished = girl.stage === "completed" || currentIndex >= questions.length;

  if (isFinished) {
    return (
      <main className="w-full min-h-screen bg-gradient-to-b from-[#FFF5F7] via-[#FDE8EF] to-[#F7D5DF] text-[#381A2B] flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-[440px] rounded-3xl bg-[#FFFDFB] p-6 sm:p-7 border border-pink-200/80 shadow-xl shadow-pink-900/5 text-center">
          <div className="size-16 rounded-full bg-pink-100/80 border border-pink-200 flex items-center justify-center text-pink-600 mx-auto mb-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider mb-2">
            Đã Hoàn Thành Thử Thách
          </span>

          <h1 className="text-2xl font-bold font-serif text-[#431936] mt-1">
            Chúc mừng {girl.name}!
          </h1>
          <p className="text-xs text-[#826A73] mt-2 leading-relaxed">
            Bạn đã xuất sắc vượt qua toàn bộ {questions.length} thử thách! Dưới đây là manh mối để bạn tìm các bạn nam nhận mã mở quà trên cây:
          </p>

          {/* Danh sách 4 manh mối */}
          <div className="my-5 space-y-2 text-left">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-3.5 rounded-2xl bg-pink-50/70 border border-pink-100 text-xs text-[#381A2B] leading-relaxed"
              >
                <span className="font-bold text-pink-700 block mb-0.5">
                  Gợi ý {idx + 1}:
                </span>
                {q.clue}
              </div>
            ))}
          </div>

          <div className="space-y-2.5">
            <Link
              to="/boy"
              search={{ token: girl.token }}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transition-all no-underline active:scale-95 cursor-pointer"
            >
              <span>Tới Cây Lời Chúc mở quà</span>
            </Link>

            <div className="flex items-center justify-between text-xs pt-1 px-1">
              <button
                type="button"
                onClick={handleResetTest}
                className="text-pink-600 hover:underline cursor-pointer"
              >
                Làm lại thử thách (Test)
              </button>
              <button
                type="button"
                onClick={handleSwitchAccount}
                className="text-slate-500 hover:underline cursor-pointer"
              >
                Đổi mã khác
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const currentQuestion = questions[currentIndex];

  function handlePickOption(key: OptionKey) {
    if (feedback === "correct" || feedback === "wrong_2_reveal") return;
    setPickedKey(key);

    const result = activeDb.submitQuizAnswer(girl!.token, currentIndex, key);
    setGirl(result.girl);

    if (result.correct) {
      setFeedback("correct");
      setTimeout(() => {
        setPickedKey(null);
        setFeedback("idle");
        setCurrentIndex(result.nextIndex);
      }, 900);
      return;
    }

    if (result.reveal) {
      // Sai lần 2: hiển thị đáp án đúng và cho bấm đi tiếp
      setFeedback("wrong_2_reveal");
      return;
    }

    // Sai lần 1: hiện đỏ cho chọn lại
    setFeedback("wrong_1");
  }

  function handleContinueAfterReveal() {
    const result = activeDb.advanceAfterReveal(girl!.token, currentIndex);
    setGirl(result.girl);
    setPickedKey(null);
    setFeedback("idle");
    setCurrentIndex(result.nextIndex);
  }

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#FFF5F7] via-[#FDE8EF] to-[#F7D5DF] text-[#381A2B] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[440px] rounded-3xl bg-[#FFFDFB] p-6 sm:p-7 border border-pink-200/80 shadow-xl shadow-pink-900/5">
        {/* Header tiến trình */}
        <div className="flex items-center justify-between text-xs text-[#826A73] mb-3">
          <span className="font-semibold text-pink-700">
            Câu hỏi {currentIndex + 1} / {questions.length}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#431936]">🌸 {girl.name}</span>
            <button
              type="button"
              onClick={handleSwitchAccount}
              className="text-[10px] text-pink-600 hover:underline cursor-pointer"
            >
              (Đổi mã)
            </button>
          </div>
        </div>

        {/* Thanh tiến trình bar */}
        <div className="w-full h-1.5 rounded-full bg-pink-100 overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Nội dung câu hỏi */}
        <h2 className="text-lg font-bold text-[#381A2B] leading-snug">
          {currentQuestion?.text}
        </h2>

        {/* Danh sách 4 lựa chọn */}
        <div className="mt-5 space-y-2.5">
          {currentQuestion?.options.map((option) => {
            const isPicked = pickedKey === option.key;
            const isRightKey = option.key.toLowerCase() === currentQuestion.correct_key.toLowerCase();

            let btnStyle = "bg-white border-pink-200/70 text-[#381A2B] hover:bg-pink-50/50 hover:border-pink-300 shadow-sm";
            let badgeStyle = "bg-pink-100/70 text-pink-700 font-bold border border-pink-200/60";

            if (feedback === "correct" && isRightKey) {
              btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 font-bold shadow-sm shadow-emerald-500/10";
              badgeStyle = "bg-emerald-600 text-white font-bold border-emerald-600";
            } else if (feedback === "wrong_2_reveal") {
              if (isRightKey) {
                btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 font-bold";
                badgeStyle = "bg-emerald-600 text-white font-bold border-emerald-600";
              } else if (isPicked) {
                btnStyle = "bg-red-50 border-red-300 text-red-900";
                badgeStyle = "bg-red-500 text-white font-bold border-red-500";
              }
            } else if (feedback === "wrong_1" && isPicked) {
              // Sai lần 1: HIỆN ĐỎ CHO CHỌN LẠI
              btnStyle = "bg-red-50 border-red-400 text-red-900 animate-shake";
              badgeStyle = "bg-red-500 text-white font-bold border-red-500";
            }

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => handlePickOption(option.key)}
                className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium flex items-center gap-3 transition-all cursor-pointer ${btnStyle}`}
              >
                <span className={`size-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${badgeStyle}`}>
                  {option.key.toUpperCase()}
                </span>
                <span className="flex-1 leading-snug">{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* THÔNG BÁO VÀ HÀNH ĐỘNG TIẾP THEO */}
        {feedback === "wrong_1" && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <span>Chưa chính xác rồi, bạn thử lại lần nữa nhé!</span>
          </div>
        )}

        {feedback === "wrong_2_reveal" && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2.5">
            <p className="leading-relaxed">
              Đã hết lượt thử. Đáp án đúng đã được tô màu xanh kèm manh mối bên dưới:
              <br />
              <strong className="text-amber-800">Gợi ý nhận diện:</strong> {currentQuestion?.clue}
            </p>
            <button
              type="button"
              onClick={handleContinueAfterReveal}
              className="w-full h-10 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 font-bold text-xs text-white shadow-md cursor-pointer"
            >
              Tiếp tục câu tiếp theo
            </button>
          </div>
        )}

        {feedback === "correct" && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-semibold flex items-center gap-2">
            <span>Chính xác! Đang chuyển câu tiếp theo...</span>
          </div>
        )}
      </div>
    </main>
  );
}
