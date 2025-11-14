# Premium Meat Shop - Ecommerce App

A fully functional modern ecommerce application for meat products with payment gateway integration and admin dashboard for inventory management.

## Features

- 🛒 **Shopping Cart** - Add products to cart with quantity management
- 💳 **Stripe Payment Integration** - Secure payment processing
- 📦 **Product Catalog** - Browse and view product details
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 👨‍💼 **Admin Dashboard** - Manage inventory and orders
- 📊 **Order Management** - Track and update order status
- 🔐 **Admin Authentication** - Secure admin access

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling
- **Firebase Authentication** - User authentication
- **Stripe** - Payment processing
- **Zustand** - State management
- **Capacitor** - Mobile app framework (for APK build)
- **JSON File Storage** - Simple data persistence (can be upgraded to database)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Stripe account (for payment processing)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```env
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

3. Get your Stripe keys from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) (use test mode keys for development)

4. **Firebase Authentication Setup**:
   - Firebase 配置已內置在 `lib/firebase.ts`
   - 在 [Firebase Console](https://console.firebase.google.com/) 創建管理員帳號：
     - Email: `admin@meatshop.com`
     - Password: `admin123`
   - 本地資料庫會自動同步用戶角色

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### 初始化測試資料（可選）

訪問以下 URL 自動創建測試資料：
```
http://localhost:3000/api/init-fake-data
```

這會創建：
- 測試用戶帳號
- 額外產品（共 30+ 個）
- 示例訂單

詳見 [FAKE_DATA.md](./FAKE_DATA.md)

## Default Admin Credentials

- **Email**: admin@meatshop.com
- **Password**: admin123 (在 Firebase 中設置的密碼)

⚠️ **重要提示**:
- 必須先在 [Firebase Console](https://console.firebase.google.com/) 創建此帳號
- 本地資料庫會自動設置管理員角色
- 生產環境請更改這些憑證！

## Project Structure

```
eshop/
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin dashboard pages
│   ├── cart/             # Shopping cart page
│   ├── checkout/         # Checkout page
│   ├── products/         # Product detail pages
│   └── page.tsx          # Home page
├── components/           # React components
├── lib/                  # Utility functions and database
├── store/                # State management (Zustand)
├── types/                # TypeScript type definitions
└── data/                 # JSON data files (created at runtime)
```

## Features Overview

### Customer Features
- Browse products by category
- View product details
- Add products to cart
- Manage cart quantities
- Secure checkout with Stripe
- Order confirmation

### Admin Features
- Login authentication
- View dashboard statistics
- Manage product inventory
- Add/Edit/Delete products
- View all orders
- Update order status
- Low stock alerts

## Payment Testing

Use Stripe test cards for testing:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Use any future expiry date and any CVC

## Production Considerations

1. Replace JSON file storage with a proper database (PostgreSQL, MongoDB, etc.)
2. Set up proper environment variables
3. Change default admin credentials
4. Set up proper authentication (NextAuth.js is included but not fully configured)
5. Add proper error handling and logging
6. Set up email notifications for orders
7. Add product image upload functionality
8. Implement proper inventory management with stock alerts
9. Add shipping cost calculation
10. Set up analytics and monitoring

## 📱 構建 APK（Android 應用）

### 前置需求

- Node.js 18+
- Java JDK 11+
- Android Studio
- Vercel 帳號（用於部署 API）

### 快速開始

1. **部署 API 到 Vercel**（必須先完成）：
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **設置環境變數**：
   - 在 Vercel Dashboard 設置環境變數
   - 更新本地 `.env.local` 添加 `NEXT_PUBLIC_API_URL`

3. **構建 APK**：
   ```bash
   npm run cap:build:android
   npm run cap:open:android
   ```

4. **在 Android Studio 中構建**：
   - 等待 Gradle 同步
   - `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
   - APK 位置：`android/app/build/outputs/apk/debug/app-debug.apk`

### 📚 詳細文檔

- **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** - 快速部署指南（3 步完成）
- **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** - 立即部署步驟
- **[DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)** - 完整部署指南
- **[APK_BUILD_GUIDE.md](./APK_BUILD_GUIDE.md)** - APK 構建詳細說明
- **[QUICK_APK_BUILD.md](./QUICK_APK_BUILD.md)** - APK 快速構建指南

### ⚠️ 重要提示

- **API 必須先部署**：Next.js API 路由無法在 APK 中運行，必須部署到雲端（推薦 Vercel）
- **Firebase 認證**：已在客戶端配置，無需額外設置
- **環境變數**：確保在 Vercel 和本地都設置了正確的環境變數

## License

MIT

