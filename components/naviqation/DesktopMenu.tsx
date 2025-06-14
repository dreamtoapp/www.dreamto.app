"use client";

import { useTranslations } from "next-intl";
import { getMenuItems } from "./menuItems";
import { usePathname } from "next/navigation";
import { Users, Cpu, GalleryHorizontal, PartyPopper } from "lucide-react";
import clsx from "clsx";
import { GiStrong } from "react-icons/gi";
import Link from "../link";

export default function DesktopMenu({ locale }: { locale: string }) {
  const t = useTranslations("navigation");
  const pathname = usePathname();

  const menuItems = getMenuItems(locale, t);


  const isRTL = locale === 'ar';

  const getLinkClassName = (href: string, isActive: boolean) =>
    clsx(
      "flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ease-in-out",
      "font-medium text-sm",
      {
        "flex-row-reverse": isRTL,
        "bg-primary/10 text-primary font-semibold": isActive,
        "text-muted-foreground hover:bg-accent hover:text-accent-foreground": !isActive,
      }
    );

  return (
    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={getLinkClassName(item.href, pathname === item.href)}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
      <span className="mx-2 border-l border-border h-6" />
       
    </nav>
  );
}