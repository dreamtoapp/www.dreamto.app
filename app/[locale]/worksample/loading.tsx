import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section Skeleton */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-20 h-6 rounded-full" />
          </div>
          <Skeleton className="w-80 h-12 mx-auto rounded-lg" />
          <Skeleton className="w-96 h-6 mx-auto rounded-lg" />
        </div>

        {/* Portfolio Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="overflow-hidden rounded-xl border-0 shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <Skeleton className="w-full h-full" />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    <Skeleton className="w-8 h-3 rounded" />
                  </Badge>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <Skeleton className="w-3/4 h-6 rounded" />
                <Skeleton className="w-full h-4 rounded" />
                <Skeleton className="w-full h-4 rounded" />
                <Skeleton className="w-full h-9 rounded-lg" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 