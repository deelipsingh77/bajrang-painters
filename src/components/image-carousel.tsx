import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";

interface CarouselProps {
  images: {
    secure_url: string;
    alt: string;
    category: string;
    asset_id: string;
  }[];
  speed?: number; // lower is faster
  categoryColors: { [key: string]: string };
  folderToCategory: { [key: string]: string };
}

export default function ImageCarousel({
  images,
  speed = 40, // Lower number = faster scroll
  categoryColors,
  folderToCategory,
}: CarouselProps) {
  const [hovering, setHovering] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  // Modal state
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalAlt, setModalAlt] = useState<string>("");

  // Create two duplicate sets for seamless looping
  const displayImages = [...images, ...images];

  // Handle hover to pause/resume the animation
  const handleMouseEnter = () => {
    setHovering(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setHovering(false);
    // Only restart if modal is not open
    if (!modalImage) {
      startScrolling();
    }
  };

  // Function to start the continuous scroll animation
  const startScrolling = useCallback(() => {
    if (!carouselRef.current) return;

    const carouselWidth = carouselRef.current.scrollWidth / 2;

    controls.start({
      x: -carouselWidth,
      transition: {
        duration: speed,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls, speed]);

  // Modal functions
  const openImageModal = (src: string, alt: string) => {
    setModalImage(src);
    setModalAlt(alt);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    // Stop the carousel when modal opens
    controls.stop();
  };

  const closeImageModal = () => {
    setModalImage(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
    // Resume carousel if not hovering
    if (!hovering) {
      startScrolling();
    }
  };

  // Effect to manage carousel animation based on modal state and hovering
  useEffect(() => {
    if (modalImage || hovering) {
      controls.stop();
    } else {
      startScrolling();
    }
  }, [modalImage, hovering, controls, startScrolling]);

  // Initial animation on mount
  useEffect(() => {
    if (!hovering && !modalImage && carouselRef.current) {
      startScrolling();
    }
  }, [hovering, modalImage, startScrolling]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={carouselRef}
          className="flex"
          animate={controls}
          initial={{ x: 0 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
        >
          {displayImages.map((image, index) => (
            <div
              key={`${image.asset_id}-${index}`}
              className="relative h-64 w-72 flex-shrink-0 mx-2 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
              onClick={() => openImageModal(image.secure_url, image.alt)}
            >
              {/* Category Badge */}
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
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="288px"
                priority={index < 5}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <h3 className="text-white font-medium">{image.alt}</h3>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays for fading effect on the edges */}
        <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeImageModal}
          >
            <motion.div
              className="relative max-w-5xl w-full overflow-hidden rounded-xl"
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
              <motion.button
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
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
              >
                <Image
                  src={modalImage}
                  alt={modalAlt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
