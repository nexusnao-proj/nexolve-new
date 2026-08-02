import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  // Keep Next's file tracing inside this project when a parent directory also
  // contains a lockfile (common in local Windows workspaces).
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
