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
  metadataBase: new URL("https://aed3.vercel.app"),
  title: {
    default: "AED III - Algoritmos e Estruturas de Dados III",
    template: "%s | AED III",
  },
  description:
    "Plataforma educacional interativa para a disciplina de Algoritmos e Estruturas de Dados III do IFSULDEMINAS. Aprenda árvores balanceadas, tabelas hash, compressão e muito mais.",
  keywords: [
    "algoritmos",
    "estruturas de dados",
    "árvore AVL",
    "árvore rubro-negra",
    "árvore B",
    "tabela hash",
    "compressão",
    "IFSULDEMINAS",
    "ciência da computação",
  ],
  authors: [{ name: "Anderson Henrique da Silva" }],
  creator: "Anderson Henrique da Silva",
  publisher: "IFSULDEMINAS",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://aed3.vercel.app",
    siteName: "AED III",
    title: "AED III - Algoritmos e Estruturas de Dados III",
    description:
      "Plataforma educacional interativa com visualizadores de árvores, compilador C/C++ online e conteúdo didático completo.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AED III - Plataforma Educacional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AED III - Algoritmos e Estruturas de Dados III",
    description:
      "Aprenda estruturas de dados avançadas com visualizadores interativos e compilador online.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AED III",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
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
