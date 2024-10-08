import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MONSTER | HOME",
  description: "social media app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
