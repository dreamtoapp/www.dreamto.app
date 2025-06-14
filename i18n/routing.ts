import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

// Simple locale configuration
export const locales = ['en', 'ar'] as const;
export const defaultLocale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

// Navigation utilities
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);

// Simple helper for RTL support
export const isRTL = (locale: string) => locale === 'ar';