export const dynamic = "force-dynamic";
import { getTranslations } from 'next-intl/server';
import CromboDetail from './component/CromboDetail';
import Services from './component/Services';
import FromIdea from './component/FromIdea';
import WhyChooseUs from './component/WhyChooseUs';
import DesinAndDiscover from './component/DesinAndDiscover';
import Footer from './component/Footer';
import HeroSection from '@/components/NewHero';

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

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('homepage');

  const heroProps = {
    logoAlt: t('logo.alt'),
    tagline: t('tagline'),
    title: t('title'),
    description: t('description'),
    ctaPrimary: t('cta.primary'),
    ctaSecondary: t('cta.secondary'),
    sectionsHero: t('sections.hero'),
  };

  return (
    <div className='flex flex-col gap-4'>

      {/* Enhanced Schema Markup */}
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
              description: t('description'),
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Jeddah',
                addressCountry: 'SA'
              },
              sameAs: [
                'https://www.linkedin.com/company/dreamto',
                'https://twitter.com/dreamtoapp'
              ],
              contactPoint: [{
                '@type': 'ContactPoint',
                telephone: '+966554113107',
                contactType: 'customer service',
                areaServed: 'SA',
                availableLanguage: ['English', 'Arabic']
              }],
              serviceArea: {
                '@type': 'Country',
                name: 'Saudi Arabia'
              }
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'Web Development Services',
              provider: {
                '@type': 'Organization',
                name: t('organization.name')
              },
              description: 'Professional web development, mobile app development, and digital marketing services',
              serviceType: 'Web Development',
              areaServed: 'Saudi Arabia'
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
      <section aria-label={t('sections.hero')} className="relative z-10">
        <HeroSection {...heroProps} locale={locale} />
      </section>
      <section aria-label={t('sections.cromboDetails')} className="grid gap-4 grid-cols-1 md:grid-cols-1">
        <CromboDetail />
      </section>
      <section aria-label={t('fromIdeaTitle')} className="py-4">
        <h2 className="text-2xl font-bold mb-4">{t('fromIdeaTitle')}</h2>
        <FromIdea />
      </section>
      <section aria-label={t('discoverTitle')} className="py-4">
        <h2 className="text-2xl font-bold mb-4">{t('discoverTitle')}</h2>
        <DesinAndDiscover />
      </section>
      <section aria-label={t('services')} className="py-4">
        <h2 className="text-2xl font-bold mb-4">{t('services')}</h2>
        <Services />
      </section>
      <section aria-label={t('whyChooseUs')} className="py-4">
        <h2 className="text-2xl font-bold mb-4">{t('whyChooseUs')}</h2>
        <WhyChooseUs />
      </section>
      <section aria-label="Footer" className="pt-4">
        <h2 className="sr-only">Footer</h2>
        <Footer />
      </section>
    </div>
  );
}
