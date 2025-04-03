import { useState, useEffect } from "react";
import Image from "next/image";
import { useImages } from "@/context/ImageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const {
    allImages,
    isLoading,
    error,
    categoryColors,
    folderToCategory,
    categories,
    refreshImages,
  } = useImages();

  // Modal state
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalAlt, setModalAlt] = useState<string>("");

  // Filter images based on active category
  const filteredImages =
    activeCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === activeCategory);

  // Force a re-render when component mounts to ensure images load properly
  useEffect(() => {
    // This empty dependency array ensures this only runs once on mount
    const timer = setTimeout(() => {
      refreshImages();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [refreshImages]);

  // Modal functions
  const openImageModal = (src: string, alt: string) => {
    setModalImage(src);
    setModalAlt(alt);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeImageModal = () => {
    setModalImage(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

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
                : folderToCategory[category] ||
                  category.charAt(0).toUpperCase() + category.slice(1)}
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
              onClick={refreshImages}
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
                  className="relative h-72 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                  onClick={() => openImageModal(image.secure_url, image.alt)}
                >
                  {/* Category Badge - Always visible */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium text-white
                        shadow-lg backdrop-blur-sm
                        ${categoryColors[image.category] || "bg-gray-500"}
                      `}
                    >
                      {folderToCategory[image.category] || image.category}
                    </span>
                  </div>

                  <Image
                    src={image.secure_url}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={false}
                  />

                  {/* Hover overlay - Now only shows the title */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-medium">{image.alt}</h3>
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

      {/* Image Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/80 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeImageModal}
          >
            <motion.div
              className="relative max-w-5xl w-full overflow-hidden rounded-xl bg-transparent my-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-xl overflow-hidden">
                {/* Close button positioned at the top-right corner of the image */}
                <motion.button
                  className="absolute top-4 right-4 z-50 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeImageModal}
                  aria-label="Close image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl overflow-hidden"
                >
                  <Image
                    src={modalImage}
                    alt={modalAlt}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain max-h-[80vh] rounded-xl mx-auto"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}