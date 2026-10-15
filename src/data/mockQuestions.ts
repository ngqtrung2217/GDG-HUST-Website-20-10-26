import type { Question } from "@/features/quiz/types";

export const mockQuestions: Question[] = [
  {
    id: "q1",
    order: 1,
    text: "GDGoC-HUST thường gặp nhau ở đâu vào tối thứ Năm?",
    clue: "Tòa nhà gần hồ, tầng có máy pha cà phê.",
    correctKey: "b",
    options: [
      { key: "a", label: "Thư viện Tạ Quang Bửu, tầng 1" },
      { key: "b", label: "C2, phòng lab góc hành lang" },
      { key: "c", label: "Sân bóng sau D6" },
      { key: "d", label: "Quán trà sữa cổng chính" },
    ],
  },
  {
    id: "q2",
    order: 2,
    text: "Màu nào không nằm trong bộ nhận diện Google / GDG?",
    clue: "Nhìn lại logo bốn màu.",
    correctKey: "d",
    options: [
      { key: "a", label: "Xanh dương" },
      { key: "b", label: "Đỏ" },
      { key: "c", label: "Vàng" },
      { key: "d", label: "Tím than" },
    ],
  },
  {
    id: "q3",
    order: 3,
    text: "Ngày 20/10 năm nay, lời chúc được mở bằng gì?",
    clue: "Không phải mật khẩu Wi-Fi.",
    correctKey: "a",
    options: [
      { key: "a", label: "Mã bí mật các bạn nam đưa trực tiếp" },
      { key: "b", label: "Mã QR dán ở căng tin" },
      { key: "c", label: "Điểm danh trên email" },
      { key: "d", label: "Like bài viết fanpage" },
    ],
  },
];
