import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { PWARegister } from "@/components/pwa-register";
import { VLibrasWidget } from "@/components/vlibras-widget";
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
  title: "AED III - Ciência da Computação",
  description: "Algoritmos e Estruturas de Dados III - Instituto Federal",
  manifest: "/manifest.json",
  themeColor: "#2D8C46",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AED III",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PWARegister />
        {children}
        <VLibrasWidget />
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
