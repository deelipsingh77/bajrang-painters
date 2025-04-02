"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
// import PaintSplashes from "@/components/paint-splashes";
// import PaintDrops from "@/components/paint-drops";
import carouselImages from "@/constants/carousel-images";
import FullWidthCarousel from "@/components/full-width-carousel";
// import AnimatedBackgroundShapes from "@/components/animated-background-shapes";
import ParallaxBackground from "@/components/parallax-background";
import StatsHeader from "@/components/stats-header";
import StatsCounter from "@/components/stats-counter";
import FeaturesHeader from "@/components/features-header";
import FeatureCards from "@/components/feature-cards";
// import PaintBrushCursor from "@/components/paint-brush-cursor";
import ImageGallery from "@/components/image-gallery"; // Add this import
import Image from "next/image";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const galleryRef = useRef(null); // Add this ref

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroScrollYProgress = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  }).scrollYProgress;

  const heroY = useTransform(heroScrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScrollYProgress, [0, 0.8], [1, 0.9]);

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Auto-advance carousel with spring physics
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  // Add these state variables
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalAlt, setModalAlt] = useState<string>("");

  // Add this function to open the modal
  const openImageModal = (src: string, alt: string) => {
    setModalImage(src);
    setModalAlt(alt);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  // Add this function to close the modal
  const closeImageModal = () => {
    setModalImage(null);
    // Re-enable scrolling
    document.body.style.overflow = "auto";
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="fixed inset-0 z-0 bg-gradient-to-b from-blue-50 to-white"
        style={{
          background: useTransform(
            smoothScrollYProgress,
            [0, 0.5, 1],
            [
              "linear-gradient(to bottom, rgba(240, 249, 255, 1), rgba(255, 255, 255, 1))",
              "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(240, 249, 255, 1))",
              "linear-gradient(to bottom, rgba(240, 249, 255, 0.8), rgba(255, 255, 255, 1))",
            ]
          ),
        }}
      />

      {/* Floating paint drops */}
      {/* <PaintDrops /> */}

      {/* Hero Section with Full-Width Carousel */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden"
        style={{
          y: heroY,
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        {/* Full-width carousel */}
        <FullWidthCarousel
          currentSlide={currentSlide}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />

        {/* Animated background elements */}
        {/* <AnimatedBackgroundShapes /> */}
      </motion.section>

      <motion.section
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.h3
            className="text-lg md:text-xl font-medium mb-2 text-center text-blue-600"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Crafting Innovation{" "}
            <span className="text-blue-900">Since 2016</span>
          </motion.h3>

          <div className="flex justify-center mb-10">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center text-blue-900 relative"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Commercial & Industrial Painting Experts
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.span
                  className="h-1 bg-black rounded-full block"
                  initial={{ width: 0 }}
                  whileInView={{ width: "700px" }}
                  transition={{
                    duration: 1.5,
                    delay: 0.4,
                    ease: "easeInOut",
                  }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </motion.h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm">
            <motion.div
              className="w-full md:w-2/5 flex justify-center"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/logos/gcmugfkpeirxcxnojdc9"
                  alt="Bajrang Painters Logo"
                  width={240}
                  height={180}
                  className="w-60 h-auto rounded-lg shadow-md"
                  priority
                />
              </motion.div>
            </motion.div>

            <div className="w-full md:w-3/5 space-y-4">
              <motion.div
                className="bg-white/90 p-5 rounded-lg shadow-md border-l-4 border-blue-500"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)",
                }}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Professional Expertise
                </h3>
                <p className="text-gray-700">
                  We specialize in all commercial and industrial painting with
                  expert knowledge of specialized coatings application. Our team
                  stays current with the latest equipment and techniques to
                  deliver superior results every time.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/90 p-5 rounded-lg shadow-md border-l-4 border-blue-500"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)",
                }}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Our Promise
                </h3>
                <p className="text-gray-700">
                  We excel in challenging environments where others can&apos;t.
                  No job is too large or small, and we guarantee your
                  satisfaction with every project. Rest easy knowing we&apos;re
                  fully licensed and insured for your protection.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Before & After Section */}
      <motion.section 
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Transformative Results
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See the dramatic difference our professional painting services can make to your property.
            </p>
            <motion.div
              className="h-1 w-40 bg-blue-600 mx-auto mt-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "10rem" }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-10">
            {/* Before Card */}
            <motion.div 
              className="relative group w-full md:w-2/5 overflow-hidden rounded-xl shadow-lg cursor-pointer"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => openImageModal(
                "https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/before-after/zeizppsqgxf8dnauvlk5",
                "Before renovation"
              )}
            >
              <motion.div 
                className="aspect-video bg-gray-100 overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/before-after/zeizppsqgxf8dnauvlk5"
                  alt="Before renovation"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold">Before</h3>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Aged and weathered surface requiring professional attention
                  </p>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Before
              </div>
            </motion.div>
            
            {/* Arrow animation */}
            <motion.div 
              className="hidden md:flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.div>
            </motion.div>
            
            {/* After Card */}
            <motion.div 
              className="relative group w-full md:w-2/5 overflow-hidden rounded-xl shadow-lg cursor-pointer"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => openImageModal(
                "https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/before-after/lwhiguyv1p9ab6fkl7fq",
                "After renovation"
              )}
            >
              <motion.div 
                className="aspect-video bg-gray-100 overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/before-after/lwhiguyv1p9ab6fkl7fq"
                  alt="After renovation"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold">After</h3>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Completely transformed with our premium painting solutions
                  </p>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                After
              </div>
            </motion.div>
          </div>
          
          <motion.p
            className="text-center mt-8 text-gray-600 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Click on images to view in full size.
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section with Parallax */}
      <motion.section
        ref={statsRef}
        className="relative py-24 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <ParallaxBackground />

        <div className="container mx-auto px-4 relative z-10">
          <StatsHeader />
          <StatsCounter />
        </div>
      </motion.section>

      {/* Why Choose Us with 3D Cards */}
      <motion.section
        ref={featuresRef}
        className="relative py-24 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <FeaturesHeader />
          <FeatureCards />
        </div>

        {/* Animated paint splashes */}
        {/* <PaintSplashes /> */}
      </motion.section>

      {/* Add the new Image Gallery section here */}
      <motion.section
        ref={galleryRef}
        className="relative py-24 overflow-hidden bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <ImageGallery />
      </motion.section>

      {/* Floating paint brush cursor effect */}
      {/* <PaintBrushCursor /> */}

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
                stiffness: 100 
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
    </motion.div>
  );
}
