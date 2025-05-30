"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import arabic from "@/public/assets/arabic.png";
import english from "@/public/assets/english.png";

const languageData = {
  ar: { image: arabic, label: "Arabic" },
  en: { image: english, label: "English" },
};

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
    router.refresh();
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100">
        {/* Loader Spinner */}
        <svg
          className="animate-spin h-5 w-5 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  const currentLanguage = languageData[locale as keyof typeof languageData];

  return (
    <div className="flex items-center gap-2 sm:gap-3  px-1 rounded-lg  ">
      <button
        onClick={switchLanguage}
        className="flex items-center justify-center w-6 h-6   rounded-full overflow-hidden border border-transparent hover:border-gray-400 hover:shadow-sm transition-all duration-300"
        aria-label={`Switch to ${locale === "ar" ? "English" : "Arabic"}`}
      >
        <Image
          src={currentLanguage.image}
          width={24}
          height={24}
          alt={currentLanguage.label}
          className="rounded-full"
        />
      </button>
      <ThemeToggle />
    </div>
  );
}

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.toggle("dark");
    setIsDarkMode(isCurrentlyDark);
  };

  return (
    <button
      className="flex items-center justify-center w-6 h-6   rounded-full bg-gray-100 hover:bg-gray-300 transition-all duration-300"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
