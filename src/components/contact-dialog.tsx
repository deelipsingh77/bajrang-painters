"use client";

import { useState, useEffect } from "react";
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

interface ContactDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  timer?: number; // Delay in milliseconds
  title?: string;
  description?: string;
}

export function ContactDialog({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  timer = 0,
  title = "Contact Us",
  description = "Fill out the form below and we'll get back to you as soon as possible.",
}: ContactDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const onOpenChange = externalOnOpenChange || setInternalOpen;

  useEffect(() => {
    if (timer > 0) {
      const timeoutId = setTimeout(() => {
        onOpenChange(true);
      }, timer);
      return () => clearTimeout(timeoutId);
    }
  }, [timer, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.1,
            delayChildren: 0.2
          }}
          className="space-y-4"
        >
          {/* Wrap each input in motion.div for staggered animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <Input placeholder="Your name" type="text" required />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <Input placeholder="Email" type="email" required />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <Input placeholder="Phone number" type="tel" required />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <Input placeholder="Site address" type="text" required />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <Textarea placeholder="Your message" className="min-h-[100px]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
