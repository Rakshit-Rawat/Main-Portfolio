import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false,

  images: {
    domains: [
      "www.google.com",
      "web-portfolio-ecru-two.vercel.app/",
      "web-portfolio-data.vercel.app/",
    ],
  },
};

export default nextConfig;
