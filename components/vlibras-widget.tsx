"use client";

import { useEffect } from "react";

export function VLibrasWidget() {
  useEffect(() => {
    // Check if VLibras script is already loaded
    const existingScript = document.querySelector('script[src*="vlibras-plugin.js"]');

    if (!existingScript) {
      // Create and load VLibras script only once
      const script = document.createElement('script');
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.async = true;
      script.id = 'vlibras-script';

      script.onload = () => {
        // Initialize VLibras after script loads
        if (window.VLibras) {
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        }
      };

      document.body.appendChild(script);
    } else if (window.VLibras) {
      // Script already loaded, just initialize
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    }

    // No cleanup - let VLibras persist across page navigation
  }, []);

  return (
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
  );
}

// Extend Window interface for TypeScript
interface VLibrasWidget {
  new (url: string): void;
}

interface VLibrasAPI {
  Widget: VLibrasWidget;
}

declare global {
  interface Window {
    VLibras: VLibrasAPI;
  }
}
