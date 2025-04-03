"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

export interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  format: string;
  secure_url: string;
  width: number;
  height: number;
  folder: string;
}

export interface GalleryImage extends CloudinaryImage {
  alt: string;
  category: string;
}

export const baseFolderPath = "Bajrang Painters";

export const folderToCategory: { [key: string]: string } = {
  commercial: "Commercial",
  residential: "Residential",
  interior: "Interior",
  exterior: "Exterior",
  samples: "Samples",
};

export const categoryColors: { [key: string]: string } = {
  commercial: "bg-blue-500",
  residential: "bg-green-500",
  interior: "bg-purple-500",
  exterior: "bg-orange-500",
  samples: "bg-pink-500",
};

interface ImageContextType {
  allImages: GalleryImage[];
  isLoading: boolean;
  error: string | null;
  fetchImagesFromFolder: (folder: string) => Promise<GalleryImage[]>;
  folderToCategory: typeof folderToCategory;
  categoryColors: typeof categoryColors;
  categories: string[];
  refreshImages: () => Promise<void>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<string[]>(["all"]);

  // Function to fetch images from a specific folder
  const fetchImagesFromFolder = useCallback(
    async (folder: string): Promise<GalleryImage[]> => {
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
          const pathParts = item.folder.split("/");
          const categoryFromFolder =
            pathParts[pathParts.length - 1].toLowerCase();

          return {
            ...item,
            alt: `${
              folderToCategory[categoryFromFolder] || categoryFromFolder
            } painting project`,
            category: categoryFromFolder,
          };
        });
      } catch (error) {
        console.error(`Failed to fetch images from ${folder}:`, error);
        return [];
      }
    },
    []
  );

  // Function to reload all images
  const refreshImages = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const categoryList = Object.keys(folderToCategory);
      const imagePromises = categoryList.map((category) =>
        fetchImagesFromFolder(`${baseFolderPath}/${category}`)
      );

      const results = await Promise.all(imagePromises);
      const allLoadedImages = results.flat().filter(Boolean);

      if (allLoadedImages.length === 0) {
        setError("No images found");
        return;
      }

      setAllImages(allLoadedImages);

      // Set unique categories
      const uniqueCategories = [
        "all",
        ...new Set(allLoadedImages.map((img) => img.category)),
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      setError((err as Error).message || "Failed to load images");
    } finally {
      setIsLoading(false);
    }
  }, [fetchImagesFromFolder]);

  // Load all images on mount
  useEffect(() => {
    refreshImages();
  }, [refreshImages]);

  return (
    <ImageContext.Provider
      value={{
        allImages,
        isLoading,
        error,
        fetchImagesFromFolder,
        folderToCategory,
        categoryColors,
        categories,
        refreshImages,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

/**
 * Custom hook to access the image context
 *
 * @returns The image context containing all images and related utilities
 * @throws Error if used outside of an ImageProvider
 */
export function useImages() {
  const context = useContext(ImageContext);

  if (context === undefined) {
    throw new Error("useImages must be used within an ImageProvider");
  }

  return context;
}
