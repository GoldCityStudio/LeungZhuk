# 🚀 立即部署 Firebase Function

## 步驟 1: 登入 Firebase

在終端機執行：

```bash
firebase login
```

這會打開瀏覽器讓你登入 Google 帳號。

## 步驟 2: 設置 Stripe Secret Key

### 方法 A: 在 Firebase Console 設置 (推薦)

1. 在 Firebase Console 中，進入你的專案
2. 點擊左側選單的 **Functions**
3. 點擊 **Configuration** 標籤
4. 點擊 **Add variable** 按鈕
5. 添加：
   - **Name**: `STRIPE_SECRET_KEY`
   - **Value**: `your-stripe-secret-key-here` (從 Stripe Dashboard 獲取)
6. 點擊 **Save**

### 方法 B: 使用命令列

```bash
firebase functions:config:set stripe.secret_key="your-stripe-secret-key-here"
```

## 步驟 3: 部署 Function

```bash
cd /Users/dansoong/Desktop/eshop
firebase deploy --only functions:createPaymentIntent
```

部署完成後，你會看到 Function URL，例如：
```
https://us-central1-firebase-vertex-a-i-s-d-saybci.cloudfunctions.net/createPaymentIntent
```

## 步驟 4: 測試 Function

```bash
curl -X POST https://us-central1-firebase-vertex-a-i-s-d-saybci.cloudfunctions.net/createPaymentIntent \
  -H "Content-Type: application/json" \
  -d '{"total": 89.99, "customerInfo": {}}'
```

應該返回：
```json
{"clientSecret": "pi_xxx_secret_xxx"}
```

## 步驟 5: 重新構建 APK

```bash
npm run build:apk
npx cap sync android
cd android && ./gradlew assembleDebug
```

## 完成！

現在你的 APK 應該可以使用付款功能了！
