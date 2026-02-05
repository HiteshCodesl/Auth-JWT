import type { NextConfig } from "next";

const nextConfig: NextConfig & { [key: string]: any } = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
