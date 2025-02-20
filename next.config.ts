/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],

    domains: [
      "loremflickr.com",
      "picsum.photos",
      "picsum.photos",
      "avatars.githubusercontent.com",
      "cdn.jsdelivr.net",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
};

export default nextConfig;
