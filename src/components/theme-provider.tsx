'use client';

import { useEffect } from 'react';
import { initializeTheme, setTheme } from '@/design-system/runtime';
import type { ThemeMode } from '@/design-system/types';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  useEffect(() => {
    // Initialize the theme system on mount
    initializeTheme();

    // Check if we have a stored theme, if not set the default
    const stored = localStorage.getItem('theme');
    if (!stored && defaultTheme) {
      setTheme(defaultTheme);
    }
  }, [defaultTheme]);

  return <>{children}</>;
}