import { ReactNode } from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from '@/components/link';
import { contactUs, technology } from '../../../../constant/icons';
import { cn } from '../../../../lib/utils';
import NewsletterSubscription from './NewsletterSubscription';
import NavbarBrand from '@/components/naviqation/NavbarBrand';

// Define types for contact items
type ContactItem = {
  title: string;
  icon: React.ElementType;
  link: string;
  ariaLabel: string;
};

// Contact and Social Media Component
const ContactAndSocialMedia: React.FC = () => {
  const contact: ContactItem[] = [
    {
      title: "LinkedIn",
      icon: technology.linkedin.icon,
      link: "https://linkedin.com/company/dreamtoapp",
      ariaLabel: "Follow us on LinkedIn"
    },
    {
      title: "Twitter",
      icon: technology.twitter.icon,
      link: "https://twitter.com/dreamtoapp",
      ariaLabel: "Follow us on Twitter"
    },
  ];

  return (
    <div className="mt-6 flex justify-center gap-4 z-50 p-2 rounded-lg" role="group" aria-label="Social media links">
      {contact.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.ariaLabel}
          className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-primary shadow transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          <item.icon className="w-6 h-6" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
};

// Footer Component
const Footer: React.FC = async () => {
  const t = await getTranslations("homepage");
  const footer = await getTranslations("footer");
  const locale = await getLocale();
  const year = new Date().getFullYear();

  // Social/contact icons with proper accessibility
  const contact = [
    {
      title: "WhatsApp",
      icon: contactUs.whatsapp.icon,
      link: "https://wa.me/966554113107",
      ariaLabel: "Contact us on WhatsApp"
    },
    {
      title: "Contact Form",
      icon: contactUs.form.icon,
      link: "#contact-form",
      ariaLabel: "Fill out our contact form"
    },
    {
      title: "Instagram",
      icon: technology.instgram.icon,
      link: "https://instagram.com/dreamtoapp",
      ariaLabel: "Follow us on Instagram"
    },
    {
      title: "TikTok",
      icon: contactUs.tiktok.icon,
      link: "https://tiktok.com/@dreamtoapp",
      ariaLabel: "Follow us on TikTok"
    },
    {
      title: "YouTube",
      icon: technology.youtube.icon,
      link: "https://youtube.com/@dreamtoapp",
      ariaLabel: "Subscribe to our YouTube channel"
    },
    {
      title: "Snapchat",
      icon: technology.snapchat.icon,
      link: "https://snapchat.com/add/dreamtoapp",
      ariaLabel: "Follow us on Snapchat"
    },
  ];

  const quickLinks = [
    { label: t("home"), href: "/" },
    { label: t("services"), href: "/services" },
    { label: t("portfolio"), href: "/worksample" },
    { label: t("chatWithUs"), href: "/contactus" },
    { label: footer("team"), href: "/team" },
  ];

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DreamTo IT Agency",
    "url": "https://dreamto.app",
    "logo": "https://dreamto.app/assets/dta.svg",
    "description": footer("agencyDescription"),
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+966554113107",
      "contactType": "customer service",
      "email": "info@dreamto.app",
      "availableLanguage": ["English", "Arabic"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressRegion": "Riyadh"
    },
    "sameAs": [
      "https://linkedin.com/company/dreamtoapp",
      "https://twitter.com/dreamtoapp",
      "https://instagram.com/dreamtoapp",
      "https://youtube.com/@dreamtoapp"
    ],
    "foundingDate": "2023",
    "serviceArea": {
      "@type": "Country",
      "name": "Saudi Arabia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM Systems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Development"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <footer className="w-full bg-background text-foreground pt-6 pb-3 px-4 mt-8 border-t border-border shadow-lg" role="contentinfo">
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8 lg:items-start">
          {/* About / Logo */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <div className="relative bg-primary/20 w-20 h-20 lg:w-24 lg:h-24 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
              <Image
                src="/assets/dreamtoapp/dreamToApp.svg"
                alt="DreamTo IT Agency Logo"
                width={48}
                height={48}
                className="w-12 h-12 lg:w-14 lg:h-14 block dark:hidden"
                priority={false}
              />
              <Image
                src="/assets/dreamtoapp/dreamToApp-dark.svg"
                alt="DreamTo IT Agency Logo"
                width={48}
                height={48}
                className="w-12 h-12 lg:w-14 lg:h-14 hidden dark:block"
                priority={false}
              />
            </div>

            <h2 className="font-bold text-lg lg:text-xl tracking-wide text-center lg:text-left">DreamTo IT Agency</h2>
            <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed max-w-xs text-center lg:text-left">
              {footer("agencyDescription")}
            </p>

            {/* Newsletter Subscription - Hidden on mobile to save space */}
            <div className="hidden lg:block">
              <NewsletterSubscription />
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick Links" className="flex flex-col gap-2">
            <h3 className="font-semibold text-base lg:text-lg mb-2 text-foreground text-center lg:text-left">{footer("quickLinks")}</h3>
            <ul className="space-y-1 lg:space-y-2">
              {quickLinks.map(link => (
                <li key={link.href} className="text-center lg:text-left">
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors text-foreground/90 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-1 py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <address className="not-italic flex flex-col gap-2 text-sm lg:text-base">
            <h3 className="font-semibold text-base lg:text-lg mb-2 text-center lg:text-left">{footer("chatWithUs")}</h3>
            <div className="space-y-2 lg:space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <contactUs.email.icon className="w-4 h-4 lg:w-5 lg:h-5 text-primary flex-shrink-0" aria-hidden="true" />
                <Link
                  href="mailto:info@dreamto.app"
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-1 py-0.5 text-sm lg:text-base"
                  aria-label="Send us an email"
                >
                  info@dreamto.app
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2">
                <contactUs.form.icon className="w-4 h-4 lg:w-5 lg:h-5 text-primary flex-shrink-0" aria-hidden="true" />
                <Link
                  href="#contact-form"
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-1 py-0.5 text-sm lg:text-base"
                  aria-label="Fill out our contact form"
                >
                  {footer("getInTouch")}
                </Link>
              </div>
            </div>
          </address>

          {/* Social Media */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="font-semibold text-base lg:text-lg mb-2 text-center lg:text-left">{footer("socialMedia")}</h3>
            <div className="grid grid-cols-3 gap-2 lg:gap-3 w-full max-w-xs lg:max-w-none">
              {contact.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  className="w-10 h-10 lg:w-12 lg:h-12 bg-muted rounded-full flex items-center justify-center text-primary shadow transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                >
                  <item.icon className="w-5 h-5 lg:w-6 lg:h-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="mt-6 lg:mt-10 flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4 border-t border-border/10 pt-3 lg:pt-4 text-xs text-muted-foreground">
          <span className="text-center">&copy; {year} DreamToApp IT Agency. {footer("copyright")}.</span>
          <span className="hidden lg:inline">•</span>
          <Link
            href={`/${locale}/privacy`}
            className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-1 py-0.5"
          >
            {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </Link>
          <span className="hidden lg:inline">•</span>
          <Link
            href={`/${locale}/terms`}
            className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-1 py-0.5"
          >
            {locale === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
