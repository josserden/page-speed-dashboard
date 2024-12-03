import React from "react";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

const roboto = Roboto({
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  description: "Interactive platform for viewing and analyzing data with ease.",
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="images/favicons/dashboard.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
      </head>

      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
