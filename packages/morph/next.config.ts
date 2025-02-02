import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  assetPrefix: process.env.NODE_ENV === "production" ? undefined : "",
  transpilePackages: ["next-plausible"],
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
