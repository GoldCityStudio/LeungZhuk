// Firestore database layer - uses webpack-friendly dynamic imports
import { Product, Order, User } from '@/types';
import { getFirestoreInstance } from './firebaseLoader';
import { dummyProducts } from './dummyData';

// Products collection
export const productsCollection = {
  async getAll(): Promise<Product[]> {
    try {
      const db = await getFirestoreInstance();
      const { loadFirestore } = await import('./firebaseLoader');
      const firestore = await loadFirestore();
      const { collection, getDocs } = firestore;
      
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      
      // If no products in Firestore, return dummy data
      if (products.length === 0) {
        console.log('No products in Firestore, using dummy data');
        return dummyProducts;
      }
      
      return products;
    } catch (error: any) {
      // Silently fallback to dummy data - this is expected if Firestore isn't set up or permissions are missing
      if (error?.message?.includes('Firebase') || 
          error?.message?.includes('Firestore') || 
          error?.message?.includes('Failed to resolve') ||
          error?.message?.includes('Missing or insufficient permissions') ||
          error?.code === 'permission-denied') {
        // Firebase not available or permissions issue, use dummy data
        return dummyProducts;
      }
      console.error('Error fetching products from Firestore, using dummy data:', error);
      // Return dummy data as fallback
      return dummyProducts;
    }
  },

  async getOne(id: string): Promise<Product | null> {
    try {
      const db = await getFirestoreInstance();
      const { loadFirestore } = await import('./firebaseLoader');
      const firestore = await loadFirestore();
      const { doc, getDoc } = firestore;
      
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Product;
      }
      
      // Fallback to dummy data
      return dummyProducts.find(p => p.id === id) || null;
    } catch (error: any) {
      // Silently fallback to dummy data - this is expected if Firestore isn't set up or permissions are missing
      if (error?.message?.includes('Firebase') || 
          error?.message?.includes('Firestore') || 
          error?.message?.includes('Failed to resolve') ||
          error?.message?.includes('Missing or insufficient permissions') ||
          error?.code === 'permission-denied') {
        // Firebase not available or permissions issue, use dummy data
        return dummyProducts.find(p => p.id === id) || null;
      }
      console.error('Error fetching product from Firestore, checking dummy data:', error);
      // Fallback to dummy data
      return dummyProducts.find(p => p.id === id) || null;
    }
  },

  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    try {
      const db = await getFirestoreInstance();
      const { loadFirestore } = await import('./firebaseLoader');
      const firestore = await loadFirestore();
      const { collection, addDoc } = firestore;
      
      const now = new Date().toISOString();
      const newProduct = {
        ...product,
        createdAt: now,
        updatedAt: now,
      };
      
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      return { id: docRef.id, ...newProduct } as Product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Product>): Promise<Product | null> {
    try {
      const db = await getFirestoreInstance();
      const { loadFirestore } = await import('./firebaseLoader');
      const firestore = await loadFirestore();
      const { doc, updateDoc, getDoc } = firestore;
      
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }
      
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      
      const updatedDoc = await getDoc(docRef);
      return { id: updatedDoc.id, ...updatedDoc.data() } as Product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const db = await getFirestoreInstance();
      const { loadFirestore } = await import('./firebaseLoader');
      const firestore = await loadFirestore();
      const { doc, deleteDoc } = firestore;
      
      await deleteDoc(doc(db, 'products', id));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  },
};

// Orders collection
export const ordersCollection = {
  async getAll(): Promise<Order[]> {
    try {
      const db = await getFirestoreInstance();
      const { loadFirestore } = await import('./firebaseLoader');
      const firestore = await loadFirestore();
      const { collection, getDocs, query, orderBy } = firestore;
      
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      } as Order));
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  async getOne(id: string): Promise<Order | null> {
    try {
      const db = await getFirestoreInstance();
      const { loadFirestore } = await import('./firebaseLoader');
      const firestore = await loadFirestore();
      const { doc, getDoc } = firestore;
      
      const docRef = doc(db, 'orders', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Order;
      }
      return null;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  },

  async create(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    try {
      const db = await getFirestoreInstance();
      const { loadFirestore } = await import('./firebaseLoader');
      const firestore = await loadFirestore();
      const { collection, addDoc } = firestore;
      
      const now = new Date().toISOString();
      const newOrder = {
        ...order,
        createdAt: now,
        updatedAt: now,
      };
      
      const docRef = await addDoc(collection(db, 'orders'), newOrder);
      return { id: docRef.id, ...newOrder } as Order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Order>): Promise<Order | null> {
    try {
      const db = await getFirestoreInstance();
      const { loadFirestore } = await import('./firebaseLoader');
      const firestore = await loadFirestore();
      const { doc, updateDoc, getDoc } = firestore;
      
      const docRef = doc(db, 'orders', id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }
      
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      
      const updatedDoc = await getDoc(docRef);
      return { id: updatedDoc.id, ...updatedDoc.data() } as Order;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },
};

// Users collection
export const usersCollection = {
  async getByEmail(email: string): Promise<User | null> {
    try {
      const db = await getFirestoreInstance();
      const { loadFirestore } = await import('./firebaseLoader');
      const firestore = await loadFirestore();
      const { collection, query, where, getDocs } = firestore;
      
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as User;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

  async create(user: Omit<User, 'id'>): Promise<User> {
    try {
      const db = await getFirestoreInstance();
      const { loadFirestore } = await import('./firebaseLoader');
      const firestore = await loadFirestore();
      const { collection, addDoc } = firestore;
      
      const docRef = await addDoc(collection(db, 'users'), user);
      return { id: docRef.id, ...user } as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<User>): Promise<User | null> {
    try {
      const db = await getFirestoreInstance();
      const { loadFirestore } = await import('./firebaseLoader');
      const firestore = await loadFirestore();
      const { doc, updateDoc, getDoc } = firestore;
      
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }
      
      await updateDoc(docRef, updates);
      
      const updatedDoc = await getDoc(docRef);
      return { id: updatedDoc.id, ...updatedDoc.data() } as User;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
};

