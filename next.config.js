/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["randomuser.me", "platform-lookaside.fbsbx.com"],
  },
  experimental: {
    appDir: true,
  },
};
