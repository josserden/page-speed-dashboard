'use client';

import React from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableColorScheme
        themes={['light', 'dark']}
      >
        <ToastProvider
          placement="top-center"
          toastProps={{
            classNames: {
              closeButton: 'opacity-100 absolute right-4 top-1/2 -translate-y-1/2',
            },
            color: 'primary',
            hideIcon: true,
            radius: 'sm',
            timeout: 1000,
            variant: 'flat',
          }}
        />
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
