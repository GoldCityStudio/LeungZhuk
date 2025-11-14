#!/bin/bash

# Deploy Firebase Function for Payment Intent

echo "🚀 Deploying Firebase Function..."

# Build the function
cd functions
npm run build
cd ..

# Deploy the function
echo "📦 Deploying to Firebase..."
firebase deploy --only functions:createPaymentIntent

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Get the Function URL from the output above"
echo "2. Update lib/apiClient.ts with the correct Function URL"
echo "3. Set STRIPE_SECRET_KEY in Firebase Console:"
echo "   - Go to Firebase Console → Functions → Configuration"
echo "   - Add environment variable: STRIPE_SECRET_KEY"
echo "4. Rebuild APK: npm run build:apk && npx cap sync android"

