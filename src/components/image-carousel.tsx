import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";

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
  folderToCategory
}: CarouselProps) {
  const [hovering, setHovering] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  // Create two duplicate sets for seamless looping
  const displayImages = [...images, ...images];

  // Handle hover to pause/resume the animation
  const handleMouseEnter = () => {
    setHovering(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setHovering(false);
    startScrolling();
  };

  // Function to start the continuous scroll animation
  const startScrolling = () => {
    if (!carouselRef.current) return;
    
    const carouselWidth = carouselRef.current.scrollWidth / 2;
    
    controls.start({
      x: -carouselWidth,
      transition: {
        duration: speed,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
      }
    });
  };

  // Start scrolling after component mounts
  if (!hovering && carouselRef.current) {
    startScrolling();
  }

  if (images.length === 0) return null;

  return (
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
            className="relative h-64 w-72 flex-shrink-0 mx-2 rounded-lg overflow-hidden shadow-lg group"
          >
            {/* Category Badge */}
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
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="288px"
              priority={index < 5}
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <h3 className="text-white font-medium">
                {image.alt}
              </h3>
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Gradient overlays for fading effect on the edges */}
      <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10"></div>
    </div>
  );
}