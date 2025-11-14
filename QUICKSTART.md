# Quick Start Guide

## 🚀 Ready to Test Run!

Your ecommerce app is ready to test. Follow these steps:

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Stripe Keys (get from https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here-change-this
NEXTAUTH_URL=http://localhost:3000
```

**To get Stripe test keys:**
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your "Publishable key" (starts with `pk_test_`)
3. Copy your "Secret key" (starts with `sk_test_`)
4. Paste them into `.env.local`

**Note:** For testing without Stripe, you can leave the keys empty, but payment won't work.

### 3. Run the Development Server
```bash
npm run dev
```

### 4. Open Your Browser
Navigate to: **http://localhost:3000**

### 5. Test the App

#### Customer Features:
- ✅ Browse products on the home page
- ✅ Click on any product to see details
- ✅ Add products to cart
- ✅ View cart and adjust quantities
- ✅ Go to checkout (requires Stripe keys for payment)

#### Admin Dashboard:
- Go to: **http://localhost:3000/admin**
- Login with:
  - Email: `admin@meatshop.com`
  - Password: `admin123`
- Manage products and orders

### Testing Payments (Stripe Test Mode)

Use these test card numbers:
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- Use any future expiry date (e.g., 12/25)
- Use any 3-digit CVC (e.g., 123)
- Use any ZIP code

### Sample Data

The app automatically creates 8 sample meat products on first run:
- Premium Ribeye Steak
- Ground Beef
- Pork Chops
- Chicken Breast
- Lamb Leg
- Salmon Fillet
- Beef Brisket
- Pork Shoulder

### Troubleshooting

**If you see "Stripe is not configured":**
- Make sure you've created `.env.local` with your Stripe keys
- Restart the dev server after adding environment variables

**If products don't show:**
- The data is created automatically on first page load
- Check the browser console for any errors

**If admin login doesn't work:**
- The admin user is created automatically on first login attempt
- Default credentials: `admin@meatshop.com` / `admin123`

### Next Steps

1. ✅ Test browsing products
2. ✅ Test adding to cart
3. ✅ Test checkout (with Stripe keys)
4. ✅ Test admin dashboard
5. ✅ Add your own products via admin panel

Enjoy testing your meat shop! 🥩

