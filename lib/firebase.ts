import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBPIbIpl6ZKRZB7895uiaP319v9DGO9p8g",
  authDomain: "fir-vertex-a-i-s-d-saybci.firebaseapp.com",
  projectId: "firebase-vertex-a-i-s-d-saybci",
  storageBucket: "firebase-vertex-a-i-s-d-saybci.firebasestorage.app",
  messagingSenderId: "773451976021",
  appId: "1:773451976021:web:d9d32bf92a66c37c4cb3dc"
};

// Initialize Firebase only on client side
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (typeof window !== 'undefined') {
  // Only initialize on client side
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  
  // Initialize Firebase Auth
  auth = getAuth(app);
}

export { auth };
export default app;

