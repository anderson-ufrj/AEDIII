"use client";

import { useEffect, useRef } from "react";

export function VLibrasWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load VLibras script
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;

    script.onload = () => {
      // Initialize VLibras after script loads
      if (window.VLibras && widgetRef.current) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={widgetRef}>
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
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    VLibras: any;
  }
}
