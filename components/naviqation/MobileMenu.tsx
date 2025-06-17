"use client";
import { useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { getMenuItems } from "./menuItems";
import { DialogTitle } from "@/components/ui/dialog";
import Link from "../link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import React, { useMemo } from 'react';

export default function MobileMenu({ locale }: { locale: string }) {
  const t = useTranslations("navigation");
  const pathname = usePathname();

  // Menu items
  const menuItems = getMenuItems(locale, t);


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
        <nav className="flex flex-col space-y-4 mt-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2 px-2">Menu</span>
          <AnimatePresence>
            {menuItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ delay: idx * 0.07, duration: 0.33, ease: "easeOut" }}
                >
                  <Link
                    href={item.href}
                    className={`flex flex-row-reverse items-center gap-4 px-5 py-4 rounded-xl border shadow-sm text-right text-base font-medium transition-all duration-200
                      ${isActive
                        ? "bg-gradient-to-l from-primary/80 to-primary/40 text-primary-foreground scale-[1.03] font-bold shadow-lg"
                        : "bg-white dark:bg-zinc-900 hover:bg-accent/40 text-muted-foreground"}
                    `}
                    style={{ boxShadow: isActive ? '0 4px 20px 0 rgba(0,0,0,0.08)' : undefined }}
                  >
                    <span className={`text-2xl transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      {item.icon}
                    </span>
                    <span className="flex-1 text-lg text-right">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <hr className="my-3 border-border" />
        </nav>
      </SheetContent>
    </Sheet>
  );
} 