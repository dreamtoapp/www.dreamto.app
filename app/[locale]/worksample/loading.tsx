import React from "react";

export default function Loading() {
  return (
    <div className="p-8">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-1/3 mb-4" />
        <div className="h-6 bg-muted rounded w-1/2 mb-2" />
        <div className="h-4 bg-muted rounded w-2/3 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg shadow p-4 space-y-4">
              <div className="h-40 bg-muted rounded mb-2" />
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 