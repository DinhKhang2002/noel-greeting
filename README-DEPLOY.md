# Hướng dẫn Deploy App lên Netlify + Render

## Kiến trúc Deploy

- **Frontend**: Deploy lên Netlify (static site)
- **Backend**: Deploy lên Render (hoặc Railway) (Node.js server)

---

## Bước 1: Deploy Backend lên Render

### 1.1. Chuẩn bị

1. Đẩy code lên GitHub (nếu chưa có):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

### 1.2. Tạo Web Service trên Render

1. Đăng nhập vào [Render.com](https://render.com)
2. Chọn **"New +"** → **"Web Service"**
3. Kết nối với GitHub repo của bạn
4. Cấu hình:
   - **Name**: `christmas-card-api` (hoặc tên bạn muốn)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: `18` hoặc `20`

5. Click **"Create Web Service"**

6. Sau khi deploy thành công, bạn sẽ có URL backend, ví dụ:
   ```
   https://christmas-card-api.onrender.com
   ```

### 1.3. Lưu URL Backend

Copy URL backend này để dùng ở bước deploy frontend.

---

## Bước 2: Deploy Frontend lên Netlify

### 2.1. Cấu hình Environment Variable

1. Đăng nhập vào [Netlify](https://netlify.com)
2. Tạo site mới:
   - Chọn **"Add new site"** → **"Import an existing project"**
   - Kết nối với GitHub repo của bạn

3. Cấu hình Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. Thêm Environment Variable:
   - Vào **Site settings** → **Environment variables**
   - Thêm biến:
     - **Key**: `VITE_API_BASE`
     - **Value**: URL backend từ Render (ví dụ: `https://christmas-card-api.onrender.com`)

### 2.2. Deploy

1. Netlify sẽ tự động build và deploy khi bạn push code lên GitHub
2. Hoặc click **"Deploy site"** để deploy ngay

3. Sau khi deploy thành công, bạn sẽ có URL frontend, ví dụ:
   ```
   https://your-app-name.netlify.app
   ```

### 2.3. Cập nhật Backend CORS (nếu cần)

Nếu backend bị lỗi CORS, sửa `server/index.mjs`:

```javascript
app.use(cors({
  origin: [
    'https://your-app-name.netlify.app',
    'http://localhost:5173' // cho dev
  ]
}))
```

---

## Bước 3: Test

1. Mở URL frontend trên Netlify
2. Tạo một thiệp mới
3. Scan QR code → Kiểm tra xem slideshow có chạy đúng không

---

## Lưu ý

- **Backend trên Render**: Free tier có thể sleep sau 15 phút không hoạt động. Lần request đầu tiên sau khi sleep có thể chậm (~30s).
- **File uploads**: Files được lưu trong `uploads/` trên server. Nếu server restart, files vẫn còn (trừ khi xóa thủ công).
- **Database**: Hiện tại dùng file JSON `data/cards.json`. Nếu cần scale, nên chuyển sang database thật (PostgreSQL, MongoDB, etc.).

---

## Troubleshooting

### Frontend không gọi được API

- Kiểm tra `VITE_API_BASE` trong Netlify environment variables
- Kiểm tra CORS settings trong backend
- Kiểm tra console browser để xem lỗi cụ thể

### Backend không start được

- Kiểm tra logs trên Render dashboard
- Đảm bảo `package.json` có script `"start": "node server/index.mjs"`
- Kiểm tra Node version (nên dùng 18 hoặc 20)

### Ảnh upload không hiển thị

- Kiểm tra backend có serve static files từ `uploads/` không
- Kiểm tra URL ảnh trong response API có đúng format không
