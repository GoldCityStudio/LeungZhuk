'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import { FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, quantity);
    alert('已加入購物車！');
  };

  const increment = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto">
      <div className="md:flex">
        <div className="md:w-1/2 relative h-96 md:h-auto">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <span className="inline-block bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded-full">
              {product.category === 'beef' ? '牛肉' : product.category === 'pork' ? '豬肉' : product.category === 'chicken' ? '雞肉' : product.category === 'lamb' ? '羊肉' : product.category === 'seafood' ? '海鮮' : '其他'}
            </span>
          </div>

          <div className="mb-6">
            <p className="text-4xl font-bold text-primary-600 mb-2">${product.price}</p>
            <p className="text-gray-500">每{product.unit === 'lb' ? '磅' : product.unit === 'kg' ? '公斤' : '件'}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">庫存：{product.stock} {product.unit === 'lb' ? '磅' : product.unit === 'kg' ? '公斤' : '件'}</p>
            {product.stock < 10 && product.stock > 0 && (
              <p className="text-sm text-orange-600">僅剩 {product.stock} {product.unit === 'lb' ? '磅' : product.unit === 'kg' ? '公斤' : '件'}！</p>
            )}
          </div>

          {product.stock > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium">數量：</label>
                <div className="flex items-center gap-2 border rounded-lg">
                  <button
                    onClick={decrement}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiMinus />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={increment}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2 font-semibold"
              >
                <FiShoppingCart />
                加入購物車 - ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          ) : (
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg cursor-not-allowed font-semibold"
            >
              缺貨
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

