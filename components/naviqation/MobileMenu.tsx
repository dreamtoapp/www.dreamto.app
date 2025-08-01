"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { normalIcons, serviceIcon, misc, technology } from "@/constant/icons";
import MobileBrand from "./MobileBrand";

// Enhanced Mobile Menu Component
const MobileMenu: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('homepage');
  const navbarT = useTranslations('navbar');
  const [activeItem, setActiveItem] = useState<string>('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Memoize menuItems to prevent recreation on every render
  const menuItems = useMemo(() => [
    { href: `/${locale}`, label: t('home'), icon: normalIcons.home.icon, color: '#d7a50d', rippleColor: '#d7a50d', bgColor: '#d7a50d' },
    { href: `/${locale}/services`, label: t('services'), icon: serviceIcon.website.icon, color: '#0d3ad7', rippleColor: '#0d3ad7', bgColor: '#0d3ad7' },
    { href: `/${locale}/worksample`, label: t('portfolio'), icon: technology.workSample.icon, color: '#99e4ff', rippleColor: '#99e4ff', bgColor: '#99e4ff' },
    { href: `/${locale}/contactus`, label: t('contact'), icon: misc.emailIcon, color: '#d7a50d', rippleColor: '#d7a50d', bgColor: '#d7a50d' },
  ], [locale, t]);

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

  const handleItemClick = (itemHref: string, itemColor: string) => {
    // Close the sheet first
    setIsSheetOpen(false);

    // Create global ripple effect on navbar
    const navbar = document.querySelector('header') as HTMLElement;
    if (navbar) {
      // Create ripple element
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.top = '0';
      ripple.style.left = '0';
      ripple.style.width = '4px';
      ripple.style.height = '4px';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = `${itemColor}40`;
      ripple.style.transform = 'scale(0)';
      ripple.style.opacity = '0';
      ripple.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '9999';
      ripple.style.transformOrigin = 'top left';

      // Add to navbar
      navbar.style.position = 'relative';
      navbar.appendChild(ripple);

      // Trigger ripple animation
      setTimeout(() => {
        ripple.style.transform = 'scale(100)';
        ripple.style.opacity = '0.6';
      }, 10);

      // Start fade out animation
      setTimeout(() => {
        ripple.style.opacity = '0';
        ripple.style.transform = 'scale(120)';
      }, 600);

      // Remove ripple after fade out
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 1000);
    }

    // Navigate after a short delay
    setTimeout(() => {
      window.location.href = itemHref;
    }, 500);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
                  <button
                    key={item.href}
                    onClick={() => handleItemClick(item.href, item.color)}
                    className="relative flex items-center w-full px-4 py-4 text-lg font-medium rounded-xl transition-all duration-300 group hover:bg-muted/20"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      backgroundColor: isActive ? `${item.bgColor}20` : 'transparent'
                    }}
                  >
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
                  </button>
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
              {navbarT("getInTouch")}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => handleItemClick(`/${locale}/contactus`, '#d7a50d')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#d7a50d] to-[#f4c430] text-white rounded-lg text-sm font-semibold hover:from-[#f4c430] hover:to-[#d7a50d] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#d7a50d]/30 transform hover:-translate-y-1"
            >
              <span>{navbarT("startProject")}</span>
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu; 