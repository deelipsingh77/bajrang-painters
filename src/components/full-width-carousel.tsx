import { motion, AnimatePresence, useAnimate } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import TextReveal from "./text-reveal";
import carouselItems from "@/constants/carousel-images";
import { Button } from "./ui/button";

// Define types for carousel items
interface BaseCarouselItem {
  type: "image" | "video";
  alt: string;
  title: string;
  description: string;
}

interface ImageCarouselItem extends BaseCarouselItem {
  type: "image";
  src: string;
}

interface VideoCarouselItem extends BaseCarouselItem {
  type: "video";
  src: string;
  poster: string;
}

type CarouselItem = ImageCarouselItem | VideoCarouselItem;

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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Preload images
  useEffect(() => {
    carouselItems.forEach((item) => {
      if (item.type === "image") {
        const img = new window.Image();
        img.src = item.src;
      }
    });
  }, []);

  // Handle video playback
  useEffect(() => {
    const currentItem = carouselItems[safeSlideIndex];
    
    // Play video when it's the active slide
    if (currentItem?.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      
      // Try to play the video (may be blocked by browser policies)
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play was prevented:", error);
        });
      }
    }
  }, [currentSlide]);

  // Animation for slide change
  useEffect(() => {
    if (scope.current) {
      animate(scope.current, { opacity: [0.5, 1] }, { duration: 0.5 });
    }
  }, [currentSlide, animate, scope]);

  // Ensure current slide is valid
  const safeSlideIndex = Math.max(
    0,
    Math.min(currentSlide, carouselItems.length - 1)
  );

  // Get current item
  const currentItem = carouselItems[safeSlideIndex] as CarouselItem;

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
          {/* Background media (image or video) */}
          <div className="absolute inset-0 w-full h-full">
            {currentItem.type === "image" ? (
              <Image
                src={currentItem.src}
                alt={currentItem.alt}
                fill
                className="object-cover object-top"
                priority
                sizes="100vw"
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  poster={currentItem.poster}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  playsInline
                  muted
                  loop
                >
                  <source src={`${currentItem.src}.mp4`} type="video/mp4" />
                  <source src={`${currentItem.src}.webm`} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-6 right-6 z-20">
                  <button
                    onClick={() => videoRef.current?.paused 
                      ? videoRef.current?.play() 
                      : videoRef.current?.pause()
                    }
                    className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                    aria-label="Play/Pause video"
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
                      {videoRef.current?.paused ? (
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      ) : (
                        <><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></>
                      )}
                    </svg>
                  </button>
                </div>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center z-10">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-xl">
                <TextReveal text={currentItem.title} />

                <motion.p
                  className="text-lg text-white/90 mt-6 drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {currentItem.description}
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

      {/* Navigation dots */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center space-x-4">
        {carouselItems.map((_, index) => (
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
    </div>
  );
}

export default FullWidthCarousel;
