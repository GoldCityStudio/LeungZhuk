#!/bin/bash

echo "🚀 Firebase Function 部署腳本"
echo "================================"
echo ""

# 檢查是否已登入
echo "📋 步驟 1: 檢查 Firebase 登入狀態..."
if firebase projects:list &>/dev/null; then
    echo "✅ 已登入 Firebase"
else
    echo "❌ 未登入 Firebase"
    echo ""
    echo "請執行以下命令登入："
    echo "  firebase login"
    echo ""
    echo "這會打開瀏覽器讓你登入 Google 帳號。"
    exit 1
fi

echo ""
echo "📋 步驟 2: 構建 Function..."
cd functions
if npm run build; then
    echo "✅ Function 構建成功"
else
    echo "❌ Function 構建失敗"
    exit 1
fi
cd ..

echo ""
echo "📋 步驟 3: 檢查環境變數..."
echo "⚠️  請確保已在 Firebase Console 設置 STRIPE_SECRET_KEY"
echo "   連結: https://console.firebase.google.com/project/firebase-vertex-a-i-s-d-saybci/functions/config"
echo ""
read -p "已設置環境變數？(y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "請先設置環境變數後再繼續。"
    exit 1
fi

echo ""
echo "📋 步驟 4: 部署 Function..."
firebase deploy --only functions:createPaymentIntent

echo ""
echo "✅ 部署完成！"
echo ""
echo "📝 下一步："
echo "1. 記下 Function URL（在上方輸出中）"
echo "2. 如果 URL 與預設不同，更新 lib/apiClient.ts 第 152 行"
echo "3. 重新構建 APK: npm run build:apk && npx cap sync android"

