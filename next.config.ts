import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    domains: ["*"],
  },
};

module.exports = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
export default nextConfig;
