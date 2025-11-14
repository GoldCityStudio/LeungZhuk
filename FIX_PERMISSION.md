# 🔧 修復 Firebase 權限問題

## 問題
```
Error: Failed to get Firebase project firebase-vertex-a-i-s-d-saybci
```

## 解決步驟

### 步驟 1: 登入 Firebase

在終端機執行：
```bash
firebase login
```

這會打開瀏覽器，登入你的 Google 帳號。

### 步驟 2: 確認登入成功

執行：
```bash
firebase projects:list
```

如果看到專案列表，表示登入成功。

### 步驟 3: 檢查專案訪問權限

如果 `firebase-vertex-a-i-s-d-saybci` 不在列表中：

**選項 A: 在 Firebase Console 檢查**
1. 打開：https://console.firebase.google.com
2. 查看專案列表
3. 確認 `firebase-vertex-a-i-s-d-saybci` 是否存在
4. 如果不存在，需要創建新專案或使用現有專案

**選項 B: 創建新專案**
```bash
firebase projects:create your-new-project-id
```

**選項 C: 使用現有專案**
```bash
firebase use your-existing-project-id
```

### 步驟 4: 更新 .firebaserc

如果使用不同的專案，更新 `.firebaserc`：
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

## 快速修復

如果專案不存在，最簡單的方法是：

1. 在 Firebase Console 創建新專案
2. 更新 `.firebaserc` 中的專案 ID
3. 重新部署

