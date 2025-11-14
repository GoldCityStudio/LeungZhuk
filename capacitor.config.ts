import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.meatshop.app',
  appName: '優質肉類專賣店',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    // No server URL needed - using Firestore directly from client
    // All data operations happen client-side via Firebase
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;

