import type { Group, Boy, Girl, Question, OptionKey, OrnamentType } from "@/types/database";
import { supabase } from "@/services/supabase";

export interface DatabaseState {
  groups: Group[];
  boys: Boy[];
  girls: Girl[];
  questions: Question[];
}

const DEFAULT_GROUPS: Group[] = [
  {
    id: "grp_hust",
    group_name: "GDGoC HUST",
    secret_code: "2010",
    group_access_code: "GDGOC2010",
    wish_message: "Chúc toàn thể các bạn nữ GDGoC HUST ngày 20/10 luôn xinh đẹp, rạng rỡ và ngập tràn hạnh phúc!",
    created_at: "2026-10-15T00:00:00.000Z",
  },
];

const DEFAULT_BOYS: Boy[] = [
  {
    id: "boy_1",
    group_id: "grp_hust",
    name: "Minh Anh",
    email: "minhanh@hust.edu.vn",
    description: "Bạn nam Core Team Tech đeo kính gọng đen, hay mặc áo khoác nỉ xám, ngồi bàn 3 tầng 2 Thư viện Tạ Quang Bửu.",
    personal_wish: "Cảm ơn bạn vì những buổi chạy dự án đến khuya mà vẫn luôn tràn đầy năng lượng. Chúc bạn 20/10 thật nhẹ nhàng, bình an và luôn cười tươi nhé!",
    ornament_type: "lotus",
    gift_hint: "Một bookmark giấy dó thủ công kèm kẹp tóc xinh xắn",
    has_written_wish: true,
  },
  {
    id: "boy_2",
    group_id: "grp_hust",
    name: "Đức Huy",
    email: "duchuy@hust.edu.vn",
    description: "Bạn nam cao ráo, đeo đồng hồ thông minh màu cam, balo có móc khóa GDG HUST.",
    personal_wish: "Bạn luôn chu đáo nhớ lịch deadline cho cả nhóm. Hôm nay hãy để mọi người chăm sóc và gửi tặng bạn những điều ngọt ngào nhất nha. Chúc bạn 20/10 ấm áp!",
    ornament_type: "giftbox",
    gift_hint: "Ly giữ nhiệt khắc tên GDGoC HUST",
    has_written_wish: true,
  },
  {
    id: "boy_3",
    group_id: "grp_hust",
    name: "Quang Khải",
    email: "quangkhai@hust.edu.vn",
    description: "Bạn nam hay mang theo bình nước màu xanh mint trà đào, nụ cười rất duyên.",
    personal_wish: "Chúc bạn 20/10 ngập tràn niềm vui! Bạn luôn rất giỏi giang, nhiệt huyết và đáng yêu trong mắt mọi người.",
    ornament_type: "peach",
    gift_hint: "Hộp bánh quy bơ nướng hạnh nhân thơm ngon",
    has_written_wish: true,
  },
  {
    id: "boy_4",
    group_id: "grp_hust",
    name: "Tuấn Kiệt",
    email: "tuankiet@hust.edu.vn",
    description: "Bạn nam có giọng nói trầm ấm, hay ngồi ở sảnh nhà C7, tay hay gõ phím cơ switch êm.",
    personal_wish: "Chúc các bạn nữ luôn giữ vững ngọn lửa đam mê công nghệ, tự tin tỏa sáng và luôn được trân quý mỗi ngày.",
    ornament_type: "snowglobe",
    gift_hint: "Một chậu sen đá mini để bàn làm việc",
    has_written_wish: true,
  },
  {
    id: "boy_5",
    group_id: "grp_hust",
    name: "Hoàng Nam",
    email: "hoangnam@hust.edu.vn",
    description: "Bạn nam Media Lead, thường cầm máy ảnh Canon màu đen có dán sticker Google Developer.",
    personal_wish: "Nụ cười rạng rỡ của bạn luôn tiếp thêm năng lượng tích cực cho cả team. Chúc bạn 20/10 thật nhiều hoa, quà và kỷ niệm đáng nhớ nhé!",
    ornament_type: "teddy",
    gift_hint: "Voucher trà sữa ngọt ngào",
    has_written_wish: true,
  },
];

const DEFAULT_GIRLS: Girl[] = [
  {
    id: "girl_1",
    group_id: "grp_hust",
    name: "Lan Chi",
    email: "lanchi@sis.hust.edu.vn",
    token: "lanchi_2010",
    current_question_index: 0,
    wrong_attempts: 0,
    stage: "not_started",
    unlocked_codes: [],
  },
  {
    id: "girl_2",
    group_id: "grp_hust",
    name: "Thu Hà",
    email: "thuha@sis.hust.edu.vn",
    token: "thuha_2010",
    current_question_index: 0,
    wrong_attempts: 0,
    stage: "not_started",
    unlocked_codes: [],
  },
  {
    id: "girl_3",
    group_id: "grp_hust",
    name: "Phương Thảo",
    email: "phuongthao@sis.hust.edu.vn",
    token: "thao_hust",
    current_question_index: 0,
    wrong_attempts: 0,
    stage: "not_started",
    unlocked_codes: [],
  },
];

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: "q_1",
    group_id: "grp_hust",
    boy_id: "boy_1",
    text: "Trên fanpage GDG on Campus HUST, sự kiện công nghệ thường niên quy mô lớn nhất vào mỗi dịp mùa thu được cộng đồng mong đợi nhất có tên là gì?",
    options: [
      { key: "a", label: "DevFest Hanoi / DevFest HUST" },
      { key: "b", label: "Google I/O Extended HUST" },
      { key: "c", label: "TechCamp Bách Khoa" },
      { key: "d", label: "HUST Hackathon Autumn" },
    ],
    correct_key: "a",
    clue: "Gợi ý: Bạn Minh Anh Core Team Tech, đeo kính gọng đen, hay mặc áo khoác nỉ xám, ngồi bàn 3 tầng 2 Thư viện Tạ Quang Bửu.",
  },
  {
    id: "q_2",
    group_id: "grp_hust",
    boy_id: "boy_2",
    text: "Cuộc thi lập trình toàn cầu thường niên do Google tổ chức dành cho sinh viên nhằm giải quyết 17 Mục tiêu Phát triển Bền vững của Liên Hợp Quốc mà CLB phát động là gì?",
    options: [
      { key: "a", label: "Google Summer of Code" },
      { key: "b", label: "Google Solution Challenge" },
      { key: "c", label: "Google Code Jam" },
      { key: "d", label: "Google Kick Start" },
    ],
    correct_key: "b",
    clue: "Gợi ý: Bạn Đức Huy dáng người cao ráo, đeo đồng hồ thông minh màu cam, balo có móc khóa GDG HUST.",
  },
  {
    id: "q_3",
    group_id: "grp_hust",
    boy_id: "boy_3",
    text: "Trước khi đổi nhận diện thương hiệu theo chuẩn Google toàn cầu vào năm 2024, câu lạc bộ trên Facebook từng có tên gọi quen thuộc là gì?",
    options: [
      { key: "a", label: "GDSC HUST (Google Developer Student Clubs - HUST)" },
      { key: "b", label: "Google Club Bách Khoa" },
      { key: "c", label: "Student Developer Hub HUST" },
      { key: "d", label: "Google Tech Association HUST" },
    ],
    correct_key: "a",
    clue: "Gợi ý: Bạn Quang Khải hay mang bình nước màu xanh mint trà đào, nụ cười rất tươi và có duyên.",
  },
  {
    id: "q_4",
    group_id: "grp_hust",
    boy_id: "boy_4",
    text: "Khẩu hiệu (motto) quen thuộc xuất hiện trong các bài đăng truyền cảm hứng của GDG on Campus HUST thể hiện tinh thần đồng đội cùng tiến bước là gì?",
    options: [
      { key: "a", label: "Together we grow - Build good things together" },
      { key: "b", label: "Code your dream, change your world" },
      { key: "c", label: "Move fast and break things" },
      { key: "d", label: "Think different, do better" },
    ],
    correct_key: "a",
    clue: "Gợi ý: Bạn Tuấn Kiệt có giọng nói trầm ấm, hay ngồi ở sảnh nhà C7 với chiếc bàn phím cơ gõ êm.",
  },
];

export interface AppDatabaseOptions {
  storageKey?: string;
  isMemoryOnly?: boolean;
  enableSupabase?: boolean;
}

export class AppDatabaseService {
  private state: DatabaseState;
  private storageKey: string;
  private isMemoryOnly: boolean;
  private enableSupabase: boolean;

  constructor(options?: AppDatabaseOptions) {
    this.storageKey = options?.storageKey || "bloom_2010_database_v6";
    this.isMemoryOnly = Boolean(options?.isMemoryOnly);
    this.enableSupabase = Boolean(options?.enableSupabase);
    this.state = this.loadFromStorage();

    if (this.enableSupabase && supabase.isConfigured()) {
      this.syncFromSupabase();
    }
  }

  private loadFromStorage(): DatabaseState {
    if (this.isMemoryOnly || typeof localStorage === "undefined") {
      return {
        groups: JSON.parse(JSON.stringify(DEFAULT_GROUPS)),
        boys: JSON.parse(JSON.stringify(DEFAULT_BOYS)),
        girls: JSON.parse(JSON.stringify(DEFAULT_GIRLS)),
        questions: JSON.parse(JSON.stringify(DEFAULT_QUESTIONS)),
      };
    }
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return {
          groups: JSON.parse(JSON.stringify(DEFAULT_GROUPS)),
          boys: JSON.parse(JSON.stringify(DEFAULT_BOYS)),
          girls: JSON.parse(JSON.stringify(DEFAULT_GIRLS)),
          questions: JSON.parse(JSON.stringify(DEFAULT_QUESTIONS)),
        };
      }
      const parsed = JSON.parse(raw) as DatabaseState;
      if (parsed.questions) {
        parsed.questions = parsed.questions.filter((q) => q.id !== "q_5");
      }
      return parsed;
    } catch {
      return {
        groups: JSON.parse(JSON.stringify(DEFAULT_GROUPS)),
        boys: JSON.parse(JSON.stringify(DEFAULT_BOYS)),
        girls: JSON.parse(JSON.stringify(DEFAULT_GIRLS)),
        questions: JSON.parse(JSON.stringify(DEFAULT_QUESTIONS)),
      };
    }
  }

  public saveToStorage(): void {
    if (this.isMemoryOnly || typeof localStorage === "undefined") return;
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
  }

  /**
   * Đồng bộ dữ liệu 2 chiều từ Supabase nếu có cấu hình
   */
  public async syncFromSupabase(): Promise<boolean> {
    if (!this.enableSupabase || !supabase.isConfigured()) return false;

    try {
      const [remoteGroups, remoteBoys, remoteGirls, remoteQuestions] = await Promise.all([
        supabase.from<Group>("groups"),
        supabase.from<Boy>("boys"),
        supabase.from<Girl>("girls"),
        supabase.from<Question>("questions"),
      ]);

      let changed = false;
      if (remoteGroups && remoteGroups.length > 0) {
        this.state.groups = remoteGroups;
        changed = true;
      }
      if (remoteBoys && remoteBoys.length > 0) {
        this.state.boys = remoteBoys;
        changed = true;
      }
      if (remoteGirls && remoteGirls.length > 0) {
        this.state.girls = remoteGirls;
        changed = true;
      }
      if (remoteQuestions && remoteQuestions.length > 0) {
        this.state.questions = remoteQuestions;
        changed = true;
      }

      if (changed) {
        this.saveToStorage();
      }
      return true;
    } catch (err) {
      console.warn("[AppDatabase] Sync with Supabase error:", err);
      return false;
    }
  }

  public isUsingSupabase(): boolean {
    return this.enableSupabase && supabase.isConfigured();
  }

  public getGirlByToken(token: string): Girl | null {
    const clean = token.trim();
    if (!clean) return null;
    return this.state.girls.find((g) => g.token === clean) || null;
  }

  public getQuestionsForGirl(girl: Girl): Question[] {
    const groupQuestions = this.state.questions.filter(
      (q) => !q.group_id || q.group_id === girl.group_id
    );
    return groupQuestions.length > 0 ? groupQuestions : this.state.questions;
  }

  public submitQuizAnswer(
    token: string,
    questionIndex: number,
    pickedKey: OptionKey
  ): {
    correct: boolean;
    wrong_attempts: number;
    reveal: boolean;
    nextIndex: number;
    completed: boolean;
    clue?: string;
    girl: Girl;
  } {
    const girl = this.getGirlByToken(token);
    if (!girl) {
      throw new Error("Không tìm thấy bạn nữ với mã token này");
    }

    const questions = this.getQuestionsForGirl(girl);
    const question = questions[questionIndex];
    if (!question) {
      throw new Error("Không tìm thấy câu hỏi này");
    }

    const isCorrect = pickedKey.toLowerCase() === question.correct_key.toLowerCase();

    if (isCorrect) {
      girl.wrong_attempts = 0;
      const nextIndex = questionIndex + 1;
      const completed = nextIndex >= questions.length;
      girl.current_question_index = nextIndex;
      if (completed) {
        girl.stage = "completed";
        girl.completed_at = new Date().toISOString();
      } else {
        girl.stage = "quiz";
      }
      this.saveToStorage();

      if (this.isUsingSupabase()) {
        supabase.update<Girl>("girls", `token=eq.${girl.token}`, {
          current_question_index: girl.current_question_index,
          wrong_attempts: 0,
          stage: girl.stage,
          completed_at: girl.completed_at,
        });
      }

      return {
        correct: true,
        wrong_attempts: 0,
        reveal: false,
        nextIndex,
        completed,
        clue: question.clue,
        girl: { ...girl },
      };
    } else {
      girl.wrong_attempts += 1;
      const reveal = girl.wrong_attempts >= 2;
      this.saveToStorage();

      if (this.isUsingSupabase()) {
        supabase.update<Girl>("girls", `token=eq.${girl.token}`, {
          wrong_attempts: girl.wrong_attempts,
        });
      }

      return {
        correct: false,
        wrong_attempts: girl.wrong_attempts,
        reveal,
        nextIndex: questionIndex,
        completed: false,
        clue: reveal ? question.clue : undefined,
        girl: { ...girl },
      };
    }
  }

  public advanceAfterReveal(token: string, questionIndex: number): {
    nextIndex: number;
    completed: boolean;
    girl: Girl;
  } {
    const girl = this.getGirlByToken(token);
    if (!girl) throw new Error("Không tìm thấy bạn nữ");

    const questions = this.getQuestionsForGirl(girl);
    girl.wrong_attempts = 0;
    const nextIndex = questionIndex + 1;
    const completed = nextIndex >= questions.length;
    girl.current_question_index = nextIndex;
    if (completed) {
      girl.stage = "completed";
      girl.completed_at = new Date().toISOString();
    }
    this.saveToStorage();

    if (this.isUsingSupabase()) {
      supabase.update<Girl>("girls", `token=eq.${girl.token}`, {
        current_question_index: girl.current_question_index,
        wrong_attempts: 0,
        stage: girl.stage,
        completed_at: girl.completed_at,
      });
    }

    return { nextIndex, completed, girl: { ...girl } };
  }

  public loginBoy(accessCode: string): {
    success: boolean;
    group?: Group;
    boys?: Boy[];
    assignedGirls?: Girl[];
  } {
    const clean = accessCode.trim().toUpperCase();
    const group = this.state.groups.find(
      (g) => g.group_access_code.toUpperCase() === clean
    );
    if (!group) return { success: false };

    const boys = this.state.boys.filter((b) => b.group_id === group.id);
    const assignedGirls = this.state.girls.filter((g) => g.group_id === group.id);
    return { success: true, group, boys, assignedGirls };
  }

  public updateBoyWish(
    boyId: string,
    personalWish: string,
    ornamentType?: OrnamentType,
    giftHint?: string
  ): boolean {
    const boy = this.state.boys.find((b) => b.id === boyId);
    if (!boy) return false;

    boy.personal_wish = personalWish.trim();
    if (ornamentType) boy.ornament_type = ornamentType;
    if (giftHint) boy.gift_hint = giftHint.trim();
    boy.has_written_wish = true;
    this.saveToStorage();

    if (this.isUsingSupabase()) {
      supabase.update<Boy>("boys", `id=eq.${boy.id}`, {
        personal_wish: boy.personal_wish,
        ornament_type: boy.ornament_type,
        gift_hint: boy.gift_hint,
        has_written_wish: true,
      });
    }

    return true;
  }

  public verifySecretCode(
    code: string,
    girlToken?: string
  ): {
    success: boolean;
    group?: Group;
    boys?: Boy[];
  } {
    const clean = code.trim().toUpperCase();
    const group = this.state.groups.find((g) => g.secret_code.toUpperCase() === clean);
    if (!group) return { success: false };

    const boys = this.state.boys.filter((b) => b.group_id === group.id);

    if (girlToken) {
      const girl = this.getGirlByToken(girlToken);
      if (girl) {
        const unlocked = new Set(girl.unlocked_codes || []);
        unlocked.add(group.secret_code);
        girl.unlocked_codes = [...unlocked];
        this.saveToStorage();

        if (this.isUsingSupabase()) {
          supabase.update<Girl>("girls", `token=eq.${girl.token}`, {
            unlocked_codes: girl.unlocked_codes,
          });
        }
      }
    }

    return { success: true, group, boys };
  }

  public getTreeData(girlToken?: string, preferredGroupId?: string) {
    let activeGroup: Group | null = null;
    let girl: Girl | null = null;

    if (preferredGroupId) {
      activeGroup = this.state.groups.find((g) => g.id === preferredGroupId) || null;
    }

    if (!activeGroup && girlToken) {
      girl = this.getGirlByToken(girlToken);
      if (girl) {
        const girlGroupId = girl.group_id;
        activeGroup = this.state.groups.find((g) => g.id === girlGroupId) || null;
      }
    }

    if (!activeGroup && this.state.groups.length > 0) {
      activeGroup = this.state.groups[0];
    }

    const groupBoys = activeGroup
      ? this.state.boys.filter((b) => b.group_id === activeGroup.id)
      : this.state.boys;

    const isUnlocked = Boolean(
      girl &&
      girl.unlocked_codes &&
      activeGroup &&
      girl.unlocked_codes.includes(activeGroup.secret_code)
    );

    return {
      group: activeGroup,
      groups: this.state.groups,
      boys: groupBoys,
      allBoys: this.state.boys,
      isUnlocked,
      girl,
    };
  }

  public getState(): DatabaseState {
    return this.state;
  }

  public addGroup(name: string, secretCode: string, accessCode: string, wishMessage: string): Group {
    const group: Group = {
      id: `grp_${Date.now()}`,
      group_name: name.trim(),
      secret_code: secretCode.trim().toUpperCase(),
      group_access_code: accessCode.trim().toUpperCase(),
      wish_message: wishMessage.trim(),
      created_at: new Date().toISOString(),
    };
    this.state.groups.push(group);
    this.saveToStorage();

    if (this.isUsingSupabase()) {
      supabase.insert<Group>("groups", group);
    }
    return group;
  }

  public addBoy(groupId: string, name: string, email: string, description: string, wish: string, gift: string): Boy {
    const boy: Boy = {
      id: `boy_${Date.now()}`,
      group_id: groupId,
      name: name.trim(),
      email: email.trim(),
      description: description.trim(),
      personal_wish: wish.trim(),
      gift_hint: gift.trim(),
      ornament_type: "lotus",
      has_written_wish: true,
    };
    this.state.boys.push(boy);
    this.saveToStorage();

    if (this.isUsingSupabase()) {
      supabase.insert<Boy>("boys", boy);
    }
    return boy;
  }

  public addGirl(groupId: string, name: string, email: string, token: string): Girl {
    const girl: Girl = {
      id: `girl_${Date.now()}`,
      group_id: groupId,
      name: name.trim(),
      email: email.trim(),
      token: token.trim(),
      current_question_index: 0,
      wrong_attempts: 0,
      stage: "not_started",
      unlocked_codes: [],
    };
    this.state.girls.push(girl);
    this.saveToStorage();

    if (this.isUsingSupabase()) {
      supabase.insert<Girl>("girls", girl);
    }
    return girl;
  }

  public addQuestion(groupId: string, text: string, options: { key: OptionKey; label: string }[], correctKey: OptionKey, clue: string): Question {
    const question: Question = {
      id: `q_${Date.now()}`,
      group_id: groupId,
      text: text.trim(),
      options,
      correct_key: correctKey,
      clue: clue.trim(),
    };
    this.state.questions.push(question);
    this.saveToStorage();

    if (this.isUsingSupabase()) {
      supabase.insert<Question>("questions", question);
    }
    return question;
  }

  public resetGirlProgress(token: string): boolean {
    const girl = this.getGirlByToken(token);
    if (!girl) return false;
    girl.current_question_index = 0;
    girl.wrong_attempts = 0;
    girl.stage = "not_started";
    girl.unlocked_codes = [];
    delete girl.completed_at;
    this.saveToStorage();

    if (this.isUsingSupabase()) {
      supabase.update<Girl>("girls", `token=eq.${girl.token}`, {
        current_question_index: 0,
        wrong_attempts: 0,
        stage: "not_started",
        unlocked_codes: [],
        completed_at: undefined,
      });
    }
    return true;
  }

  public completeGirlQuiz(token: string): boolean {
    const girl = this.getGirlByToken(token);
    if (!girl) return false;
    const questions = this.getQuestionsForGirl(girl);
    girl.current_question_index = questions.length;
    girl.wrong_attempts = 0;
    girl.stage = "completed";
    girl.completed_at = new Date().toISOString();
    this.saveToStorage();

    if (this.isUsingSupabase()) {
      supabase.update<Girl>("girls", `token=eq.${girl.token}`, {
        current_question_index: questions.length,
        wrong_attempts: 0,
        stage: "completed",
        completed_at: girl.completed_at,
      });
    }
    return true;
  }

  public setGirlUnlocked(token: string, secretCode: string, unlocked: boolean): boolean {
    const girl = this.getGirlByToken(token);
    if (!girl) return false;
    const current = new Set(girl.unlocked_codes || []);
    if (unlocked) {
      current.add(secretCode.toUpperCase());
    } else {
      current.delete(secretCode.toUpperCase());
    }
    girl.unlocked_codes = [...current];
    this.saveToStorage();

    if (this.isUsingSupabase()) {
      supabase.update<Girl>("girls", `token=eq.${girl.token}`, {
        unlocked_codes: girl.unlocked_codes,
      });
    }
    return true;
  }

  public deleteBoy(boyId: string): boolean {
    const initialLen = this.state.boys.length;
    this.state.boys = this.state.boys.filter((b) => b.id !== boyId);
    if (this.state.boys.length !== initialLen) {
      this.saveToStorage();
      if (this.isUsingSupabase()) {
        supabase.delete("boys", `id=eq.${boyId}`);
      }
      return true;
    }
    return false;
  }

  public resetDatabase(): void {
    this.state = {
      groups: JSON.parse(JSON.stringify(DEFAULT_GROUPS)),
      boys: JSON.parse(JSON.stringify(DEFAULT_BOYS)),
      girls: JSON.parse(JSON.stringify(DEFAULT_GIRLS)),
      questions: JSON.parse(JSON.stringify(DEFAULT_QUESTIONS)),
    };
    this.saveToStorage();
  }
}

/**
 * Main production service:
 * Integrates with Supabase backend when VITE_SUPABASE_URL is configured,
 * with resilient persistent fallback.
 */
export const dbService = new AppDatabaseService({
  storageKey: "bloom_2010_database_main",
  enableSupabase: true,
  isMemoryOnly: false,
});
