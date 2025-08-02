"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Expand, Download, ExternalLink, Maximize2 } from "lucide-react";
import { useTranslations } from "next-intl";
function Resize({ image }: { image: string }) {
  const t = useTranslations("gallery");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-background/90 backdrop-blur-sm hover:bg-background border border-border/20 p-3 rounded-full shadow-lg transition-all duration-300 group/btn"
        >
          <Maximize2 className="w-4 h-4 text-foreground group-hover/btn:scale-110 transition-transform" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
        <div className="relative">
          {/* Header */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border-0">
                <Expand className="w-3 h-3 mr-1" />
                {t("enlargedView")}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={() => window.open(image, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {t("openInNewTab")}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = image;
                  link.download = 'image.jpg';
                  link.click();
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                {t("download")}
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full h-[90vh] bg-black/95">
            <Image
              src={image}
              alt={t("enlargedView")}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Description */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border/20">
              <p className="text-sm text-muted-foreground">
                {t("enlargedDescription")}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Resize;
