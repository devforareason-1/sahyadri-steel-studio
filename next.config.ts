import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash and Pexels resize on their own CDNs, so a custom loader asks
    // them for each size (see src/lib/image-loader.ts) instead of spending
    // Vercel's image-optimisation allowance on photos they already serve.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    qualities: [60, 70, 75, 80],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Stops other sites framing this one. A fuller Content-Security-Policy
          // needs a nonce for the inline JSON-LD and hero scripts.
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
    ];
  },
  allowedDevOrigins: ["192.168.0.164"],
};

export default nextConfig;
