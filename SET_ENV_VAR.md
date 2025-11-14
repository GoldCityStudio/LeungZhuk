# 🔧 設置 STRIPE_SECRET_KEY 環境變數

## 快速步驟

### 1. 打開 Firebase Console

直接點擊這個連結：
**https://console.firebase.google.com/project/firebase-vertex-a-i-s-d-saybci/functions/config**

### 2. 添加環境變數

1. 在頁面上找到 **"Environment variables"** 或 **"環境變數"** 區塊
2. 點擊 **"Add variable"** 或 **"新增變數"** 按鈕
3. 填寫：
   - **Name（名稱）**: `STRIPE_SECRET_KEY`
   - **Value（值）**: `your-stripe-secret-key-here` (從 Stripe Dashboard 獲取)
4. 點擊 **"Save"** 或 **"儲存"**

### 3. 回到終端機

設置完成後，回到終端機，輸入 `y` 然後按 Enter

## 視覺指引

在 Firebase Console 中，你會看到：
- 左側選單：點擊 **Functions**
- 頂部標籤：點擊 **Configuration**
- 在 **Environment variables** 區塊中點擊 **Add variable**

## 完成後

設置完成後，在終端機輸入 `y` 繼續部署。

