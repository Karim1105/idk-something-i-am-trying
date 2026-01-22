import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import SessionProvider from '@/components/providers/SessionProvider';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Weggo - Egypt\'s Trusted Marketplace',
  description: 'Buy and sell with confidence. Verified sellers, secure transactions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <SessionProvider>
          <ThemeProvider>
            <LanguageProvider>
              <Navbar />
              <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
                {children}
              </main>
            </LanguageProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
