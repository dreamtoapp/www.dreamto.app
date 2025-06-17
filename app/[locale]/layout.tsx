import { AppSidebar } from "@/components/naviqation/app-sidebar";
import Image from "next/image";
import Navbar from "@/components/naviqation/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { isRTL } from "@/i18n/routing";
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { locales } from '@/i18n/routing';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import LangSwitcher from "@/components/naviqation/LangSwicher";
import ThemeSwitch from "@/components/naviqation/ThemeSwitch";
import Setting from "@/components/ui/Setting";
import Link from "@/components/link";
import ClientNavMenus from './ClientNavMenus';

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
      <header className="bg-background border-b border-border p-4">
        <div className="flex justify-between items-center">
          <Link href={`/${locale}`}>
            <div className="flex items-center gap-2">
              <Image src="/assets/dta.svg" alt="DTA Logo" width={40} height={40} style={{height: 'auto'}} priority />
              <h1 className="text-xl font-bold">DreamToApp</h1>
            </div>
          </Link>
          <ClientNavMenus locale={locale} />
        </div>
      </header>
      <main className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
