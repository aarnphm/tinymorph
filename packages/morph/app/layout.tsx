import "./globals.css"
import localFont from "next/font/local"
import type React from "react"
import PlausibleProvider from "next-plausible"

const parcloSerif = localFont({
  src: [
    { path: "@fonts/ParcloSerifStudent-Thin.woff2", weight: "100", style: "normal" },
    { path: "@fonts/ParcloSerifStudent-ThinItalic.woff2", weight: "100", style: "italic" },
    { path: "@fonts/ParcloSerifStudent-Light.woff2", weight: "300", style: "normal" },
    { path: "@fonts/ParcloSerifStudent-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "@fonts/ParcloSerifStudent-Regular.woff2", weight: "400", style: "normal" },
    { path: "@fonts/ParcloSerifStudent-Italic.woff2", weight: "400", style: "italic" },
    { path: "@fonts/ParcloSerifStudent-Medium.woff2", weight: "500", style: "normal" },
    {
      path: "@fonts/ParcloSerifStudent-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    { path: "@fonts/ParcloSerifStudent-SemiBold.woff2", weight: "600", style: "normal" },
    {
      path: "@fonts/ParcloSerifStudent-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    { path: "@fonts/ParcloSerifStudent-Bold.woff2", weight: "700", style: "normal" },
    { path: "@fonts/ParcloSerifStudent-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "@fonts/ParcloSerifStudent-Black.woff2", weight: "800", style: "normal" },
    { path: "@fonts/ParcloSerifStudent-BlackItalic.woff2", weight: "800", style: "italic" },
    { path: "@fonts/ParcloSerifStudent-Ultra.woff2", weight: "950", style: "normal" },
    { path: "@fonts/ParcloSerifStudent-UltraItalic.woff2", weight: "950", style: "italic" },
    { path: "@fonts/ParcloSerifStudent-ExtraBlack.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-parclo-serif",
})
const berkeleyMono = localFont({
  src: [
    { path: "@fonts/BerkeleyMono-Thin.woff2", weight: "100", style: "normal" },
    { path: "@fonts/BerkeleyMono-Thin-Oblique.woff2", weight: "100", style: "italic" },
    { path: "@fonts/BerkeleyMono-ExtraLight.woff2", weight: "200", style: "normal" },
    {
      path: "@fonts/BerkeleyMono-ExtraLight-Oblique.woff2",
      weight: "200",
      style: "italic",
    },
    { path: "@fonts/BerkeleyMono-Light.woff2", weight: "300", style: "normal" },
    { path: "@fonts/BerkeleyMono-Light-Oblique.woff2", weight: "300", style: "italic" },
    { path: "@fonts/BerkeleyMono-SemiLight.woff2", weight: "350", style: "normal" },
    { path: "@fonts/BerkeleyMono-SemiLight-Oblique.woff2", weight: "350", style: "italic" },
    { path: "@fonts/BerkeleyMono-Retina.woff2", weight: "350", style: "normal" },
    { path: "@fonts/BerkeleyMono-Retina-Oblique.woff2", weight: "350", style: "italic" },
    { path: "@fonts/BerkeleyMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "@fonts/BerkeleyMono-Regular-Oblique.woff2", weight: "400", style: "italic" },
    { path: "@fonts/BerkeleyMono-Regular-Book.woff2", weight: "425", style: "normal" },
    {
      path: "@fonts/BerkeleyMono-Regular-Book-Oblique.woff2",
      weight: "425",
      style: "italic",
    },
    { path: "@fonts/BerkeleyMono-Medium.woff2", weight: "500", style: "normal" },
    { path: "@fonts/BerkeleyMono-Medium-Oblique.woff2", weight: "500", style: "italic" },
    { path: "@fonts/BerkeleyMono-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "@fonts/BerkeleyMono-SemiBold-Oblique.woff2", weight: "600", style: "italic" },
    { path: "@fonts/BerkeleyMono-Bold.woff2", weight: "700", style: "normal" },
    { path: "@fonts/BerkeleyMono-Bold-Oblique.woff2", weight: "700", style: "italic" },
    { path: "@fonts/BerkeleyMono-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "@fonts/BerkeleyMono-ExtraBold-Oblique.woff2", weight: "800", style: "italic" },
    { path: "@fonts/BerkeleyMono-Black.woff2", weight: "900", style: "normal" },
    { path: "@fonts/BerkeleyMono-Black-Oblique.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-berkeley-mono",
})

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
      <body className={`${parcloSerif.variable} ${berkeleyMono.variable}`}>{children}</body>
    </html>
  )
}
