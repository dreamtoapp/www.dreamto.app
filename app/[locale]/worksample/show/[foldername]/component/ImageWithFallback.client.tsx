"use client";

import Image from "next/image";
import { useState } from "react";
import Resize from "./Resize";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Image as ImageIcon, ZoomIn } from "lucide-react";

interface ImageType {
  public_id: string;
  optimized_url: string;
}

export default function ImageWithFallback({ image }: { image: ImageType }) {
  const [hasError, setHasError] = useState(false);
  const [reloadCount, setReloadCount] = useState(0); // Use a counter instead of a boolean
  const t = useTranslations("gallery");

  const handleError = () => {
    setHasError(true);
  };

  const handleReload = () => {
    setHasError(false);
    setReloadCount((prev) => prev + 1); // Increment the counter to force re-render
  };

  return (
    <Card className="group relative overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/50 backdrop-blur-sm">
      <div className="relative w-full pb-[100%] overflow-hidden">
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center space-y-4 p-6">
              <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">{t("fallbackImage")}</p>
              <Button
                onClick={handleReload}
                size="sm"
                variant="outline"
                className="group/btn"
              >
                <RefreshCw className="w-4 h-4 mr-2 group-hover/btn:rotate-180 transition-transform duration-500" />
                {t("reloadImage")}
              </Button>
            </div>
          </div>
        ) : (
          <Image
            src={`${image.optimized_url}?reload=${reloadCount}`}
            alt={image.public_id}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={handleError}
            key={image.public_id}
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Zoom Badge */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border-0">
            <ZoomIn className="w-3 h-3 mr-1" />
            {t("enlargedView")}
          </Badge>
        </div>

        {/* Resize Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Resize image={`${image.optimized_url}?reload=${reloadCount}`} />
        </div>
      </div>
    </Card>
  );
}
