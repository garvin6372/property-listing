import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import LayoutWrapper from '@/components/layout-wrapper';
import { SupabaseAuthProvider } from '@/contexts/supabase-auth-context';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { ThemeProvider } from '@/contexts/theme-context';
import { FilterProvider } from '@/contexts/filter-context';

export const metadata: Metadata = {
  title: {
    default: 'Skyvera Listings - Premier Real Estate',
    template: '%s | Skyvera Listings',
  },
  description: 'Find your next property in Dubai and London with Skyvera Listings.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <SupabaseAuthProvider>
            <FilterProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
              <Toaster />
              <WhatsAppButton />
            </FilterProvider>
          </SupabaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}