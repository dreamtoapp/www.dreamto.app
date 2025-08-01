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
          <div className="container mx-auto px-4 h-16">
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

// Enhanced Mobile Menu Component
const MobileMenu: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('homepage');
  const navbarT = useTranslations('navbar');

  const menuItems = [
    { href: `/${locale}`, label: t('home'), icon: normalIcons.home.icon },
    { href: `/${locale}/services`, label: t('services'), icon: serviceIcon.website.icon },
    { href: `/${locale}/worksample`, label: t('portfolio'), icon: technology.workSample.icon },
    { href: `/${locale}/contactus`, label: t('contact'), icon: misc.emailIcon },
  ];

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
      <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-border/50">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-left">
            <NavbarBrand locale={locale} />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <nav className="flex-1">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 hover:bg-primary/10 hover:text-primary group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <IconComponent className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center justify-between px-4 py-3 bg-muted/50 rounded-xl">
              <span className="text-sm font-medium text-muted-foreground">
                {navbarT("settings")}
              </span>
              <div className="flex items-center gap-2">
                <LangSwicher />
                <ThemeSwitch />
              </div>
            </div>

            <div className="px-4 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">
                {navbarT("readyToStart")}
              </p>
              <Link
                href={`/${locale}/contactus`}
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-300"
              >
                {navbarT("getStarted")}
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Enhanced Desktop Navigation Menu
const DesktopMenu: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('homepage');

  const menuItems = [
    { href: `/${locale}`, label: t('home'), icon: normalIcons.home.icon },
    { href: `/${locale}/services`, label: t('services'), icon: serviceIcon.website.icon },
    { href: `/${locale}/worksample`, label: t('portfolio'), icon: technology.workSample.icon },
    { href: `/${locale}/contactus`, label: t('contact'), icon: misc.emailIcon },
  ];

  return (
    <nav className="hidden md:flex items-center gap-1">
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:text-primary group flex items-center gap-2"
          >
            <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">{item.label}</span>
            <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary group-hover:w-full group-hover:left-0 transition-all duration-300" />
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
      <Button
        className="hidden md:inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
      >
        <span>{t("startProject")}</span>
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
      </Button>
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
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            {/* Left Section - Brand */}
            <NavbarBrand locale={locale} />

            {/* Center Section - Desktop Menu */}
            <DesktopMenu locale={locale} />

            {/* Right Section - Actions */}
            <div className="flex items-center gap-3">
              <NavbarActions />
              <CTAButton locale={locale} />
              <MobileMenu locale={locale} />
            </div>
          </div>
        </div>
      </header>
    </NavbarErrorBoundary>
  );
};

export default Navbar;
