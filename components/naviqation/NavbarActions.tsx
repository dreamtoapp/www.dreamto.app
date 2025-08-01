"use client";

import React from "react";
import LangSwicher from "./LangSwicher";
import ThemeSwitch from "./ThemeSwitch";

// Enhanced Action Buttons Component
const NavbarActions: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <ThemeSwitch />
      <LangSwicher />
    </div>
  );
};

export default NavbarActions; 