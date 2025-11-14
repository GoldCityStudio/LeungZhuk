'use client';

import { Product } from '@/types';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  products: Product[];
}

const categories = [
  { value: 'all', label: '全部', icon: '🥩' },
  { value: 'beef', label: '牛肉', icon: '🐄' },
  { value: 'pork', label: '豬肉', icon: '🐷' },
  { value: 'chicken', label: '雞肉', icon: '🐔' },
  { value: 'lamb', label: '羊肉', icon: '🐑' },
  { value: 'seafood', label: '海鮮', icon: '🐟' },
  { value: 'other', label: '其他', icon: '🍖' },
];

export default function CategoryFilter({ selectedCategory, onCategoryChange, products }: CategoryFilterProps) {
  const getCategoryCount = (category: string) => {
    if (category === 'all') return products.length;
    return products.filter(p => p.category === category).length;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">產品分類</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const count = getCategoryCount(category.value);
          const isSelected = selectedCategory === category.value || 
            (selectedCategory === null && category.value === 'all');
          
          return (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value === 'all' ? null : category.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isSelected
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
              <span className={`ml-2 text-sm ${
                isSelected ? 'text-white' : 'text-gray-500'
              }`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

