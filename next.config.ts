import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jcagsas.com",
      },
    ],
  },
};

export default nextConfig;
