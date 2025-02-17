"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrushIcon } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-16">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <BrushIcon className="h-6 w-6" />
            <span className="font-bold">Painting Services</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Services
            </Link>
            <Link
              href="/projects"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Projects
            </Link>
            <Link href="/contact">
              <Button>Contact Us</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
