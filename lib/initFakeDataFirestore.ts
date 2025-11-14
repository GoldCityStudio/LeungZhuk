// Initialize fake data in Firestore
import { productsCollection, ordersCollection, usersCollection } from './firestore';
import { Product, Order } from '@/types';

export async function initializeFakeDataFirestore() {
  // Initialize fake users (only create if they don't exist)
  const fakeUsers = [
    { email: 'customer1@example.com', password: '', role: 'user' as const },
    { email: 'customer2@example.com', password: '', role: 'user' as const },
    { email: 'customer3@example.com', password: '', role: 'user' as const },
    { email: 'manager@meatshop.com', password: '', role: 'admin' as const },
    { email: 'demo@example.com', password: '', role: 'user' as const },
    { email: 'test@example.com', password: '', role: 'user' as const },
  ];

  for (const user of fakeUsers) {
    const existing = await usersCollection.getByEmail(user.email);
    if (!existing) {
      await usersCollection.create(user);
    }
  }

  // Initialize additional products
  const existingProducts = await productsCollection.getAll();
  if (existingProducts.length < 30) {
    const additionalProducts = [
      { name: '和牛牛排', description: '頂級日本和牛，入口即化，完美的大理石紋理。', price: 89.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'beef' as const, stock: 15, unit: 'lb' },
      { name: '牛小排', description: '韓式燒烤專用牛小排，肉質鮮嫩，適合燒烤。', price: 32.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'beef' as const, stock: 35, unit: 'lb' },
      { name: '豬肋排', description: '美式 BBQ 豬肋排，經過特殊調味，風味獨特。', price: 19.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'pork' as const, stock: 45, unit: 'lb' },
      { name: '豬五花肉', description: '韓式燒烤專用五花肉，肥瘦相間，口感豐富。', price: 15.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'pork' as const, stock: 55, unit: 'lb' },
      { name: '全雞', description: '新鮮全雞，適合烤製或燉湯。', price: 11.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'chicken' as const, stock: 20, unit: 'piece' },
      { name: '雞翼', description: '新鮮雞翼，適合烤製或炸製。', price: 7.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'chicken' as const, stock: 80, unit: 'lb' },
      { name: '羊排', description: '法式羊排，肉質鮮嫩，適合煎製。', price: 28.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'lamb' as const, stock: 25, unit: 'lb' },
      { name: '金槍魚', description: '新鮮金槍魚，適合生魚片或煎製。', price: 22.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'seafood' as const, stock: 30, unit: 'lb' },
      { name: '龍蝦', description: '新鮮活龍蝦，適合清蒸或烤製。', price: 45.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'seafood' as const, stock: 12, unit: 'piece' },
      { name: '和牛漢堡肉', description: '優質和牛製成的漢堡肉，口感豐富。', price: 18.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'beef' as const, stock: 40, unit: 'lb' },
      { name: '澳洲和牛 M9', description: '頂級澳洲和牛 M9 等級，油花分布均勻，入口即化。', price: 129.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'beef' as const, stock: 8, unit: 'lb' },
      { name: '美國安格斯牛排', description: 'USDA Prime 等級安格斯牛排，肉質鮮嫩多汁。', price: 34.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'beef' as const, stock: 28, unit: 'lb' },
      { name: '豬里脊肉', description: '精選豬里脊肉，肉質細嫩，適合煎炒。', price: 13.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'pork' as const, stock: 65, unit: 'lb' },
      { name: '西班牙伊比利亞火腿', description: '頂級西班牙伊比利亞火腿，風味獨特。', price: 89.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'pork' as const, stock: 5, unit: 'lb' },
      { name: '雞腿肉', description: '新鮮雞腿肉，適合烤製或燉煮。', price: 5.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'chicken' as const, stock: 95, unit: 'lb' },
      { name: '有機全雞', description: '有機認證全雞，無添加激素，健康美味。', price: 15.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'chicken' as const, stock: 15, unit: 'piece' },
      { name: '紐西蘭羊腿', description: '紐西蘭進口羊腿，肉質鮮美無羶味。', price: 22.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'lamb' as const, stock: 18, unit: 'lb' },
      { name: '澳洲羊排', description: '澳洲進口羊排，適合燒烤或煎製。', price: 26.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'lamb' as const, stock: 22, unit: 'lb' },
      { name: '挪威三文魚', description: '新鮮挪威三文魚，富含 Omega-3，適合生食或煎製。', price: 19.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'seafood' as const, stock: 35, unit: 'lb' },
      { name: '加拿大龍蝦', description: '新鮮加拿大活龍蝦，肉質飽滿鮮甜。', price: 52.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'seafood' as const, stock: 10, unit: 'piece' },
      { name: '日本和牛 A5', description: '頂級日本和牛 A5 等級，世界頂級品質。', price: 199.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'beef' as const, stock: 3, unit: 'lb' },
      { name: '美國牛肋條', description: '美國進口牛肋條，適合紅燒或燉煮。', price: 16.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'beef' as const, stock: 42, unit: 'lb' },
      { name: '德國香腸組合', description: '多種德國傳統香腸組合裝，風味豐富。', price: 24.99, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800', category: 'other' as const, stock: 30, unit: 'pack' },
    ];

    for (const product of additionalProducts) {
      const existing = existingProducts.find(p => p.name === product.name);
      if (!existing) {
        await productsCollection.create(product);
      }
    }
  }

  // Initialize fake orders
  const existingOrders = await ordersCollection.getAll();
  const allProducts = await productsCollection.getAll();
  
  if (existingOrders.length < 10 && allProducts.length > 0) {
    const fakeOrders: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        items: [{ product: allProducts[0], quantity: 2 }, { product: allProducts[2] || allProducts[0], quantity: 1 }],
        total: (allProducts[0].price * 2) + (allProducts[2]?.price || allProducts[0].price),
        customerName: '張三', customerEmail: 'customer1@example.com', customerAddress: '香港中環皇后大道中 100 號', customerPhone: '+852 9123 4567',
        status: 'delivered', paymentIntentId: 'pi_fake_001',
      },
      {
        items: [{ product: allProducts[1] || allProducts[0], quantity: 3 }, { product: allProducts[4] || allProducts[0], quantity: 1 }],
        total: ((allProducts[1]?.price || allProducts[0].price) * 3) + (allProducts[4]?.price || allProducts[0].price),
        customerName: '李四', customerEmail: 'customer2@example.com', customerAddress: '香港銅鑼灣時代廣場 200 號', customerPhone: '+852 9234 5678',
        status: 'shipped', paymentIntentId: 'pi_fake_002',
      },
      {
        items: [{ product: allProducts[3] || allProducts[0], quantity: 2 }, { product: allProducts[5] || allProducts[0], quantity: 1 }],
        total: ((allProducts[3]?.price || allProducts[0].price) * 2) + (allProducts[5]?.price || allProducts[0].price),
        customerName: '王五', customerEmail: 'customer3@example.com', customerAddress: '香港尖沙咀彌敦道 300 號', customerPhone: '+852 9345 6789',
        status: 'processing', paymentIntentId: 'pi_fake_003',
      },
    ];

    const existingOrderIds = existingOrders.map(o => o.paymentIntentId);
    for (const order of fakeOrders) {
      if (!existingOrderIds.includes(order.paymentIntentId)) {
        await ordersCollection.create(order);
      }
    }
  }
}

