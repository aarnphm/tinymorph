import "./globals.css"
import type React from "react"
import PlausibleProvider from "next-plausible"
import { ThemeProvider } from "@/components/theme-provider"
import { VaultProvider } from "@/context/vault-context"
import toJsx from "@/lib/jsx"
import { s } from "hastscript"
import Script from "next/script"

export const metadata = {
  title: "morph-editor.app",
  description: "A simple markdown editor with live preview",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const svgShared = {
    role: "img",
    width: "1em",
    height: "1em",
    focusable: "false",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    ariaLabel: "true",
  }

  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/contrib/copy-tex.min.js" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css"
          integrity="sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <PlausibleProvider domain="morph-editor.app" trackOutboundLinks trackFileDownloads>
          <VaultProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </VaultProvider>
          {toJsx(
            s(
              "svg.morph-icons",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewbox: "0 0 24 24",
                style: "height: 0;",
                "data-singleton": true,
              },
              [
                s(
                  "symbol",
                  {
                    id: "twitter-icon",
                    ...svgShared,
                    viewBox: "64 64 896 896",
                    fill: "var(--gray)",
                  },
                  [
                    s("path", {
                      d: "M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0075-94 336.64 336.64 0 01-108.2 41.2A170.1 170.1 0 00672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 00-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 01-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 01-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z",
                    }),
                  ],
                ),
                s("symbol", { id: "bsky-icon", ...svgShared, viewBox: "0 0 512 512" }, [
                  s("path", {
                    d: "M111.8 62.2C170.2 105.9 233 194.7 256 242.4c23-47.6 85.8-136.4 144.2-180.2c42.1-31.6 110.3-56 110.3 21.8c0 15.5-8.9 130.5-14.1 149.2C478.2 298 412 314.6 353.1 304.5c102.9 17.5 129.1 75.5 72.5 133.5c-107.4 110.2-154.3-27.6-166.3-62.9l0 0c-1.7-4.9-2.6-7.8-3.3-7.8s-1.6 3-3.3 7.8l0 0c-12 35.3-59 173.1-166.3 62.9c-56.5-58-30.4-116 72.5-133.5C100 314.6 33.8 298 15.7 233.1C10.4 214.4 1.5 99.4 1.5 83.9c0-77.8 68.2-53.4 110.3-21.8z",
                    fill: "#1185fe",
                  }),
                ]),
                s("symbol", { id: "github-icon", ...svgShared, viewBox: "64 64 896 896" }, [
                  s("path", {
                    d: "M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z",
                  }),
                ]),
                s(
                  "symbol",
                  {
                    id: "substack-icon",
                    ...svgShared,
                    width: 21,
                    height: 24,
                    viewBox: "0 0 21 24",
                    fill: "#FF6719",
                    role: "img",
                    strokeWidth: "1.8",
                    stroke: "none",
                  },
                  [
                    s(
                      "g",
                      s("path", { d: "M20.9991 5.40625H0V8.24275H20.9991V5.40625Z" }),
                      s("path", { d: "M0 10.8125V24.0004L10.4991 18.1107L21 24.0004V10.8125H0Z" }),
                      s("path", { d: "M20.9991 0H0V2.83603H20.9991V0Z" }),
                    ),
                  ],
                ),
                s("symbol", { id: "arrow-up", viewbox: "0 0 24 24" }, [
                  s("path", {
                    d: "M12 3l7 7-1.4 1.4L13 6.8V21h-2V6.8L6.4 11.4 5 10l7-7z",
                    fill: "currentColor",
                  }),
                ]),
                s("symbol", { id: "arrow-down", viewbox: "0 0 24 24" }, [
                  s("path", {
                    d: "M12 21l-7-7 1.4-1.4L11 17.2V3h2v14.2l4.6-4.6L19 14l-7 7z",
                    fill: "currentColor",
                  }),
                ]),
                s("symbol", { id: "plus-icon", viewbox: "0 0 24 24" }, [
                  s("line", { x1: 12, y1: 5, x2: 12, y2: 19 }),
                  s("line", { x1: 5, y1: 12, x2: 19, y2: 12 }),
                ]),
                s("symbol", { id: "minus-icon", viewbox: "0 0 24 24" }, [
                  s("line", { x1: 5, y1: 12, x2: 19, y2: 12 }),
                ]),
                s("symbol", { id: "circle-icon", viewbox: "0 0 24 24" }, [
                  s("circle", { cx: 12, cy: 12, r: 3 }),
                ]),
                s("symbol", { id: "zoom-in", viewbox: "0 0 24 24" }, [
                  s("path", {
                    d: "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm.5-7H9v2H7v1h2v2h1v-2h2V9h-2z",
                    fill: "currentColor",
                  }),
                ]),
                s("symbol", { id: "close-button", viewbox: "0 0 24 24" }, [
                  s("line", { x1: 18, y1: 6, x2: 6, y2: 18 }),
                  s("line", { x1: 6, y1: 6, x2: 18, y2: 18 }),
                ]),
                s("symbol", { id: "zoom-out", viewbox: "0 0 24 24" }, [
                  s("path", {
                    d: "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z",
                    fill: "currentColor",
                  }),
                ]),
                s("symbol", { id: "expand-sw-ne", viewbox: "0 0 24 24" }, [
                  s("path", {
                    d: "M4 20v-5h2v2.17L17.17 6H15V4h5v5h-2V6.83L6.83 18H9v2z",
                    fill: "currentColor",
                  }),
                ]),
                s("symbol", { id: "expand-e-w", viewbox: "0 0 24 24" }, [
                  s("path", {
                    d: "M3.72 3.72a.75.75 0 011.06 1.06L2.56 7h10.88l-2.22-2.22a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.22-2.22H2.56l2.22 2.22a.75.75 0 11-1.06 1.06l-3.5-3.5a.75.75 0 010-1.06l3.5-3.5z",
                    fillrule: "evenodd",
                  }),
                ]),
                s("symbol", { id: "triple-dots", viewbox: "0 0 24 24" }, [
                  s("circle", { cx: 6, cy: 12, r: 2 }),
                  s("circle", { cx: 12, cy: 12, r: 2 }),
                  s("circle", { cx: 18, cy: 12, r: 2 }),
                ]),
                s("symbol", { id: "github-copy", viewbox: "0 0 24 24" }, [
                  s("path", {
                    fillrule: "evenodd",
                    d: "M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z",
                  }),
                  s("path", {
                    fillrule: "evenodd",
                    d: "M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z",
                  }),
                ]),
                s("symbol", { id: "github-check", viewbox: "0 0 24 24" }, [
                  s("path", {
                    fillrule: "evenodd",
                    fill: "rgb(63, 185, 80)",
                    d: "M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z",
                  }),
                ]),
                s("symbol", { id: "github-anchor", viewbox: "0 0 24 24" }, [
                  s("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
                  s("path", {
                    d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
                  }),
                ]),
                s("symbol", { id: "arrow-ne", viewbox: "0 0 24 24" }, [
                  s("path", { d: "M4.5 11.5l7-7" }),
                  s("path", { d: "M6.5 4.5h5v5" }),
                ]),
                s("symbol", { id: "code-icon", viewbox: "0 0 24 24" }, [
                  s("path", { d: "m18 16 4-4-4-4" }),
                  s("path", { d: "m6 8-4 4 4 4" }),
                  s("path", { d: "m14.5 4-5 16" }),
                ]),
                s("symbol", { id: "refetch-icon", viewbox: "0 0 24 24" }, [
                  s("path", {
                    d: "M17.65 6.35c-1.63-1.63-3.94-2.57-6.48-2.31-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20c3.19 0 5.93-1.87 7.21-4.56.32-.67-.16-1.44-.9-1.44-.37 0-.72.2-.88.53-1.13 2.43-3.84 3.97-6.8 3.31-2.22-.49-4.01-2.3-4.48-4.52C5.31 9.44 8.26 6 12 6c1.66 0 3.14.69 4.22 1.78l-1.51 1.51c-.63.63-.19 1.71.7 1.71H19c.55 0 1-.45 1-1V6.41c0-.89-1.08-1.34-1.71-.71z",
                  }),
                ]),
              ],
            ),
          )}
        </PlausibleProvider>
      </body>
    </html>
  )
}
