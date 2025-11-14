'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { FiShoppingCart, FiUser } from 'react-icons/fi';

export default function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const hydrate = useCartStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            🥩 優質肉類專賣店
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
              選購
            </Link>
            <Link href="/cart" className="relative">
              <FiShoppingCart className="text-2xl text-gray-700 hover:text-primary-600 transition" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-primary-600 transition">
              <FiUser className="text-xl" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

