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
function Resize({ image }: { image: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="opacity-40 group-hover:opacity-100 bg-white p-3 rounded-full shadow-lg transition-all duration-300">
          <Expand className="text-gray-800" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px]">
        <DialogTitle>Enlarged View</DialogTitle>
        <DialogDescription>
          This is an enlarged preview of the selected image. Press ESC or click outside to close.
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
