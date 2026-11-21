import type { NextConfig } from 'next';

// Backend (Express, ../server) dev rejimda 3000-portda ishlaydi.
// /api/* so‘rovlari unga proksi qilinadi — frontend va backend bir domendek ishlaydi.
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${BACKEND_URL}/api/:path*` }];
  },
};

export default nextConfig;
