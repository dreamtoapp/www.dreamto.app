import React from 'react';

import { getLocale, getTranslations } from 'next-intl/server';
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
import { useTranslations } from 'next-intl';

async function CanonDetail() {
  const t = useTranslations("canonDetail");

  return (
    <Card className="flex items-center justify-between flex-col bg-gradient-blue-light dark:bg-gradient-custom border border-white/70 ">
      <CardHeader>
        <CardTitle className="flex flex-col items-center gap-4 ">
          <p className="text-xl font-bold">
            {t("name")}
          </p>
        </CardTitle>
        <CardDescription>
          <p className="text-lg ">
            {t("title")}
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="relative w-[70px] h-[130px] flex-shrink-0">
            <Image
              src={"/assets/homepage/canon.png"}
              fill
              alt={"Canon Project"}
              className="object-contain object-center " // Ensures the image covers and is centered
              priority // Optional: Prioritize loading this image
              sizes="(max-width: 400px) 100vw, 400px"
            />
          </div>
          <p className="text-lg">
            {t("description")}
            <span className="text-destructive font-bold animate-pulse bg-slate-300 px-2 rounded ">
              {t("free")}
            </span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex  items-center justify-center flex-col  w-full ">
        <Link
          href={"/"}
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-white text-black hover:bg-white/90 flex-1 "
          )}
        >
          <p className="text-lg" >
            {t("action")}
          </p>
        </Link>

        {/* <News /> */}
      </CardFooter>
    </Card>
  );
}

export default CanonDetail;
