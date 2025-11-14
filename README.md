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
- **Stripe** - Payment processing
- **Zustand** - State management
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

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Default Admin Credentials

- **Email**: admin@meatshop.com
- **Password**: admin123

⚠️ **Important**: Change these credentials in production!

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

## License

MIT

