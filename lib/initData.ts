import { createProduct } from './db';
import { Product } from '@/types';
import { initializeFakeData } from './initFakeData';

export function initializeSampleData() {
  const products = [
    {
      name: '優質肋眼牛排',
      description: '鮮嫩多汁的肋眼牛排，帶有美麗的大理石紋，適合燒烤。USDA Choice 等級。',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
      category: 'beef' as const,
      stock: 50,
      unit: 'lb',
    },
    {
      name: '免治牛肉',
      description: '新鮮免治牛肉，80/20 瘦肉與脂肪比例。適合製作漢堡和肉丸。',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
      category: 'beef' as const,
      stock: 100,
      unit: 'lb',
    },
    {
      name: '豬扒',
      description: '厚切帶骨豬扒，鮮嫩多汁。',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
      category: 'pork' as const,
      stock: 75,
      unit: 'lb',
    },
    {
      name: '雞胸肉',
      description: '無骨無皮雞胸肉。低脂高蛋白。',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
      category: 'chicken' as const,
      stock: 120,
      unit: 'lb',
    },
    {
      name: '羊腿',
      description: '整隻羊腿，適合烘烤。優質品質。',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
      category: 'lamb' as const,
      stock: 30,
      unit: 'lb',
    },
    {
      name: '三文魚柳',
      description: '新鮮大西洋三文魚柳，富含 omega-3 脂肪酸。',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
      category: 'seafood' as const,
      stock: 40,
      unit: 'lb',
    },
    {
      name: '牛胸肉',
      description: '整塊牛胸肉，適合慢煮和煙燻。',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
      category: 'beef' as const,
      stock: 25,
      unit: 'lb',
    },
    {
      name: '豬肩肉',
      description: '波士頓豬肩肉，適合製作手撕豬肉。',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
      category: 'pork' as const,
      stock: 60,
      unit: 'lb',
    },
  ];

  // Only initialize if products don't exist
  const existingProducts = require('./db').getProducts();
  if (existingProducts.length === 0) {
    products.forEach(product => createProduct(product));
  }
}

// Initialize all fake data (users, products, orders)
export async function initializeAllFakeData() {
  initializeSampleData();
  await initializeFakeData();
}

