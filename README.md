# ABC Adventure World — Version 0.9.2

## Có gì mới trong Version 0.9.2

- Khi chưa chạm: chữ giữ kiểu chữ trang trí lớn, nhiều màu như mẫu giấy, không có tay chân/mắt/miệng.
- Khi giữ và kéo: mắt, miệng, tay, chân xuất hiện; nhân vật nhún, vẫy tay, bước chân và miệng chuyển động.
- Âm tên chữ cái tiếng Anh được lặp liên tục trong lúc giữ/kéo; dừng ngay khi nhả, thả sai hoặc hủy thao tác.
- Khi ghép đúng: đọc từ hoàn chỉnh, sau đó đọc một đoạn tình huống ngắn có chứa câu ví dụ của từ. Nội dung đoạn văn cũng hiện trong màn hình chúc mừng.

- **Một khu vực chữ cái duy nhất, thật lớn**: bỏ cách chia riêng sân 3D và khu vực chữ bên dưới; toàn bộ chữ mẫu và chữ để kéo nằm trên cùng một bảng giấy.
- **Bảng chữ kiểu giấy tập** lấy cảm hứng từ hình tham khảo: nền giấy ấm, các dòng kẻ nhẹ, từ mẫu viền mờ ở giữa, các chữ cái màu sắc bố trí xung quanh.
- **Chữ cái kéo thả được phóng lớn**: chữ chiếm phần lớn diện tích bảng; tự sắp xếp ở phía trên và dưới từ mẫu, co giãn theo màn hình PC và điện thoại.
- Chữ có họa tiết, viền nổi, bóng đổ và chuyển động nhún nhẹ; khi kéo, chữ đi theo con trỏ/ngón tay và ô đích được làm nổi bật.
- **Nhạc nền vui tươi nguyên bản** được tổng hợp trực tiếp bằng Web Audio API, không cần tải tệp nhạc bên ngoài. Nhạc tự bắt đầu sau thao tác đầu tiên của người chơi để tuân thủ giới hạn autoplay của trình duyệt.
- Có nút **Nhạc: Bật/Tắt**; lựa chọn được lưu trên thiết bị. Nhạc tự giảm âm lượng khi phát âm từ/câu để giọng đọc rõ hơn.
- Giữ nguyên **100 bài học**, nội dung Việt/Anh, lặp phát âm tên chữ cái trong suốt lúc giữ/kéo, đọc từ hoàn chỉnh và đoạn văn tình huống khi ghép đúng, gợi ý, sao thưởng, lưu tiến trình và PWA.
- Đổi tên cache Service Worker sang Version 0.9.2 để trình duyệt nhận biết bộ giao diện mới.

## Chạy thử trên Windows 10/11

1. Giải nén ZIP.
2. Mở thư mục `abc_adventure_web_v09` (thư mục chứa `index.html`).
3. Nhấp thanh địa chỉ File Explorer, nhập `cmd`, nhấn Enter.
4. Chạy:

   ```bash
   python -m http.server 8000
   ```

5. Mở Chrome tại `http://localhost:8000`.
6. Chạm/click lần đầu vào trang để cho phép nhạc nền bắt đầu. Dùng nút **♫ Nhạc: Bật/Tắt** để điều khiển nhạc.

## Cập nhật lên GitHub Pages

1. Giải nén ZIP.
2. Mở repository GitHub hiện tại.
3. Chọn **Add file → Upload files**.
4. Tải toàn bộ nội dung bên trong thư mục `abc_adventure_web_v09` lên thư mục gốc repository, ghi đè các tệp trùng tên.
5. Nếu GitHub hỏi về tệp trùng tên, xác nhận cập nhật; giữ nguyên thư mục `assets` và tải các tệp bên trong nếu có thay đổi.
6. Nhập commit message `Update ABC Adventure Version 0.9.2` rồi nhấn **Commit changes**.
7. Chờ Pages triển khai xong. Nếu trình duyệt còn bản cũ, tải lại cứng bằng `Ctrl + Shift + R`.

## Ghi chú về nhạc và ngoại tuyến

- Nhạc nền được tạo bằng Web Audio API nên không cần tệp MP3 và có thể chạy khi ngoại tuyến sau khi ứng dụng đã tải xong.
- Trình duyệt chặn tự phát âm thanh trước thao tác người dùng; vì vậy nhạc bắt đầu sau lần chạm/click đầu tiên, không phải ngay lúc vừa mở trang.
- Phát âm chữ/từ/câu sử dụng Speech Synthesis của trình duyệt và giọng tiếng Anh có sẵn trên thiết bị.
- Tiến trình học được lưu cục bộ trên từng trình duyệt/thiết bị, không tự đồng bộ giữa các thiết bị.

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


## Version 0.7 updates
- Larger letter characters and target slots for easier child interaction (responsive on desktop and mobile).
- Picking up a letter plays its English letter name once.
- Completing a word speaks the complete word followed by a short English example sentence.
- Service Worker cache name bumped to v0.7 to prevent old files being reused.


## Version 0.9.2 – English story reading
- The success dialog now displays the complete English mini-story.
- A readable IPA transcription is shown below the English paragraph.
- A dedicated button replays the English paragraph using the browser English voice.
- Service Worker cache name updated to force clients to fetch the new app files.
