import MillionLint from "@million/lint"
import { withPlausibleProxy } from "next-plausible"

export default MillionLint.next({
  enabled: true,
  rsc: true,
  skipTransform: process.env.NODE_ENV === "production",
  react: "19",
  filter: {
    exclude: "**/components/ui/*.{mtsx,mjsx,tsx,jsx}",
  },
})(
  withPlausibleProxy({
    customDomain: "https://morph-editor.app",
  })({
    assetPrefix: process.env.NODE_ENV === "production" ? undefined : "",
    transpilePackages: ["next-plausible", "katex"],
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
  }),
)
