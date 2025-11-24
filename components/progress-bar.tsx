"use client";

import { useEffect } from "react";
import { Suspense } from "react";
import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.1,
});

function ProgressBarImpl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}

export function ProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarImpl />
    </Suspense>
  );
}
