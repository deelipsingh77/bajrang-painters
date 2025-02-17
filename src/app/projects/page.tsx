"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Modern Home Interior",
      category: "Interior Painting",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828",
      description: "Complete interior renovation and painting for a modern family home.",
    },
    {
      title: "Commercial Office Space",
      category: "Commercial Painting",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      description: "Large-scale office painting project with custom color schemes.",
    },
    {
      title: "Historic Building Restoration",
      category: "Restoration",
      image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1",
      description: "Careful restoration and painting of a heritage building.",
    },
    {
      title: "Residential Exterior",
      category: "Exterior Painting",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      description: "Complete exterior painting and weatherproofing project.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-lg text-gray-600">
              Discover our completed projects and transformations
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary mb-2">{project.category}</div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}