import type { Metadata } from "next";
import { Toaster } from "sonner";
import { PWARegister } from "@/components/pwa-register";
import { VLibrasWidget } from "@/components/vlibras-widget";
import { MobileSearchButton } from "@/components/mobile-search-button";
import { ProgressBar } from "@/components/progress-bar";
import { ErrorBoundary } from "@/components/error-boundary";
import "./globals.css";
import "./nprogress.css";

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
      <body className="antialiased">
        <ErrorBoundary>
          <ProgressBar />
          <PWARegister />
          {children}
          <MobileSearchButton />
          <VLibrasWidget />
          <Toaster position="top-right" richColors closeButton />
        </ErrorBoundary>
      </body>
    </html>
  );
}
