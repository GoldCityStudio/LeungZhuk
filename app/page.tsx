import Link from 'next/link';
import { getProducts } from '@/lib/db';
import { initializeSampleData } from '@/lib/initData';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import ProductList from '@/components/ProductList';

export default async function Home() {
  // Initialize sample data if needed
  try {
    initializeSampleData();
  } catch (e) {
    // Data already initialized or error occurred
  }
  
  const products = getProducts();

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
        <ProductList products={products} />
      </main>
    </div>
  );
}

