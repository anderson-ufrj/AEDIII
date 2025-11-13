"use client";

import { useEffect } from "react";
import Script from "next/script";

export function VLibrasWidget() {
  useEffect(() => {
    // Initialize VLibras when the script is loaded
    const initVLibras = () => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };

    // Check if VLibras is already loaded
    if (window.VLibras) {
      initVLibras();
    }
  }, []);

  return (
    <>
      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.VLibras) {
            new window.VLibras.Widget('https://vlibras.gov.br/app');
          }
        }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <div vw class="enabled">
              <div vw-access-button class="active"></div>
              <div vw-plugin-wrapper>
                <div class="vw-plugin-top-wrapper"></div>
              </div>
            </div>
          `,
        }}
      />
    </>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    VLibras: any;
  }
}
