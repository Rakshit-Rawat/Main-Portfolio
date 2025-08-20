import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "web-portfolio-ecru-two.vercel.app/",
      },
      {
        protocol: "https",
        hostname: "web-portfolio-data.vercel.app/",
      },
    ],
  },
};

export default nextConfig;
