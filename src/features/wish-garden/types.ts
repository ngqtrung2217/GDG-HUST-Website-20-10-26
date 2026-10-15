export type FlowerKind = "lotus" | "daisy" | "blossom" | "peach" | "sunflower" | "lantern" | "ema";

export interface Wish {
  id: string;
  boyId: string;
  boyName: string;
  recipient?: string;
  /** Demo fixture or custom passcode. */
  code: string;
  flower: FlowerKind;
  message: string;
  gift?: string;
  createdAt?: string;
  branchIndex?: number;
}

export interface Girl {
  id: string;
  name: string;
  email: string;
  token: string;
  group: string;
  quizDone: boolean;
  boyIds: string[];
}

export interface Boy {
  id: string;
  name: string;
  major: string;
  group: string;
}
