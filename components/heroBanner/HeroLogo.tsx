"use client"
import React from 'react';
import Image from 'next/image';

interface HeroLogoProps {
  logoAlt: string;
  locale: string;
}

const HeroLogo: React.FC<HeroLogoProps> = ({ logoAlt, locale }) => {
  const getLogoPath = (isDark: boolean = false): string => {
    return isDark
      ? "/assets/dreamtoapp/dreamToApp-dark.svg"
      : "/assets/dreamtoapp/dreamToApp.svg";
  };

  return (
    <div className="flex justify-center items-center w-full mb-2 md:mb-3">
      <div className="relative group">
        <Image
          src={getLogoPath(false)}
          alt={logoAlt}
          width={200}
          height={87}
          className="w-32 h-14 md:w-40 md:h-16 lg:w-48 lg:h-20 xl:w-56 xl:h-24 block dark:hidden transition-all duration-300 group-hover:rotate-3"
          priority
        />
        <Image
          src={getLogoPath(true)}
          alt={logoAlt}
          width={200}
          height={87}
          className="w-32 h-14 md:w-40 md:h-16 lg:w-48 lg:h-20 xl:w-56 xl:h-24 hidden dark:block transition-all duration-300 group-hover:rotate-3"
          priority
        />
      </div>
    </div>
  );
};

export default HeroLogo; 