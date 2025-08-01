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
import { Expand } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTranslations } from "next-intl";
function Resize({ image }: { image: string }) {
  const t = useTranslations("gallery");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="opacity-40 group-hover:opacity-100 bg-background p-3 rounded-full shadow-lg transition-all duration-300">
          <Expand className="text-foreground" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px]">
        <DialogTitle>{t("enlargedView")}</DialogTitle>
        <DialogDescription>
          {t("enlargedDescription")}
        </DialogDescription>
        <Image
          src={image}
          alt="Enlarged view"
          width={800}
          height={600}
          className="w-full h-full object-contain rounded-2xl"
          sizes="(max-width: 400px) 100vw, 400px"
        />
      </DialogContent>
    </Dialog>
  );
}

export default Resize;
