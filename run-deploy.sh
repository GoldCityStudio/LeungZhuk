#!/bin/bash

echo "🚀 Firebase Function 部署助手"
echo "================================"
echo ""

# 檢查 Firebase CLI
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI 未安裝"
    echo "請執行: npm install -g firebase-tools"
    exit 1
fi

# 檢查登入狀態
echo "📋 檢查 Firebase 登入狀態..."
if firebase projects:list &>/dev/null 2>&1; then
    echo "✅ 已登入 Firebase"
    LOGGED_IN=true
else
    echo "❌ 未登入 Firebase"
    echo ""
    echo "請執行以下命令登入："
    echo "  firebase login"
    echo ""
    echo "這會打開瀏覽器，登入你的 Google 帳號。"
    echo ""
    read -p "已登入？(y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "請先執行 'firebase login' 後再繼續。"
        exit 1
    fi
    LOGGED_IN=true
fi

# 構建 Function
echo ""
echo "📋 構建 Function..."
cd functions
if npm run build; then
    echo "✅ Function 構建成功"
else
    echo "❌ Function 構建失敗"
    exit 1
fi
cd ..

# 提醒設置環境變數
echo ""
echo "⚠️  重要：請確保已在 Firebase Console 設置 STRIPE_SECRET_KEY"
echo "   連結: https://console.firebase.google.com/project/firebase-vertex-a-i-s-d-saybci/functions/config"
echo ""
read -p "已設置環境變數？(y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "請先設置環境變數："
    echo "1. 打開: https://console.firebase.google.com/project/firebase-vertex-a-i-s-d-saybci/functions/config"
    echo "2. 點擊 'Add variable'"
    echo "3. Name: STRIPE_SECRET_KEY"
    echo "4. Value: (從 Stripe Dashboard 獲取你的 Secret Key)"
    echo "5. 點擊 Save"
    exit 1
fi

# 部署
echo ""
echo "📋 部署 Function..."
echo ""
firebase deploy --only functions:createPaymentIntent

echo ""
echo "✅ 完成！"
echo ""
echo "📝 下一步："
echo "1. 記下上方的 Function URL"
echo "2. 重新構建 APK: npm run build:apk && npx cap sync android && cd android && ./gradlew assembleDebug"

