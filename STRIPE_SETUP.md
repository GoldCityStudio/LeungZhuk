# 💳 Stripe Test Keys Setup

## Quick Setup

1. **Get Stripe Test Keys:**
   - Go to: https://dashboard.stripe.com/test/apikeys
   - Sign up or log in to Stripe (free account)
   - Copy your **Publishable key** (starts with `pk_test_`)
   - Copy your **Secret key** (starts with `sk_test_`)

2. **Add Keys to .env.local:**
   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   ```

3. **Restart Dev Server:**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

## Testing Payments

Once configured, you can test with Stripe test cards:

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **3D Secure:** `4000 0025 0000 3155`

Use any:
- Future expiry date (e.g., 12/34)
- Any 3-digit CVC
- Any ZIP code

## Without Stripe Keys

The app will work for browsing and cart, but checkout will show:
"Stripe 尚未設定" (Stripe not configured)

You can still test the UI without payment functionality.
