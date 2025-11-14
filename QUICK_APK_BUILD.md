# 🚀 快速構建 APK 指南

## ⚡ 快速開始（3 步驟）

### 1. 安裝 Android Studio
下載並安裝：https://developer.android.com/studio

### 2. 構建並同步
```bash
npm run cap:build:android
```

### 3. 在 Android Studio 中構建 APK
```bash
npm run cap:open:android
```

然後在 Android Studio：
- `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`

## ⚠️ 重要：API 路由處理

**Next.js API 路由在 APK 中無法運行！**

### 解決方案：

#### 選項 A: 部署 API 到雲端（推薦）

1. **部署到 Vercel**（最簡單）：
   ```bash
   # 安裝 Vercel CLI
   npm i -g vercel
   
   # 部署
   vercel
   ```

2. **設置 API URL**：
   在 `capacitor.config.ts` 中設置：
   ```typescript
   server: {
     url: 'https://your-app.vercel.app',
   }
   ```

#### 選項 B: 使用本地開發伺服器

在 `capacitor.config.ts` 中：
```typescript
server: {
  url: 'http://YOUR_LOCAL_IP:3000', // 例如: http://192.168.1.100:3000
  cleartext: true,
}
```

## 📱 構建命令

```bash
# 完整構建流程
./build-apk.sh

# 或分步執行
npm run build:apk        # 構建靜態應用
npm run cap:sync         # 同步到 Android
npm run cap:open:android # 打開 Android Studio
```

## 📍 APK 輸出位置

構建完成後，APK 位於：
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 🎯 測試 APK

1. 將 APK 傳輸到 Android 設備
2. 在設備上啟用「未知來源」安裝
3. 安裝並測試

## 📚 詳細文檔

查看 `APK_BUILD_GUIDE.md` 獲取完整指南。

