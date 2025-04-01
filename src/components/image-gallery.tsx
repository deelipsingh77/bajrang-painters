import { useState, useEffect } from "react";
import Image from "next/image";

interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  format: string;
  secure_url: string;
  width: number;
  height: number;
  folder: string;
}

interface GalleryImage extends CloudinaryImage {
  alt: string;
  category: string;
}

const baseFolderPath = "Bajrang Painters";

const folderToCategory: { [key: string]: string } = {
  "commercial": "Commercial",
  "residential": "Residential", 
  "interior": "Interior",
  "exterior": "Exterior",
  "samples": "Samples"
};

// Add badge colors for different categories
const categoryColors: { [key: string]: string } = {
  "commercial": "bg-blue-500",
  "residential": "bg-green-500",
  "interior": "bg-purple-500",
  "exterior": "bg-orange-500",
  "samples": "bg-pink-500",
};

export default function ImageGallery() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);

  // Function to fetch images from a specific folder
  const fetchImagesFromFolder = async (folder: string) => {
    try {
      const encodedFolder = encodeURIComponent(folder);
      const response = await fetch(`/api/getImages?folder=${encodedFolder}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching images: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || !Array.isArray(data) || data.length === 0) {
        return [];
      }
      
      return data.map((item: CloudinaryImage) => {
        const pathParts = item.folder.split('/');
        const categoryFromFolder = pathParts[pathParts.length - 1].toLowerCase();
        
        return {
          ...item,
          alt: `${folderToCategory[categoryFromFolder] || categoryFromFolder} painting project`,
          category: categoryFromFolder
        };
      });
    } catch (error) {
      console.error(`Failed to fetch images from ${folder}:`, error);
      return [];
    }
  };

  // Load all images on mount
  useEffect(() => {
    async function loadAllImages() {
      setIsLoading(true);
      setError(null);
      
      try {
        const categories = Object.keys(folderToCategory);
        const imagePromises = categories.map(category => 
          fetchImagesFromFolder(`${baseFolderPath}/${category}`)
        );
        
        const results = await Promise.all(imagePromises);
        const allLoadedImages = results.flat().filter(Boolean);
        
        if (allLoadedImages.length === 0) {
          setError("No images found");
          return;
        }
        
        setAllImages(allLoadedImages);
      } catch (err) {
        setError((err as Error).message || "Failed to load images");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadAllImages();
  }, []);

  // Filter images based on active category
  const filteredImages = activeCategory === "all" 
    ? allImages 
    : allImages.filter(img => img.category === activeCategory);

  // Get unique categories
  const categories = ["all", ...new Set(allImages.map(img => img.category))];

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4">
        {/* Simple header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Latest Projects
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Browse through our collection of stunning transformation projects.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category === "all" 
                ? "All Projects" 
                : folderToCategory[category] || category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Image grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.length > 0 ? (
              filteredImages.map((image) => (
                <div
                  key={image.asset_id}
                  className="relative h-72 rounded-lg overflow-hidden shadow-lg group"
                >
                  {/* Category Badge - Always visible */}
                  <div className="absolute top-4 left-4 z-10">
                    <span 
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium text-white
                        shadow-lg backdrop-blur-sm
                        ${categoryColors[image.category] || 'bg-gray-500'}
                      `}
                    >
                      {folderToCategory[image.category] || image.category}
                    </span>
                  </div>

                  <Image
                    src={image.secure_url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={false}
                  />
                  
                  {/* Hover overlay - Now only shows the title */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-medium">
                        {image.alt}
                      </h3>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No images found in this category.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}