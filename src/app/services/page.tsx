"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrushIcon, HomeIcon, BuildingIcon, WrenchIcon, SprayCan } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function ServicesPage() {
  const services = [
    {
      title: "Industrial Painting",
      description: "Specialized painting solutions for factories, warehouses, and industrial facilities with durable finishes.",
      icon: WrenchIcon,
    },
    {
      title: "Commercial Painting",
      description: "Large-scale painting services for commercial properties, offices, and retail spaces.",
      icon: BuildingIcon,
    },
    {
      title: "Apartments Painting",
      description: "Custom painting services for apartment complexes and multi-family residential buildings.",
      icon: BuildingIcon,
    },
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
      title: "Residential Painting",
      description: "Complete painting solutions for homes and residential properties with expert color consultation and quality finishes.",
      icon: HomeIcon,
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  interface Service {
    title: string;
    description: string;
    icon: React.ElementType;
  }


  const handleCardClick = (service: Service): void => {
    setSelectedService(service);
    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };


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
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleCardClick(service)}
              >
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
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

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {selectedService && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedService.title}
                </DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-4 py-4">
                <selectedService.icon className="w-12 h-12 text-primary" />
                <DialogDescription className="text-lg">
                  {selectedService.description}
                </DialogDescription>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}