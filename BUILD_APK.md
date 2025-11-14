# 如何編譯為 APK 檔案

## 📱 使用 Capacitor 將 Next.js 應用轉換為 Android APK

### 前置需求

1. **Node.js 18+** (已安裝)
2. **Java JDK 11+** (需要安裝)
3. **Android Studio** (需要安裝)
4. **Android SDK** (通過 Android Studio 安裝)

### 步驟 1: 安裝 Capacitor

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### 步驟 2: 初始化 Capacitor

```bash
npx cap init
```

當提示時：
- App name: `優質肉類專賣店`
- App ID: `com.meatshop.app`
- Web dir: `out` (Next.js 靜態輸出目錄)

### 步驟 3: 配置 Next.js 為靜態導出

由於 Next.js API 路由需要伺服器，我們需要：
1. 將 API 路由改為使用外部後端服務，或
2. 使用 Next.js 的靜態導出功能（僅前端）

### 步驟 4: 添加 Android 平台

```bash
npx cap add android
```

### 步驟 5: 構建並同步

```bash
npm run build
npx cap sync android
```

### 步驟 6: 在 Android Studio 中打開

```bash
npx cap open android
```

### 步驟 7: 在 Android Studio 中構建 APK

1. 打開 Android Studio
2. 等待 Gradle 同步完成
3. 點擊 `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
4. APK 將生成在 `android/app/build/outputs/apk/`

## ⚠️ 重要注意事項

1. **API 路由問題**: Next.js API 路由在移動應用中無法直接使用
   - 解決方案：將 API 部署到雲端服務（如 Vercel, AWS）
   - 或使用 Capacitor HTTP 插件調用遠程 API

2. **環境變數**: 需要在 Capacitor 配置中設置環境變數

3. **圖片優化**: Next.js Image 組件在移動應用中可能需要調整

## 🔄 替代方案

如果遇到問題，可以考慮：
- 使用 PWA (Progressive Web App) - 可以安裝到手機但不需要 APK
- 使用 React Native 重新構建（需要重寫代碼）
- 使用 WebView 包裝（簡單但性能較差）

