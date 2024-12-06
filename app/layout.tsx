import React from 'react';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { cookies } from 'next/headers';

import { AppSidebar } from '@/app/(shared)/components/layout/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/app/(shared)/components/ui/sidebar';
import { cn } from '@/app/(shared)/lib/utils';

import './globals.css';

const roboto = Roboto({
  display: 'swap',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  description: 'Interactive platform for viewing and analyzing data with ease.',
  icons: {
    icon: '/layout-dashboard.svg',
  },
  title: 'Dashboard',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <html lang="en">
      <body className={cn(`${roboto.variable} flex h-full min-h-screen flex-col antialiased`)}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />

          <main className="flex-grow px-2.5 py-1">
            <header>
              <SidebarTrigger />
            </header>

            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
