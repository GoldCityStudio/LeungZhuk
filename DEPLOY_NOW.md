# 🚀 立即部署指南

## 步驟 1: 登入 Vercel

在終端執行：

```bash
npx vercel login
```

然後：
1. 按 Enter 打開瀏覽器
2. 在瀏覽器中完成登入
3. 返回終端確認

## 步驟 2: 部署項目

登入完成後，執行：

```bash
npx vercel
```

按照提示：
- **Set up and deploy?** → 輸入 `Y`
- **Which scope?** → 選擇你的帳號
- **Link to existing project?** → 輸入 `N` (首次部署)
- **Project name?** → 按 Enter 使用默認名稱
- **Directory?** → 按 Enter 使用當前目錄
- **Override settings?** → 輸入 `N`

## 步驟 3: 設置環境變數

部署完成後，你會得到一個 URL（例如：`https://your-app.vercel.app`）

### 在 Vercel Dashboard 設置環境變數：

1. 訪問 https://vercel.com/dashboard
2. 選擇你的項目
3. 進入 **Settings** > **Environment Variables**
4. 添加以下變數：

```
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=https://your-app.vercel.app
```

**重要**: 將 `https://your-app.vercel.app` 替換為你的實際部署 URL！

### 更新本地環境變數

更新 `.env.local` 文件，添加：

```env
NEXT_PUBLIC_API_URL=https://your-app.vercel.app
```

## 步驟 4: 重新部署（應用環境變數）

在 Vercel Dashboard：
1. 進入 **Deployments**
2. 點擊最新部署旁邊的 **...** 菜單
3. 選擇 **Redeploy**

或在終端執行：

```bash
npx vercel --prod
```

## 步驟 5: 測試 API

訪問你的部署 URL，測試 API 是否正常工作：
- `https://your-app.vercel.app/api/products`
- `https://your-app.vercel.app/api/init`

## 步驟 6: 構建 APK

API 部署並測試成功後：

```bash
# 構建 APK
npm run cap:build:android

# 打開 Android Studio
npm run cap:open:android
```

## ⚠️ 常見問題

### 登入失敗
- 確保網絡連接正常
- 嘗試使用 `npx vercel login --github` 或 `npx vercel login --email`

### 部署失敗
- 檢查是否有語法錯誤：`npm run build`
- 確保所有依賴已安裝：`npm install`

### API 不工作
- 確認環境變數已設置
- 檢查 Vercel 部署日誌
- 確認 API 路由文件存在

## 📞 需要幫助？

如果遇到問題，請檢查：
1. Vercel 部署日誌
2. 瀏覽器控制台錯誤
3. 網絡連接




