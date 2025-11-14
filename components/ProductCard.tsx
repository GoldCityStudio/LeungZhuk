'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { FiShoppingCart } from 'react-icons/fi';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">缺貨</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary-600">${product.price}</p>
              <p className="text-xs text-gray-500">每{product.unit === 'lb' ? '磅' : product.unit === 'kg' ? '公斤' : '件'}</p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              <FiShoppingCart />
              加入購物車
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">庫存：{product.stock} {product.unit === 'lb' ? '磅' : product.unit === 'kg' ? '公斤' : '件'}</p>
        </div>
      </div>
    </Link>
  );
}

