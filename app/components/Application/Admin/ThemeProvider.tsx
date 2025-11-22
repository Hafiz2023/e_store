"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...props }) => {
  // 👇 Mounted check prevents SSR hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return nothing on the server to avoid mismatched HTML
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
