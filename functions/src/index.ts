import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

// Initialize Firebase Admin
admin.initializeApp();

// Create Payment Intent Function
export const createPaymentIntent = functions.https.onRequest(async (req, res) => {
  // CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { total, customerInfo } = req.body;

    // Check if Stripe is configured
    // Try to get from environment variable (set in Firebase Console)
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeSecretKey) {
      res.status(500).json({ 
        error: 'Stripe secret key not configured. Please set STRIPE_SECRET_KEY environment variable in Firebase Console.',
        instructions: 'Go to Firebase Console → Functions → Configuration → Add variable: STRIPE_SECRET_KEY'
      });
      return;
    }
    
    // Reinitialize Stripe with the secret key
    const stripeClient = new Stripe(stripeSecretKey, {
      apiVersion: '2025-10-29.clover',
    });

    if (!total || total <= 0) {
      res.status(400).json({ error: 'Invalid total amount' });
      return;
    }

    // Create payment intent
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        customerName: customerInfo?.name || '',
        customerEmail: customerInfo?.email || '',
        customerPhone: customerInfo?.phone || '',
        customerAddress: customerInfo?.address || '',
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      error: error.message || 'Failed to create payment intent',
    });
  }
});

