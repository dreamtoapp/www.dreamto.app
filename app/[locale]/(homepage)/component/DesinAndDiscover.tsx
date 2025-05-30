import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Text from "@/components/Text";
import { getLocale, getTranslations } from "next-intl/server";
import InlineQueryWrapper from "@/components/InlineQuery/InlineQueryWrapper";

export const DesinAndDiscover = async () => {
  const t = await getTranslations("homepage");
  const locale = await getLocale();

  return (
    <Card className="flex flex-col justify-between border border-primary/80 rounded-xl shadow-lg overflow-hidden">
      {/* Header Section with Image */}
      <CardHeader className="relative p-0">
        <div className="relative h-48 sm:h-64 w-full">
          <Image
            src="/assets/homepage/images/img7.jpeg"
            fill
            alt="Canon Project"
            priority
            className="object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* Animated Gradient Pulse Effect */}
        <div className="absolute -top-2 -left-2 size-6 bg-gradient-to-r from-pink-500 to-yellow-400 animate-pulse rounded-full" />
      </CardHeader>

      {/* Title */}
      <CardDescription className="text-center mt-6 px-6">
        <Text
          variant="h2"
          locale={locale}
          className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white"
          cairoFont
        >
          {t("discoverTitle")}
        </Text>
      </CardDescription>

      {/* Content Section */}
      <CardContent className="flex flex-col items-center gap-4 px-6 py-4 text-gray-700 dark:text-gray-300">
        <Text
          variant="p"
          locale={locale}
          className="text-lg md:text-xl text-center font-semibold"
        >
          {t("discoverTitle1")}
        </Text>
        <Text
          variant="p"
          locale={locale}
          className="text-lg md:text-xl text-center font-semibold"
        >
          {t("discoverTitle2")}
        </Text>
        <Text
          variant="p"
          locale={locale}
          className="text-lg md:text-2xl text-center font-bold"
        >
          {t("discoverTitle3")}
        </Text>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="flex flex-col items-center gap-4 p-6">
        {/* Inline Query Component */}
        <InlineQueryWrapper
          btnTitle={t("discoverButton")}
          title={t("discoverDilogTitle")}
          subtitle={t("discoverDilog")}
          description={t("discoverDilog1")}
        />

        {/* Supporting Text */}
        <Text
          variant="p"
          locale={locale}
          className="text-lg text-gray-600 dark:text-gray-300 text-center"
        >
          {t("discoverContent")}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default DesinAndDiscover;
