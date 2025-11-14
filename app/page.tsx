'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import Header from '@/components/Header';
import ProductList from '@/components/ProductList';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { productAPI } = await import('@/lib/apiClient');
        const data = await productAPI.getAll();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            優質肉類專賣
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            新鮮優質肉類，直送到府。品質保證，值得信賴。
          </p>
        </div>

        {/* Product List with Category Filter */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">載入中...</p>
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </main>
    </div>
  );
}

