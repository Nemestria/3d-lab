import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // three ships untranspiled ESM in its addons; Next must transpile it (required once M3/R3F lands).
  transpilePackages: ['three'],
};

export default nextConfig;
