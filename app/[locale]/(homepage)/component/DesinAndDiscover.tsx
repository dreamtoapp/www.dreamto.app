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
    <Card className="flex flex-col justify-between border border-primary/80 rounded-xl shadow-lg overflow-hidden">
      {/* Header Section with Image */}
      <CardHeader className="relative p-0">
        <div className="relative h-48 sm:h-64 w-full">
          <Image
            src="/assets/homepage/images/img7.avif"
            fill
            alt="Discover Canon Project - DreamTo IT Agency"
            priority
            placeholder="blur"
            blurDataURL="data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAANZtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAD6AAEAAAAAAAAASgAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAVmlwcnAAAAA4aXBjbwAAAAxhdjFDgSACAAAAABRpc3BlAAAAAAAAAAoAAAAGAAAAEHBpeGkAAAAAAwgICAAAABZpcG1hAAAAAAAAAAEAAQOBAgMAAABSbWRhdBIACgg4DKawgIaDSDI8GAAAAED+axfA8Qx3RtZwLFBQEGxt2Xg/qLd6wiwZ7X1gT2W/W8PoWu/h1ekq3ffDy1mgqEJUSNwxWZmw"
            className="object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* Animated Gradient Pulse Effect */}
        <div className="absolute -top-2 -left-2 size-6 bg-gradient-to-r from-pink-500 to-yellow-400 animate-pulse rounded-full" />
      </CardHeader>

      {/* Title */}
      <CardDescription className="text-center mt-6 px-6">
        <p
          className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white"
        >
          {t("discoverTitle")}
        </p>
      </CardDescription>

      {/* Content Section */}
      <CardContent className="flex flex-col items-center gap-4 px-6 py-4 text-gray-700 dark:text-gray-300">
        <p
          className="text-lg md:text-xl text-center font-semibold border-primary border-dashed  border-b-2"
        >
          {t("discoverTitle1")}
        </p>
        <p
          className="text-lg md:text-xl text-center font-semibold "
        >
          {t("discoverTitle2")}
        </p>
        <p
          className="text-lg md:text-2xl text-center font-bold"
        >
          {t("discoverTitle3")}
        </p>
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
        <p
          className="text-sm text-muted-foreground "
        >
          {t("discoverContent")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default DesinAndDiscover;
