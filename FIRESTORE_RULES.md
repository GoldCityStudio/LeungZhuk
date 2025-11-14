# 🔥 Firestore Security Rules Setup

## Current Issue
You're getting "Missing or insufficient permissions" errors. This means Firestore is connecting, but the security rules are blocking access.

## Quick Fix: Set Permissive Rules (Development Only)

Go to [Firebase Console](https://console.firebase.google.com/) → Your Project → **Firestore Database** → **Rules**

### Option 1: Open for Development (NOT for Production!)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents (DEVELOPMENT ONLY!)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **WARNING:** This allows anyone to read/write your database. Only use for development!

### Option 2: Proper Security Rules (Recommended)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - readable by all, writable by authenticated admins
    match /products/{productId} {
      allow read: if true; // Anyone can read products
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
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

## Steps to Fix

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `firebase-vertex-a-i-s-d-saybci`
3. Click **Firestore Database** in the left menu
4. Click the **Rules** tab
5. Paste one of the rule sets above
6. Click **Publish**

## Current Behavior

The app will automatically fall back to **dummy data** when Firestore permissions are missing, so your app will still work! The error is just a warning - products will load from dummy data instead.

## After Setting Rules

Once you publish the rules:
1. Wait a few seconds for them to propagate
2. Refresh your browser
3. Products should load from Firestore (if you have data) or dummy data (if Firestore is empty)

