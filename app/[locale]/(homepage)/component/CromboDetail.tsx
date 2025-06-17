import React from 'react';

import {
  getLocale,
  getTranslations,
} from 'next-intl/server';
import Image from 'next/image';

import Link from '@/components/link';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

async function CromboDetail() {
  const locale = await getLocale();
  const t = await getTranslations("crombo"); // Translations from en.json & ar.json

  return (
    <Card className="flex flex-col items-center justify-between bg-gradient-to-b from-blue-900 to-gray-800 dark:bg-gradient-custom border border-white/30 max-w-4xl mx-auto rounded-2xl shadow-lg p-8">
      {/* Header Section */}
      <CardHeader className="text-center space-y-4">
        {/* <ShowTimer /> */}
        <CardTitle className="flex flex-col items-center gap-3">
          <h1 className="text-2xl font-bold text-white">{t("name")}</h1>
        </CardTitle>
        <CardDescription className="text-lg font-medium text-gray-300">
          {t("title")}
        </CardDescription>
      </CardHeader>

      {/* Main Content Section */}
      <CardContent className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 rtl:space-x-reverse w-full">
        {/* Product Image */}
        <div className="relative w-[100px] h-[160px] md:w-[140px] md:h-[200px] flex-shrink-0">
          <Image
            src="/assets/homepage/cromboPlugin.avif"
            fill
            alt="Crombo Plugin promotional image for DreamTo IT Agency"
            className="object-contain object-center"
            sizes="(max-width: 400px) 100vw, 400px"
            priority
          />
        </div>

        {/* Description */}
        <p className="text-base leading-relaxed text-gray-200 text-center md:text-left">
          {t("description")}
        </p>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="flex flex-col items-center justify-center space-y-6 w-full">
        {/* Call-to-Action */}
        <span className="font-bold text-xl animate-pulse text-white">
          {t("free")}
        </span>

        {/* Action Button */}
        <Link
          href={`/${locale}/crombo`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-white text-black text-lg hover:bg-white/90 transition-all duration-300 ease-in-out px-8 py-3 rounded-lg shadow-md"
          )}
        >
          <span className="text-lg font-semibold">{t("action")}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default CromboDetail;
