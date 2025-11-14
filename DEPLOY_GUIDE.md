# 🚀 部署和 APK 構建指南

## 📋 概述

本指南將幫助你：
1. 部署 API 到雲端（Vercel）
2. 配置應用以使用遠程 API
3. 構建 Android APK

## 步驟 1: 部署 API 到 Vercel

### 1.1 安裝 Vercel CLI

```bash
npm i -g vercel
```

### 1.2 登入 Vercel

```bash
vercel login
```

### 1.3 部署項目

在項目根目錄執行：

```bash
vercel
```

按照提示：
- 選擇項目設置（或創建新項目）
- 確認框架設置（Next.js）
- 確認環境變數

### 1.4 設置環境變數

在 Vercel Dashboard 中設置以下環境變數：

```
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=https://your-app.vercel.app
```

### 1.5 獲取部署 URL

部署完成後，你會得到一個 URL，例如：
```
https://your-app.vercel.app
```

## 步驟 2: 配置應用使用遠程 API

### 2.1 更新環境變數

在項目根目錄創建或更新 `.env.local`：

```env
# API URL (Vercel 部署 URL)
NEXT_PUBLIC_API_URL=https://your-app.vercel.app

# Stripe Keys (從 Stripe Dashboard 獲取)
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=https://your-app.vercel.app
```

### 2.2 更新 Capacitor 配置（可選）

如果你想讓 APK 直接連接到遠程 API，可以更新 `capacitor.config.ts`：

```typescript
server: {
  url: 'https://your-app.vercel.app',
}
```

## 步驟 3: 構建 APK

### 3.1 安裝必要軟件

- **Java JDK 11+**
- **Android Studio**: https://developer.android.com/studio

### 3.2 構建靜態應用

```bash
npm run build:apk
```

這會：
- 構建 Next.js 靜態版本
- 輸出到 `out/` 目錄

### 3.3 同步到 Android

```bash
npm run cap:sync
```

### 3.4 打開 Android Studio

```bash
npm run cap:open:android
```

### 3.5 在 Android Studio 中構建 APK

1. 等待 Gradle 同步完成
2. 點擊 `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
3. 等待構建完成

### 3.6 找到 APK 文件

APK 文件位於：
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 步驟 4: 測試 APK

1. 將 APK 傳輸到 Android 設備
2. 在設備上啟用「未知來源」安裝
3. 安裝並測試應用

## 🔧 故障排除

### API 請求失敗

確保：
- `NEXT_PUBLIC_API_URL` 設置正確
- Vercel 部署成功
- API 路由在 Vercel 上正常工作

### Firebase 認證問題

Firebase 認證在客戶端運行，應該不需要額外配置。確保：
- Firebase 配置正確
- 網絡連接正常

### 構建錯誤

如果遇到構建錯誤：
1. 清理構建緩存：`rm -rf .next out android`
2. 重新安裝依賴：`npm install`
3. 重新構建：`npm run build:apk`

## 📝 注意事項

1. **數據持久化**: 當前使用 JSON 文件存儲，在 Vercel 上可能不持久。考慮使用數據庫（如 MongoDB、PostgreSQL）

2. **環境變數**: 確保所有敏感信息都設置在 Vercel 環境變數中，不要提交到代碼庫

3. **API 限制**: Vercel 免費版有請求限制，生產環境可能需要升級

4. **測試**: 在構建 APK 前，先在瀏覽器中測試部署的應用

## 🎯 快速命令參考

```bash
# 部署到 Vercel
vercel

# 構建 APK
npm run cap:build:android

# 打開 Android Studio
npm run cap:open:android

# 完整流程
npm run build:apk && npm run cap:sync && npm run cap:open:android
```




