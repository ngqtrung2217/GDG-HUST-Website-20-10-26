export interface Group {
  id: string;
  group_name: string;
  secret_code: string;
  group_access_code: string;
  wish_message: string;
  created_at: string;
}

export type OrnamentType =
  | "lotus"
  | "peach"
  | "rose"
  | "giftbox"
  | "snowglobe"
  | "ribbon"
  | "lantern"
  | "teddy"
  | "cookie";

export interface Boy {
  id: string;
  group_id: string;
  name: string;
  email?: string;
  description: string; // Manh mối đặc điểm nhận dạng cho minigame
  personal_wish: string;
  ornament_type: OrnamentType;
  gift_hint?: string;
  has_written_wish?: boolean;
}

export type GirlStage = "not_started" | "quiz" | "finding_boys" | "completed";

export interface Girl {
  id: string;
  group_id: string;
  name: string;
  email?: string;
  token: string;
  current_question_index: number;
  wrong_attempts: number;
  stage: GirlStage;
  completed_at?: string;
  unlocked_codes?: string[];
}

export type OptionKey = "a" | "b" | "c" | "d";

export interface Question {
  id: string;
  group_id?: string;
  boy_id?: string;
  text: string;
  options: {
    key: OptionKey;
    label: string;
  }[];
  correct_key: OptionKey;
  clue: string; // Manh mối về bạn nam
}

