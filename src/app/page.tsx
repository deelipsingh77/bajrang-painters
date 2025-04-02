"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
    </motion.div>
  );
}
