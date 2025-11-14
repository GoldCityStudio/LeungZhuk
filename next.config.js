/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.BUILD_APK === 'true' ? 'export' : undefined,
  images: {
    unoptimized: process.env.BUILD_APK === 'true',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    // API URL for payment endpoint - set this to your deployed API (e.g., Vercel URL)
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
  webpack: (config, { isServer }) => {
    // For static exports, minimize chunk splitting to avoid loading issues
    if (!isServer && process.env.BUILD_APK === 'true') {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxAsyncRequests: 3,
          maxInitialRequests: 2,
          cacheGroups: {
            default: false,
            vendors: false,
          },
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig

