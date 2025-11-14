# 💳 部署付款 API 指南

## 問題說明

在靜態 APK 構建中，Next.js API 路由無法運行。付款功能需要一個伺服器端點來創建 Stripe Payment Intent。

## 解決方案

### 選項 1: 部署到 Vercel (推薦 - 最簡單)

1. **安裝 Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **登入 Vercel**:
   ```bash
   vercel login
   ```

3. **部署**:
   ```bash
   vercel
   ```
   
   按照提示完成部署。Vercel 會自動檢測 Next.js 項目。

4. **設置環境變數**:
   - 在 Vercel Dashboard 中，進入你的項目
   - 到 Settings → Environment Variables
   - 添加：
     - `STRIPE_SECRET_KEY` = `your-stripe-secret-key` (從 Stripe Dashboard 獲取)
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `your-stripe-publishable-key` (從 Stripe Dashboard 獲取)

5. **獲取部署 URL**:
   - 部署完成後，你會得到一個 URL，例如：`https://your-app.vercel.app`

6. **更新 APK 配置**:
   - 在 `capacitor.config.ts` 或環境變數中設置：
     ```typescript
     // 在 next.config.js 的 env 中添加
     NEXT_PUBLIC_API_URL: 'https://your-app.vercel.app'
     ```
   
   - 或者在構建時設置：
     ```bash
     NEXT_PUBLIC_API_URL=https://your-app.vercel.app npm run build:apk
     ```

### 選項 2: 使用本地開發伺服器 (測試用)

如果你只是想測試，可以：

1. **運行開發伺服器**:
   ```bash
   npm run dev
   ```

2. **獲取你的本地 IP**:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # 例如: 192.168.1.100
   ```

3. **更新 Capacitor 配置**:
   在 `capacitor.config.ts` 中：
   ```typescript
   server: {
     url: 'http://192.168.1.100:3000',
     cleartext: true,
   }
   ```

4. **重新構建 APK**:
   ```bash
   npm run build:apk
   npx cap sync android
   ```

### 選項 3: 使用 Firebase Functions (進階)

如果你已經在使用 Firebase，可以創建一個 Firebase Function 來處理付款：

1. **安裝 Firebase Functions**:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init functions
   ```

2. **創建 Function** (在 `functions/src/index.ts`):
   ```typescript
   import * as functions from 'firebase-functions';
   import Stripe from 'stripe';
   
   const stripe = new Stripe('your-secret-key', {
     apiVersion: '2023-08-16',
   });
   
   export const createPaymentIntent = functions.https.onRequest(async (req, res) => {
     if (req.method !== 'POST') {
       return res.status(405).send('Method Not Allowed');
     }
     
     const { total } = req.body;
     
     const paymentIntent = await stripe.paymentIntents.create({
       amount: Math.round(total * 100),
       currency: 'usd',
     });
     
     res.json({ clientSecret: paymentIntent.client_secret });
   });
   ```

3. **部署**:
   ```bash
   firebase deploy --only functions
   ```

4. **更新 API URL**:
   ```typescript
   NEXT_PUBLIC_API_URL: 'https://your-region-your-project.cloudfunctions.net/createPaymentIntent'
   ```

## 快速測試

部署後，測試 API 是否工作：

```bash
curl -X POST https://your-api-url/api/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"total": 89.99, "items": []}'
```

應該返回：
```json
{"clientSecret": "pi_xxx_secret_xxx"}
```

## 注意事項

- ⚠️ **不要**將 Stripe Secret Key 提交到 Git
- ✅ 使用環境變數來存儲敏感信息
- ✅ 在生產環境中使用 Stripe Live Keys
- ✅ 測試時使用 Stripe Test Keys

