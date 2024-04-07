// Import the MDX plugin
const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to support MDX
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

// Use the MDX plugin
module.exports = withMDX(nextConfig);
