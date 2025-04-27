"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { ContactDialog } from "@/components/contact-dialog";

interface ContactDialogContextType {
  hasBeenShown: boolean;
  setHasBeenShown: (value: boolean) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  openContactDialog: () => void;
}

const ContactDialogContext = createContext<ContactDialogContextType>({
  hasBeenShown: false,
  setHasBeenShown: () => {},
  isOpen: false,
  setIsOpen: () => {},
  openContactDialog: () => {},
});

export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openContactDialog = () => {
    setIsOpen(true);
    setHasBeenShown(true);
  };

  // This adds the automatic timer to show the dialog
  useEffect(() => {
    // Only show if it hasn't been shown before and isn't currently open
    if (!hasBeenShown && !isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasBeenShown(true);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [hasBeenShown, isOpen]);

  return (
    <ContactDialogContext.Provider
      value={{
        hasBeenShown,
        setHasBeenShown,
        isOpen,
        setIsOpen,
        openContactDialog,
      }}
    >
      {/* Place the ContactDialog here in the provider */}
      <ContactDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Contact Us"
        description="Tell us about your project and we'll get back to you."
      />
      {children}
    </ContactDialogContext.Provider>
  );
}

export function useContactDialog() {
  return useContext(ContactDialogContext);
}
