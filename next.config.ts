import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
