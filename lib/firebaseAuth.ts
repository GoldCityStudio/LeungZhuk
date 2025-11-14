import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
  getIdToken,
  getAuth
} from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';

// Initialize Firebase only on client side
const firebaseConfig = {
  apiKey: "AIzaSyBPIbIpl6ZKRZB7895uiaP319v9DGO9p8g",
  authDomain: "fir-vertex-a-i-s-d-saybci.firebaseapp.com",
  projectId: "firebase-vertex-a-i-s-d-saybci",
  storageBucket: "firebase-vertex-a-i-s-d-saybci.firebasestorage.app",
  messagingSenderId: "773451976021",
  appId: "1:773451976021:web:d9d32bf92a66c37c4cb3dc"
};

function getAuthInstance() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Auth can only be used on the client side');
  }
  
  let app;
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  
  return getAuth(app);
}

const auth = typeof window !== 'undefined' ? getAuthInstance() : null;

// Sign in with email and password
export async function signIn(email: string, password: string) {
  if (!auth) {
    throw new Error('Firebase Auth 未初始化');
  }
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    if (!user || !user.email) {
      throw new Error('無法獲取用戶資訊');
    }
    
    // Get the user's ID token
    const token = await getIdToken(user);
    
    // Get or create user in local DB for role management via API
    const dbResponse = await fetch('/api/auth/get-or-create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
    });

    if (!dbResponse.ok) {
      const dbError = await dbResponse.json();
      throw new Error(dbError.error || '無法獲取用戶資料');
    }

    const dbData = await dbResponse.json();
    
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
  if (!auth) {
    throw new Error('Firebase Auth 未初始化');
  }
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get the user's ID token
    const token = await getIdToken(user);
    
    // Create user in local DB for role management via API
    const dbResponse = await fetch('/api/auth/get-or-create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, role: 'user' }),
    });

    const dbData = await dbResponse.json();
    
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
  if (!auth) {
    throw new Error('Firebase Auth 未初始化');
  }
  
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || '登出失敗');
  }
}

// Get current user
export function getCurrentUser(): User | null {
  if (!auth) {
    return null;
  }
  return auth.currentUser;
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: User | null) => void) {
  if (!auth) {
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

// Get ID token
export async function getToken(): Promise<string | null> {
  if (!auth) {
    return null;
  }
  const user = auth.currentUser;
  if (!user) return null;
  return await getIdToken(user);
}

// Verify ID token (for server-side)
export async function verifyIdToken(idToken: string) {
  // This will be handled server-side using Firebase Admin SDK
  // For now, we'll use a simple approach with the client token
  return { token: idToken };
}

