#!/bin/bash

# 部署和構建 APK 腳本

echo "🚀 開始部署流程..."

# 檢查是否已安裝 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安裝 Vercel CLI..."
    npm i -g vercel
fi

# 部署到 Vercel
echo "☁️  部署到 Vercel..."
vercel

# 獲取部署 URL
echo ""
echo "✅ 部署完成！"
echo ""
echo "📝 下一步："
echo "1. 複製上面的部署 URL"
echo "2. 更新 .env.local 中的 NEXT_PUBLIC_API_URL"
echo "3. 運行: npm run build:apk"
echo "4. 運行: npm run cap:sync"
echo "5. 運行: npm run cap:open:android"




