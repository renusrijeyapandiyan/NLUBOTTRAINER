/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
    minimumCacheTTL: 86400,
  },
};

module.exports = nextConfig;
