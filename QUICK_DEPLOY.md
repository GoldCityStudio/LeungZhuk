# ⚡ 快速部署指南

## 🔑 第一步：登入 Firebase

```bash
firebase login
```

這會打開瀏覽器，登入你的 Google 帳號。

## 🔧 第二步：設置環境變數

### 在 Firebase Console 設置（推薦）

1. 打開：https://console.firebase.google.com/project/firebase-vertex-a-i-s-d-saybci/functions/config
2. 點擊 **"Add variable"**
3. 添加：
   - **Name**: `STRIPE_SECRET_KEY`
   - **Value**: `your-stripe-secret-key-here` (從 Stripe Dashboard 獲取)
4. 點擊 **Save**

## 🚀 第三步：部署

```bash
cd /Users/dansoong/Desktop/eshop
firebase deploy --only functions:createPaymentIntent
```

## ✅ 第四步：重新構建 APK

```bash
npm run build:apk
npx cap sync android
cd android && ./gradlew assembleDebug
```

## 🎉 完成！

部署完成後，你的 APK 就可以使用付款功能了！

---

## ❓ 遇到問題？

### 錯誤：401 Unauthenticated
- 解決：執行 `firebase login` 重新登入

### 錯誤：Permission denied
- 解決：確保你的 Google 帳號有權限訪問 Firebase 專案

### 錯誤：Function not found
- 解決：檢查 `functions/src/index.ts` 中的函數名稱是否為 `createPaymentIntent`
