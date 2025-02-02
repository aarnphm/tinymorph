import "./globals.css"
import type React from "react"
import PlausibleProvider from "next-plausible"

export const metadata = {
  title: "morph-editor.app",
  description: "A simple markdown editor with live preview",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider
          domain="morph-editor.app"
          trackOutboundLinks
          trackFileDownloads
          enabled={process.env.CF_PAGES === "1" || process.env.NODE_ENV === "production"}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
