import type { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://amplificationofpotential.com"),
  icons: {
    icon: [
      { url: "/amplificationofpotential/favicon.ico", sizes: "any" },
      { url: "/amplificationofpotential/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/amplificationofpotential/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/amplificationofpotential/favicon.ico",
    apple: "/amplificationofpotential/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <GoogleAnalytics gaId="G-P6MRLB7Q6Q" />
      </body>
    </html>
  )
}
