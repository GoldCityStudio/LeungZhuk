'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { FiCheckCircle } from 'react-icons/fi';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get('payment_intent');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-center mb-4">
              <FiCheckCircle className="text-6xl text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              訂單已成功下單！
            </h1>
            <p className="text-gray-600 mb-6">
              感謝您的購買。您的訂單已確認，我們將盡快處理。
            </p>
            {paymentIntent && (
              <p className="text-sm text-gray-500 mb-8">
                付款編號：{paymentIntent}
              </p>
            )}
            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
              >
                繼續選購
              </Link>
              <Link
                href="/admin"
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                查看訂單
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">載入中...</p>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}

