import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rose App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
