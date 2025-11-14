'use client';

import { useState, FormEvent } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { CartItem } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
  clientSecret?: string;
}

export default function CheckoutForm({ items, total, clientSecret: initialClientSecret }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Use the existing clientSecret from Elements
      // Customer info will be stored in the order, not in payment intent metadata
      if (!initialClientSecret) {
        throw new Error('Payment intent not initialized');
      }

      // Submit the form first to validate payment details
      const { error: submitError } = await elements.submit();
      if (submitError) {
        alert(submitError.message || '請檢查付款資訊');
        setIsProcessing(false);
        return;
      }

      // Confirm payment with the existing clientSecret
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: initialClientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/order-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        alert(error.message || '付款失敗，請重試');
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Create order
        const { orderAPI } = await import('@/lib/apiClient');
        await orderAPI.create({
          items,
          total,
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerAddress: customerInfo.address,
          customerPhone: customerInfo.phone,
          status: 'pending',
          paymentIntentId: paymentIntent.id,
        });

        clearCart();
        router.push(`/order-success?payment_intent=${paymentIntent.id}`);
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('發生錯誤，請重試。');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            全名
          </label>
          <input
            type="text"
            required
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            電郵
          </label>
          <input
            type="email"
            required
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            電話
          </label>
          <input
            type="tel"
            required
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            送貨地址
          </label>
          <textarea
            required
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-semibold"
      >
        {isProcessing ? '處理中...' : `付款 $${total.toFixed(2)}`}
      </button>
    </form>
  );
}

