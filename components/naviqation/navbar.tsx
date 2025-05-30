"use client"; // Required in Next.js 15 for hooks in client components

import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import LangSwicher from "./LangSwicher";
import Home from "./Home";

const Navbar: React.FC = () => {
  return (
    <header className="flex sticky top-0 z-50 justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12  shadow-md drop-shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 px-4">
        <LangSwicher />
        {/* <ThemeSwitch /> */}
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
