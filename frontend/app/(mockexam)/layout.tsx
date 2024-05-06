"use client";

import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

import NextTopLoader from "nextjs-toploader";

import ToasterContext from "../context/ToastContext";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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
