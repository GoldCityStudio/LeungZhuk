# 🔥 Firebase Setup Guide

Your app has been migrated to use **Firestore** for data storage instead of file-based storage. This means:

✅ **No server deployment needed** - Everything works client-side  
✅ **Real-time database** - Firestore provides real-time updates  
✅ **Scalable** - Firebase handles scaling automatically  
✅ **Works in APK** - No API server required for Android app  

## 📋 What Was Changed

1. **Database Layer** (`lib/firestore.ts`)
   - Created Firestore collections for products, orders, and users
   - All CRUD operations now use Firestore

2. **API Client** (`lib/apiClient.ts`)
   - Updated to use Firestore directly instead of HTTP requests
   - No server needed for most operations

3. **Components**
   - Updated all components to use the new Firestore API client
   - Main page now fetches from Firestore

4. **Capacitor Config**
   - Removed server URL requirement
   - App works standalone without a server

## 🚀 Setup Steps

### 1. Enable Firestore in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `firebase-vertex-a-i-s-d-saybci`
3. Go to **Firestore Database**
4. Click **Create Database**
5. Choose **Start in test mode** (for development)
6. Select a location (e.g., `asia-east1` for Hong Kong)

### 2. Set Firestore Security Rules

Go to **Firestore Database** > **Rules** and set:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - readable by all, writable by authenticated admins
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Orders - readable/writable by authenticated users
    match /orders/{orderId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        (resource.data.customerEmail == request.auth.token.email ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Users - readable by authenticated users, writable by system
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        (resource.data.email == request.auth.token.email ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

### 3. Initialize Data

After setting up Firestore, you can initialize sample data:

1. Run the app: `npm run dev`
2. Log in as admin
3. Go to Admin Dashboard
4. Click **初始化假資料** button

This will create sample products, users, and orders in Firestore.

## ⚠️ Important Notes

### Payment Intent (Stripe)

The payment intent creation still needs a server-side endpoint because Stripe secret keys must be kept secure.

**Options:**

1. **Keep using Next.js API route** (for development)
   - The payment API still uses the `/api/create-payment-intent` endpoint
   - This requires running `npm run dev` for payments to work

2. **Deploy a Firebase Function** (recommended for production)
   - Create a single Firebase Function for payment intent creation
   - This is the only server-side code needed

### Firebase Auth

Firebase Authentication is already configured and working. Users are automatically created in Firestore when they sign up.

## 📱 Android APK

The Android app now works **completely standalone**:

- ✅ No server URL needed in Capacitor config
- ✅ All data operations use Firestore directly
- ✅ Works offline (with Firestore offline persistence)
- ⚠️ Payment still needs server (see above)

## 🔒 Security

For production, update Firestore security rules to be more restrictive:

```javascript
// Production rules example
match /products/{productId} {
  allow read: if true;
  allow write: if request.auth != null && 
    exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

## 📚 Next Steps

1. ✅ Enable Firestore in Firebase Console
2. ✅ Set up security rules
3. ✅ Initialize sample data
4. ⚠️ Set up Firebase Function for payments (optional, for production)
5. ✅ Build and test APK

Your app is now ready to use Firebase! 🎉

