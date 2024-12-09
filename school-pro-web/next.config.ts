import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Use 'https' since the URL starts with https://
        hostname: "utfs.io", // Specify the exact hostname
      },
    ],
  },
};

export default nextConfig;
