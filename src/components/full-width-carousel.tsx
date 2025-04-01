import { motion, AnimatePresence, useAnimate } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import TextReveal from "./text-reveal";
import carouselImages from "@/constansts/carousel-images";
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

  // Animation for slide change
  useEffect(() => {
    animate(scope.current, { opacity: [0.5, 1] }, { duration: 0.5 });
  }, [currentSlide, animate, scope]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      ref={constraintsRef}
    >
      {/* Carousel content */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlide}
          ref={scope}
          className="absolute inset-0 w-full h-full"
          initial={{
            opacity: 0,
            scale: 1.1,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1.0],
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            transition: {
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1.0],
            },
          }}
        >
          {/* Background image with parallax effect */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          >
            <Image
              src={carouselImages[currentSlide].src || "/placeholder.svg"}
              alt={carouselImages[currentSlide].alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </motion.div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-xl">
                <TextReveal text={carouselImages[currentSlide].title} />

                <motion.p
                  className="text-lg text-white/90 mt-6 drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {carouselImages[currentSlide].description}
                </motion.p>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
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
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots - keeping these for accessibility and user control */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center space-x-4">
        {carouselImages.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/40"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1 + index * 0.1,
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
            onClick={() => {
              if (index > currentSlide) {
                nextSlide();
              } else if (index < currentSlide) {
                prevSlide();
              }
            }}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Arrow navigation buttons have been removed */}
    </div>
  );
}

export default FullWidthCarousel;
