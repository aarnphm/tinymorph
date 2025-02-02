import "./globals.css"
import { Inter, EB_Garamond, Bricolage_Grotesque } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })
const ebGaramond = EB_Garamond({ subsets: ["latin"], variable: "--font-eb-garamond" })
const bricolageGrotesque = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage-grotesque" })

export const metadata = {
  title: "morph-editor.app",
  description: "A simple markdown editor with live preview",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${ebGaramond.variable} ${bricolageGrotesque.variable}`}>{children}</body>
    </html>
  )
}

