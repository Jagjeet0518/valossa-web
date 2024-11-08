import { Urbanist } from "next/font/google";
import "./globals.css";

const font = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Valossa - AI Thumbnail Generator",
  description: "Valossa - An AI Thumbnail Generator for your content videos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
