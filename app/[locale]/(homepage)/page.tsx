export const dynamic = "force-dynamic";
import { getTranslations } from 'next-intl/server';
import { getIpInfo } from '../../../lib/actions/getIp';
import Hero from '../../../components/ui/hero';
import CromboDetail from './component/CromboDetail';
import HomePageBody from './component/HomePageBody';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('homepage');

  return {
    title: {
      default: t('title'),
      template: '%s | DreamToApp IT Solutions',
    },
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
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
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@dreamtoapp',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: 'https://www.dreamto.app',
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
  };
}

export default async function Page() {
  const ipInfo = await getIpInfo();
  const t = await getTranslations('homepage');

  return (
    <div className='flex flex-col gap-4'>
      {/* Organization & BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: t('organization.name'),
              url: 'https://www.dreamto.app',
              logo: 'https://www.dreamto.app/og-image.png',
              sameAs: [
                'https://www.linkedin.com/company/dreamto',
                'https://twitter.com/dreamtoapp'
              ],
              contactPoint: [{
                '@type': 'ContactPoint',
                telephone: '+966554113107',
                contactType: 'customer service',
                areaServed: 'SA',
                availableLanguage: ['English','Arabic']
              }]
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: t('breadcrumb.home'),
                  item: 'https://www.dreamto.app'
                }
              ]
            }
          ])
        }}
      />
      {/* <main id="main-content" role="main" className="flex flex-col gap-4 p-4 sm:p-6 md:p-8"> */}
        <section aria-label={t('sections.hero')}>
          <Hero />
        </section>
        <section aria-label={t('sections.cromboDetails')} className="grid gap-4 grid-cols-1 md:grid-cols-1">
          <CromboDetail />
        </section>
        <section aria-label={t('sections.homepageBody')} className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 md:min-h-min max-w-full mx-auto p-2">
          <HomePageBody />
        </section>
      {/* </main> */}
    </div>
  );
}
