"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrushIcon, PaintBucketIcon, HomeIcon, BuildingIcon, WrenchIcon, SprayCan } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      title: "Interior Painting",
      description: "Professional interior painting services for homes and businesses with attention to detail and premium materials.",
      icon: HomeIcon,
    },
    {
      title: "Exterior Painting",
      description: "Weather-resistant exterior painting solutions that protect and beautify your property.",
      icon: BrushIcon,
    },
    {
      title: "Commercial Painting",
      description: "Large-scale painting services for commercial properties, offices, and retail spaces.",
      icon: BuildingIcon,
    },
    {
      title: "Damp Proofing",
      description: "Effective solutions for moisture problems and waterproofing services.",
      icon: WrenchIcon,
    },
    {
      title: "Roof Painting",
      description: "Specialized roof painting and coating services for protection and aesthetics.",
      icon: PaintBucketIcon,
    },
    {
      title: "Wall Restoration",
      description: "Complete wall restoration and repair services to revive damaged surfaces.",
      icon: SprayCan,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-lg text-gray-600">
              Professional painting services tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="text-gray-600 mb-8">
              Contact us today for a free consultation and quote
            </p>
            <Button size="lg">Get Started</Button>
          </div>
        </div>
      </section>
    </div>
  );
}