// 'use client';
import React from 'react';
import {
  getTranslations,
} from 'next-intl/server';
import Image from 'next/image';
import {
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';

// Client Component for Image
const ImageWithErrorHandling = () => {
  return (
    <figure className="relative h-40 sm:h-48 lg:h-64 w-full">
      <Image
        src="/assets/homepage/images/website.avif"
        fill
        alt="Website project showcase image for DreamTo IT Agency"
        priority
        className="object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <figcaption className="sr-only">Website project showcase image</figcaption>
    </figure>
  );
};

// Server Component
export const FromIdea = async () => {
  const t = await getTranslations("homepage");

  return (
    <article className="flex flex-col justify-between border border-[#d7a50d]/30 rounded-xl shadow-lg overflow-hidden hover:border-[#d7a50d]/50 hover:shadow-xl transition-all duration-300" aria-labelledby="from-idea-title">
      {/* Card Header with Image */}
      <CardHeader className="relative p-0">
        <ImageWithErrorHandling />
        {/* Animated Gradient Pulse Effect */}
        <div className="absolute -top-2 -left-2 size-4 sm:size-6 bg-gradient-to-r from-[#d7a50d] to-[#f4c430] animate-pulse rounded-full" />
      </CardHeader>

      {/* Card Title & Description */}
      <CardDescription className="text-center mt-4 sm:mt-6 px-4 sm:px-6">
        <h2
          id="from-idea-title"
          className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#d7a50d] leading-tight"
        >
          {t("fromIdeaTitle")}
        </h2>
      </CardDescription>

      {/* Card Content */}
      <CardContent className="px-4 sm:px-6 py-3 sm:py-4 text-muted-foreground leading-relaxed">
        <p className="text-sm sm:text-base text-pretty">
          {t("fromIdeaContent")}
        </p>
      </CardContent>
    </article>
  );
};

export default FromIdea;
