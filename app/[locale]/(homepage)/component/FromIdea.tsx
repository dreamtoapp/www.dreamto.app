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
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const FromIdea = async () => {
  const t = await getTranslations("homepage");
  const locale = await getLocale();

  return (
    <Card className="flex flex-col justify-between border border-primary/80 rounded-xl shadow-lg overflow-hidden">
      {/* Card Header with Image */}
      <CardHeader className="relative p-0">
        <div className="relative h-48 sm:h-64 w-full">
          <Image
            src="/assets/homepage/images/website.jpeg"
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

      {/* Card Title & Description */}
      <CardDescription className="text-center mt-6 px-6">
        <Text
          variant="h2"
          locale={locale}
          className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white"
          cairoFont
        >
          {t("fromIdeaTitle")}
        </Text>
      </CardDescription>

      {/* Card Content */}
      <CardContent className="px-6 py-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        <Text variant="p" locale={locale} className="text-pretty">
          {t("fromIdeaContent")}
        </Text>
      </CardContent>

      {/* Call-to-Action Button */}
      <CardFooter className="w-full p-4 flex justify-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-primary text-white hover:bg-primary/80 transition-all duration-300 ease-in-out px-6 py-3 rounded-lg text-lg"
          )}
        >
          <Text
            variant="h2"
            locale={locale}
            className="text-sm sm:text-lg"
            cairoFont
          >
            {t("fromIdeaButton")}
          </Text>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FromIdea;
