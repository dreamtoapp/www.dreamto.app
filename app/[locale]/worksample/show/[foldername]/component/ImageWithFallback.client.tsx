"use client"; // Mark this as a Client Component

import Image from "next/image";
import { useState } from "react";
import Resize from "./Resize";

interface ImageType {
  public_id: string;
  optimized_url: string;
}

export default function ImageWithFallback({ image }: { image: ImageType }) {
  const [hasError, setHasError] = useState(false);
  const [reloadCount, setReloadCount] = useState(0); // Use a counter instead of a boolean

  const handleError = () => {
    setHasError(true);
  };

  const handleReload = () => {
    setHasError(false);
    setReloadCount((prev) => prev + 1); // Increment the counter to force re-render
  };

  return (
    <div className="relative flex items-center justify-center p-4">
      <div className="relative w-full pb-[100%] rounded-2xl overflow-hidden shadow-lg group bg-gray-100">
        {hasError ? (
          <Image
            src="/assets/logo.webp" // Replace with your fallback image path
            alt="Fallback Image"
            fill
            className="absolute inset-0 w-full h-full object-contain rounded-2xl"
            loading="lazy"
            sizes="(max-width: 400px) 100vw, 400px"
          />
        ) : (
          <Image
            src={`${image.optimized_url}?reload=${reloadCount}`} // Append a query parameter to force re-fetch
            alt={image.public_id}
            fill
            className="absolute inset-0 w-full h-full object-contain rounded-2xl transition-transform duration-300 ease-in-out group-hover:scale-105"
            loading="lazy"
            onError={handleError}
            key={image.public_id} // Use a unique key for the Image component
          />
        )}
      </div>
      {hasError && (
        <button
          onClick={handleReload}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Reload Image
        </button>
      )}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 rounded-2xl group-hover:bg-black/40 transition-colors">
        <Resize image={`${image.optimized_url}?reload=${reloadCount}`} />
      </div>
    </div>
  );
}
