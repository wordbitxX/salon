import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Arena's preview serves the dev app through an e2b.app proxy.
  allowedDevOrigins: ["*.e2b.app", "arena.ai", "*.arena.ai"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/book", destination: "/booking", permanent: true },
      { source: "/appointments", destination: "/booking", permanent: true },
      { source: "/team", destination: "/our-team", permanent: true },
      { source: "/locations/lahore-dha", destination: "/locations/dha-lahore", permanent: true },
    ];
  },
};

export default nextConfig;
