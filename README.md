# ABC Adventure World — Version 0.6

## Có gì mới

- **100 bài học từ vựng**, chia thành 5 chủ đề, mỗi chủ đề 20 từ:
  1. Làm quen quanh em
  2. Thế giới động vật
  3. Đồ vật và phương tiện
  4. Thiên nhiên và thức ăn
  5. Cơ thể và hoạt động
- Mỗi bài có từ tiếng Anh, nghĩa tiếng Việt, emoji minh họa và phát âm.
- Tiến trình hiển thị theo tổng số 100 bài; trò chơi ghi nhớ bài hiện tại và số sao trên trình duyệt.
- **Ô chữ đích 3D phía sau được phóng lớn** (kích thước và khoảng cách tăng), chữ mẫu mờ rõ hơn.
- Các ô đáp án phía dưới cũng lớn hơn, dễ chạm/kéo trên điện thoại và máy tính bảng.
- Khi rê nhân vật lên ô đáp án, ô được làm nổi bật để trẻ dễ nhận biết vùng thả.
- Giữ nguyên cơ chế kéo thả đã có: nhân vật chữ cái có hoạt ảnh đi theo con trỏ; thả sai sẽ được nhắc thử lại; thả đúng sẽ đặt nhân vật vào vị trí.
- Tự điều chỉnh khoảng cách và tỷ lệ nhân vật theo độ dài từ, hỗ trợ từ tối đa 6 chữ cái trong bộ bài hiện tại.
- Giao diện VI/EN, phát âm bằng Speech Synthesis, gợi ý, sao thưởng, PWA và lưu tiến trình cục bộ.

## Chạy thử trên Windows 10/11

1. Giải nén ZIP.
2. Mở thư mục vừa giải nén, nơi có file `index.html`.
3. Nhấp thanh địa chỉ File Explorer, nhập `cmd`, nhấn Enter.
4. Chạy:

   ```bash
   python -m http.server 8000
   ```

5. Mở Chrome tại `http://localhost:8000/`.

Không mở `index.html` bằng cách nhấp đúp. ES Modules và Service Worker cần chạy qua máy chủ HTTP/HTTPS.

## Đưa lên GitHub Pages

1. Đăng nhập GitHub và tạo một repository mới, ví dụ `abc-adventure`.
2. Giải nén ZIP trên máy tính.
3. Mở thư mục `abc_adventure_web_v06`.
4. Tải **các tệp và thư mục bên trong** lên repository (không tải nguyên thư mục bọc bên ngoài).
   - `index.html`
   - `app.js`
   - `styles.css`
   - `sw.js`
   - `register-sw.js`
   - `manifest.webmanifest`
   - thư mục `assets`
   - `README.md` (không bắt buộc để game chạy)
5. Trong repository, mở **Settings → Pages**.
6. Ở **Build and deployment**, chọn **Deploy from a branch**.
7. Chọn branch `main`, folder `/ (root)`, rồi nhấn **Save**.
8. Đợi GitHub Pages hoàn tất triển khai. Mở URL GitHub Pages được hiển thị trong phần Pages.

### Lưu ý khi cập nhật phiên bản

- Mỗi lần cập nhật, tải đè các tệp mới lên repository và commit.
- Service Worker đã đổi tên cache sang `abc-adventure-v06-100-lessons-large-targets` để trình duyệt tạo cache mới.
- Sau khi triển khai, mở trang một lần khi có Internet. Nếu vẫn thấy phiên bản cũ, thử Ctrl + Shift + R hoặc xóa dữ liệu trang của website.
- GitHub Pages chạy trên HTTPS, phù hợp để mở game trên điện thoại.

## Ngoại tuyến và giới hạn

- Lần đầu cần Internet để tải Three.js từ jsDelivr và font 3D từ máy chủ Three.js.
- Service Worker cố gắng lưu ứng dụng và các tài nguyên ngoài vào cache sau khi tải thành công; khả năng ngoại tuyến phụ thuộc việc trình duyệt cho phép cache các tài nguyên đó.
- Phát âm ngoại tuyến phụ thuộc giọng đọc được cài trên thiết bị.
- Tiến trình được lưu trong `localStorage` của từng trình duyệt/thiết bị; không đồng bộ giữa các thiết bị và chưa có tài khoản người dùng.
- 100 bài hiện là hoạt động ghép từng chữ vào vị trí đúng, chưa bao gồm bài nghe-chọn, đánh vần tự do, câu hỏi hay hệ thống quản lý lớp học.
- Nhân vật 3D được tạo bằng hình học Three.js và hoạt ảnh lập trình, chưa phải mô hình 3D điêu khắc/rig chuyên nghiệp.

## Kiểm thử

Mã JavaScript được kiểm tra cú pháp và cấu trúc ZIP được kiểm tra. Cần kiểm thử tương tác thực tế trên Chrome máy tính và điện thoại trước khi phát hành công khai.
