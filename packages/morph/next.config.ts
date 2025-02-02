import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enable static file serving from the public directory
  assetPrefix: process.env.NODE_ENV === "production" ? undefined : "",
  // Enable Turbo
  transpilePackages: ["@next/font", "next-plausible"],
  experimental: {
    // Enable Turbo
    turbo: {
      resolveAlias: {
        // Resolve font files from public directory
        "@fonts": "./public/fonts",
      },
    },
  },
  // Configure webpack to handle font files
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: "asset/resource",
      generator: {
        filename: "static/fonts/[name][ext]",
      },
    })
    return config
  },
}

export default nextConfig
