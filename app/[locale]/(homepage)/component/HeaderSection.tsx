"use client";
import { useRef } from 'react';

import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  useLocale,
  useTranslations,
} from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import dreamtoapp from '@/public/assets/dta.svg';

import Text from '../../../../components/Text';
import { buttonVariants } from '../../../../components/ui/button';
import { cn } from '../../../../lib/utils';

const CareerBlock = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("homepage");
  const locale = useLocale();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Image animation
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const imageY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-2.5%"]);
  const imageOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0.85]);

  // Text animation
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0.5, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.5], ["100%", "0%"]);

  return (
    <div ref={containerRef} className="relative h-[200vh] p-2">
      <div className="sticky top-0 h-screen overflow-hidden  ">
        {/* Image Section */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            scale: imageScale,
            y: imageY,
            opacity: imageOpacity,
          }}
        >
          <div className="w-full h-full flex items-center justify-center flex-col gap-4 bg-gray-200 rounded-2xl">
            <div className="relative w-full max-w-[400px] h-full max-h-[400px]">
              <Image
                src="/assets/dta.svg"
                alt="dreamtoapp"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <Text
              variant="h1"
              locale={locale}
              className="w-full text-center text-primary text-xl sm:text-3xl md:text-4xl"
              cairoFont
            >
              {t("slogon")}
            </Text>
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex items-end justify-center"
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          <div className="bg-white bg-opacity-90 p-4 sm:p-8 rounded-t-3xl shadow-xl w-full max-w-4xl mx-auto ">
            <div className="max-w-2xl mx-auto flex items-center justify-center flex-col">
              <Image
                src={dreamtoapp}
                alt="dreamtoapp"
                width={140}
                height={120}
                loading="eager"
                priority
                sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 15vw"
                className="object-contain"
              />
              <span className="block text-[13px] uppercase tracking-[1.5px] text-accent-red mb-6 font-semibold text-black">
                Dream To App
              </span>

              <Text
                variant="h2"
                locale={locale}
                className="text-xl sm:text-3xl leading-tight font-bold text-gray-900 mb-8 text-center"
                cairoFont
              >
                {t("fromIdeaTitle")}
              </Text>
              <Text
                variant="p"
                locale={locale}
                className="text-sm text-gray-600 mb-10"
                cairoFont
              >
                {t("fromIdeaContent")}
              </Text>

              <Link
                href={"/"}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "bg-gray-300 text-primary-foreground hover:bg-white/90 flex-1 "
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
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerBlock;
