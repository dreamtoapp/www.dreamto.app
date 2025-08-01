"use client";

import React, { useState, useEffect } from "react";
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
              {navbarT("getInTouch")}
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

export default MobileMenu; 