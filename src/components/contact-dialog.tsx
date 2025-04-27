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
      // Send email to bajrangpainters@gmail.com
      const adminEmailContent = `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Site Address:</strong> ${formData.address}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
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
        <h2>Thank you for contacting Bajrang Painters!</h2>
        <p>Dear ${formData.name},</p>
        <p>We have received your inquiry and will get back to you shortly.</p>
        <p>Here's a summary of the information you provided:</p>
        <ul>
          <li><strong>Phone:</strong> ${formData.phone}</li>
          <li><strong>Site Address:</strong> ${formData.address}</li>
          <li><strong>Your Message:</strong> ${formData.message}</li>
        </ul>
        <p>Best regards,</p>
        <p>The Bajrang Painters Team</p>
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
