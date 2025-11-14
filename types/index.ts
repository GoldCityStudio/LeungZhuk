export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'beef' | 'pork' | 'chicken' | 'lamb' | 'seafood' | 'other';
  stock: number;
  unit: string; // 'lb', 'kg', 'piece'
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhone: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentIntentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

