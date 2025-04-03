"use client";

import { useImages } from "@/context/ImageContext";
import ImageCarousel from "./image-carousel";

interface StandaloneCarouselProps {
  title?: string;
  showTitle?: boolean;
  category?: string;
  maxImages?: number;
  speed?: number;
}

export default function StandaloneCarousel({ 
  title = "Our Recent Work",
  showTitle = true,
  category = "all",
  maxImages = 50,
  speed = 100
}: StandaloneCarouselProps) {
  const { 
    allImages, 
    isLoading, 
    error, 
    categoryColors, 
    folderToCategory 
  } = useImages();

  // Filter images by category if needed
  const filteredImages = category === "all" 
    ? allImages 
    : allImages.filter(img => img.category === category);

  // Limit the number of images if needed
  const displayImages = filteredImages.slice(0, maxImages);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || displayImages.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">No images available to display.</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {showTitle && (
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          {title}
        </h3>
      )}
      <ImageCarousel 
        images={displayImages} 
        categoryColors={categoryColors}
        folderToCategory={folderToCategory}
        speed={speed}
      />
    </div>
  );
}