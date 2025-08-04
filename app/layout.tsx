import './globals.css';

export const metadata = {
  manifest: '/manifest.json',
  metadataBase: new URL('https://www.dreamto.app'),
  title: {
    default: 'DreamToApp IT Solutions – Digital Innovation Agency',
    template: '%s | DreamToApp IT Solutions',
  },
  description: 'DreamToApp is a leading IT agency offering web, mobile, and cloud solutions. Explore our portfolio, services, and contact us for digital excellence.',
  openGraph: {
    title: 'DreamToApp IT Solutions',
    description: 'Digital innovation, web, mobile, and cloud solutions for your business.',
    url: 'https://www.dreamto.app',
    siteName: 'DreamToApp IT Solutions',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DreamToApp IT Solutions',
      },
    ],
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dreamtoapp',
    title: 'DreamToApp IT Solutions',
    description: 'Digital innovation, web, mobile, and cloud solutions for your business.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: 'https://www.dreamto.app',
    languages: {
      ar: 'https://www.dreamto.app/ar',
      en: 'https://www.dreamto.app/en',
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';
import { getLocale } from 'next-intl/server';
import { Directions } from '@/constant/enums';

import { Toaster } from '@/components/ui/sonner';
import { tajawal } from './font';
import { ThemeProvider } from '@/provider/theme-provider';
import BackToTopWrapper from '@/components/ui/BackToTopWrapper';


// Loading component for suspense boundaries
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={locale === "en" ? Directions.LTR : Directions.RTL}
      suppressHydrationWarning
    >
      <head suppressHydrationWarning>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://static.getclicky.com" />
        <Script
          strategy="afterInteractive"
          data-id="101486249"
          src="//static.getclicky.com/js"
        />
      </head>
      <body className={`${tajawal.className} min-h-screen bg-background antialiased`}>
        <NextTopLoader />

        <main id="main-content" tabIndex={-1} role="main">
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </main>

        <footer role="contentinfo" className="border-t">
          {/* Insert global footer here if needed */}
        </footer>

        <Toaster position="top-right" />
        <BackToTopWrapper />
      </body>
    </html>
  );
}

// To analyze your bundle, run: BUNDLE_ANALYZE=true pnpm build
// import withBundleAnalyzer from '@next/bundle-analyzer';