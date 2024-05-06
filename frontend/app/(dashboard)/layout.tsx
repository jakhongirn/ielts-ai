"use client";

import ScrollToTop from "@/components/ScrollToTop";
import { Inter as FontSans } from "next/font/google"
import "../globals.css";
import { cn } from "@/lib/utils"


import NextTopLoader from "nextjs-toploader";

import ToasterContext from "../context/ToastContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <NextTopLoader
          color="#006BFF"
          crawlSpeed={300}
          showSpinner={false}
          shadow="none"
        />
            <ToasterContext />
            {children}
            <ScrollToTop />
      </body>
    </html>
  )
}
