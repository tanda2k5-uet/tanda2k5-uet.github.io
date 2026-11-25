# HienLab Website

Website tĩnh (HTML / CSS / JS thuần) giới thiệu dịch vụ thiết kế mạch PCB, lập trình nhúng và tự động hóa PLC — tối ưu để đăng miễn phí trên **GitHub Pages** và gắn tên miền miễn phí từ **GitHub Student Developer Pack** (`.me` / `.tech`) để xác minh **ChatGPT Business Hub**.

## 1. Đổi thông tin cá nhân (30 giây)
Mở file `config.js` và sửa các dòng sau:
- `brandName`: Tên thương hiệu (ví dụ `HienLab`)
- `domain`: Tên miền bạn lấy từ GitHub Student Pack (ví dụ `hienlab.me`)
- `email`, `phoneDisplay`, `zaloUrl`, `githubUrl`

*(Nhớ đổi luôn `https://hienlab.me` trong `robots.txt` và `sitemap.xml` thành tên miền thật của bạn).*

## 2. Đẩy web lên GitHub Pages (Miễn phí)
1. Tạo 1 repository mới trên GitHub (chế độ **Public**), ví dụ tên `hienlab-website`.
2. Tải toàn bộ các file trong thư mục này lên repository.
3. Vào **Settings -> Pages**:
   - Mục **Source**: chọn `Deploy from a branch`.
   - Mục **Branch**: chọn `main` và thư mục `/ (root)` -> bấm **Save**.
4. Đợi ~1 phút là web đã chạy miễn phí tại `https://<username>.github.io/hienlab-website/`.

## 3. Gắn tên miền miễn phí từ GitHub Student Pack
1. Vào [education.github.com/pack](https://education.github.com/pack) -> đăng nhập tài khoản GitHub đã duyệt Student Pack -> lấy ưu đãi tên miền **`.me` (Namecheap)** hoặc **`.tech`**.
2. Trong phần **Advanced DNS** của Namecheap (hoặc nhà cung cấp bạn chọn), thêm 4 bản ghi `A` trỏ về GitHub Pages:
   - `A` | Host `@` | Value `185.199.108.153`
   - `A` | Host `@` | Value `185.199.109.153`
   - `A` | Host `@` | Value `185.199.110.153`
   - `A` | Host `@` | Value `185.199.111.153`
   - `CNAME` | Host `www` | Value `<username>.github.io`
3. Quay lại GitHub repo -> **Settings -> Pages -> Custom domain** -> nhập tên miền của bạn (vd: `hienlab.me`) -> bấm **Save** và bật **Enforce HTTPS**.

## 4. Xác minh tên miền trên ChatGPT Business Hub
1. Quay lại `https://chatgpt.com/business-hub` -> chọn **Thông qua trang web** -> nhập tên miền của bạn (`https://hienlab.me`).
2. ChatGPT sẽ cấp 1 bản ghi **DNS loại `TXT`** (gồm `Host/Name` và `Value`).
3. Vào lại **Advanced DNS** của Namecheap -> bấm **Add New Record** -> chọn **`TXT Record`** -> dán `Host` và `Value` -> bấm lưu.
4. Đợi 5–15 phút rồi quay lại ChatGPT bấm **Verify**.
