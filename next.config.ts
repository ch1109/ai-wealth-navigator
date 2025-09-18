import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Configure trailing slash
  trailingSlash: true,

  // Disable server-side features for static export
  experimental: {
    // Enable modern bundling
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Optimize for production
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Configure base path if needed for deployment
  // basePath: '/ai-wealth-navigator',

  // Asset prefix for CDN
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/ai-wealth-navigator' : '',
};

export default nextConfig;
