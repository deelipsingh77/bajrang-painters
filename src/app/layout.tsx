import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { ImageProvider } from "@/context/ImageContext";
import { ContactDialog } from "@/components/contact-dialog";
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Professional Painting Services",
  description: "Quality painting services with over 10 years of experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ImageProvider>
          <div className="relative min-h-screen flex flex-col">
            <ContactDialog timer={30000} />
            <SiteHeader />
            <main className="flex-grow">
              {children}
              <Analytics />
            </main>
            <Toaster />
            <SiteFooter className="relative z-50" />
          </div>
        </ImageProvider>
      </body>
    </html>
  );
}
