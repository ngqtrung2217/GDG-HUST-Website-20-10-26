import type { Wish } from "@/features/wish-garden/types";

/** Demo fixtures for wishing tree. Can be unlocked with code or expanded with new letters. */
export const mockWishes: Wish[] = [
  {
    id: "w1",
    boyId: "b1",
    boyName: "Minh Anh",
    recipient: "Các bạn nữ GDGoC",
    code: "SEN",
    flower: "lotus",
    gift: "Một bookmark giấy dó handmade",
    message:
      "Cảm ơn bạn vì những buổi debug đến khuya mà vẫn luôn nở nụ cười. Chúc bạn một ngày 20/10 thật nhẹ nhàng, hạnh phúc và chúc cho mọi pull request trong cuộc sống của bạn luôn xanh mướt!",
  },
  {
    id: "w2",
    boyId: "b2",
    boyName: "Đức Huy",
    recipient: "Lan Anh & Ban Sự Kiện",
    code: "MAI",
    flower: "blossom",
    gift: "Ly giữ nhiệt in sticker GDG HUST",
    message:
      "Bạn luôn là người chu đáo nhớ deadline và lo lắng cho cả nhóm. Hôm nay hãy để mọi người nhớ và chăm sóc bạn một chút nhé! Chúc một năm học ngập tràn năng lượng và ấm áp.",
  },
  {
    id: "w3",
    boyId: "b3",
    boyName: "Quang Khải",
    recipient: "Phương Thảo",
    code: "DAO",
    flower: "daisy",
    gift: "Hộp bánh quy bơ nướng thơm lừng",
    message:
      "Không cần hoa mỹ, chỉ muốn nhắn rằng bạn rất giỏi, rất đáng yêu và cây nguyện ước này luôn có một góc rực rỡ dành riêng cho bạn. Chúc bạn 20/10 thật nhiều niềm vui nhé!",
  },
  {
    id: "w4",
    boyId: "b4",
    boyName: "Tuấn Kiệt",
    recipient: "Tất cả các bạn nữ K66-K68",
    code: "LAN",
    flower: "peach",
    gift: "Một chậu sen đá mini để bàn",
    message:
      "Gửi tới những bông hoa xinh đẹp nhất của HUST! Chúc các bạn luôn giữ vững niềm đam mê công nghệ, tự tin tỏa sáng và luôn được yêu thương mỗi ngày.",
  },
  {
    id: "w5",
    boyId: "b5",
    boyName: "Hoàng Nam",
    recipient: "Team Thiết Kế & Truyền Thông",
    code: "CUC",
    flower: "sunflower",
    gift: "Voucher trà sữa 100% đường ngọt ngào",
    message:
      "Cảm ơn những ấn phẩm tuyệt đẹp và nụ cười rạng rỡ của các bạn trong mọi sự kiện. Chúc 20/10 nhận được thật nhiều hoa tươi và những điều ngọt ngào nhất!",
  },
];
