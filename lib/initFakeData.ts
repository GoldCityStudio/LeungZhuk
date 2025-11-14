import { createProduct, createUser, createOrder, getProducts, getUsers, getOrders } from './db';
import bcrypt from 'bcryptjs';
import { Product, Order } from '@/types';

export async function initializeFakeData() {
  // Initialize fake users
  const users = getUsers();
  if (users.length <= 1) { // Only admin exists
    const fakeUsers = [
      {
        email: 'customer1@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user' as const,
      },
      {
        email: 'customer2@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user' as const,
      },
      {
        email: 'customer3@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user' as const,
      },
      {
        email: 'manager@meatshop.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin' as const,
      },
    ];

    fakeUsers.forEach(user => {
      const existing = users.find(u => u.email === user.email);
      if (!existing) {
        createUser(user);
      }
    });
  }

  // Initialize additional products
  const products = getProducts();
  if (products.length < 15) {
    const additionalProducts = [
      {
        name: '和牛牛排',
        description: '頂級日本和牛，入口即化，完美的大理石紋理。',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
        category: 'beef' as const,
        stock: 15,
        unit: 'lb',
      },
      {
        name: '牛小排',
        description: '韓式燒烤專用牛小排，肉質鮮嫩，適合燒烤。',
        price: 32.99,
        image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
        category: 'beef' as const,
        stock: 35,
        unit: 'lb',
      },
      {
        name: '豬肋排',
        description: '美式 BBQ 豬肋排，經過特殊調味，風味獨特。',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
        category: 'pork' as const,
        stock: 45,
        unit: 'lb',
      },
      {
        name: '豬五花肉',
        description: '韓式燒烤專用五花肉，肥瘦相間，口感豐富。',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
        category: 'pork' as const,
        stock: 55,
        unit: 'lb',
      },
      {
        name: '全雞',
        description: '新鮮全雞，適合烤製或燉湯。',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
        category: 'chicken' as const,
        stock: 20,
        unit: 'piece',
      },
      {
        name: '雞翼',
        description: '新鮮雞翼，適合烤製或炸製。',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
        category: 'chicken' as const,
        stock: 80,
        unit: 'lb',
      },
      {
        name: '羊排',
        description: '法式羊排，肉質鮮嫩，適合煎製。',
        price: 28.99,
        image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
        category: 'lamb' as const,
        stock: 25,
        unit: 'lb',
      },
      {
        name: '金槍魚',
        description: '新鮮金槍魚，適合生魚片或煎製。',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
        category: 'seafood' as const,
        stock: 30,
        unit: 'lb',
      },
      {
        name: '龍蝦',
        description: '新鮮活龍蝦，適合清蒸或烤製。',
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
        category: 'seafood' as const,
        stock: 12,
        unit: 'piece',
      },
      {
        name: '和牛漢堡肉',
        description: '優質和牛製成的漢堡肉，口感豐富。',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
        category: 'beef' as const,
        stock: 40,
        unit: 'lb',
      },
    ];

    additionalProducts.forEach(product => {
      const existing = products.find(p => p.name === product.name);
      if (!existing) {
        createProduct(product);
      }
    });
  }

  // Initialize fake orders
  const orders = getOrders();
  const allProducts = getProducts();
  
  if (orders.length === 0 && allProducts.length > 0) {
    const fakeOrders: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        items: [
          { product: allProducts[0], quantity: 2 },
          { product: allProducts[2], quantity: 1 },
        ],
        total: (allProducts[0].price * 2) + allProducts[2].price,
        customerName: '張三',
        customerEmail: 'customer1@example.com',
        customerAddress: '香港中環皇后大道中 100 號',
        customerPhone: '+852 9123 4567',
        status: 'delivered',
        paymentIntentId: 'pi_fake_001',
      },
      {
        items: [
          { product: allProducts[1], quantity: 3 },
          { product: allProducts[4], quantity: 1 },
        ],
        total: (allProducts[1].price * 3) + allProducts[4].price,
        customerName: '李四',
        customerEmail: 'customer2@example.com',
        customerAddress: '香港銅鑼灣時代廣場 200 號',
        customerPhone: '+852 9234 5678',
        status: 'shipped',
        paymentIntentId: 'pi_fake_002',
      },
      {
        items: [
          { product: allProducts[3], quantity: 2 },
          { product: allProducts[5], quantity: 1 },
        ],
        total: (allProducts[3].price * 2) + allProducts[5].price,
        customerName: '王五',
        customerEmail: 'customer3@example.com',
        customerAddress: '香港尖沙咀彌敦道 300 號',
        customerPhone: '+852 9345 6789',
        status: 'processing',
        paymentIntentId: 'pi_fake_003',
      },
      {
        items: [
          { product: allProducts[0], quantity: 1 },
          { product: allProducts[6], quantity: 2 },
        ],
        total: allProducts[0].price + (allProducts[6].price * 2),
        customerName: '陳六',
        customerEmail: 'customer1@example.com',
        customerAddress: '香港灣仔軒尼詩道 400 號',
        customerPhone: '+852 9456 7890',
        status: 'pending',
        paymentIntentId: 'pi_fake_004',
      },
      {
        items: [
          { product: allProducts[2], quantity: 4 },
        ],
        total: allProducts[2].price * 4,
        customerName: '趙七',
        customerEmail: 'customer2@example.com',
        customerAddress: '香港旺角彌敦道 500 號',
        customerPhone: '+852 9567 8901',
        status: 'delivered',
        paymentIntentId: 'pi_fake_005',
      },
    ];

    // Create orders with different timestamps
    const now = new Date();
    fakeOrders.forEach((order, index) => {
      const orderDate = new Date(now);
      orderDate.setDate(orderDate.getDate() - (fakeOrders.length - index));
      orderDate.setHours(10 + index, 30, 0, 0);
      
      // Create order and then update its timestamp
      const createdOrder = createOrder(order);
      const { updateOrder } = require('./db');
      updateOrder(createdOrder.id, {
        createdAt: orderDate.toISOString(),
        updatedAt: orderDate.toISOString(),
      });
    });
  }
}

