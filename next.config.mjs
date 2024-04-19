/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV !== "production",
    },
  },
};

export default nextConfig;
