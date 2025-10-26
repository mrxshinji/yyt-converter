import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "card.yuyu-tei.jp",
      },
    ],
  },
};

export default nextConfig;
