import Image from "next/image";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { getLocale } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Text from "@/components/Text";
import { cn } from "@/lib/utils";
import News from "../../../../components/animation/animatNews";
import Link from "next/link";

const arDetail = {
  name: "كانون",
  title: "منصتك الذكية للمستجدات الموثوقة لتطوير أعمالك.",
  description:
    "تخيل منصة تمنحك تحديثات موثوقة ومحتوى مصمم خصيصًا لجذب جمهورك المستهدف. مع كانون، ستتمكن من إبقاء عملائك على اطلاع دائم بأحدث الأخبار والعروض، سواء كنت تدير عيادة، معرضًا، أو أي نشاط تجاري.  سنحول فكرتك إلى تجربة رقمية استثنائية تلفت الأنظار وتحقق التفاعل الذي تطمح إليه.",
  action: "ابدأ الآن واكتشف الفرق بنفسك!",
  free: "جرّب مجانًا الآن!",
};

const enDetail = {
  name: "Canon",
  title: "Your Smart Platform for Reliable Updates to Drive Business Growth.",
  description:
    "Imagine a platform that delivers tailored updates and engaging content to captivate your target audience. With Canon, you’ll keep your customers informed about the latest news, offers, and trends—whether you run a clinic, an exhibition, or any business. Through the detective spirit of Canon, we transform your vision into a dynamic digital experience that grabs attention and drives results.",
  action: "Start now and see the difference!",
  free: "Try for Free Now!",
};

async function CanonDetail() {
  const locale = await getLocale();

  return (
    <Card className="flex items-center justify-between flex-col bg-gradient-blue-light dark:bg-gradient-custom border border-white/70 ">
      <CardHeader>
        <CardTitle className="flex flex-col items-center gap-4 ">
          <Text variant="p" locale={locale} className="text-xl font-bold">
            {locale === "ar" ? arDetail.name : enDetail.name}
          </Text>
        </CardTitle>
        <CardDescription>
          <Text variant="p" locale={locale} className="text-lg ">
            {locale === "ar" ? arDetail.title : enDetail.title}
          </Text>
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
          <Text variant="span" locale={locale} className="text-lg">
            {locale === "ar" ? arDetail.description : enDetail.description}
            <span className="text-destructive font-bold animate-pulse bg-slate-300 px-2 rounded ">
              {arDetail.free}
            </span>
          </Text>
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
          <Text variant="h2" locale={locale} className="text-lg" cairoFont>
            {locale === "ar" ? arDetail.action : enDetail.action}
          </Text>
        </Link>

        {/* <News /> */}
      </CardFooter>
    </Card>
  );
}

export default CanonDetail;
