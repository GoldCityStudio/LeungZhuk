'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        products={products}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {selectedCategory 
              ? `目前沒有 ${selectedCategory === 'beef' ? '牛肉' : selectedCategory === 'pork' ? '豬肉' : selectedCategory === 'chicken' ? '雞肉' : selectedCategory === 'lamb' ? '羊肉' : selectedCategory === 'seafood' ? '海鮮' : '其他'} 類別的產品。`
              : '目前沒有可用的產品。'}
          </p>
        </div>
      )}
    </>
  );
}

