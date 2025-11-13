import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: "AED III - Algoritmos e Estruturas de Dados III",
    short_name: "AED III",
    description: "Material didático de Algoritmos e Estruturas de Dados III - IFSULDEMINAS",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2D8C46",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/logoIF.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/logoIF.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    categories: ["education", "productivity"],
    lang: "pt-BR",
    dir: "ltr",
    screenshots: []
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
