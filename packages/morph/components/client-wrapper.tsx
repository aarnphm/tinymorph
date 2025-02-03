"use client";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <NextThemesProvider attribute="class" defaultTheme="system">
      <div className={isMounted ? resolvedTheme : undefined}>
        {children}
      </div>
    </NextThemesProvider>
  );
}
