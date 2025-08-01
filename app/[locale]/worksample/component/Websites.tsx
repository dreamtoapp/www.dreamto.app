"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // Import shadcn card components
import { ArrowRightIcon } from "lucide-react"; // Optional: For hover effect icon
import Autoplay from "embla-carousel-autoplay"; // For autoplay functionality
import Image from "next/image"; // Import next/image for optimized images
import Link from "next/link"; // Import next/link for navigation
import { useLocale } from "next-intl";
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const Carousel = dynamic(() => import('@/components/ui/carousel').then(mod => mod.Carousel), { ssr: false, loading: () => <Skeleton className="w-full h-64" /> });
const CarouselContent = dynamic(() => import('@/components/ui/carousel').then(mod => mod.CarouselContent), { ssr: false, loading: () => <Skeleton className="w-full h-64" /> });
const CarouselItem = dynamic(() => import('@/components/ui/carousel').then(mod => mod.CarouselItem), { ssr: false, loading: () => <Skeleton className="w-full h-64" /> });

// Dummy data for the carousel

function Websites() {
  const locale = useLocale();
  const websitesData = [
    {
      id: 1,
      title: "Happy Moments",
      description: "Gallery For Any Collection",
      url: "https://example.com/website1",
      image: "/website/moments.png", // Local image path or external URL
      width: 300,
      height: 200,
      mode: "",
    },
    {
      id: 2,
      title: "Al-khurami Est",
      description: "JAC Forkleft.",
      url: "https://jac.dreamto.app/",
      image: "/website/khremi.png", // Local image path or external URL
      width: 300,
      height: 200,
      mode: "",
    },
    {
      id: 3,
      title: "Dream To App",
      description: "Where Dream Begin",
      url: "/",
      image: "/website/dta.png", // Local image path or external URL
      width: 300,
      height: 200,
      mode: "",
    },
    {
      id: 4,
      title: "On Progress",
      description: "Still under development",
      url: `/${locale}/underconstraction`,
      image: "/website/cardoc.png", // Local image path or external URL
      width: 300,
      height: 200,
      mode: "development",
    },
    {
      id: 5,
      title: "mixyBlog",
      description: "Learn more about our third website.",
      url: "https://nadish.dreamto.app/ar",
      image: "/website/next.png", // Local image path or external URL
      width: 300,
      height: 200,
      mode: "",
    },
    {
      id: 6,
      title: "DoIt",
      description: "SaaS App To track you tasks",
      // url: "https://Doit.dreamto.app/ar",
      url: `/${locale}/underconstraction`,
      image: "/website/dtax.png", // Local image path or external URL
      width: 300,
      height: 200,
      mode: "",
    },
    {
      id: 7,
      title: "CarDotNet",
      description: "Learn more about our third website.",
      url: "https://aws.dreamto.app/",
      image: "/website/carshop.png", // Local image path or external URL
      width: 300,
      height: 200,
      mode: "doing",
    },
    {
      id: 8,
      title: "Crombo",
      description: "Crombo will help to qrow up",
      url: `/${locale}/crombo`,
      image: "/website/crombo.png", // Local image path or external URL
      width: 300,
      height: 200,
      mode: "development",
    },
  ];
  return (
    <div className="w-full   h-auto rounded-md p-6" dir="ltr">
      <h2 className="text-2xl font-bold text-foreground mb-4">Featured Websites</h2>
      <Carousel
        plugins={[Autoplay({ delay: 3000 })]} // Auto-play every 3 seconds
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {websitesData.map((website) => (
            <CarouselItem
              key={website.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Link href={website.url} target="_blank" rel="noopener noreferrer">
                <Card className="overflow-hidden relative transition-transform hover:scale-105 duration-300">
                  {/* Use next/image for optimized images */}
                  <Image
                    src={website.image}
                    alt={website.title}
                    width={website.width}
                    height={website.height}
                    className="w-full h-48 object-cover rounded-t-md"
                    placeholder="blur" // Add a blur placeholder for better UX
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==" // Base64 blur placeholder
                    priority={false} // Lazy load images
                  />
                  <CardContent className="p-4">
                    <h3
                      className={`text-lg font-semibold text-foreground ${website.mode === "development" &&
                        "bg-secondary text-secondary-foreground w-fit p-1 rounded-full text-sm px-2 border-secondary border"
                        } ${website.mode === "doing" &&
                        "bg-primary text-primary-foreground w-fit p-1 rounded-full text-sm px-2 border-primary border"
                        }`}
                    >
                      {website.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {website.description}
                    </p>
                    <div className="absolute bottom-4 right-4">
                      <ArrowRightIcon className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Websites;
