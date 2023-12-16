const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "digital-marketplace-production-67f7.up.railway.app",
    ],
  },
};

module.exports = nextConfig;
