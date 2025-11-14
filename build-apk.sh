#!/bin/bash

# Build APK Script for Meat Shop Ecommerce App

echo "🚀 開始構建 APK..."

# Step 1: Build Next.js app for static export
echo "📦 步驟 1: 構建 Next.js 靜態應用..."
BUILD_APK=true npm run build

if [ $? -ne 0 ]; then
    echo "❌ Next.js 構建失敗"
    exit 1
fi

# Step 2: Sync with Capacitor
echo "🔄 步驟 2: 同步 Capacitor..."
npx cap sync android

if [ $? -ne 0 ]; then
    echo "❌ Capacitor 同步失敗"
    exit 1
fi

echo "✅ 構建完成！"
echo ""
echo "📱 下一步："
echo "1. 打開 Android Studio: npx cap open android"
echo "2. 在 Android Studio 中："
echo "   - 等待 Gradle 同步完成"
echo "   - 點擊 Build > Build Bundle(s) / APK(s) > Build APK(s)"
echo "   - APK 將生成在: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "⚠️  注意：API 路由需要單獨部署到伺服器"
echo "   設置 NEXT_PUBLIC_API_URL 環境變數指向您的 API 伺服器"

