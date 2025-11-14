// Firebase module loader - webpack-friendly dynamic imports
// This helps webpack properly track and chunk Firebase modules

let firebaseModules: {
  firestore?: any;
  app?: any;
  auth?: any;
} = {};

const firebaseConfig = {
  apiKey: "AIzaSyBPIbIpl6ZKRZB7895uiaP319v9DGO9p8g",
  authDomain: "fir-vertex-a-i-s-d-saybci.firebaseapp.com",
  projectId: "firebase-vertex-a-i-s-d-saybci",
  storageBucket: "firebase-vertex-a-i-s-d-saybci.firebasestorage.app",
  messagingSenderId: "773451976021",
  appId: "1:773451976021:web:d9d32bf92a66c37c4cb3dc"
};

export async function loadFirebaseApp() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase can only be used on the client side');
  }

  if (!firebaseModules.app) {
    try {
      // Use regular dynamic import - webpack will bundle it properly in dev mode
      // For static builds, this will be handled by the build config
      firebaseModules.app = await import('firebase/app');
    } catch (error) {
      console.error('Failed to load Firebase app:', error);
      throw new Error('Firebase is not available. Please ensure Firebase is installed.');
    }
  }

  // Initialize app if needed
  const { getApps, initializeApp } = firebaseModules.app;
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }

  return firebaseModules.app;
}

export async function loadFirebaseAuth() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Auth can only be used on the client side');
  }

  if (!firebaseModules.auth) {
    try {
      firebaseModules.auth = await import('firebase/auth');
    } catch (error) {
      console.error('Failed to load Firebase auth:', error);
      throw new Error('Firebase Auth is not available.');
    }
  }

  return firebaseModules.auth;
}

export async function loadFirestore() {
  if (typeof window === 'undefined') {
    throw new Error('Firestore can only be used on the client side');
  }

  if (!firebaseModules.firestore) {
    try {
      firebaseModules.firestore = await import('firebase/firestore');
    } catch (error) {
      console.error('Failed to load Firestore:', error);
      throw new Error('Firestore is not available.');
    }
  }

  return firebaseModules.firestore;
}

export async function getFirestoreInstance() {
  const app = await loadFirebaseApp();
  const firestore = await loadFirestore();
  const { getFirestore } = firestore;
  return getFirestore();
}

export async function getAuthInstance() {
  const app = await loadFirebaseApp();
  const auth = await loadFirebaseAuth();
  const { getAuth } = auth;
  return getAuth();
}

