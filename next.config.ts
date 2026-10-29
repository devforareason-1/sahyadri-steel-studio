import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash and Pexels resize on their own CDNs, so a custom loader asks
    // them for each size (see src/lib/image-loader.ts) instead of spending
    // Vercel's image-optimisation allowance on photos they already serve.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    qualities: [70, 75, 80],
  },
  allowedDevOrigins: ["192.168.0.164"],
};

export default nextConfig;
