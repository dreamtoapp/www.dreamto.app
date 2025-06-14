// SEO Metadata utility for Next.js App Router
import { Metadata } from 'next';

export function getDefaultMetadata(locale: string): Metadata {
  return {
    title: {
      default: 'DreamTo IT Solutions – Digital Innovation Agency',
      template: '%s | DreamTo IT Solutions',
    },
    description: 'DreamTo is a leading IT agency offering web, mobile, and cloud solutions. Explore our portfolio, services, and contact us for digital excellence.',
    openGraph: {
      title: 'DreamTo IT Solutions',
      description: 'Digital innovation, web, mobile, and cloud solutions for your business.',
      url: 'https://www.dreamto.app',
      siteName: 'DreamTo IT Solutions',
      images: [
        {
          url: 'https://www.dreamto.app/og-image.png',
          width: 1200,
          height: 630,
          alt: 'DreamTo IT Solutions',
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@dreamtoapp',
      title: 'DreamTo IT Solutions',
      description: 'Digital innovation, web, mobile, and cloud solutions for your business.',
      images: ['https://www.dreamto.app/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: '/favicon.ico',
    },
    alternates: {
      canonical: 'https://www.dreamto.app',
      languages: {
        ar: 'https://www.dreamto.app/ar',
        en: 'https://www.dreamto.app/en',
      },
    },
  };
}
