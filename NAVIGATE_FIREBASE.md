# 🧭 如何導航到 Firebase Functions Configuration

## 如果連結重定向到 Overview 頁面

### 正確的導航步驟：

1. **打開 Firebase Console 主頁**
   ```
   https://console.firebase.google.com/project/firebase-vertex-a-i-s-d-saybci
   ```

2. **在左側選單找到 "Functions"**
   - 如果看不到，可能需要先啟用 Functions
   - 點擊 "Functions" 後，如果看到 "Get started"，點擊它

3. **點擊頂部的 "Configuration" 標籤**
   - 在 Functions 頁面頂部，你會看到幾個標籤：
     - Dashboard
     - Usage
     - **Configuration** ← 點擊這個

4. **添加環境變數**
   - 在 "Environment variables" 區塊
   - 點擊 "Add variable"
   - Name: `STRIPE_SECRET_KEY`
   - Value: `your-stripe-secret-key-here` (從 Stripe Dashboard 獲取)
   - 點擊 Save

## 替代方案：先部署，後設置

如果導航有問題，你可以：

1. **先部署 Function（環境變數可以稍後設置）**
   ```bash
   firebase deploy --only functions:createPaymentIntent
   ```

2. **部署後再設置環境變數**
   - Function 部署後，在 Firebase Console 中設置環境變數
   - 然後重新部署 Function 使環境變數生效

3. **或者使用 Firebase CLI 設置（需要先登入）**
   ```bash
   firebase functions:secrets:set STRIPE_SECRET_KEY
   # 當提示時輸入 secret key
   ```

## 視覺指引

Firebase Console 結構：
```
Firebase Console
├── Project Overview
├── Authentication
├── Firestore Database
├── Functions ← 點擊這裡
│   ├── Dashboard (標籤)
│   ├── Usage (標籤)
│   └── Configuration (標籤) ← 點擊這個
│       └── Environment variables
│           └── Add variable ← 點擊這個
```

