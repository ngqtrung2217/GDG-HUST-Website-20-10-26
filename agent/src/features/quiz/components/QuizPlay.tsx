import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { dbService, type AppDatabaseService } from "@/services/app-database";
import type { Girl, Question, OptionKey } from "@/types/database";
import { GirlAccountModal } from "@/features/wish-garden/components/GirlAccountModal";

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
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    let resolvedToken = token;
    if (!resolvedToken && typeof localStorage !== "undefined") {
      resolvedToken = localStorage.getItem("active_girl_token") || "";
    }

    if (resolvedToken) {
      const found = activeDb.getGirlByToken(resolvedToken);
      if (found) {
        setGirl(found);
        const list = activeDb.getQuestionsForGirl(found);
        setQuestions(list);
        setCurrentIndex(found.current_question_index || 0);
      }
    }
    setLoading(false);
  }, [token, activeDb]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#FFF5F7] flex items-center justify-center text-[#431936] text-sm">
        Đang tải câu hỏi...
      </div>
    );
  }

  // Nếu chưa có token hoặc chưa tìm thấy bạn nữ
  if (!girl) {
    return (
      <main className="w-full min-h-screen bg-gradient-to-b from-[#FFF5F7] via-[#FDE8EF] to-[#F7D5DF] text-[#381A2B] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-[420px] rounded-3xl bg-[#FFFDFB] p-8 border border-pink-200 text-center shadow-xl">
          <div className="size-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-xl mx-auto mb-3 font-serif font-bold">
            20/10
          </div>
          <h1 className="text-xl font-bold font-serif text-[#431936]">Chào Mừng Bạn Nữ 20/10</h1>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Nhập mã tham gia hoặc tạo tài khoản để bắt đầu nhận quà nhé.
          </p>
          <button
            type="button"
            onClick={() => setIsRegisterOpen(true)}
            className="mt-6 w-full h-11 inline-flex items-center justify-center px-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-semibold shadow-md shadow-pink-500/20 cursor-pointer"
          >
            Bắt đầu minigame
          </button>
        </div>

        <GirlAccountModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onRegistered={(g: Girl) => {
            setGirl(g);
            const list = activeDb.getQuestionsForGirl(g);
            setQuestions(list);
            setCurrentIndex(g.current_question_index || 0);
          }}
        />
      </main>
    );
  }

  // NẾU BẠN NỮ ĐÃ LÀM XONG: LƯU LẠI VÀ KHI VÀO THÌ KHÔNG BẮT LÀM LẠI!
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
            Đã Hoàn Thành Minigame
          </span>
          <h1 className="text-2xl font-bold font-serif text-[#431936] mt-1">
            Chúc mừng {girl.name}!
          </h1>
          <p className="text-xs text-[#826A73] mt-2 leading-relaxed">
            Bạn đã vượt qua toàn bộ thử thách! Dưới đây là các gợi ý để bạn tìm các bạn nam nhận mã mở quà:
          </p>

          {/* Danh sách manh mối */}
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

          <Link
            to="/boy"
            search={{ token: girl.token }}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transition-all no-underline active:scale-95 cursor-pointer"
          >
            <span>Tới Cây Lời Chúc mở quà</span>
          </Link>
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
          <span className="font-medium text-[#431936]">Gửi tới: {girl.name}</span>
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
