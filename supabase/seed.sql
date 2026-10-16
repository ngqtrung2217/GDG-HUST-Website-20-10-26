-- GDGoC HUST 20/10 - Seed Data

INSERT INTO groups (id, group_name, secret_code, group_access_code, wish_message)
VALUES (
  'grp_hust',
  'GDGoC HUST',
  '2010',
  'GDGOC2010',
  'Chúc toàn thể các bạn nữ GDGoC HUST ngày 20/10 luôn xinh đẹp, rạng rỡ và ngập tràn hạnh phúc!'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO boys (id, group_id, name, email, token, secret_code, description, personal_wish, ornament_type, gift_hint, has_written_wish, assigned_girl_id, assigned_girl_name)
VALUES
(
  'boy_1',
  'grp_hust',
  'Minh Anh',
  'minhanh@hust.edu.vn',
  'minhanh_2010',
  'SEN',
  'Bạn nam Core Team Tech đeo kính gọng đen, hay mặc áo khoác nỉ xám, ngồi bàn 3 tầng 2 Thư viện Tạ Quang Bửu.',
  'Cảm ơn bạn vì những buổi chạy dự án đến khuya mà vẫn luôn tràn đầy năng lượng. Chúc bạn 20/10 thật nhẹ nhàng, bình an và luôn cười tươi nhé!',
  'lotus',
  'Một bookmark giấy dó thủ công kèm kẹp tóc xinh xắn',
  true,
  'girl_1',
  'Lan Chi'
),
(
  'boy_2',
  'grp_hust',
  'Đức Huy',
  'duchuy@hust.edu.vn',
  'duchuy_2010',
  'MAI',
  'Bạn nam cao ráo, đeo đồng hồ thông minh màu cam, balo có móc khóa GDG HUST.',
  'Bạn luôn chu đáo nhớ lịch deadline cho cả nhóm. Hôm nay hãy để mọi người chăm sóc và gửi tặng bạn những điều ngọt ngào nhất nha. Chúc bạn 20/10 ấm áp!',
  'giftbox',
  'Ly giữ nhiệt khắc tên GDGoC HUST',
  true,
  'girl_2',
  'Thu Hà'
),
(
  'boy_3',
  'grp_hust',
  'Quang Khải',
  'quangkhai@hust.edu.vn',
  'quangkhai_2010',
  'DAO',
  'Bạn nam hay mang theo bình nước màu xanh mint trà đào, nụ cười rất duyên.',
  'Chúc bạn 20/10 ngập tràn niềm vui! Bạn luôn rất giỏi giang, nhiệt huyết và đáng yêu trong mắt mọi người.',
  'peach',
  'Hộp bánh quy bơ nướng hạnh nhân thơm ngon',
  true,
  'girl_3',
  'Phương Thảo'
),
(
  'boy_4',
  'grp_hust',
  'Tuấn Kiệt',
  'tuankiet@hust.edu.vn',
  'tuankiet_2010',
  'LAN',
  'Bạn nam có giọng nói trầm ấm, hay ngồi ở sảnh nhà C7, tay hay gõ phím cơ switch êm.',
  'Chúc các bạn nữ luôn giữ vững ngọn lửa đam mê công nghệ, tự tin tỏa sáng và luôn được trân quý mỗi ngày.',
  'snowglobe',
  'Một chậu sen đá mini để bàn làm việc',
  true,
  'girl_1',
  'Lan Chi'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO girls (id, group_id, name, email, token, current_question_index, wrong_attempts, stage, unlocked_codes, assigned_boy_id, assigned_boy_name)
VALUES
(
  'girl_1',
  'grp_hust',
  'Lan Chi',
  'lanchi.hust@gmail.com',
  'lanchi_2010',
  0,
  0,
  'not_started',
  '[]'::jsonb,
  'boy_1',
  'Minh Anh'
),
(
  'girl_2',
  'grp_hust',
  'Thu Hà',
  'thuha.gdg@gmail.com',
  'thuha_2010',
  0,
  0,
  'not_started',
  '[]'::jsonb,
  'boy_2',
  'Đức Huy'
),
(
  'girl_3',
  'grp_hust',
  'Phương Thảo',
  'phuongthao.sis@hust.edu.vn',
  'thao_hust',
  0,
  0,
  'not_started',
  '[]'::jsonb,
  'boy_3',
  'Quang Khải'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO questions (id, group_id, boy_id, question_type, text, options, correct_key, clue)
VALUES
(
  'q_1',
  'grp_hust',
  'boy_1',
  'multiple_choice',
  'Trên fanpage GDG on Campus HUST, sự kiện công nghệ thường niên quy mô lớn nhất vào mỗi dịp mùa thu được cộng đồng mong đợi nhất có tên là gì?',
  '[{"key": "a", "label": "DevFest Hanoi / DevFest HUST"}, {"key": "b", "label": "Google I/O Extended"}, {"key": "c", "label": "Solution Challenge Workshop"}, {"key": "d", "label": "Hackathon Autumn"}]'::jsonb,
  'a',
  'Gợi ý: Bạn Minh Anh Core Team Tech đeo kính gọng đen, hay ngồi bàn 3 tầng 2 Thư viện Tạ Quang Bửu.'
),
(
  'q_2',
  'grp_hust',
  'boy_2',
  'multiple_choice',
  'Cuộc thi lập trình toàn cầu thường niên do Google tổ chức dành cho sinh viên nhằm giải quyết 17 Mục tiêu Phát triển Bền vững của Liên Hợp Quốc mà CLB phát động là gì?',
  '[{"key": "a", "label": "Google Summer of Code"}, {"key": "b", "label": "Solution Challenge"}, {"key": "c", "label": "Hash Code"}, {"key": "d", "label": "Kick Start"}]'::jsonb,
  'b',
  'Gợi ý: Bạn Đức Huy cao ráo, đeo đồng hồ thông minh màu cam và balo có móc khóa GDG.'
),
(
  'q_3',
  'grp_hust',
  'boy_3',
  'multiple_choice',
  'Trước khi đổi nhận diện thương hiệu theo chuẩn Google toàn cầu vào năm 2024, câu lạc bộ trên Facebook từng có tên gọi quen thuộc là gì?',
  '[{"key": "a", "label": "GDSC HUST (Google Developer Student Clubs - HUST)"}, {"key": "b", "label": "Google Student Community HUST"}, {"key": "c", "label": "HUST Developer Club"}, {"key": "d", "label": "Google Tech Club BK"}]'::jsonb,
  'a',
  'Gợi ý: Bạn Quang Khải hay mang theo bình nước màu xanh mint trà đào, nụ cười rất duyên.'
),
(
  'q_4',
  'grp_hust',
  'boy_4',
  'multiple_choice',
  'Khẩu hiệu (motto) quen thuộc xuất hiện trong các bài đăng truyền cảm hứng của GDG on Campus HUST thể hiện tinh thần đồng đội cùng tiến bước là gì?',
  '[{"key": "a", "label": "Together we grow - Build good things together"}, {"key": "b", "label": "Code the future"}, {"key": "c", "label": "Innovate every day"}, {"key": "d", "label": "Connecting youth"}]'::jsonb,
  'a',
  'Gợi ý: Bạn Tuấn Kiệt có giọng nói trầm ấm, hay ngồi ở sảnh nhà C7 với chiếc bàn phím cơ gõ êm.'
),
(
  'q_5',
  'grp_hust',
  'boy_1',
  'boolean',
  'GDG on Campus HUST là cộng đồng sinh viên công nghệ được thành lập và hoạt động dưới sự bảo trợ của Google Developers tại Đại học Bách Khoa Hà Nội, đúng hay sai?',
  '[{"key": "a", "label": "Đúng (Chính xác)"}, {"key": "b", "label": "Sai"}]'::jsonb,
  'a',
  'Gợi ý: Hãy tìm gặp các bạn nam Core Team để cùng chia sẻ niềm vui 20/10 và nhận mã bí mật nhé!'
)
ON CONFLICT (id) DO NOTHING;

