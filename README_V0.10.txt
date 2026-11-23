ABC ADVENTURE WORLD – VERSION 0.10

Mục tiêu: tăng độ ổn định trên iPadOS Safari/Chrome, đồng thời giữ nguyên Android và Windows.

ĐÃ CẬP NHẬT
1. Chuẩn hóa kết thúc kéo thả; xử lý pointercancel, lostpointercapture, mất focus và chuyển tab. Hủy thao tác sẽ trả chữ về vị trí ban đầu thay vì cố thả vào ô.
2. Tăng cường touch-action:none, chống cuộn/chạm giữ văn bản trong khu vực chơi và hỗ trợ safe-area của iPad.
3. Tạo Speech Manager: chọn giọng theo ngôn ngữ, làm mới danh sách voice khi voiceschanged, resume speech engine, quản lý hàng đợi và timeout để tránh kẹt.
4. Giảm tần suất đọc lặp chữ trong lúc kéo để tránh cancel/speak liên tục trên WebKit.
5. Tạo cơ chế hybrid: ưu tiên MP3 thu sẵn nếu được khai báo trong RECORDED_AUDIO; nếu thiếu/lỗi thì dùng Web Speech của thiết bị.
6. Phục hồi AudioContext khi trang quay lại foreground và cho phép mở khóa âm thanh bằng tương tác người dùng.
7. Cập nhật Service Worker cache version để tránh dùng mã cũ sau khi triển khai.

LƯU Ý QUAN TRỌNG VỀ ÂM THANH
ZIP này CHƯA chứa các bản ghi MP3 thu âm sẵn. Phần hybrid đã có cơ chế nạp MP3 và fallback, nhưng hiện tại nếu chưa bổ sung file ghi âm thì game vẫn dùng giọng đọc của thiết bị. Xem audio/README.md để thêm bản ghi.

KIỂM THỬ
Đã kiểm tra cú pháp JavaScript và cấu trúc ZIP ở môi trường build. Chưa có thiết bị iPad vật lý trong môi trường này, vì vậy không thể xác nhận thực nghiệm Safari/Chrome iPadOS. Cần chạy checklist trên README.md sau khi tải lên GitHub Pages.

CHẠY LOCAL
Mở thư mục chứa index.html, chạy: python -m http.server 8000
Sau đó mở http://localhost:8000
