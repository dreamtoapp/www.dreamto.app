"use client"; // Required in Next.js 15 for hooks in client components

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import LangSwicher from "./LangSwicher";
import Home from "./Home";
import ThemeSwitch from "./ThemeSwitch";
import { Settings } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={clsx(
        "flex sticky top-0 z-50 justify-between shrink-0 items-center gap-2 transition-all duration-300 ease-in-out",
        "group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
        "bg-navbar text-navbar-foreground border-b border-border backdrop-blur-md",
        {
          "h-16 shadow-md": !isScrolled,
          "h-14 shadow-lg bg-navbar/90": isScrolled,
        }
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Left Section */}
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 focus-visible:ring-2 focus-visible:ring-primary/70 rounded-md transition-colors" aria-label="Open sidebar" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-border" />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 px-4">
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="rounded-full p-2 hover:bg-accent transition-colors focus:outline-none"
              aria-label="Settings"
              type="button"
            >
              <Settings className="w-8 h-8 text-primary" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-6 py-2">
              <div className="flex items-center gap-4">
                <span className="font-medium min-w-[80px]">Language</span>
                <LangSwicher />
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium min-w-[80px]">Theme</span>
                <ThemeSwitch />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <LangSwicher />
        <Home />
      </div>
    </header>
  );
};

// Function to format breadcrumb labels (capitalize and replace dashes)
const formatBreadcrumb = (text: string): string => {
  return text
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

export default Navbar;
