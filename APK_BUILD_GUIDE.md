# 📱 APK 構建完整指南

## ⚠️ 重要提示

Next.js 應用包含**伺服器端 API 路由**，這些在靜態 APK 中無法直接運行。您需要：

1. **將 API 部署到雲端服務**（推薦：Vercel, AWS, Heroku）
2. **設置 API URL** 環境變數指向您的後端服務
3. **構建靜態前端**並打包為 APK

## 📋 前置需求

### 必須安裝：
1. ✅ **Node.js 18+** (已安裝)
2. ⚠️ **Java JDK 11+** 
   ```bash
   # macOS
   brew install openjdk@11
   
   # 或下載：https://adoptium.net/
   ```

3. ⚠️ **Android Studio**
   - 下載：https://developer.android.com/studio
   - 安裝 Android SDK (通過 Android Studio)
   - 設置 ANDROID_HOME 環境變數

4. ⚠️ **Android SDK**
   - 通過 Android Studio SDK Manager 安裝
   - 至少安裝 Android 11 (API 30) 或更高版本

## 🚀 構建步驟

### 方法 1: 使用自動化腳本（推薦）

```bash
./build-apk.sh
```

### 方法 2: 手動構建

#### 步驟 1: 構建 Next.js 靜態應用

```bash
BUILD_APK=true npm run build
```

這會生成 `out/` 目錄，包含所有靜態文件。

#### 步驟 2: 同步 Capacitor

```bash
npx cap sync android
```

#### 步驟 3: 打開 Android Studio

```bash
npx cap open android
```

#### 步驟 4: 在 Android Studio 中構建 APK

1. 等待 Gradle 同步完成（首次可能需要幾分鐘）
2. 點擊頂部選單：`Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
3. 等待構建完成
4. 點擊通知中的 `locate` 查看 APK 位置

**APK 位置：**
- Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release APK: `android/app/build/outputs/apk/release/app-release.apk` (需要簽名)

## 🔧 配置 API 伺服器

### 選項 1: 部署到 Vercel（最簡單）

1. 將代碼推送到 GitHub
2. 在 Vercel 導入項目
3. 設置環境變數
4. 獲取部署 URL（例如：`https://your-app.vercel.app`）

### 選項 2: 設置環境變數

在 `capacitor.config.ts` 或構建時設置：

```typescript
// capacitor.config.ts
server: {
  url: 'https://your-api-server.com', // 您的 API 伺服器 URL
}
```

或在 `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-api-server.com
```

## 📝 構建 Release APK（用於發布）

### 1. 生成簽名密鑰

```bash
keytool -genkey -v -keystore meat-shop-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias meat-shop
```

### 2. 配置簽名

編輯 `android/app/build.gradle`:

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('path/to/meat-shop-key.jks')
            storePassword 'your-password'
            keyAlias 'meat-shop'
            keyPassword 'your-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            ...
        }
    }
}
```

### 3. 構建 Release APK

在 Android Studio:
- `Build` > `Generate Signed Bundle / APK`
- 選擇 APK
- 選擇簽名配置
- 構建

## 🐛 常見問題

### 問題 1: "Gradle sync failed"
- 確保已安裝 Java JDK 11+
- 檢查 Android SDK 是否正確安裝
- 嘗試：`File` > `Invalidate Caches / Restart`

### 問題 2: API 調用失敗
- 確保 API 伺服器已部署並可訪問
- 檢查 `NEXT_PUBLIC_API_URL` 環境變數
- 檢查網絡權限（AndroidManifest.xml）

### 問題 3: 圖片不顯示
- Next.js Image 組件在靜態導出中已設置為 `unoptimized`
- 確保圖片 URL 可訪問

### 問題 4: 構建時間過長
- 首次構建需要下載依賴，可能需要 10-20 分鐘
- 後續構建會更快

## 📦 快速命令參考

```bash
# 構建並同步
npm run cap:build:android

# 只同步
npm run cap:sync

# 打開 Android Studio
npm run cap:open:android

# 構建靜態應用
npm run build:apk
```

## 🎯 下一步

構建完成後：
1. 測試 APK 在 Android 設備上
2. 確保所有功能正常（特別是 API 調用）
3. 優化性能
4. 準備發布到 Google Play Store

## 📚 相關資源

- [Capacitor 文檔](https://capacitorjs.com/docs)
- [Android 開發指南](https://developer.android.com/docs)
- [Next.js 靜態導出](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

