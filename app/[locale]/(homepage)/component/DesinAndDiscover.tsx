import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

import { getTranslations } from "next-intl/server";
import InlineQueryWrapper from "@/components/InlineQuery/InlineQueryWrapper";

export const DesinAndDiscover = async () => {
  const t = await getTranslations("homepage");

  return (
    <Card className="flex flex-col justify-between border border-[#0d3ad7]/30 rounded-xl shadow-lg overflow-hidden hover:border-[#0d3ad7]/50 hover:shadow-xl transition-all duration-300">
      {/* Header Section with Image */}
      <CardHeader className="relative p-0">
        <div className="relative h-40 sm:h-48 lg:h-64 w-full">
          <Image
            src="/assets/homepage/images/img7.avif"
            fill
            alt="Discover Canon Project - DreamTo IT Agency"
            priority
            placeholder="blur"
            blurDataURL="data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAANZtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAD6AAEAAAAAAAAASgAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAVmlwcnAAAAA4aXBjbwAAAAxhdjFDgSACAAAAABRpc3BlAAAAAAAAAAoAAAAGAAAAEHBpeGkAAAAAAwgICAAAABZpcG1hAAAAAAAAAAEAAQOBAgMAAABSbWRhdBIACgg4DKawgIaDSDI8GAAAAED+axfA8Qx3RtZwLFBQEGxt2Xg/qLd6wiwZ7X1gT2W/W8PoWu/h1ekq3ffDy1mgqEJUSNwxWZmw"
            className="object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* Animated Gradient Pulse Effect */}
        <div className="absolute -top-2 -left-2 size-4 sm:size-6 bg-gradient-to-r from-[#0d3ad7] to-[#99e4ff] animate-pulse rounded-full" />
      </CardHeader>

      {/* Title */}
      <CardDescription className="text-center mt-4 sm:mt-6 px-4 sm:px-6">
        <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#0d3ad7] leading-tight">
          {t("discoverTitle")}
        </p>
      </CardDescription>

      {/* Content Section */}
      <CardContent className="flex flex-col items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 text-muted-foreground">
        <p className="text-base sm:text-lg lg:text-xl text-center font-semibold border-[#0d3ad7] border-dashed border-b-2 leading-relaxed">
          {t("discoverTitle1")}
        </p>
        <p className="text-base sm:text-lg lg:text-xl text-center font-semibold leading-relaxed">
          {t("discoverTitle2")}
        </p>
        <p className="text-lg sm:text-xl lg:text-2xl text-center font-bold leading-tight text-[#99e4ff]">
          {t("discoverTitle3")}
        </p>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6">
        {/* Inline Query Component */}
        <InlineQueryWrapper
          btnTitle={t("discoverButton")}
          title={t("discoverDilogTitle")}
          subtitle={t("discoverDilog")}
          description={t("discoverDilog1")}
        />

        {/* Supporting Text */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {t("discoverContent")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default DesinAndDiscover;
