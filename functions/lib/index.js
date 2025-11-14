"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const stripe_1 = __importDefault(require("stripe"));
// Initialize Firebase Admin
admin.initializeApp();
// Create Payment Intent Function
exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
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
        const stripeClient = new stripe_1.default(stripeSecretKey, {
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
                customerName: (customerInfo === null || customerInfo === void 0 ? void 0 : customerInfo.name) || '',
                customerEmail: (customerInfo === null || customerInfo === void 0 ? void 0 : customerInfo.email) || '',
                customerPhone: (customerInfo === null || customerInfo === void 0 ? void 0 : customerInfo.phone) || '',
                customerAddress: (customerInfo === null || customerInfo === void 0 ? void 0 : customerInfo.address) || '',
            },
        });
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    }
    catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({
            error: error.message || 'Failed to create payment intent',
        });
    }
});
//# sourceMappingURL=index.js.map