import type { NextConfig } from "next"
import { withPlausibleProxy } from "next-plausible"

const nextConfig: NextConfig = withPlausibleProxy()({
  assetPrefix: process.env.NODE_ENV === "production" ? undefined : "",
  transpilePackages: ["next-plausible", "katex", "pseudocode"],
  devIndicators: { appIsrStatus: false },
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
})

export default nextConfig
