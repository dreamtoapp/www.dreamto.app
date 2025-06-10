import './globals.css';

import { NextIntlClientProvider } from 'next-intl';
import {
  getLocale,
  getMessages,
} from 'next-intl/server';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';

import { Toaster } from '@/components/ui/sonner';
import { Directions } from '@/constant/enums';
import {
  cairo,
  roboto,
  tajawal,
} from '@/lib/importFonts'; // Import the new fonts
import { ThemeProvider } from '@/provider/theme-provider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={locale === "en" ? Directions.LTR : Directions.RTL}
      suppressHydrationWarning
    >
      {/* <head>
        <Script
          strategy="afterInteractive"
          data-id="101486249"
          src="//static.getclicky.com/js"
        />
      </head> */}
      <body
        className={`min-h-screen bg-background ${roboto.variable} ${tajawal.variable}  ${cairo.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NextTopLoader />
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
