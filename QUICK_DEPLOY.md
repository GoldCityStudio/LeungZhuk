# ⚡ 快速部署和構建 APK

## 🎯 3 步完成部署

### 步驟 1: 部署 API 到 Vercel

```bash
# 安裝 Vercel CLI（如果還沒安裝）
npm i -g vercel

# 登入 Vercel
vercel login

# 部署項目
vercel
```

部署完成後，你會得到一個 URL，例如：`https://your-app.vercel.app`

### 步驟 2: 配置環境變數

更新 `.env.local` 文件：

```env
NEXT_PUBLIC_API_URL=https://your-app.vercel.app
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=https://your-app.vercel.app
```

**重要**: 在 Vercel Dashboard 中也要設置這些環境變數！

### 步驟 3: 構建 APK

```bash
# 構建並同步
npm run cap:build:android

# 打開 Android Studio
npm run cap:open:android
```

在 Android Studio 中：
1. 等待 Gradle 同步完成
2. `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
3. APK 位置：`android/app/build/outputs/apk/debug/app-debug.apk`

## 📋 完整命令列表

```bash
# 部署到 Vercel
vercel

# 構建 APK（完整流程）
npm run cap:build:android

# 或分步執行
npm run build:apk        # 構建靜態應用
npm run cap:sync         # 同步到 Android
npm run cap:open:android # 打開 Android Studio
```

## ⚠️ 重要提醒

1. **API 必須先部署**: APK 需要連接到遠程 API 服務器
2. **環境變數**: 確保在 Vercel 和本地都設置了正確的環境變數
3. **Firebase**: Firebase 認證在客戶端運行，不需要額外配置
4. **測試**: 部署後先在瀏覽器中測試 API 是否正常工作

## 🔧 故障排除

### API 請求失敗
- 檢查 `NEXT_PUBLIC_API_URL` 是否正確
- 確認 Vercel 部署成功
- 在瀏覽器中訪問 API 端點測試

### 構建錯誤
```bash
# 清理並重新構建
rm -rf .next out android
npm install
npm run build:apk
```

## 📚 詳細文檔

- `DEPLOY_GUIDE.md` - 完整部署指南
- `APK_BUILD_GUIDE.md` - APK 構建詳細說明
- `QUICK_APK_BUILD.md` - APK 快速構建指南




