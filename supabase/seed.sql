-- GDGoC HUST 20/10 - Seed Configuration (No demo recipients)

INSERT INTO groups (id, group_name, secret_code, group_access_code, wish_message)
VALUES (
  'grp_hust',
  'GDGoC HUST',
  '2010',
  'GDGOC2010',
  'Chúc toàn thể các bạn nữ GDGoC HUST ngày 20/10 luôn xinh đẹp, rạng rỡ và ngập tràn hạnh phúc!'
)
ON CONFLICT (id) DO NOTHING;
