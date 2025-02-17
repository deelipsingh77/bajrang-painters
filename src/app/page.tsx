"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BrushIcon, LeafIcon, DollarSignIcon, ShieldIcon, PaintBucketIcon, StarIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Crafting Beautiful Spaces with Precision and Passion
              </h1>
              <p className="text-lg text-gray-600">
                We are a locally owned and managed painting contractor providing superior quality painting services for over 10 years.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828"
                alt="Painting Services"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">3,690+</h3>
              <p className="text-gray-600 mt-2">Successful Projects</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">10+</h3>
              <p className="text-gray-600 mt-2">Years Experience</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">8,800+</h3>
              <p className="text-gray-600 mt-2">Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Us</h2>
            <p className="text-gray-600 mt-4">Committed to Excellence</p>
            <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <LeafIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">We use environmentally conscious materials and techniques</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <DollarSignIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Value for Money</h3>
              <p className="text-gray-600">Competitive pricing without compromising on quality</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <BrushIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Skilled professionals with years of experience</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <ShieldIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600">Your satisfaction is our top priority</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <PaintBucketIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Materials</h3>
              <p className="text-gray-600">We use only the highest quality paints and materials</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <StarIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Experienced</h3>
              <p className="text-gray-600">Over 10 years of industry experience</p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}