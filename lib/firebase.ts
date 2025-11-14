// Firebase initialization - using dynamic imports for static export compatibility
// This file is kept for backward compatibility but uses dynamic imports

const firebaseConfig = {
  apiKey: "AIzaSyBPIbIpl6ZKRZB7895uiaP319v9DGO9p8g",
  authDomain: "fir-vertex-a-i-s-d-saybci.firebaseapp.com",
  projectId: "firebase-vertex-a-i-s-d-saybci",
  storageBucket: "firebase-vertex-a-i-s-d-saybci.firebasestorage.app",
  messagingSenderId: "773451976021",
  appId: "1:773451976021:web:d9d32bf92a66c37c4cb3dc"
};

// Initialize Firebase only on client side with dynamic imports
let app: any = null;
let auth: any = null;

if (typeof window !== 'undefined') {
  // Use dynamic import to prevent build-time errors
  const loadFirebase = async () => {
    try {
      const loadModule = new Function('modulePath', 'return import(modulePath)');
      const firebaseApp = await loadModule('firebase/app');
      const firebaseAuth = await loadModule('firebase/auth');
      
      if (firebaseApp.getApps().length === 0) {
        app = firebaseApp.initializeApp(firebaseConfig);
      } else {
        app = firebaseApp.getApps()[0];
      }
      
      auth = firebaseAuth.getAuth(app);
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
    }
  };
  
  // Initialize asynchronously
  loadFirebase();
}

export { auth };
export default app;
