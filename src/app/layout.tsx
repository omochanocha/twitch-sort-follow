import { Noto_Sans_JP } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { siteConfig } from '@/config';

import { AutoRefreshSession } from '../components/AutoRefreshSession';
import { Header } from '../components/Header';
import { ThemeProvider } from '../components/Theme-provider';

import type { Metadata } from 'next';

import './globals.css';

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <SessionProvider>
      <html lang="ja" suppressHydrationWarning>
        <AutoRefreshSession />
        <body
          className={`${notoSansJP.className} grid min-h-svh grid-rows-[auto_1fr] bg-slate-100 antialiased dark:bg-background dark:text-foreground`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="py-8">{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
