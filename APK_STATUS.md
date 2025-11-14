# 📱 APK 構建狀態

## ✅ 已完成

1. ✅ **Capacitor 已安裝**
   - @capacitor/core
   - @capacitor/cli  
   - @capacitor/android

2. ✅ **Android 平台已添加**
   - `android/` 目錄已創建
   - 基本配置已完成

3. ✅ **Next.js 配置已更新**
   - 支持靜態導出模式
   - 圖片優化已禁用（APK 構建時）

4. ✅ **構建腳本已創建**
   - `build-apk.sh` - 自動化構建腳本
   - `npm run build:apk` - 構建命令
   - `npm run cap:sync` - 同步命令
   - `npm run cap:open:android` - 打開 Android Studio

## ⚠️ 需要處理

### 1. API 路由問題（重要！）

**問題：** Next.js API 路由無法在靜態 APK 中運行

**解決方案：**

#### 選項 A: 部署 API 到雲端（推薦）

```bash
# 使用 Vercel（最簡單）
npm i -g vercel
vercel

# 或使用其他服務：
# - AWS Lambda
# - Google Cloud Functions  
# - Heroku
# - Railway
```

部署後，在 `capacitor.config.ts` 設置：
```typescript
server: {
  url: 'https://your-deployed-api.vercel.app',
}
```

#### 選項 B: 使用本地開發伺服器

在開發時，可以指向本地伺服器：
```typescript
server: {
  url: 'http://YOUR_LOCAL_IP:3000',
  cleartext: true,
}
```

### 2. 需要安裝的軟件

- ⚠️ **Java JDK 11+**
  ```bash
  # macOS
  brew install openjdk@11
  ```

- ⚠️ **Android Studio**
  - 下載：https://developer.android.com/studio
  - 安裝 Android SDK (API 30+)

### 3. 環境變數設置

創建 `.env.local` 並設置：
```env
NEXT_PUBLIC_API_URL=https://your-api-server.com
```

## 🚀 下一步操作

### 步驟 1: 部署 API（必須）

選擇以下方式之一：

**A. Vercel 部署（推薦）**
```bash
npm i -g vercel
vercel
# 按照提示完成部署
```

**B. 其他雲服務**
- 將代碼推送到 GitHub
- 在服務提供商導入項目
- 設置環境變數
- 獲取部署 URL

### 步驟 2: 構建 APK

```bash
# 方法 1: 使用自動化腳本
./build-apk.sh

# 方法 2: 手動構建
npm run build:apk
npx cap sync android
npx cap open android
```

### 步驟 3: 在 Android Studio 中構建

1. 等待 Gradle 同步
2. `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
3. APK 位置：`android/app/build/outputs/apk/debug/app-debug.apk`

## 📝 當前狀態

- ✅ Capacitor 配置完成
- ✅ Android 平台已添加
- ✅ 構建腳本已準備
- ⚠️ 需要部署 API 伺服器
- ⚠️ 需要安裝 Android Studio
- ⚠️ 需要設置 API URL

## 🔗 相關文檔

- `APK_BUILD_GUIDE.md` - 完整構建指南
- `QUICK_APK_BUILD.md` - 快速開始指南
- `BUILD_APK.md` - 構建說明

## 💡 提示

如果只是測試，可以先：
1. 在本地運行 `npm run dev`
2. 在 `capacitor.config.ts` 設置 `server.url` 指向 `http://YOUR_IP:3000`
3. 構建 APK 進行測試

但生產環境必須部署 API 到雲端服務！

