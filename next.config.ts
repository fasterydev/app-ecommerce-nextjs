import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
