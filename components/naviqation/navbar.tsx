"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Globe, Sun, Moon } from "lucide-react";
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LangSwicher from "./LangSwicher";
import ThemeSwitch from "./ThemeSwitch";
import { normalIcons, serviceIcon, misc, technology } from "@/constant/icons";

// Error Boundary Component
class NavbarErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Navbar Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
          <div className="container mx-auto px-4 h-20">
            <div className="flex items-center justify-between h-full">
              <Link href="/" className="text-lg font-bold">
                DreamToApp
              </Link>
              <nav className="hidden md:flex items-center gap-4">
                <Link href="/" className="text-sm font-medium hover:text-primary">Home</Link>
                <Link href="/services" className="text-sm font-medium hover:text-primary">Services</Link>
                <Link href="/worksample" className="text-sm font-medium hover:text-primary">Portfolio</Link>
                <Link href="/contactus" className="text-sm font-medium hover:text-primary">Contact</Link>
              </nav>
            </div>
          </div>
        </header>
      );
    }

    return this.props.children;
  }
}

// Enhanced Brand Component with Logo
const NavbarBrand: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('navbar');

  const getLogoPath = (isDark: boolean = false): string => {
    return isDark
      ? "/assets/dreamtoapp/dreamToApp-dark.svg"
      : "/assets/dreamtoapp/dreamToApp.svg";
  };

  return (
    <Link
      href={`/${locale}`}
      className="flex items-center group transition-all duration-300 hover:scale-105"
      aria-label={t("dreamToAppHome")}
    >
      <div className="relative">
        <Image
          src={getLogoPath(false)}
          alt={t("dreamToAppLogo")}
          width={48}
          height={48}
          className="w-10 h-10 md:w-12 md:h-12 block dark:hidden transition-all duration-300 group-hover:rotate-3"
          priority
        />
        <Image
          src={getLogoPath(true)}
          alt={t("dreamToAppLogo")}
          width={48}
          height={48}
          className="w-10 h-10 md:w-12 md:h-12 hidden dark:block transition-all duration-300 group-hover:rotate-3"
          priority
        />
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      </div>
    </Link>
  );
};

// Mobile Brand Component with Full Width Logo
const MobileBrand: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('navbar');

  const getLogoPath = (isDark: boolean = false): string => {
    return isDark
      ? "/assets/dreamtoapp/dreamToApp-dark.svg"
      : "/assets/dreamtoapp/dreamToApp.svg";
  };

  return (
    <Link
      href={`/${locale}`}
      className="flex items-center justify-center w-full group transition-all duration-300"
      aria-label={t("dreamToAppHome")}
    >
      <div className="relative">
        <Image
          src={getLogoPath(false)}
          alt={t("dreamToAppLogo")}
          width={80}
          height={80}
          className="w-20 h-20 block dark:hidden transition-all duration-300"
          priority
        />
        <Image
          src={getLogoPath(true)}
          alt={t("dreamToAppLogo")}
          width={80}
          height={80}
          className="w-20 h-20 hidden dark:block transition-all duration-300"
          priority
        />
      </div>
    </Link>
  );
};

// Enhanced Mobile Menu Component
const MobileMenu: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('homepage');
  const navbarT = useTranslations('navbar');
  const [activeItem, setActiveItem] = useState<string>('');

  const menuItems = [
    { href: `/${locale}`, label: t('home'), icon: normalIcons.home.icon, color: '#d7a50d', rippleColor: '#d7a50d', bgColor: '#d7a50d' },
    { href: `/${locale}/services`, label: t('services'), icon: serviceIcon.website.icon, color: '#0d3ad7', rippleColor: '#0d3ad7', bgColor: '#0d3ad7' },
    { href: `/${locale}/worksample`, label: t('portfolio'), icon: technology.workSample.icon, color: '#99e4ff', rippleColor: '#99e4ff', bgColor: '#99e4ff' },
    { href: `/${locale}/contactus`, label: t('contact'), icon: misc.emailIcon, color: '#d7a50d', rippleColor: '#d7a50d', bgColor: '#d7a50d' },
  ];

  // Set active item based on current pathname
  useEffect(() => {
    const pathname = window.location.pathname;
    const currentItem = menuItems.find(item => {
      if (item.href === `/${locale}` && pathname === `/${locale}`) return true;
      if (item.href === `/${locale}` && pathname === '/') return true;
      return pathname.startsWith(item.href);
    });

    if (currentItem) {
      setActiveItem(currentItem.href);
    }
  }, [locale, menuItems]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden relative group transition-all duration-300 hover:bg-primary/10"
          aria-label={navbarT("openMenu")}
        >
          <div className="relative">
            <Menu className="h-5 w-5 transition-all duration-300 group-hover:rotate-90" />
            <div className="absolute -inset-2 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-border/50 shadow-2xl flex flex-col">
        <SheetHeader className="pb-4 border-b border-border/20">
          <SheetTitle className="text-center">
            <MobileBrand locale={locale} />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-1">
          <nav className="pt-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeItem === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative flex items-center px-4 py-4 text-lg font-medium rounded-xl transition-all duration-300 group overflow-hidden"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      backgroundColor: isActive ? `${item.bgColor}20` : 'transparent'
                    }}
                    onClick={() => {
                      // Mobile ripple effect
                      const ripple = document.querySelector(`[data-mobile-ripple="${item.href}"]`) as HTMLElement;
                      if (ripple) {
                        ripple.style.transform = 'scale(0)';
                        ripple.style.opacity = '0';
                        setTimeout(() => {
                          ripple.style.transform = 'scale(1)';
                          ripple.style.opacity = '0.4';
                          setTimeout(() => {
                            ripple.style.transform = 'scale(3)';
                            ripple.style.opacity = '0.2';
                          }, 50);
                        }, 10);
                      }
                    }}
                  >
                    {/* Ripple Effect */}
                    <div
                      data-mobile-ripple={item.href}
                      className="absolute inset-0 scale-0 rounded-xl duration-500 transition-all ease-out"
                      style={{ backgroundColor: `${item.rippleColor}20` }}
                    />

                    {/* Icon Container */}
                    <div className="relative flex items-center justify-center w-10 h-10 mr-8 rounded-lg transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${item.bgColor}15` }}>
                      <IconComponent
                        className="w-5 h-5 transition-colors duration-300"
                        style={{ color: item.color }}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className="transition-all duration-300 group-hover:translate-x-1"
                      style={{ color: isActive ? item.color : undefined }}
                    >
                      {item.label}
                    </span>

                    {/* Active Indicator */}
                    {isActive && (
                      <div
                        className="absolute right-4 w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* CTA Section - Fixed at bottom */}
        <div className="mt-auto pt-6 px-4 py-4 bg-gradient-to-r from-[#d7a50d]/15 to-[#f4c430]/15 rounded-xl border border-[#d7a50d]/30 shadow-lg">
          <div className="text-center mb-3">
            <p className="text-sm font-medium text-foreground mb-1">
              {navbarT("readyToStart")}
            </p>
            <p className="text-xs text-muted-foreground">
              {navbarT("readyToStart")}
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              href={`/${locale}/contactus`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#d7a50d] to-[#f4c430] text-white rounded-lg text-sm font-semibold hover:from-[#f4c430] hover:to-[#d7a50d] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#d7a50d]/30 transform hover:-translate-y-1"
            >
              <span>{navbarT("startProject")}</span>
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Mobile CTA Component for Main Content
const MobileCTA: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('navbar');

  return (
    <div className="px-4 py-6 bg-gradient-to-r from-[#d7a50d]/15 to-[#f4c430]/15 rounded-xl border border-[#d7a50d]/30 shadow-lg">
      <div className="text-center mb-4">
        <p className="text-base font-medium text-foreground mb-2">
          {t("readyToStart")}
        </p>
        <p className="text-sm text-muted-foreground">
          {t("readyToStart")}
        </p>
      </div>
      <div className="flex justify-center">
        <Link
          href={`/${locale}/contactus`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d7a50d] to-[#f4c430] text-white rounded-xl text-base font-semibold hover:from-[#f4c430] hover:to-[#d7a50d] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#d7a50d]/30 transform hover:-translate-y-1"
        >
          <span>{t("startProject")}</span>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </Link>
      </div>
    </div>
  );
};

// Enhanced Desktop Navigation Menu
const DesktopMenu: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('homepage');
  const [activeItem, setActiveItem] = useState<string>('');

  const menuItems = [
    { href: `/${locale}`, label: t('home'), icon: normalIcons.home.icon, color: '#d7a50d', rippleColor: '#d7a50d', bgColor: '#d7a50d' }, // Gold
    { href: `/${locale}/services`, label: t('services'), icon: serviceIcon.website.icon, color: '#0d3ad7', rippleColor: '#0d3ad7', bgColor: '#0d3ad7' }, // Blue
    { href: `/${locale}/worksample`, label: t('portfolio'), icon: technology.workSample.icon, color: '#99e4ff', rippleColor: '#99e4ff', bgColor: '#99e4ff' }, // Light Blue
    { href: `/${locale}/contactus`, label: t('contact'), icon: misc.emailIcon, color: '#d7a50d', rippleColor: '#d7a50d', bgColor: '#d7a50d' }, // Gold (reusing for contact)
  ];

  // Set active item based on current pathname
  useEffect(() => {
    const pathname = window.location.pathname;
    const currentItem = menuItems.find(item => {
      // Handle home page special case
      if (item.href === `/${locale}` && pathname === `/${locale}`) return true;
      if (item.href === `/${locale}` && pathname === '/') return true;
      // Handle other pages
      return pathname.startsWith(item.href);
    });

    if (currentItem) {
      setActiveItem(currentItem.href);
      // Show persistent ripple for active item (like Radio component)
      const ripple = document.querySelector(`[data-ripple="${currentItem.href}"]`) as HTMLElement;
      if (ripple) {
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0.3';
      }
    }
  }, [locale, menuItems]);

  const handleItemClick = (itemHref: string) => {
    // Reset all ripples first
    menuItems.forEach((item) => {
      const ripple = document.querySelector(`[data-ripple="${item.href}"]`) as HTMLElement;
      if (ripple) {
        ripple.style.transform = 'scale(0)';
        ripple.style.opacity = '0';
      }
    });

    // Set new active item
    setActiveItem(itemHref);

    // Enhanced ripple effect like Radio component
    const ripple = document.querySelector(`[data-ripple="${itemHref}"]`) as HTMLElement;
    if (ripple) {
      // Reset to initial state
      ripple.style.transform = 'scale(0)';
      ripple.style.opacity = '0';

      // Trigger ripple animation
      setTimeout(() => {
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0.4';

        // Expand ripple to full size
        setTimeout(() => {
          ripple.style.transform = 'scale(5)';
          ripple.style.opacity = '0.2';
        }, 50);
      }, 10);
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-4">
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeItem === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex items-center gap-3 group p-2 rounded-lg transition-all duration-300 hover:bg-muted/20"
            onClick={() => handleItemClick(item.href)}
          >
            {/* Menu Item Button */}
            <div className="relative flex h-[50px] w-[50px] items-center justify-center">
              <div
                className={`absolute h-full w-full rounded-full p-4 shadow-sm shadow-[#00000050] duration-300 group-hover:scale-110 group-hover:ring-2 ${isActive ? 'ring-2 scale-110' : ''
                  }`}
                style={{
                  backgroundColor: `${item.bgColor}30`,
                  borderColor: item.color,
                  borderWidth: isActive ? '2px' : '0px'
                }}
              />
              <div
                data-ripple={item.href}
                className="absolute -z-10 h-full w-full scale-0 rounded-full duration-500 transition-all ease-out"
                style={{ backgroundColor: `${item.rippleColor}90` }}
              />
              <IconComponent
                className="w-6 h-6 transition-colors duration-300 relative z-10"
                style={{ color: item.color }}
              />
            </div>

            {/* Title/Label - Directly beside icon */}
            <span
              className={`text-sm font-medium transition-all duration-300 whitespace-nowrap ${isActive ? 'opacity-100' : 'text-muted-foreground opacity-70 group-hover:opacity-100'
                }`}
              style={{ color: isActive ? item.color : undefined }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

// Enhanced Action Buttons Component
const NavbarActions: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <ThemeSwitch />
      <LangSwicher />
    </div>
  );
};

// Enhanced CTA Button
const CTAButton: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('navbar');
  return (
    <Link href={`/${locale}/contactus`}>
      <div className="relative group">
        <style jsx>{`
          @keyframes sharp-glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(215, 165, 13, 0.3), 0 0 40px rgba(13, 58, 215, 0.2);
            }
            50% {
              box-shadow: 0 0 30px rgba(215, 165, 13, 0.6), 0 0 60px rgba(13, 58, 215, 0.4);
            }
          }
          
          @keyframes sharp-border {
            0%, 100% {
              border-image: linear-gradient(45deg, #d7a50d, #0d3ad7, #d7a50d) 1;
            }
            50% {
              border-image: linear-gradient(45deg, #0d3ad7, #d7a50d, #0d3ad7) 1;
            }
          }
          
          @keyframes sharp-rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          
          .sharp-button {
            border: 2px solid transparent;
            background: #d7a50d !important;
            color: white !important;
          }
          
          .sharp-button:hover {
            background: #f4c430 !important;
            color: white !important;
          }
          
          .ripple-button {
            background: #d7a50d !important;
            color: white !important;
            position: relative;
            overflow: hidden;
          }
          
          .ripple-button:hover {
            background: #f4c430 !important;
            color: white !important;
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(215, 165, 13, 0.4);
          }
          
          .ripple-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
            pointer-events: none;
          }
          
          .ripple-button:hover::before {
            width: 300px;
            height: 300px;
          }
          
          .menu-item {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
          }
          
          .sharp-ring {
            position: absolute;
            inset: -3px;
            border: 2px solid transparent;
            border-radius: inherit;
            background: linear-gradient(45deg, #d7a50d, #0d3ad7, #99e4ff, #d7a50d) border-box;
            -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            animation: sharp-rotate 4s linear infinite;
          }
          
          .sharp-button:hover .sharp-ring {
            animation: sharp-rotate 2s linear infinite;
          }
        `}</style>

        <div className="relative flex items-center justify-center">
          <Button
            className="ripple-button inline-flex items-center gap-1 md:gap-2 text-white font-bold px-3 py-1.5 md:px-6 md:py-2 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-110 hover:ring-2 hover:ring-white/50 text-xs md:text-sm relative overflow-hidden"
            style={{ backgroundColor: '#d7a50d' }}
          >
            {/* Ripple Effect Background */}
            <div className="absolute inset-0 scale-0 rounded-lg bg-white/20 transition-transform duration-500 group-hover:scale-[500%] pointer-events-none"></div>

            {/* Main Content */}
            <span className="relative z-10">{t("startProject")}</span>
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-pulse relative z-10" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

// Main Enhanced Navbar Component
const Navbar: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('navbar');



  return (
    <NavbarErrorBoundary>
      <header
        className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5"
        role="navigation"
        aria-label={t("mainNavigation")}
      >
        <div className="container mx-auto px-4 h-20">
          <div className="flex items-center justify-between h-full">
            {/* Left Section - Brand */}
            <div className="flex items-center gap-6">
              <NavbarBrand locale={locale} />
              <CTAButton locale={locale} />
            </div>

            {/* Center Section - Desktop Menu */}
            <DesktopMenu locale={locale} />

            {/* Right Section - Actions */}
            <div className="flex items-center gap-3">
              <NavbarActions />
              <MobileMenu locale={locale} />
            </div>
          </div>
        </div>
      </header>
    </NavbarErrorBoundary>
  );
};

export default Navbar;
