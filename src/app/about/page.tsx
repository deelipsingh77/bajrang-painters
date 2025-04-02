"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutPage() {
  // State for modal functionality
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalAlt, setModalAlt] = useState<string>("");

  // Function to open modal
  const openImageModal = (src: string, alt: string) => {
    setModalImage(src);
    setModalAlt(alt);
    document.body.style.overflow = "hidden";
  };

  // Function to close modal
  const closeImageModal = () => {
    setModalImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Bajrang Painters</h1>
            <p className="text-lg text-gray-700 mb-8">
              Bringing color, quality, and craftsmanship to homes and businesses across the NCR region since 2016.
            </p>
          </div>
        </div>
      </section>

      {/* Company Info with Portrait Image */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Our Journey</h2>
          <p className="text-gray-700 leading-relaxed">
            We&apos;re a locally-owned and managed painting contractor in the NCR region, delivering premium quality painting services for over a decade. Our reputation is built on consistency, attention to detail, and customer satisfaction.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our teams operate in distinctive uniforms, each led by an experienced team leader. This structured approach allows us to efficiently manage multiple projects simultaneously while maintaining our signature &quot;personal touch&quot; that clients have come to value.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We source products directly from manufacturers, eliminating middlemen to ensure competitive pricing for our clients. With access to an extensive range of quality materials, we customize quotations to perfectly match each client&apos;s specific needs and budget.
          </p>
          <div className="pt-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Commitments:</h3>
            <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Complimentary budget calculation services for larger projects</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Comprehensive product and workmanship guarantees at no additional cost</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Transparent pricing with no hidden fees or surprises</span>
          </li>
            </ul>
          </div>
          <div className="pt-2">
            <Link href="/services">
          <Button size="lg" className="mt-4">Our Services</Button>
            </Link>
          </div>
        </div>
        
        {/* Portrait image moved here */}
        <motion.div 
          className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-xl cursor-pointer h-[550px] mx-auto w-full"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          onClick={() => openImageModal(
            "https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/about/ojyupuqgs6j25z6xouqi",
            "Professional painter applying finishing touches"
          )}
        >
          <Image
            src="https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/about/ojyupuqgs6j25z6xouqi"
            alt="Professional painter applying finishing touches"
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end">
            <div className="p-6 text-white">
          <p className="font-medium">Precision in every detail</p>
            </div>
          </div>
        </motion.div>
          </div>
        </div>
      </section>
      
      {/* Two Landscape Images Side by Side */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* First landscape image */}
            <motion.div 
              className="aspect-[16/9] relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openImageModal(
                "https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/about/uutbjvxaf5yzh4t9tqvd",
                "Team working on a large commercial project"
              )}
            >
              <Image
                src="https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/about/uutbjvxaf5yzh4t9tqvd"
                alt="Team working on a large commercial project"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <p className="font-medium">Commercial excellence</p>
                </div>
              </div>
            </motion.div>
            
            {/* Second landscape image */}
            <motion.div 
              className="aspect-[16/9] relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openImageModal(
                "https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/about/lyt54sny9wghwtflr1xg",
                "Team collaboration on residential project"
              )}
            >
              <Image
                src="https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/about/lyt54sny9wghwtflr1xg"
                alt="Team collaboration on residential project"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <p className="font-medium">Teamwork brings results</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <p className="text-center mt-6 text-gray-500 italic">Click on images to view in full size</p>
        </div>
      </section>

      {/* Our Team in Action - removed since images are now integrated above */}

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">1,360+</h3>
              <p className="text-gray-600 mt-2">Projects Completed</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">9+</h3>
              <p className="text-gray-600 mt-2">Years Experience</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">1,261+</h3>
              <p className="text-gray-600 mt-2">Happy Clients</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">45+</h3>
              <p className="text-gray-600 mt-2">Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal - keep this unchanged */}
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
              className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-xl"
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
              
              <div className="h-full flex items-center justify-center">
                <Image
                  src={modalImage}
                  alt={modalAlt}
                  width={1200}
                  height={800}
                  className="w-auto h-auto max-h-[85vh] object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}