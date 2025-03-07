"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  BrushIcon,
  LeafIcon,
  DollarSignIcon,
  ShieldIcon,
  PaintBucketIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PaintbrushIcon,
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, useAnimate, AnimationSequence } from "framer-motion"

// Hero carousel images
const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1562259949-e8e7689d7828",
    alt: "Painting Services",
    title: "Crafting Beautiful Spaces with Precision and Passion",
    description:
      "We are a locally owned and managed painting contractor providing superior quality painting services for over 10 years.",
  },
  {
    src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
    alt: "Interior Painting",
    title: "Transform Your Interior Spaces",
    description: "Our expert team brings new life to your home with premium paints and meticulous attention to detail.",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    alt: "Exterior Painting",
    title: "Elevate Your Home's Curb Appeal",
    description: "Weather-resistant, long-lasting exterior painting solutions that protect and beautify your property.",
  },
]

// Particle colors
const particleColors = ["#FF5A5F", "#3498DB", "#2ECC71", "#F1C40F", "#9B59B6"]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const featuresRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const heroScrollYProgress = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  }).scrollYProgress

  const heroY = useTransform(heroScrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(heroScrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(heroScrollYProgress, [0, 0.8], [1, 0.9])

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Auto-advance carousel with spring physics
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearTimeout(timer)
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

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
            ],
          ),
        }}
      />

      {/* Floating paint drops */}
      <PaintDrops />

      {/* Hero Section with 3D Carousel */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen py-20 overflow-hidden"
        style={{
          y: heroY,
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <HeroContent currentSlide={currentSlide} />

            <HeroCarousel currentSlide={currentSlide} nextSlide={nextSlide} prevSlide={prevSlide} />
          </div>
        </div>

        {/* Animated background elements */}
        <AnimatedBackgroundShapes />
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
        <PaintSplashes />
      </motion.section>

      {/* Floating paint brush cursor effect */}
      <PaintBrushCursor />
    </motion.div>
  )
}

// Hero Content Component with Text Animation
function HeroContent({ currentSlide }: { currentSlide: number }) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className="min-h-[200px]"
        >
          <TextReveal text={carouselImages[currentSlide].title} />
          <motion.p
            className="text-lg text-gray-600 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {carouselImages[currentSlide].description}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
          delay: 0.8,
        }}
      >
        <Button size="lg" className="bg-primary hover:bg-primary/90 mt-4 relative overflow-hidden group">
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

      <div className="flex space-x-2 mt-6">
        {carouselImages.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-primary" : "bg-gray-300"}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1 + index * 0.1,
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Text Reveal Animation
function TextReveal({ text }: { text: string }) {
  // Split text into words
  const words = text.split(" ")

  // Animation variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  // Animation variants for each word
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.h1
      className="text-4xl md:text-5xl font-bold tracking-tight flex flex-wrap"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span key={index} className="mr-2 inline-block" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.h1>
  )
}

// 3D Carousel Component
function HeroCarousel({ currentSlide, nextSlide, prevSlide }: { currentSlide: number; nextSlide: () => void; prevSlide: () => void }) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const sequence = [
      [scope.current, { scale: 0.95, rotateY: 5 }, { duration: 0.3 }],
      [scope.current, { scale: 1, rotateY: 0 }, { duration: 0.3, delay: 0.1 }],
    ]

    animate(sequence as AnimationSequence)
  }, [currentSlide, animate, scope])

  return (
    <motion.div
      ref={scope}
      className="relative h-[400px] rounded-lg overflow-hidden perspective-1000"
      initial={{ opacity: 0, rotateY: 30, scale: 0.9 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
    >
      <motion.div className="absolute inset-0 flex items-center justify-between z-20 px-4">
        <motion.button
          onClick={prevSlide}
          className="bg-white/80 p-3 rounded-full text-primary"
          whileHover={{
            scale: 1.2,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ChevronLeftIcon size={24} />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="bg-white/80 p-3 rounded-full text-primary"
          whileHover={{
            scale: 1.2,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ChevronRightIcon size={24} />
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, rotateY: 45, scale: 0.8 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: -45, scale: 0.8 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={carouselImages[currentSlide].src || "/placeholder.svg"}
            alt={carouselImages[currentSlide].alt}
            fill
            className="object-cover rounded-lg"
            priority
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />

          {/* Animated paint drip effect */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/30 to-transparent"
            initial={{ y: 80 }}
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
    </motion.div>
  )
}

// Animated Background Shapes
function AnimatedBackgroundShapes() {
  return (
    <>
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary/10"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-32 h-32 rounded-full bg-yellow-500/10"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -20, 0],
          y: [0, 40, 0],
          rotate: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-blue-500/10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </>
  )
}

// Parallax Background for Stats Section
function ParallaxBackground() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])

  return (
    <>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.03), transparent 800px)",
        }}
      />
      <motion.div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5" style={{ y: y1 }} />
      <motion.div className="absolute top-40 right-10 w-80 h-80 rounded-full bg-blue-500/5" style={{ y: y2 }} />
      <motion.div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-yellow-500/5" style={{ y: y3 }} />
    </>
  )
}

// Stats Header with Animation
function StatsHeader() {
  return (
    <motion.div
      className="text-center mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
    >
      <motion.h2
        className="text-4xl font-bold mb-4 relative inline-block"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
          },
        }}
      >
        Our Impact
        <motion.span
          className="absolute -bottom-2 left-0 right-0 h-1 bg-primary"
          initial={{ width: 0, left: "50%" }}
          whileInView={{ width: "100%", left: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        />
      </motion.h2>
      <motion.p
        className="text-gray-600 mt-4 max-w-2xl mx-auto"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.2 },
          },
        }}
      >
        Our dedication to excellence has made a significant impact in the industry and for our clients
      </motion.p>
    </motion.div>
  )
}

// Stats Counter with Animation
function StatsCounter() {
  return (
    <motion.div
      className="grid md:grid-cols-3 gap-8"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <StatItem number={3690} label="Successful Projects" delay={0.2} color="from-pink-500 to-purple-500" />
      <StatItem number={10} label="Years Experience" delay={0.4} color="from-blue-500 to-cyan-500" />
      <StatItem number={8800} label="Happy Clients" delay={0.6} color="from-green-500 to-emerald-500" />
    </motion.div>
  )
}

// Individual Stat Item with Counter Animation
function StatItem({ number, label, delay, color }: { number: number; label: string; delay: number; color: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let startTime: number | undefined
      let animationFrame: number
      const duration = 2000 // 2 seconds

      const animate = (timestamp: number): void => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        setCount(Math.floor(progress * number))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, number])

  return (
    <motion.div
      ref={ref}
      className="text-center relative"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay,
          },
        },
      }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-5 rounded-xl`}
        initial={{ scale: 0, borderRadius: "100%" }}
        whileInView={{ scale: 1, borderRadius: "0.75rem" }}
        transition={{ duration: 0.8, delay }}
        viewport={{ once: true }}
      />
      <motion.div
        className="relative z-10 p-8"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.h3
          className={`text-5xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: delay + 0.2,
          }}
          viewport={{ once: true }}
        >
          {count}+
        </motion.h3>
        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto my-3"
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          transition={{ duration: 0.8, delay: delay + 0.4 }}
          viewport={{ once: true }}
        />
        <motion.p
          className="text-gray-600 mt-2 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.6 }}
          viewport={{ once: true }}
        >
          {label}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

// Features Header with Animation
function FeaturesHeader() {
  return (
    <motion.div
      className="text-center mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
    >
      <motion.span
        className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Our Advantages
      </motion.span>
      <motion.h2
        className="text-4xl font-bold mb-4"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
          },
        }}
      >
        Why Choose Us
      </motion.h2>
      <motion.p
        className="text-gray-600 mt-4 max-w-2xl mx-auto"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.2 },
          },
        }}
      >
        Committed to Excellence in Every Brushstroke
      </motion.p>
      <motion.div
        className="w-20 h-1 bg-primary mx-auto mt-4"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 80, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      />
    </motion.div>
  )
}

// 3D Feature Cards
function FeatureCards() {
  const features = [
    {
      icon: <LeafIcon className="w-12 h-12 text-green-500 mb-4" />,
      title: "Eco-Friendly",
      description: "We use environmentally conscious materials and techniques",
      color: "from-green-500 to-emerald-500",
      delay: 0,
    },
    {
      icon: <DollarSignIcon className="w-12 h-12 text-blue-500 mb-4" />,
      title: "Value for Money",
      description: "Competitive pricing without compromising on quality",
      color: "from-blue-500 to-cyan-500",
      delay: 0.1,
    },
    {
      icon: <BrushIcon className="w-12 h-12 text-purple-500 mb-4" />,
      title: "Expert Team",
      description: "Skilled professionals with years of experience",
      color: "from-purple-500 to-indigo-500",
      delay: 0.2,
    },
    {
      icon: <ShieldIcon className="w-12 h-12 text-red-500 mb-4" />,
      title: "Satisfaction Guaranteed",
      description: "Your satisfaction is our top priority",
      color: "from-red-500 to-pink-500",
      delay: 0.3,
    },
    {
      icon: <PaintBucketIcon className="w-12 h-12 text-yellow-500 mb-4" />,
      title: "Quality Materials",
      description: "We use only the highest quality paints and materials",
      color: "from-yellow-500 to-amber-500",
      delay: 0.4,
    },
    {
      icon: <StarIcon className="w-12 h-12 text-orange-500 mb-4" />,
      title: "Experienced",
      description: "Over 10 years of industry experience",
      color: "from-orange-500 to-red-500",
      delay: 0.5,
    },
  ]

  return (
    <motion.div
      className="grid md:grid-cols-3 gap-8"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          color={feature.color}
          delay={feature.delay}
        />
      ))}
    </motion.div>
  )
}

// Individual Feature Card with 3D Effect
function FeatureCard({ 
  icon, 
  title, 
  description, 
  color, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string; 
  delay: number; 
}) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * 10
    const rotateY = ((centerX - x) / centerX) * 10

    setRotateX(rotateX)
    setRotateY(rotateY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className="h-full perspective-1000"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay,
          },
        },
      }}
    >
      <motion.div
        className="relative h-full rounded-xl overflow-hidden"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
        whileHover={{ z: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Card className="p-6 h-full border-none shadow-xl relative z-10 bg-white/90 backdrop-blur-sm">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br opacity-5 rounded-xl"
            style={{ background: `linear-gradient(to bottom right, var(--${color}))` }}
          />
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`bg-gradient-to-br ${color} p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto`}
          >
            {icon}
          </motion.div>
          <motion.h3
            className="text-xl font-semibold mb-2 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.3 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h3>
          <motion.div
            className="w-10 h-0.5 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-3"
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            transition={{ duration: 0.8, delay: delay + 0.4 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-gray-600 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.5 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>
        </Card>
      </motion.div>
    </motion.div>
  )
}

// Paint Drops Animation
function PaintDrops() {
  const drops = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {drops.map((_, i) => {
        const size = Math.random() * 30 + 10
        const color = particleColors[Math.floor(Math.random() * particleColors.length)]
        const left = Math.random() * 100
        const delay = Math.random() * 20
        const duration = Math.random() * 20 + 10

        return (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              left: `${left}%`,
              top: -100,
            }}
            animate={{
              top: ["0%", "100%"],
              scale: [1, 0.8, 1.2, 0.7, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}

// Paint Splashes Animation
function PaintSplashes() {
  const splashes = Array.from({ length: 5 }, (_, i) => i)

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {splashes.map((_, i) => {
        const size = Math.random() * 200 + 100
        const color = particleColors[Math.floor(Math.random() * particleColors.length)]
        const left = Math.random() * 100
        const top = Math.random() * 100
        const delay = i * 0.5

        return (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              left: `${left}%`,
              top: `${top}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            transition={{
              duration: 1.5,
              delay,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            viewport={{ once: true, margin: "-100px" }}
          />
        )
      })}
    </div>
  )
}

// Paint Brush Cursor Effect
function PaintBrushCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      <motion.div
        className="relative"
        animate={{ rotate: [0, 45, 0, -45, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      >
        <PaintbrushIcon className="w-8 h-8 text-primary" />
        <motion.div
          className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-primary"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </motion.div>
  )
}

