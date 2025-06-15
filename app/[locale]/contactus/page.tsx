import { getTranslations } from "next-intl/server";
import FormContact from "./component/FormContact";
import { Building2, Mail, MapPin, Phone, Clock, MessageSquare } from "lucide-react";
import Link from "@/components/link";

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

export default async function ContactUs({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const t = await getTranslations("contactus");

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted">
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

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/20 via-primary/10 to-background py-20">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              {t("pagetitle")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t("hint")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Single Column Layout */}
      <div className="container mx-auto px-4 py-16 max-w-2xl flex flex-col items-center">
        {/* Enhanced Contact Form Section */}
        <div className="w-full bg-card/95 rounded-3xl shadow-2xl border border-border p-10 mb-12 relative overflow-hidden transition-all duration-300 hover:shadow-primary/20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8">
              <span className="p-3 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-primary" />
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Send us a Message</h2>
            </div>
            <div className="w-full">
              <FormContact locale={locale} />
            </div>
          </div>
        </div>

        {/* Contact Info Cards - Stacked */}
        <div className="w-full flex flex-col gap-6 items-center">
          {/* Phone */}
          <div className="flex items-center gap-4 w-full bg-card/90 rounded-2xl shadow-lg border border-border p-6">
            <div className="p-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-medium mb-1">Phone</span>
              <Link href="tel:+966554113107" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                +966 55 411 3107
              </Link>
              <span className="text-xs text-muted-foreground mt-1">
                {t('phoneHint')}
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 w-full bg-card/90 rounded-2xl shadow-lg border border-border p-6">
            <div className="p-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-medium mb-1">Email</span>
              <Link href="mailto:info@dreamto.app" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                info@dreamto.app
              </Link>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex items-center gap-4 w-full bg-card/90 rounded-2xl shadow-lg border border-border p-6">
            <div className="p-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-medium mb-1">Business Hours</span>
              <div className="space-y-1 text-base text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
