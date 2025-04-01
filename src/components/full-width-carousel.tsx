import { motion, AnimatePresence, useAnimate } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import TextReveal from "./text-reveal";
import carouselImages from "@/constants/carousel-images";
import { Button } from "./ui/button";

// Full-Width Carousel Component
interface FullWidthCarouselProps {
  currentSlide: number;
  nextSlide: () => void;
  prevSlide: () => void;
}

function FullWidthCarousel({
  currentSlide,
  nextSlide,
  prevSlide,
}: FullWidthCarouselProps) {
  const [scope, animate] = useAnimate();
  const constraintsRef = useRef(null);

  // Preload images
  useEffect(() => {
    carouselImages.forEach((image) => {
      const img = new window.Image();
      img.src = image.src;
    });
  }, []);

  // Animation for slide change
  useEffect(() => {
    if (scope.current) {
      animate(scope.current, { opacity: [0.5, 1] }, { duration: 0.5 });
    }
  }, [currentSlide, animate, scope]);

  // Ensure current slide is valid
  const safeSlideIndex = Math.max(
    0,
    Math.min(currentSlide, carouselImages.length - 1)
  );

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      ref={constraintsRef}
    >
      {/* Carousel content */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={safeSlideIndex}
          ref={scope}
          className="absolute inset-0 w-full h-full"
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.6,
              ease: "easeOut",
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            transition: {
              duration: 0.4,
              ease: "easeIn",
            },
          }}
        >
          {/* Background image with simpler animation */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={carouselImages[safeSlideIndex].src}
              alt={carouselImages[safeSlideIndex].alt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-xl">
                <TextReveal text={carouselImages[safeSlideIndex].title} />

                <motion.p
                  className="text-lg text-white/90 mt-6 drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {carouselImages[safeSlideIndex].description}
                </motion.p>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Get Started</span>
                    <motion.span
                      className="absolute inset-0 bg-white"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                      style={{ opacity: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Animated paint drip effect */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/40 to-transparent"
            initial={{ y: 128 }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation controls - improved for better visibility and usability */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center space-x-4">
        {carouselImages.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${
              safeSlideIndex === index ? "bg-white" : "bg-white/40"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.5 + index * 0.1,
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
            onClick={() => {
              if (index > safeSlideIndex) {
                nextSlide();
              } else if (index < safeSlideIndex) {
                prevSlide();
              }
            }}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Add arrow navigation buttons for better UX */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default FullWidthCarousel;
