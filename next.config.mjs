/** @type {import('next').NextConfig} */

const nextConfig = {
  // toggle the below one only for debugging
  // reactStrictMode: false,
  distDir: "./dist",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "beta.goskribe.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
