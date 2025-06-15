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
      title: "LinkedIn",
      icon: technology.linkedin.icon,
      link: "https://linkedin.com/company/dreamtoapp",
    },
    {
      title: "Twitter",
      icon: technology.twitter.icon,
      link: "https://twitter.com/dreamtoapp",
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
          aria-label={item.title}
          className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-primary shadow transition-transform hover:scale-110"
        >
          <item.icon className="w-6 h-6" />
        </Link>
      ))}
    </div>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const t = useTranslations("homepage");
  const footer = useTranslations("footer");
  const year = new Date().getFullYear();

  // Social/contact icons
  const contact = [
    { title: "WhatsApp", icon: contactUs.whatsapp.icon, link: "https://wa.me/" },
    { title: "Contact Form", icon: contactUs.form.icon, link: "#contact-form" },
    { title: "Instagram", icon: technology.instgram.icon, link: "https://instagram.com" },
    { title: "TikTok", icon: contactUs.tiktok.icon, link: "https://tiktok.com" },
    { title: "YouTube", icon: technology.youtube.icon, link: "https://youtube.com" },
    { title: "Snapchat", icon: technology.snapchat.icon, link: "https://snapchat.com" },
  ];

  const quickLinks = [
    { label: t("home"), href: "/" },
    { label: t("services"), href: "/services" },
    { label: t("portfolio"), href: "/portfolio" },
    { label: t("chatWithUs"), href: "/contact" },
  ];

  return (
    <footer className="w-full bg-background text-foreground pt-10 pb-4 px-4 mt-12 border-t border-border shadow-2xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* About / Logo */}
        <div className="flex flex-col items-start gap-3">
          <div className="relative bg-foreground w-20 h-20">

          <Image src="/assets/dta.svg" alt="DreamTo IT Agency" fill className="mb-2 rounded-lg shadow-lg " />
          </div> 
            
          
          <span className="font-bold text-xl tracking-wide">DreamTo IT Agency</span>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            {footer("agencyDescription") }
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick Links" className="flex flex-col gap-2">
          <span className="font-semibold text-lg mb-2 text-foreground">{footer("quickLinks") || "Quick Links"}</span>
          {quickLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors text-white/90 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact Info */}
        <address className="not-italic flex flex-col gap-2 text-base">
          <span className="font-semibold text-lg mb-2">{footer("chatWithUs")  }</span>
          <div className="flex items-center gap-2">
            <contactUs.email.icon className="w-5 h-5 text-primary" />
            <Link href="mailto:info@dreamto.app" className="hover:text-primary transition-colors">info@dreamto.app</Link>
          </div>
          <div className="flex items-center gap-2">
            <contactUs.phone.icon className="w-5 h-5 text-primary" />
            <Link href="tel:+966554113107" className="hover:text-primary transition-colors">966554113107</Link>
          </div>
          <div className="flex items-center gap-2">
            <contactUs.form.icon className="w-5 h-5 text-primary" />
            <Link href="#contact-form" className="hover:text-primary transition-colors">{footer("getInTouch")}</Link>
          </div>
        </address>

        {/* Social Media */}
        <div className="flex flex-col items-start">
          <span className="font-semibold text-lg mb-2">{footer("socialMedia")}</span>
          <ContactAndSocialMedia />
        </div>
      </div>

      {/* Copyright & Legal */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/50">
        <span>&copy; {year} DreamToApp IT Agency. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
