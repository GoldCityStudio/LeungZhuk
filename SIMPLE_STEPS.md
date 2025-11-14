# 🎯 最簡單的部署步驟

## 只需要 3 個步驟：

### 步驟 1: 登入 Firebase（只需做一次）

在終端機執行：
```bash
firebase login
```

這會打開瀏覽器，登入你的 Google 帳號。

### 步驟 2: 設置環境變數（在網頁上）

1. 打開：https://console.firebase.google.com/project/firebase-vertex-a-i-s-d-saybci/functions/config
2. 點擊 **"Add variable"**
3. 添加：
   - **Name**: `STRIPE_SECRET_KEY`
   - **Value**: `your-stripe-secret-key-here` (從 Stripe Dashboard 獲取)
4. 點擊 **Save**

### 步驟 3: 執行部署腳本

在終端機執行：
```bash
cd /Users/dansoong/Desktop/eshop
./run-deploy.sh
```

腳本會自動：
- ✅ 檢查登入狀態
- ✅ 構建 Function
- ✅ 部署 Function

## 完成！

部署完成後，重新構建 APK：
```bash
npm run build:apk
npx cap sync android
cd android && ./gradlew assembleDebug
```

---

## 💡 提示

如果你已經登入過 Firebase，步驟 1 可以跳過，直接執行 `./run-deploy.sh`

