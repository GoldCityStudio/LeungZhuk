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
    return null;
  }

  if (!firebaseModules.app) {
    try {
      // Use regular dynamic import - webpack will bundle it properly in dev mode
      // For static builds, this will be handled by the build config
      firebaseModules.app = await import('firebase/app');
    } catch (error) {
      console.warn('Failed to load Firebase app (using dummy data):', error);
      return null;
    }
  }

  try {
    // Initialize app if needed
    const { getApps, initializeApp } = firebaseModules.app;
    if (getApps().length === 0) {
      initializeApp(firebaseConfig);
    }
    return firebaseModules.app;
  } catch (error) {
    console.warn('Failed to initialize Firebase app:', error);
    return null;
  }
}

export async function loadFirebaseAuth() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!firebaseModules.auth) {
    try {
      firebaseModules.auth = await import('firebase/auth');
    } catch (error) {
      console.warn('Failed to load Firebase auth:', error);
      return null;
    }
  }

  return firebaseModules.auth;
}

export async function loadFirestore() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!firebaseModules.firestore) {
    try {
      firebaseModules.firestore = await import('firebase/firestore');
    } catch (error) {
      console.warn('Failed to load Firestore (using dummy data):', error);
      return null;
    }
  }

  return firebaseModules.firestore;
}

export async function getFirestoreInstance() {
  try {
    const app = await loadFirebaseApp();
    if (!app) return null;
    
    const firestore = await loadFirestore();
    if (!firestore) return null;
    
    const { getFirestore } = firestore;
    return getFirestore();
  } catch (error) {
    console.warn('Failed to get Firestore instance:', error);
    return null;
  }
}

export async function getAuthInstance() {
  try {
    const app = await loadFirebaseApp();
    if (!app) return null;
    
    const auth = await loadFirebaseAuth();
    if (!auth) return null;
    
    const { getAuth } = auth;
    return getAuth();
  } catch (error) {
    console.warn('Failed to get Auth instance:', error);
    return null;
  }
}

