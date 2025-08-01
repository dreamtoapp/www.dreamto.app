import { getTranslations } from "next-intl/server";
import FormContact from "./component/FormContact";
import { Building2, Mail, MapPin, Phone, Clock, MessageSquare, Star, Users, Award, Zap } from "lucide-react";
import Link from "@/components/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: 'Contact Us | DreamToApp - Web Development Agency in Jeddah',
  description: 'Get in touch with DreamToApp for professional web development, mobile apps, and digital solutions in Jeddah, Saudi Arabia.',
  openGraph: {
    title: 'Contact Us | DreamToApp - Web Development Agency in Jeddah',
    description: 'Professional web development, mobile apps, and digital solutions in Jeddah, Saudi Arabia.',
    url: 'https://www.dreamto.app/contactus',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dreamtoapp',
    title: 'Contact Us | DreamToApp - Web Development Agency in Jeddah',
    description: 'Professional web development, mobile apps, and digital solutions in Jeddah, Saudi Arabia.',
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'ContactPage',
              name: 'Contact Us - DreamToApp',
              description: 'Get in touch with DreamToApp for professional web development services in Jeddah, Saudi Arabia.',
              url: 'https://www.dreamto.app/contactus',
              publisher: {
                '@type': 'LocalBusiness',
                name: 'DreamToApp',
                url: 'https://www.dreamto.app',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Jeddah',
                  addressCountry: 'SA'
                },
                telephone: '+966554113107',
                email: 'info@dreamto.app'
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

      {/* Refined Hero Section */}
      <div className="relative bg-background border-b border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("pagetitle")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("hint")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Clean Two Column Layout */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">

          {/* Refined Contact Form Section */}
          <div className="order-2 lg:order-1">
            <Card className="border-0 shadow-xl bg-card">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">{t("sendUsMessage")}</h2>
                  <p className="text-muted-foreground">{t("wellGetBackToYou")}</p>
                </div>

                <FormContact locale={locale} />
              </CardContent>
            </Card>
          </div>

          {/* Refined Contact Info Section */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">{t("getInTouch")}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t("getInTouchSubtitle")}
                </p>
              </div>

              {/* Simplified Contact Info */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-xl">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t("phone")}</h4>
                    <Link
                      href="tel:+966554113107"
                      className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      +966 55 411 3107
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('phoneHint')}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-xl">
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t("email")}</h4>
                    <Link
                      href="mailto:info@dreamto.app"
                      className="text-lg font-semibold text-secondary hover:text-secondary/80 transition-colors"
                    >
                      info@dreamto.app
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t("weRespondWithin2Hours")}
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-xl">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t("businessHours")}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>{t("mondayFriday")}</p>
                      <p>{t("saturday")}</p>
                      <p>{t("sunday")}</p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-xl">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t("location")}</h4>
                    <p className="text-lg font-semibold text-primary">{t("jeddahSaudiArabia")}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t("servingClientsWorldwide")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Simplified WhatsApp CTA */}
              <div className="mt-8 p-6 bg-secondary/5 rounded-xl border border-secondary/20">
                <h4 className="font-semibold text-foreground mb-2">{t("needImmediateHelp")}</h4>
                <p className="text-muted-foreground mb-4 text-sm">
                  {t("getInstantSupport")}
                </p>
                <Link href="https://wa.me/966554113107" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" className="mr-2">
                      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.497.813 4.902 2.35 6.962L4.06 28.062a1 1 0 0 0 1.25 1.25l6.1-2.29A12.948 12.948 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10 0 5.522-4.477 10-10 10a10.95 10.95 0 0 1-5.367-1.45 1 1 0 0 0-.824-.073l-4.176 1.567 1.567-4.176a1 1 0 0 0-.073-.824A10.95 10.95 0 0 1 6 15c0-5.523 4.477-10 10-10zm-3.167 6.167c-.217-.484-.447-.495-.66-.504l-.563-.009a1.13 1.13 0 0 0-.82.383c-.234.27-.82.801-.82 1.953 0 1.152.84 2.265.957 2.422.117.157 1.61 2.574 3.98 3.507 1.97.777 2.37.622 2.797.584.427-.038 1.377-.562 1.572-1.104.195-.542.195-1.006.137-1.104-.058-.098-.214-.156-.447-.273-.234-.117-1.377-.679-1.59-.757-.212-.078-.366-.117-.52.117-.156.234-.599.757-.734.914-.136.156-.268.176-.502.059-.234-.117-.987-.364-1.88-1.162-.695-.62-1.164-1.385-1.302-1.619-.136-.234-.015-.36.102-.477.104-.104.234-.27.351-.406.117-.137.156-.234.234-.39.078-.156.039-.293-.02-.41-.058-.117-.52-1.293-.734-1.777z"></path>
                    </svg>
                    {t("chatOnWhatsApp")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
