import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The parent-brand exploration became the home page.
    return [{ source: "/explore", destination: "/", permanent: true }];
  },
};

export default nextConfig;
