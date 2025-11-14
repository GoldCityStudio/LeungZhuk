import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.meatshop.app',
  appName: '優質肉類專賣店',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    // For production: Set this to your deployed API URL
    // url: process.env.NEXT_PUBLIC_API_URL || 'https://your-app.vercel.app',
    // For local development/testing:
    // url: 'http://YOUR_LOCAL_IP:3000', // Replace YOUR_LOCAL_IP with your computer's IP
    // cleartext: true, // Only needed for HTTP (not HTTPS)
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;

