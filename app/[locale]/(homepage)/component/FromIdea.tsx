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
    <figure className="relative h-48 sm:h-64 w-full">
      <Image
        src="/assets/homepage/images/website.jpeg"
        fill
        alt="Website project showcase image"
        priority
        className="object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        // onError={(e) => {
        //   const target = e.target as HTMLImageElement;
        //   target.style.display = 'none';
        // }}
      />
      <figcaption className="sr-only">Website project showcase image</figcaption>
    </figure>
  );
};

// Server Component
export const FromIdea = async () => {
  const t = await getTranslations("homepage");

  return (
    <article className="flex flex-col justify-between border border-primary/80 rounded-xl shadow-lg overflow-hidden" aria-labelledby="from-idea-title">
      {/* Card Header with Image */}
      <CardHeader className="relative p-0">
        <ImageWithErrorHandling />
        {/* Animated Gradient Pulse Effect */}
        <div className="absolute -top-2 -left-2 size-6 bg-gradient-to-r from-primary to-secondary animate-pulse rounded-full" />
      </CardHeader>

      {/* Card Title & Description */}
      <CardDescription className="text-center mt-6 px-6">
        <h2
          id="from-idea-title"
          className="text-2xl md:text-4xl font-extrabold text-foreground"
        >
          {t("fromIdeaTitle")}
        </h2>
      </CardDescription>

      {/* Card Content */}
      <CardContent className="px-6 py-4 text-muted-foreground leading-relaxed">
        <p className="text-pretty">
          {t("fromIdeaContent")}
        </p>
      </CardContent>

      {/* Call-to-Action Button */}
      {/* <CardFooter className="w-full p-4 flex justify-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-primary text-primary-foreground hover:bg-primary/80 transition-all duration-300 ease-in-out px-6 py-3 rounded-lg text-lg"
          )}
        >
          <h2
            className="text-sm sm:text-lg"
         >
            {t("fromIdeaButton")}
          </h2>
        </Link>
      </CardFooter> */}
    </article>
  );
};

export default FromIdea;
