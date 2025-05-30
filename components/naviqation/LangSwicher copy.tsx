"use client";
import { useState, useEffect } from "react";
import arabic from "@/public/assets/arabic.png";
import english from "@/public/assets/english.png";
import Image from "next/image";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LangSwicher() {
  const locale = useLocale();
  const [lang, setLang] = useState(locale || "ar");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setLang(locale || "ar"), [locale]);

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === "ar" ? "en" : "ar"));
    const newLocale = lang === "ar" ? "en" : "ar";
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  return (
    <button
      className="rounded-full w-[24px] h-[24px] hover:text-black hover:bg-white/80 flex items-center justify-center   flex-row  p-1"
      onClick={toggleLanguage}
    >
      <Image
        src={locale === "ar" ? arabic : english}
        width={24}
        height={24}
        alt="Language Toggle"
        priority={false}
        sizes="(max-width: 400px) 100vw, 400px"
      />
    </button>
  );
}
