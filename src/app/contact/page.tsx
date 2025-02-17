"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600">
              Get in touch with us for your painting needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <Input placeholder="Your Name" />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" />
                </div>
                <div>
                  <Input placeholder="Phone Number" />
                </div>
                <div>
                  <Textarea placeholder="Your Message" className="h-32" />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <MapPinIcon className="h-5 w-5 text-primary" />
                    <p>H-61, SECTOR-12, NOIDA</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <PhoneIcon className="h-5 w-5 text-primary" />
                    <p>+91-9891623038</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MailIcon className="h-5 w-5 text-primary" />
                    <p>bajarangpainters@gmail.com</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <ClockIcon className="h-5 w-5 text-primary" />
                    <div>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}