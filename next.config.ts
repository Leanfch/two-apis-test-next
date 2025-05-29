import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media1.giphy.com',
        port: '',
        pathname: '/media/**',
      },
    ],
  },  
};

export default nextConfig;
