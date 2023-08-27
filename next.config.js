/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@public"] = path.join(__dirname, "public");
    config.resolve.alias["@components"] = path.join(__dirname, "components");
    return config;
  },
};

module.exports = nextConfig;
