# 🚀 部署 Firebase Function 指南

## ⚠️ 重要：先登入 Firebase

在開始之前，必須先登入 Firebase：

```bash
firebase login
```

這會打開瀏覽器讓你登入 Google 帳號。登入成功後才能繼續。

## 步驟 1: 設置 Stripe Secret Key

### 方法 A: 在 Firebase Console 設置 (推薦 - 最簡單)

1. 打開 Firebase Console: https://console.firebase.google.com/project/firebase-vertex-a-i-s-d-saybci/functions/config
2. 點擊 **"Add variable"** 或 **"新增變數"**
3. 添加：
   - **Name**: `STRIPE_SECRET_KEY`
   - **Value**: `your-stripe-secret-key-here` (從 Stripe Dashboard 獲取)
4. 點擊 **Save**

### 方法 B: 使用命令列 (需要先登入)

```bash
# 先登入
firebase login

# 然後設置環境變數
firebase functions:secrets:set STRIPE_SECRET_KEY
# 當提示時，輸入你的 Stripe Secret Key (從 Stripe Dashboard 獲取)
```

## 步驟 2: 確認已登入 Firebase

```bash
# 檢查登入狀態
firebase projects:list

# 如果出現錯誤，需要登入
firebase login
```

## 步驟 3: 構建 Function

```bash
cd /Users/dansoong/Desktop/eshop/functions
npm run build
cd ..
```

## 步驟 4: 部署 Function

```bash
cd /Users/dansoong/Desktop/eshop
firebase deploy --only functions:createPaymentIntent
```

如果遇到權限錯誤，請確保：
1. 已登入正確的 Google 帳號
2. 該帳號有權限訪問 Firebase 專案 `firebase-vertex-a-i-s-d-saybci`

## 步驟 5: 獲取 Function URL

部署完成後，你會看到類似這樣的輸出：

```
✔  functions[createPaymentIntent(us-central1)]: Successful create operation.
Function URL: https://us-central1-firebase-vertex-a-i-s-d-saybci.cloudfunctions.net/createPaymentIntent
```

## 步驟 6: 更新 API Client (可選)

API Client 已經配置好使用 Firebase Function URL。如果部署後的 URL 不同，才需要更新：

在 `lib/apiClient.ts` 第 152 行，更新 Firebase Function URL：

```typescript
const firebaseFunctionUrl = 'https://us-central1-firebase-vertex-a-i-s-d-saybci.cloudfunctions.net/createPaymentIntent';
```

將 URL 替換為部署後顯示的實際 URL。

## 步驟 7: 重新構建 APK

```bash
npm run build:apk
npx cap sync android
cd android && ./gradlew assembleDebug
```

## 測試 Function

部署後，測試 Function 是否工作：

```bash
curl -X POST https://us-central1-firebase-vertex-a-i-s-d-saybci.cloudfunctions.net/createPaymentIntent \
  -H "Content-Type: application/json" \
  -d '{"total": 89.99, "customerInfo": {}}'
```

應該返回：
```json
{"clientSecret": "pi_xxx_secret_xxx"}
```

## 注意事項

- ⚠️ 不要將 Stripe Secret Key 提交到 Git
- ✅ 使用 Firebase Functions config 或環境變數
- ✅ 在生產環境中使用 Stripe Live Keys
- ✅ 測試時使用 Stripe Test Keys

