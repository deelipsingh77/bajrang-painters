import { motion, AnimatePresence, useAnimate } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import carouselItems from "@/constants/carousel-images";
import { useContactDialog } from "@/context/ContactDialogContext";

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
  const { openContactDialog } = useContactDialog();
  const [scope] = useAnimate();
  const constraintsRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure current slide is valid
  const safeSlideIndex = Math.max(
    0,
    Math.min(currentSlide, carouselItems.length - 1)
  );

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
  }, [currentSlide, safeSlideIndex]);

  // Animation for slide change
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
                  <source src={currentItem.src} type="video/mp4" />
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

          {/* Logo and Animated Domain Text */}
          <div className="absolute top-1/3 left-0 right-0 z-10 flex justify-center">
            <div className="px-8 py-6 rounded-xl flex items-center gap-4 md:gap-6">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <Image
                  src="https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/logos/gcmugfkpeirxcxnojdc9"
                  alt="Bajrang Painters Logo"
                  width={100}
                  height={100}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
              </motion.div>
              
              {/* Animated Domain Text */}
              <div className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">
                <AnimatedText text="bajrangpainters.com" />
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

      {/* Navigation arrows */}
      <div className="absolute inset-0 flex items-center justify-between z-20 px-4 md:px-8">
        <motion.button
          className="p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
          onClick={prevSlide}
          aria-label="Previous slide"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>

        <motion.button
          className="p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
          onClick={nextSlide}
          aria-label="Next slide"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </div>

      {/* Add the Get Started button above the dots */}
      <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center">
        <motion.button
          onClick={openContactDialog}
          className="px-8 py-3 bg-primary text-white rounded-full font-semibold shadow-lg hover:bg-primary/90 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </div>

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

// Animated text component for domain name
function AnimatedText({ text }: { text: string }) {
  return (
    <motion.div className="flex overflow-hidden">
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.3 + index * 0.06,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default FullWidthCarousel;
