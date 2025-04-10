'use client';

import { HeroUIProvider } from '@heroui/react';
import React from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableColorScheme
        themes={['light', 'dark']}
      >
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
