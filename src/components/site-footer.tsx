import { cn } from "@/lib/utils";
import { BrushIcon, PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";

interface SiteFooterProps {
  className?: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer className={cn("bg-gray-900 text-gray-300", className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-white mb-4">
              <BrushIcon className="h-6 w-6" />
              <span className="font-bold text-lg">Painting Services</span>
            </div>
            <p className="text-gray-400">
              We are familiar with the latest equipment and techniques
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5" />
                <span>H-61, SECTOR-12, NOIDA</span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5" />
                <span>+91-9891623038</span>
              </li>
              <li className="flex items-center space-x-3">
                <MailIcon className="h-5 w-5" />
                <span>bajarangpainters@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 9:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Painting Services. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
