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
        {/* Enterprise Ambient Background — Deep Navy / Charcoal Foundation */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Base: Subtle dark slate-blue wash — sets the deep foundation */}
          <div className="absolute -top-32 -left-32 w-[900px] h-[900px] rounded-full bg-slate-700/10 dark:bg-slate-800/8 blur-[160px] animate-slow-drift" />
          
          {/* Mid: Soft navy accent — provides depth without color noise */}
          <div className="absolute top-1/3 right-0 w-[800px] h-[800px] rounded-full bg-blue-900/8 dark:bg-blue-950/10 blur-[150px] animate-slow-drift [animation-delay:6s]" />
          
          {/* Accent: Very faint cyan highlight — single subtle brand accent */}
          <div className="absolute -bottom-32 left-1/4 w-[850px] h-[850px] rounded-full bg-cyan-900/6 dark:bg-cyan-950/8 blur-[160px] animate-slow-drift [animation-delay:12s]" />
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
