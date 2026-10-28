import type { NextConfig } from "next";

const basePath = "/sahyadri-steel-studio";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    // Static export has no image server, so a custom loader builds
    // responsive srcsets from the image CDN (see src/lib/image-loader.ts).
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  allowedDevOrigins: ["192.168.0.164"],
};

export default nextConfig;
