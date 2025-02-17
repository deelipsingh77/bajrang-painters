"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Painting Services</h1>
            <p className="text-lg text-gray-600 mb-8">
              We are locally owned and managed painting contractor in NCR providing superior quality painting services for over 10 years.
            </p>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-gray-600">
                Working in multiple teams, uniformly dressed and each with its own team leader, we can efficiently handle multiple projects simultaneously without losing our signature &ldquo;personal touch&rdquo;. We obtain all our products directly from manufacturers to ensure competitive pricing.
              </p>
              <p className="text-gray-600">
                With a vast range of products to choose from, quotations can be tailored to suit each individual client. We offer budget calculation services for larger projects and provide product and workmanship guarantees at no additional charge.
              </p>
              <Button size="lg">Learn More</Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f"
                alt="Painting Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">3,690+</h3>
              <p className="text-gray-600 mt-2">Projects Completed</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">10+</h3>
              <p className="text-gray-600 mt-2">Years Experience</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">8,800+</h3>
              <p className="text-gray-600 mt-2">Happy Clients</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">50+</h3>
              <p className="text-gray-600 mt-2">Team Members</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}