import type { Metadata } from "next";
import { Geist, Hanken_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgroNexus Data Platform",
  description: "Advanced Agricultural Intelligence Core",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${hankenGrotesk.variable} ${geistSans.variable} antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" rel="stylesheet" />
      </head>
      <body className="text-body-md overflow-hidden h-screen flex bg-surface text-on-surface font-sans">
        <SideNav />
        <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-surface-container-low">
          <TopNav />
          <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
