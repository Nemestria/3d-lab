import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BackToLab from "@/components/ui/BackToLab";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ALE · 3D LAB",
  description: "A 12-project three.js creative-dev lab.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <BackToLab />
        {children}
      </body>
    </html>
  );
}
