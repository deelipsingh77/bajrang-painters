"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import ImageGallery from "@/components/image-gallery";

export default function ProjectsPage() {
  const galleryRef = useRef(null); // Add this ref

  return (
    <div className="min-h-screen">
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
    </div>
  );
}