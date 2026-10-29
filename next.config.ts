import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the sandbox preview host to talk to the dev server.
  allowedDevOrigins: ["*.e2b.app", "*.arena.ai", "localhost", "127.0.0.1"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/book", destination: "/booking", permanent: true },
      { source: "/appointments", destination: "/booking", permanent: true },
      { source: "/dashboard", destination: "/admin", permanent: false },
      { source: "/admin/login", destination: "/login", permanent: false },
      { source: "/team", destination: "/our-team", permanent: true },
      { source: "/locations/lahore-dha", destination: "/locations/dha-lahore", permanent: true },
    ];
  },
};

export default nextConfig;
