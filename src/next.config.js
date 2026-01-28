/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "slelguoygbfzlpylpxfs.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
