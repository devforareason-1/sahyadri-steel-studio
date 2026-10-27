import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/sahyadri-steel-studio",
  allowedDevOrigins: ["192.168.0.164"],
};

export default nextConfig;