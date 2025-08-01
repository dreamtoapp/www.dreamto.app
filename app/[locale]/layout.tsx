import Image from "next/image";
import { isRTL } from "@/i18n/routing";
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { locales } from '@/i18n/routing';
import Link from "@/components/link";
import Navbar from '@/components/naviqation/navbar';
import FloatingConsultationCTA from '@/components/ui/FloatingConsultationCTA';

type Locale = typeof locales[number];

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      template: '%s | DreamToApp',
      default: 'DreamTo - Your Dream Platform',
    },
    description: 'DreamTo - Your platform for dreams and aspirations',
    metadataBase: new URL('https://dreamto.app'),
    alternates: {
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen" dir={isRTL(locale) ? 'rtl' : 'ltr'}>
      <Navbar locale={locale} />
      <main className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </main>
      <FloatingConsultationCTA />
    </div>
  );
}

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
