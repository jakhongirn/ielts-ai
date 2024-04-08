"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

import NextTopLoader from "nextjs-toploader";
import AuthProvider from "../context/AuthContext";
import ToasterContext from "../context/ToastContext";

import { NextPage } from "next";
import { AppProps } from "next/app";


type PageWithLayout = NextPage & {
  disableLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
  children: React.ReactNode;
}

export default function RootLayout({
  children,
  Component,
  pageProps
}: AppPropsWithLayout) {

  const disableLayout = Component.disableLayout || false;

  return (
    
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <NextTopLoader
          color="#006BFF"
          crawlSpeed={300}
          showSpinner={false}
          shadow="none"
        />
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <AuthProvider>
            {!disableLayout && <Header />}
            <ToasterContext />
            <Component {...pageProps}>{children}</Component>
            {!disableLayout && <Footer />}
            <ScrollToTop />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
