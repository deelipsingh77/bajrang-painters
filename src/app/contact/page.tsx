"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email to bajrangpainters@gmail.com (Admin notification)
      const adminEmailContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Request</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
            }
            .email-container {
              border: 1px solid #e1e1e1;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
            }
            .email-header {
              background: #f8fafc;
              padding: 20px;
              text-align: center;
              border-bottom: 1px solid #e1e1e1;
            }
            .logo {
              max-width: 200px;
              height: auto;
            }
            .email-body {
              padding: 30px;
              background: white;
            }
            .email-footer {
              background: #f8fafc;
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 14px;
              border-top: 1px solid #e1e1e1;
            }
            h2 {
              color: #0369a1;
              margin-top: 0;
            }
            .info-item {
              margin-bottom: 15px;
              padding-bottom: 15px;
              border-bottom: 1px solid #f0f0f0;
            }
            .info-item:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: bold;
              color: #555;
              display: block;
              margin-bottom: 5px;
            }
            .value {
              padding-left: 10px;
            }
            .priority {
              background-color: #f0f9ff;
              border-left: 4px solid #0369a1;
              padding: 10px;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <img src="https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/logos/wnmdbthsrv8d71hgjdk9" alt="Bajrang Painters Logo" class="logo">
            </div>
            <div class="email-body">
              <div class="priority">
                <h2>New Contact Request</h2>
                <p>A new inquiry has been submitted through your website.</p>
              </div>
              
              <div class="info-item">
                <span class="label">Name:</span>
                <div class="value">${formData.name}</div>
              </div>
              
              <div class="info-item">
                <span class="label">Email:</span>
                <div class="value">${formData.email}</div>
              </div>
              
              <div class="info-item">
                <span class="label">Phone:</span>
                <div class="value">${formData.phone}</div>
              </div>
              
              <div class="info-item">
                <span class="label">Site Address:</span>
                <div class="value">${formData.address}</div>
              </div>
              
              <div class="info-item">
                <span class="label">Message:</span>
                <div class="value">${formData.message}</div>
              </div>
            </div>
            <div class="email-footer">
              <p>&copy; ${new Date().getFullYear()} Bajrang Painters. All rights reserved.</p>
              <p>H-61, SECTOR-12, NOIDA</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Send notification to the admin
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "bajrangpainters@gmail.com",
          subject: "New Contact Form Submission",
          message: adminEmailContent,
        }),
      });

      // Send confirmation to the user
      const userEmailContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Bajrang Painters</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
            }
            .email-container {
              border: 1px solid #e1e1e1;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
            }
            .email-header {
              background: #f8fafc;
              padding: 25px 20px;
              text-align: center;
              border-bottom: 1px solid #e1e1e1;
            }
            .logo {
              max-width: 200px;
              height: auto;
            }
            .email-body {
              padding: 30px;
              background: white;
            }
            .email-footer {
              background: #f8fafc;
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 14px;
              border-top: 1px solid #e1e1e1;
            }
            h2 {
              color: #0369a1;
              margin-top: 0;
            }
            .thank-you-message {
              background-color: #f0f9ff;
              border-left: 4px solid #0369a1;
              padding: 15px;
              margin-bottom: 25px;
            }
            .info-summary {
              background-color: #fafafa;
              border: 1px solid #e1e1e1;
              border-radius: 6px;
              padding: 20px;
              margin-top: 20px;
            }
            .info-summary h3 {
              margin-top: 0;
              color: #0369a1;
            }
            .info-item {
              margin-bottom: 12px;
            }
            .label {
              font-weight: bold;
              color: #555;
            }
            .contact-info {
              margin-top: 25px;
              padding-top: 15px;
              border-top: 1px solid #e1e1e1;
            }
            .social-links {
              margin-top: 15px;
            }
            .social-links a {
              display: inline-block;
              margin: 0 10px;
              color: #0369a1;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <img src="https://res.cloudinary.com/dkaj2dfp9/image/upload/f_auto,q_auto/v1/Bajrang%20Painters/logos/wnmdbthsrv8d71hgjdk9" alt="Bajrang Painters Logo" class="logo">
            </div>
            <div class="email-body">
              <div class="thank-you-message">
                <h2>Thank You for Contacting Us!</h2>
                <p>Dear ${formData.name},</p>
                <p>We have received your inquiry and appreciate your interest in Bajrang Painters. One of our representatives will get back to you shortly.</p>
              </div>
              
              <div class="info-summary">
                <h3>Your Request Summary</h3>
                
                <div class="info-item">
                  <span class="label">Phone:</span> ${formData.phone}
                </div>
                
                <div class="info-item">
                  <span class="label">Site Address:</span> ${formData.address}
                </div>
                
                <div class="info-item">
                  <span class="label">Your Message:</span> ${formData.message}
                </div>
              </div>
              
              <div class="contact-info">
                <p>If you need to provide additional information or have any questions, please don't hesitate to contact us:</p>
                <p><strong>Phone:</strong> +91-9891623038</p>
                <p><strong>Email:</strong> bajrangpainters@gmail.com</p>
                <p><strong>Address:</strong> H-61, SECTOR-12, NOIDA</p>
                
                <p><strong>Business Hours:</strong><br>
                Monday - Friday: 9:00 AM - 6:00 PM<br>
                Saturday: 9:00 AM - 4:00 PM<br>
                Sunday: Closed</p>
              </div>
            </div>
            <div class="email-footer">
              <p>Thank you for choosing Bajrang Painters for your painting needs!</p>
              <p>&copy; ${new Date().getFullYear()} Bajrang Painters. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: formData.email,
          subject: "Thank You for Contacting Bajrang Painters",
          message: userEmailContent,
        }),
      });

      // Show success message
      toast({
        title: "Message sent successfully!",
        description: "We'll contact you soon.",
        variant: "default",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      toast({
        title: "Something went wrong",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600">
              Let&apos;s discuss how we can bring your vision to life
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 shadow-lg border-primary/10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-600"></div>
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    }}
                    className="space-y-6"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <Input
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="rounded-md"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="rounded-md"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <Input
                        placeholder="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="rounded-md"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-gray-700">
                        Site Address
                      </label>
                      <Input
                        placeholder="Site Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="rounded-md"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-gray-700">
                        Your Message
                      </label>
                      <Textarea
                        placeholder="Tell us about your project requirements..."
                        className="min-h-[120px] rounded-md"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button
                        type="submit"
                        className="w-full py-6 text-base font-medium"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-12"
            >
              <Card className="p-8 shadow-md border-primary/10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-primary"></div>
                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <motion.div
                    className="flex items-start space-x-5"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPinIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Address</h3>
                      <p className="text-gray-600 mt-1">
                        H-61, SECTOR-12, NOIDA
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-5"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <PhoneIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Phone</h3>
                      <p className="text-gray-600 mt-1">+91-9891623038</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-5"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MailIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email</h3>
                      <p className="text-gray-600 mt-1">
                        bajrangpainters@gmail.com
                      </p>
                    </div>
                  </motion.div>
                </div>
              </Card>

              <Card className="p-8 shadow-md border-primary/10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-600"></div>
                <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-5">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <ClockIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold">Monday - Friday</h4>
                        <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Saturday</h4>
                        <p className="text-gray-600">9:00 AM - 4:00 PM</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Sunday</h4>
                        <p className="text-gray-600">Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
