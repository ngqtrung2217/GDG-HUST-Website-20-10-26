import type { Boy, Girl } from "@/features/wish-garden/types";

export const mockBoys: Boy[] = [
  { id: "b1", name: "Minh Anh", major: "KHMT K67", group: "Nhóm Sen" },
  { id: "b2", name: "Đức Huy", major: "KTMT K66", group: "Nhóm Sen" },
  { id: "b3", name: "Quang Khải", major: "KHDL K67", group: "Nhóm Mai" },
];

export const mockGirls: Girl[] = [
  {
    id: "g1",
    name: "Lan Chi",
    email: "lanchi@sis.hust.edu.vn",
    token: "lanchi_2010",
    group: "Nhóm Sen",
    quizDone: false,
    boyIds: ["b1", "b2", "b3"],
  },
  {
    id: "g2",
    name: "Hà My",
    email: "hamy@sis.hust.edu.vn",
    token: "my-2010",
    group: "Nhóm Mai",
    quizDone: true,
    boyIds: ["b3"],
  },
];
