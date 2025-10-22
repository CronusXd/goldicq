import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable strict mode and optimize for static output where possible
  reactStrictMode: true,
  output: undefined,
  // Rewrites: allow old .html URLs to resolve to clean routes
  async rewrites() {
    return [
      { source: "/index.html", destination: "/" },
      { source: "/:path*/index.html", destination: "/:path*" },
      { source: "/:path*.html", destination: "/:path*" },
      { source: "/:path*.htm", destination: "/:path*" },
    ];
  },
};

export default nextConfig;
