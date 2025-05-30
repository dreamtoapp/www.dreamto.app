"use client";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "rounded-full w-9 h-9",
        "bg-background/50 hover:bg-background/80",
        "border border-border/20",
        "transition-all duration-300"
      )}
    >
      <div>
        {theme === "light" ? (
          <Icon
            icon="solar:sun-bold"
            className={cn(
              "w-5 h-5",
              "text-yellow-500",
              "transition-all duration-300",
              "hover:rotate-90"
            )}
          />
        ) : (
          <Icon
            icon="solar:moon-bold"
            className={cn(
              "w-5 h-5",
              "text-blue-500",
              "transition-all duration-300",
              "hover:-rotate-12"
            )}
          />
        )}
      </div>
    </Button>
  );
}
