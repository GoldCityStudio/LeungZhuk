import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.meatshop.app',
  appName: '優質肉類專賣店',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    // For development, you can point to your local server
    // url: 'http://localhost:3000',
    // cleartext: true
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;

