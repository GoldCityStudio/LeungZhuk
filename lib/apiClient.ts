// API Client - now uses Firestore directly (no server needed)
import { productsCollection, ordersCollection, usersCollection } from './firestore';
import { Product, Order } from '@/types';

// Product API - uses Firestore
export const productAPI = {
  getAll: async () => {
    const products = await productsCollection.getAll();
    return { products };
  },
  getOne: async (id: string) => {
    const product = await productsCollection.getOne(id);
    return { product };
  },
  create: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const product = await productsCollection.create(data);
    return { product };
  },
  update: async (id: string, data: Partial<Product>) => {
    const product = await productsCollection.update(id, data);
    return { product };
  },
  delete: async (id: string) => {
    const success = await productsCollection.delete(id);
    return { success };
  },
};

// Order API - uses Firestore
export const orderAPI = {
  getAll: async () => {
    const orders = await ordersCollection.getAll();
    return { orders };
  },
  create: async (data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Update product stock when creating order
    if (data.items) {
      for (const item of data.items) {
        const product = await productsCollection.getOne(item.product.id);
        if (product && product.stock >= item.quantity) {
          await productsCollection.update(product.id, {
            stock: product.stock - item.quantity,
          });
        }
      }
    }
    
    const order = await ordersCollection.create(data);
    return { order };
  },
  update: async (id: string, data: Partial<Order>) => {
    const order = await ordersCollection.update(id, data);
    return { order };
  },
};

// Auth API - uses Firebase Auth + Firestore for user roles
export const authAPI = {
  login: async (email: string, password: string) => {
    // Use Firebase Auth (handled in firebaseAuth.ts)
    // This is just for compatibility
    const { signIn } = await import('./firebaseAuth');
    return await signIn(email, password);
  },
  signup: async (data: { email: string; password: string; name?: string }) => {
    // Use Firebase Auth (handled in firebaseAuth.ts)
    const { signUp } = await import('./firebaseAuth');
    return await signUp(data.email, data.password);
  },
  verify: async (token: string) => {
    // Verify Firebase token
    try {
      const loadModule = new Function('modulePath', 'return import(modulePath)');
      const firebaseAuth = await loadModule('firebase/auth');
      const firebaseApp = await loadModule('firebase/app');
      
      const firebaseConfig = {
        apiKey: "AIzaSyBPIbIpl6ZKRZB7895uiaP319v9DGO9p8g",
        authDomain: "fir-vertex-a-i-s-d-saybci.firebaseapp.com",
        projectId: "firebase-vertex-a-i-s-d-saybci",
        storageBucket: "firebase-vertex-a-i-s-d-saybci.firebasestorage.app",
        messagingSenderId: "773451976021",
        appId: "1:773451976021:web:d9d32bf92a66c37c4cb3dc"
      };

      let app;
      if (firebaseApp.getApps().length === 0) {
        app = firebaseApp.initializeApp(firebaseConfig);
      } else {
        app = firebaseApp.getApps()[0];
      }

      const auth = firebaseAuth.getAuth(app);
      const user = auth.currentUser;
      
      if (user) {
        const userDoc = await usersCollection.getByEmail(user.email || '');
        return {
          valid: true,
          user: {
            id: user.uid,
            email: user.email,
            role: userDoc?.role || 'user',
          }
        };
      }
      
      return { valid: false };
    } catch (error) {
      return { valid: false, error: 'Invalid token' };
    }
  },
  getOrCreateUser: async (email: string, role?: string) => {
    let user = await usersCollection.getByEmail(email);
    
    if (!user) {
      // Special handling for admin accounts
      let defaultRole = role || 'user';
      if (email === 'admin@meatshop.com' || email === 'manager@meatshop.com') {
        defaultRole = 'admin';
      }
      
      user = await usersCollection.create({
        email: email,
        password: '', // No password needed with Firebase
        role: defaultRole as 'admin' | 'user',
      });
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    };
  },
};

// Payment API - still needs server-side for Stripe
// In static builds (APK), API routes don't work, so we need a deployed endpoint
export const paymentAPI = {
  createIntent: async (data: any) => {
    // Check if we're in a static build (APK) - API routes won't work
    const isStaticBuild = typeof window !== 'undefined' && 
      (window.location.protocol === 'capacitor:' || 
       window.location.protocol === 'file:' ||
       !window.location.origin.includes('localhost'));
    
    // Try to use Firebase Function URL or deployed API endpoint
    // Default Firebase Function URL (will be set after deployment)
    const firebaseFunctionUrl = 'https://us-central1-firebase-vertex-a-i-s-d-saybci.cloudfunctions.net/createPaymentIntent';
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 
      (isStaticBuild ? firebaseFunctionUrl.replace('/createPaymentIntent', '') : 
       (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'));
    
    // Determine the endpoint URL
    const endpoint = apiBase.includes('cloudfunctions.net') 
      ? firebaseFunctionUrl  // Firebase Function
      : `${apiBase}/api/create-payment-intent`;  // Next.js API route
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create payment intent');
      }
      
      return await response.json();
    } catch (error: any) {
      console.error('Payment intent creation failed:', error);
      
      // Provide helpful error message
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        throw new Error(
          '無法連接到付款伺服器。請確保 API 端點已部署或開發伺服器正在運行。'
        );
      }
      
      throw error;
    }
  },
};

// Legacy API request function for backward compatibility
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  // For Firestore-based endpoints, use the collections directly
  // For other endpoints (like payment), use fetch
  const apiBase = typeof window !== 'undefined' 
    ? (window.location.origin || 'http://localhost:3000')
    : 'http://localhost:3000';
  
  const url = `${apiBase}/api${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}
