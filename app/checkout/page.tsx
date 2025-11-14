'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import Header from '@/components/Header';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';

let stripePromise: Promise<any> | null = null;

const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (key) {
      stripePromise = loadStripe(key);
    }
  }
  return stripePromise;
};

export default function CheckoutPage() {
  const { items, getTotal, hydrate } = useCartStore();
  const total = getTotal();
  const [stripeLoaded, setStripeLoaded] = useState(false);

  useEffect(() => {
    hydrate();
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      setStripeLoaded(true);
    }
  }, [hydrate]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">購物車是空的</h1>
            <p className="text-gray-600 mb-8">加入一些商品後再結帳！</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">結帳</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">訂單摘要</h2>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <span className="text-gray-600">
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>總計</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">付款資訊</h2>
            {stripeLoaded && getStripe() ? (
              <Elements stripe={getStripe()}>
                <CheckoutForm items={items} total={total} />
              </Elements>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  Stripe 尚未設定。請在 .env.local 檔案中加入您的 Stripe 金鑰。
                </p>
                <p className="text-sm text-gray-500">
                  測試時，您可以從{' '}
                  <a
                    href="https://dashboard.stripe.com/test/apikeys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    Stripe 控制台
                  </a>
                  取得測試模式金鑰
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

