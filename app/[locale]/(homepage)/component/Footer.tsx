"use client";
import { ReactNode, useRef, useState } from 'react';

import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  useLocale,
  useTranslations,
} from 'next-intl';
import Image from 'next/image';

import Link from '@/components/link';


import { buttonVariants } from '../../../../components/ui/button';
import {
  contactUs,
  technology,
} from '../../../../constant/icons';
import { cn } from '../../../../lib/utils';

// Define types for contact items
type ContactItem = {
  title: string;
  icon: React.ElementType;
  link: string;
};

// Contact and Social Media Component
const ContactAndSocialMedia: React.FC = () => {
  const contact: ContactItem[] = [
    {
      title: "WhatsApp",
      icon: contactUs.whatsapp.icon,
      link: "https://wa.me/",
    },
    {
      title: "Contact Form",
      icon: contactUs.form.icon,
      link: "#contact-form",
    },
    {
      title: "Instagram",
      icon: technology.instgram.icon,
      link: "https://instagram.com",
    },
    {
      title: "TikTok",
      icon: contactUs.tiktok.icon,
      link: "https://tiktok.com",
    },
    {
      title: "YouTube",
      icon: technology.youtube.icon,
      link: "https://youtube.com",
    },
    {
      title: "Snapchat",
      icon: technology.snapchat.icon,
      link: "https://snapchat.com",
    },
  ];

  return (
    <div className="mt-6 flex justify-center gap-4 z-50 p-2 rounded-lg">
      {contact.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.title} // Accessibility: Add ARIA label for screen readers
          className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary shadow-md transition-transform hover:scale-110"
        >
          <item.icon className="w-6 h-6" />
        </Link>
      ))}
    </div>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("homepage");
  const footer = useTranslations("footer");
  const [imageError, setImageError] = useState(false);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transformations for zoom and opacity
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div>
      {/* Motion Footer */}
      <motion.footer
        ref={containerRef}
        className="relative text-white py-12 overflow-hidden rounded-xl shadow-lg bg-card"
        style={{
          scale,
          opacity,
        }}
      >
        {/* Background Image with Fallback */}
        <div className="absolute inset-0 w-full h-full">
          {!imageError && (
            <Image
              src="/assets/homepage/footer.webp"
              alt="Footer Background"
              fill
              sizes="100vw"
              priority
              quality={90}
              className="object-cover"
              onError={() => setImageError(true)}
            />
          )}
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-primary/80",
              imageError ? "bg-gradient-to-br from-purple-900 to-blue-900" : ""
            )}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            {/* Main Heading */}
            <div className="text-center space-y-4">
              <p
                className="text-3xl font-extrabold text-foreground drop-shadow-md"
                id="footer-heading"
              >
                {footer("readyToTransform")}
              </p>
              <p className="text-lg text-muted-foreground">
                {footer("buildSomethingGreat")}
              </p>
            </div>

            {/* Dream To App Logo */}
            <div className="bg-white rounded-full w-[120px] h-[120px] flex items-center justify-center shadow-md border-4 border-primary/30">
              <Image
                src="/assets/dta.svg"
                alt="Dream To App Logo"
                width={100}
                height={100}
                priority
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>

            {/* Slogan */}
            <p className="text-2xl font-bold text-primary drop-shadow-md">
              {t("slogon")}
            </p>

            {/* Call-to-Action Button */}
            <Link
              href="https://wa.me/966554113107"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-primary text-primary-foreground hover:bg-primary/90 transform transition shadow-2xl hover:shadow-lg rounded-2xl px-8 py-3 text-lg font-semibold flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary/70"
              )}
              aria-label={t("fromIdeaButton")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 14.487c-.263-.131-1.558-.77-1.799-.858-.241-.088-.417-.131-.593.132-.175.263-.676.858-.83 1.033-.153.175-.307.197-.57.066-.263-.132-1.11-.408-2.114-1.302-.782-.698-1.31-1.561-1.464-1.824-.153-.263-.016-.405.115-.537.118-.117.263-.307.395-.461.132-.153.175-.263.263-.439.088-.175.044-.329-.022-.461-.066-.132-.593-1.433-.813-1.963-.214-.514-.433-.444-.593-.453-.153-.009-.329-.011-.505-.011-.175 0-.46.066-.701.329-.241.263-.92.899-.92 2.191 0 1.292.942 2.541 1.073 2.715.132.175 1.853 2.832 4.5 3.858.63.217 1.12.346 1.503.442.631.161 1.206.138 1.66.084.507-.06 1.558-.637 1.779-1.253.219-.616.219-1.144.153-1.253-.066-.109-.241-.175-.504-.307z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 12c0 5.385-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25 21.75 6.615 21.75 12z" />
              </svg>
              <span>{t("fromIdeaButton")}</span>
            </Link>
          </div>
        </div>
      </motion.footer>

      {/* Contact and Social Media Section */}
      <ContactAndSocialMedia />
    </div>
  );
};

export default Footer;
