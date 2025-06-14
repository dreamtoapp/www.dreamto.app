export const metadata = {
  title: 'Contact Us | DreamTo IT Solutions',
  description: 'Reach out to DreamTo for IT solutions, web, mobile, and cloud consulting.',
  openGraph: {
    title: 'Contact Us | DreamTo IT Solutions',
    description: 'Contact our expert team for digital innovation.',
    url: 'https://www.dreamto.app/contactus',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dreamtoapp',
    title: 'Contact Us | DreamTo IT Solutions',
    description: 'Contact our expert team for digital innovation.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.dreamto.app/contactus',
  },
};

import { getTranslations } from "next-intl/server";
import FormContact from "./component/FormContact";
export default async function ContactUs({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // const locale = await params.locale;
  const locale = (await params).locale;
  const t = await getTranslations("contactus");

  return (
    <div>
      {/* ContactPage & BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'ContactPage',
              name: 'Contact Us',
              description: 'Reach out to DreamTo for IT solutions, web, mobile, and cloud consulting.',
              url: 'https://www.dreamto.app/contactus',
              publisher: {
                '@type': 'Organization',
                name: 'DreamTo IT Solutions',
                url: 'https://www.dreamto.app'
              }
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.dreamto.app'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Contact Us',
                  item: 'https://www.dreamto.app/contactus'
                }
              ]
            }
          ])
        }}
      />
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-muted via-background to-muted py-8 px-2 sm:px-0 relative">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="bg-card/90 rounded-3xl shadow-2xl border border-border max-w-2xl w-full p-6 sm:p-10 relative overflow-hidden transition-transform duration-300 hover:scale-105">
          <div className="flex flex-col items-center mb-6">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 shadow-lg mb-3 animate-fade-in text-primary">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z" fill="currentColor"/>
              </svg>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2 text-center font-cairo drop-shadow-sm">
              {t("pagetitle")}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-2 text-center font-cairo">
              {t("hint")}
            </p>
          </div>
          <FormContact locale={locale} />
        </div>
      </div>
    </div>
  );
}
