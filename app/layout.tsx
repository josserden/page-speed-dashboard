import React from 'react';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { cn } from '@/app/(shared)/lib/utils';
import { Providers } from '@/app/providers';

import './globals.css';

const roboto = Poppins({
  display: 'swap',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '700', '900'],
});

export const metadata: Metadata = {
  description: 'Interactive platform for viewing and analyzing data with ease.',
  icons: {
    icon: '/layout-dashboard.svg',
  },
  title: 'Dashboard',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(`${roboto.variable} flex flex-col antialiased`)}>
        <Providers>
          <main className="h-full min-h-screen flex-grow">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
