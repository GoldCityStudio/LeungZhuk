// Firebase Auth - uses webpack-friendly dynamic imports
import { getAuthInstance, loadFirebaseAuth } from './firebaseLoader';

// Sign in with email and password
export async function signIn(email: string, password: string) {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Auth can only be used on the client side');
  }
  
  try {
    const auth = await getAuthInstance();
    const firebaseAuth = await loadFirebaseAuth();
    const { signInWithEmailAndPassword, getIdToken } = firebaseAuth;
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    if (!user || !user.email) {
      throw new Error('無法獲取用戶資訊');
    }
    
    // Get the user's ID token
    const token = await getIdToken(user);
    
    // Get or create user in Firestore for role management
    const { usersCollection } = await import('./firestore');
    let userDoc = await usersCollection.getByEmail(user.email);
    
    if (!userDoc) {
      // Special handling for admin accounts
      let defaultRole = 'user';
      if (user.email === 'admin@meatshop.com' || user.email === 'manager@meatshop.com') {
        defaultRole = 'admin';
      }
      
      userDoc = await usersCollection.create({
        email: user.email,
        password: '', // No password needed with Firebase
        role: defaultRole as 'admin' | 'user',
      });
    }
    
    const dbData = { user: userDoc };
    
    return {
      user: {
        id: user.uid,
        email: user.email,
        role: dbData.user?.role || 'user',
      },
      token,
    };
  } catch (error: any) {
    // Handle Firebase auth errors
    if (error.code === 'auth/user-not-found') {
      throw new Error('用戶不存在');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('密碼錯誤');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('無效的電子郵件地址');
    } else if (error.code === 'auth/user-disabled') {
      throw new Error('帳號已被停用');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('嘗試次數過多，請稍後再試');
    }
    throw new Error(error.message || '登入失敗');
  }
}

// Sign up with email and password
export async function signUp(email: string, password: string) {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Auth can only be used on the client side');
  }
  
  try {
    const auth = await getAuthInstance();
    const firebaseAuth = await loadFirebaseAuth();
    const { createUserWithEmailAndPassword, getIdToken } = firebaseAuth;
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get the user's ID token
    const token = await getIdToken(user);
    
    // Create user in Firestore for role management
    const { usersCollection } = await import('./firestore');
    let userDoc = await usersCollection.getByEmail(email);
    
    if (!userDoc) {
      // Special handling for admin accounts
      let defaultRole = 'user';
      if (email === 'admin@meatshop.com' || email === 'manager@meatshop.com') {
        defaultRole = 'admin';
      }
      
      userDoc = await usersCollection.create({
        email: email,
        password: '', // No password needed with Firebase
        role: defaultRole as 'admin' | 'user',
      });
    }
    
    const dbData = { user: userDoc };
    
    return {
      user: {
        id: user.uid,
        email: user.email,
        role: dbData.user?.role || 'user',
      },
      token,
    };
  } catch (error: any) {
    throw new Error(error.message || '註冊失敗');
  }
}

// Sign out
export async function signOutUser() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Auth can only be used on the client side');
  }
  
  try {
    const auth = await getAuthInstance();
    const firebaseAuth = await loadFirebaseAuth();
    const { signOut } = firebaseAuth;
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || '登出失敗');
  }
}

// Get current user
export async function getCurrentUser() {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const auth = await getAuthInstance();
    return auth.currentUser;
  } catch {
    return null;
  }
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: any | null) => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }
  
  // Load Firebase asynchronously and set up listener
  Promise.all([getAuthInstance(), loadFirebaseAuth()]).then(([auth, firebaseAuth]) => {
    const { onAuthStateChanged } = firebaseAuth;
    onAuthStateChanged(auth, callback);
  }).catch(() => {});
  
  return () => {}; // Return unsubscribe function
}

// Get ID token
export async function getToken(): Promise<string | null> {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const auth = await getAuthInstance();
    const firebaseAuth = await loadFirebaseAuth();
    const { getIdToken } = firebaseAuth;
    const user = auth.currentUser;
    if (!user) return null;
    return await getIdToken(user);
  } catch {
    return null;
  }
}

// Verify ID token (for server-side)
export async function verifyIdToken(idToken: string) {
  // This will be handled server-side using Firebase Admin SDK
  // For now, we'll use a simple approach with the client token
  return { token: idToken };
}
