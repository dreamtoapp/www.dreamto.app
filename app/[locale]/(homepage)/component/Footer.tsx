"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import dreamtoapp from "@/public/assets/dta.svg";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "../../../../lib/utils";
import Text from "../../../../components/Text";
import { buttonVariants } from "../../../../components/ui/button";
import { Icon, IconifyIcon } from "@iconify/react";
import backgroundImg from "@/public/assets/homepage/footer.webp";
import { contactUs, technology } from "../../../../constant/icons";

// Define types for contact items
type ContactItem = {
  title: string;
  icon: IconifyIcon; // Change type to IconifyIcon
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
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.title} // Accessibility: Add ARIA label for screen readers
          className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary shadow-md transition-transform hover:scale-110"
        >
          <Icon icon={item.icon} className="w-6 h-6" />
        </a>
      ))}
    </div>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("homepage");
  const locale = useLocale();
  const footer = useTranslations("footer");

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Trigger animations as the footer enters and exits the viewport
  });

  // Transformations for zoom and opacity
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]); // Smooth zoom effect
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]); // Fade-in effect

  return (
    <div>
      {/* Motion Footer */}
      <motion.footer
        ref={containerRef}
        className="relative text-white py-12 overflow-hidden rounded-xl shadow-lg"
        style={{
          scale, // Apply zoom effect
          opacity, // Apply fade effect
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={backgroundImg}
            alt="Background Image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            quality={100}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>{" "}
          {/* Overlay for contrast */}
        </div>

        {/* Content */}
        <div className="container mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            {/* Main Heading */}
            <div className="text-center space-y-4">
              <Text
                variant="h3"
                locale={locale}
                className="text-3xl font-extrabold text-white drop-shadow-md"
                cairoFont
                id="footer-heading" // Accessibility: Add ID for screen readers
              >
                {footer("readyToTransform")}
              </Text>
              <Text
                variant="p"
                locale={locale}
                className="text-lg text-gray-200"
                cairoFont
              >
                {footer("buildSomethingGreat")}
              </Text>
            </div>

            {/* Dream To App Logo */}
            <div className="bg-white rounded-full w-[150px] h-[150px] flex items-center justify-center shadow-md">
              <Image
                src={dreamtoapp}
                alt="Dream To App Logo"
                width={140}
                height={120}
                priority
                className="object-contain"
              />
            </div>

            {/* Slogan */}
            <Text
              variant="h2"
              locale={locale}
              className="text-3xl font-bold text-purple-500 drop-shadow-md"
              cairoFont
            >
              {t("slogon")}
            </Text>

            {/* Call-to-Action Button */}
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-gradient-to-r from-pink-500 to-blue-500 text-white transform transition shadow-2xl hover:shadow-lg rounded-2xl px-8 py-3"
              )}
              aria-label={t("fromIdeaButton")} // Accessibility: Add ARIA label
            >
              <Text
                variant="h2"
                locale={locale}
                className="text-lg font-semibold"
              >
                {t("fromIdeaButton")}
              </Text>
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
