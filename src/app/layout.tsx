import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/components/ThemeProvider";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "GeoVision — Enterprise Geospatial Intelligence Platform",
  description: "Unified Geospatial Integration and AI Analytics Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-[var(--bg-app)] text-[var(--text-main)] font-inter antialiased transition-colors duration-200 relative overflow-x-hidden">
        {/* High-Impact Vibrant Ambient Background Layer (Linear / Raycast / Arc / macOS Glass aesthetic) */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Top-Left Vibrant Emerald Glow */}
          <div className="absolute -top-40 -left-40 w-[850px] h-[850px] rounded-full bg-emerald-500/35 dark:bg-emerald-500/40 blur-[130px] animate-slow-drift" />
          
          {/* Top-Right Vivid Cyan / Blue Glow */}
          <div className="absolute -top-20 right-0 w-[900px] h-[900px] rounded-full bg-cyan-400/30 dark:bg-cyan-500/35 blur-[140px] animate-slow-drift [animation-delay:4s]" />
          
          {/* Center-Left Deep Violet Accent Blob */}
          <div className="absolute top-1/3 -left-20 w-[800px] h-[800px] rounded-full bg-purple-600/25 dark:bg-violet-600/35 blur-[150px] animate-slow-drift [animation-delay:8s]" />
          
          {/* Center-Right Royal Blue Glow */}
          <div className="absolute top-1/2 -right-20 w-[850px] h-[850px] rounded-full bg-blue-600/28 dark:bg-blue-600/38 blur-[140px] animate-slow-drift [animation-delay:12s]" />
          
          {/* Bottom-Center Teal / Emerald Ambient Orb */}
          <div className="absolute -bottom-40 left-1/3 w-[900px] h-[900px] rounded-full bg-teal-400/32 dark:bg-teal-500/38 blur-[130px] animate-slow-drift [animation-delay:16s]" />
        </div>

        <ThemeProvider>
          <AuthProvider>
            <div className="relative z-10 h-full">
              {children}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
