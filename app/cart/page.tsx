'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import Header from '@/components/Header';
import Link from 'next/link';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotal, clearCart, hydrate } = useCartStore();
  const total = getTotal();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const handleCheckout = () => {
    if (items.length === 0) return;
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">購物車是空的</h1>
            <p className="text-gray-600 mb-8">加入一些美味的肉類開始購物吧！</p>
            <Link
              href="/"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              繼續選購
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">購物車</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">${item.product.price} 每{item.product.unit === 'lb' ? '磅' : item.product.unit === 'kg' ? '公斤' : '件'}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <FiMinus />
                        </button>
                        <span className="px-4 py-2 min-w-[60px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">訂單摘要</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>小計</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>運費</span>
                  <span>結帳時計算</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>總計</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold mb-4"
              >
                前往結帳
              </button>
              <button
                onClick={clearCart}
                className="w-full text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                清空購物車
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

