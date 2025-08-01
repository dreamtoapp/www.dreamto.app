"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { normalIcons, serviceIcon, misc, technology } from "@/constant/icons";

// Enhanced Desktop Navigation Menu
const DesktopMenu: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('homepage');
  const [activeItem, setActiveItem] = useState<string>('');
  const [rippleStates, setRippleStates] = useState<Record<string, { isActive: boolean; isAnimating: boolean }>>({});

  // Memoize menuItems to prevent recreation on every render
  const menuItems = useMemo(() => [
    { href: `/${locale}`, label: t('home'), icon: normalIcons.home.icon, color: '#d7a50d', rippleColor: '#d7a50d', bgColor: '#d7a50d' }, // Gold
    { href: `/${locale}/services`, label: t('services'), icon: serviceIcon.website.icon, color: '#0d3ad7', rippleColor: '#0d3ad7', bgColor: '#0d3ad7' }, // Blue
    { href: `/${locale}/worksample`, label: t('portfolio'), icon: technology.workSample.icon, color: '#99e4ff', rippleColor: '#99e4ff', bgColor: '#99e4ff' }, // Light Blue
    { href: `/${locale}/contactus`, label: t('contact'), icon: misc.emailIcon, color: '#d7a50d', rippleColor: '#d7a50d', bgColor: '#d7a50d' }, // Gold (reusing for contact)
  ], [locale, t]);

  // Initialize ripple states only once when menuItems change
  useEffect(() => {
    const initialStates: Record<string, { isActive: boolean; isAnimating: boolean }> = {};
    menuItems.forEach(item => {
      initialStates[item.href] = { isActive: false, isAnimating: false };
    });
    setRippleStates(initialStates);
  }, [menuItems]);

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
      // Set persistent ripple for active item (like radio button)
      setRippleStates(prev => ({
        ...prev,
        [currentItem.href]: { isActive: true, isAnimating: false }
      }));
    }
  }, [locale, menuItems]);

  const handleItemClick = (itemHref: string) => {
    // Reset all ripples first
    setRippleStates(prev => {
      const newStates = { ...prev };
      Object.keys(newStates).forEach(key => {
        newStates[key] = { isActive: false, isAnimating: false };
      });
      return newStates;
    });

    // Set new active item
    setActiveItem(itemHref);

    // Set ripple to expanded state immediately (no animation phase)
    setRippleStates(prev => ({
      ...prev,
      [itemHref]: { isActive: true, isAnimating: false }
    }));
  };

  return (
    <nav className="hidden md:flex items-center gap-4">
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeItem === item.href;
        const rippleState = rippleStates[item.href] || { isActive: false, isAnimating: false };

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

              {/* Ripple Effect */}
              <div
                className={`absolute -z-10 h-full w-full rounded-full transition-all duration-300 ease-out ${rippleState.isActive
                  ? 'scale-[6] opacity-40'
                  : 'scale-0 opacity-0'
                  }`}
                style={{ backgroundColor: `${item.rippleColor}90` }}
              />

              <div style={{ color: item.color }}>
                <IconComponent
                  className="w-6 h-6 transition-colors duration-300 relative z-10"
                />
              </div>
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

export default DesktopMenu;