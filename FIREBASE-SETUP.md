# Firebase Setup Guide

## 1. Tạo Firebase Project

1. Vào [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a new project"**
3. Nhập tên: `noel-greeting` (hoặc tên bạn muốn)
4. Chọn **Realtime Database**

## 2. Lấy Service Account Key

1. Vào **Project Settings** → **Service Accounts**
2. Click **"Generate New Private Key"**
3. Copy toàn bộ JSON (cứ lưu lại file này)

## 3. Cấu hình Render Environment Variables

1. Đăng nhập [Render Dashboard](https://dashboard.render.com)
2. Chọn Web Service của bạn
3. **Settings** → **Environment**
4. Thêm 2 biến:

```
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
FIREBASE_SERVICE_ACCOUNT_KEY=<paste entire JSON here>
```

**Ví dụ:**
```
FIREBASE_DATABASE_URL=https://noel-greeting-12345.firebaseio.com

FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"noel-greeting-12345","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...","client_email":"firebase-adminsdk-abc@noel-greeting-12345.iam.gserviceaccount.com"}
```

## 4. Local Development

Tạo file `.env` tại root:
```
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

Rồi chạy:
```bash
npm install
npm start
```

## 5. Kiểm tra Firebase Realtime Database Rules

Vào Firebase Console → Realtime Database → **Rules**

Sửa thành:
```json
{
  "rules": {
    "cards": {
      ".read": true,
      ".write": true
    }
  }
}
```

(Trong production, thay bằng authentication rules an toàn hơn)

## Fallback (Nếu Firebase không cấu hình)

App sẽ tự động dùng local file storage (`data/cards.json`). Khi redeploy trên Render, dữ liệu sẽ reset.
