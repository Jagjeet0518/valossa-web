import { Urbanist } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import "./globals.css";
import { OurFileRouter } from "./api/uploadthing/core";

const font = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Valossa - AI Thumbnail Generator",
  description: "Valossa - An AI Thumbnail Generator for your content videos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
      <NextSSRPlugin routerConfig={extractRouterConfig(OurFileRouter)} />
        {children}</body>
    </html>
  );
}
