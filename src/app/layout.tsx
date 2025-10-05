import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sarabun } from "next/font/google";
import { Tajawal } from "next/font/google";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const sarabun = Sarabun({
  subsets: ["latin"],
  variable: "--font-sarabun",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-tajawal",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Rose App",
  description: "E-commerce app for roses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${sarabun.variable} ${tajawal.variable} ${sarabun.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
