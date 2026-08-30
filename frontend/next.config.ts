import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pins the workspace root so the build ignores the unrelated postcss/tailwind
  // configs and lockfile sitting in the home directory above this repo.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
