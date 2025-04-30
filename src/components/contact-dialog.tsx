"use client";

import { useState, useEffect, FormEvent, useCallback } from "react";
import { useContactDialog } from "@/context/ContactDialogContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ContactDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  timer?: number;
  title?: string;
  description?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

export function ContactDialog({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  timer = 0,
  title = "Contact Us",
  description = "Fill out the form below and we'll get back to you as soon as possible.",
}: ContactDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { hasBeenShown, setHasBeenShown, isOpen, setIsOpen } = useContactDialog();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  // Determine the actual open state, prioritizing context over props
  const open = isOpen || (externalOpen !== undefined ? externalOpen : internalOpen);
  
  const onOpenChange = useCallback((value: boolean) => {
    if (value === true) {
      setHasBeenShown(true); // Mark as shown when opened
    }

    // Update all state variables
    setIsOpen(value);
    setInternalOpen(value);
    if (externalOnOpenChange) {
      externalOnOpenChange(value);
    }
  }, [setHasBeenShown, setIsOpen, externalOnOpenChange]);

  useEffect(() => {
    // Only set timer if:
    // 1. Timer value is greater than 0
    // 2. Dialog has not been shown before
    // 3. Dialog is not currently open
    if (timer > 0 && !hasBeenShown && !isOpen) {
      const timeoutId = setTimeout(() => {
        onOpenChange(true);
      }, timer);
      return () => clearTimeout(timeoutId);
    }
  }, [timer, hasBeenShown, isOpen, onOpenChange]);

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
                <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
              </div>
              
              <div class="info-item">
                <span class="label">Phone:</span>
                <div class="value"><a href="tel:${formData.phone}">${formData.phone}</a></div>
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
                  <span class="label">Phone:</span> <a href="tel:${formData.phone}">${formData.phone}</a>
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
                <p><strong>Phone:</strong> <a href="tel:+919891623038">+91-9891623038</a></p>
                <p><strong>Email:</strong> <a href="mailto:bajrangpainters@gmail.com">bajrangpainters@gmail.com</a></p>
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

      // Show success message with shadcn toast
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

      // Close dialog after success
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              staggerChildren: 0.1,
              delayChildren: 0.2,
            }}
            className="space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <Input
                placeholder="Your name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <Input
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <Input
                placeholder="Phone number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <Input
                placeholder="Site address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <Textarea
                placeholder="Your message"
                className="min-h-[100px]"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
