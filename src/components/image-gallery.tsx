import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Define the interface for Cloudinary image objects
interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  format: string;
  secure_url: string;
  width: number;
  height: number;
  folder: string;
}

// Define the gallery item with extended properties
interface GalleryImage extends CloudinaryImage {
  alt: string;
  category: string;
}

// Define the baseFolderPath for easier folder navigation
const baseFolderPath = "Bajrang Painters";

// Folder to category mapping
const folderToCategory: { [key: string]: string } = {
  "commercial": "Commercial",
  "residential": "Residential", 
  "interior": "Interior",
  "exterior": "Exterior",
  "samples": "Samples"
};

export default function ImageGallery() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to fetch images from a specific folder
  const fetchImagesFromFolder = async (folder: string) => {
    try {
      const encodedFolder = encodeURIComponent(folder);
      const response = await fetch(`/api/getImages?folder=${encodedFolder}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching images: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Map the API response to our GalleryImage format
      return data.map((item: CloudinaryImage) => {
        // Extract the last part of the folder path as the category
        const pathParts = item.folder.split('/');
        const categoryFromFolder = pathParts[pathParts.length - 1].toLowerCase();
        
        return {
          ...item,
          alt: `${folderToCategory[categoryFromFolder] || categoryFromFolder} painting project`,
          category: categoryFromFolder
        };
      });
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setError("Failed to load images. Please try again later.");
      return [];
    }
  };

  // Load all images from different folders on component mount
  useEffect(() => {
    async function loadAllImages() {
      setIsLoading(true);
      try {
        const categories = Object.keys(folderToCategory);
        const imagePromises = categories.map(category => 
          fetchImagesFromFolder(`${baseFolderPath}/${category}`)
        );
        
        const results = await Promise.all(imagePromises);
        const allLoadedImages = results.flat();
        
        setAllImages(allLoadedImages);
        setError(null);
      } catch (err) {
        console.error("Error loading images:", err);
        setError("Failed to load images");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadAllImages();
  }, []);

  // Filter images based on the selected category
  const filteredImages = activeCategory === "all"
    ? allImages
    : allImages.filter(img => img.category === activeCategory);

  // Get unique categories from the loaded images
  const availableCategories = ["all", ...new Set(allImages.map(img => img.category))];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Paint splatter background decorations */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-500/10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-red-500/10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -8, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header with animated underline */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Our Latest Projects
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-primary mx-auto rounded"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Browse through our collection of stunning transformation projects
            that showcase our expertise in both interior and exterior painting.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {availableCategories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === "all" 
                ? "All Projects" 
                : folderToCategory[category] || category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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

        {/* Image gallery with staggered animations */}
        {!isLoading && !error && (
          <motion.div
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
              hidden: {},
            }}
          >
            {filteredImages.length > 0 ? (
              filteredImages.map((image, index) => (
                <motion.div
                  key={image.asset_id}
                  className="relative group h-72 rounded-lg overflow-hidden shadow-lg"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Image */}
                  <Image
                    src={image.secure_url}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Color overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Paint drip effect on hover */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Category tag */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full uppercase tracking-wide font-medium">
                      {folderToCategory[image.category] || image.category}
                    </span>
                  </div>

                  {/* Image info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white font-semibold text-lg">
                      {image.alt}
                    </h3>
                    <motion.div
                      className="h-0.5 w-0 bg-white mt-2"
                      animate={{ width: hoveredIndex === index ? 60 : 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 text-gray-500">
                No images found in this category.
              </div>
            )}
          </motion.div>
        )}

        {/* "View more" button with paint splash effect */}
        {!isLoading && !error && filteredImages.length > 0 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="relative px-8 py-3 bg-primary text-white rounded-full font-medium overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">View More Projects</span>
              {/* Paint splash effect on hover */}
              <motion.div
                className="absolute inset-0 bg-primary-dark"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{
                  scale: 1.5,
                  opacity: 0.3,
                  transition: { duration: 0.4 },
                }}
                style={{ borderRadius: "100%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
