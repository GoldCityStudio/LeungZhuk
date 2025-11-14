import fs from 'fs';
import path from 'path';
import { Product, Order, User } from '@/types';

const dataDir = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const productsFile = path.join(dataDir, 'products.json');
const ordersFile = path.join(dataDir, 'orders.json');
const usersFile = path.join(dataDir, 'users.json');

// Initialize files if they don't exist
function initFile(filePath: string, defaultValue: any) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
  }
}

initFile(productsFile, []);
initFile(ordersFile, []);
initFile(usersFile, []);

// Products
export function getProducts(): Product[] {
  try {
    const data = fs.readFileSync(productsFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getProduct(id: string): Product | null {
  const products = getProducts();
  return products.find(p => p.id === id) || null;
}

export function saveProducts(products: Product[]) {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}

export function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}

// Orders
export function getOrders(): Order[] {
  try {
    const data = fs.readFileSync(ordersFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getOrder(id: string): Order | null {
  const orders = getOrders();
  return orders.find(o => o.id === id) || null;
}

export function saveOrders(orders: Order[]) {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
}

export function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return null;
  
  orders[index] = {
    ...orders[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveOrders(orders);
  return orders[index];
}

// Users
export function getUsers(): User[] {
  try {
    const data = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getUserByEmail(email: string): User | null {
  const users = getUsers();
  return users.find(u => u.email === email) || null;
}

export function saveUsers(users: User[]) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

export function createUser(user: Omit<User, 'id'>): User {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  
  users[index] = {
    ...users[index],
    ...updates,
  };
  saveUsers(users);
  return users[index];
}

