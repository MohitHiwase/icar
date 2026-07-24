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
        {/* Ambient Premium Gaussian Background Glows */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-emerald-500/8 dark:bg-emerald-500/10 blur-[120px]" />
          <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full bg-teal-500/6 dark:bg-teal-500/8 blur-[140px]" />
          <div className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] rounded-full bg-blue-500/5 dark:bg-blue-500/8 blur-[130px]" />
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
