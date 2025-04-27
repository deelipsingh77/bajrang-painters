import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { ImageProvider } from "@/context/ImageContext";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import { ContactDialogProvider } from "@/context/ContactDialogContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bajrang Painters",
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
        <ContactDialogProvider>
          <ImageProvider>
            <div className="relative min-h-screen flex flex-col">
              <SiteHeader />
              <main className="flex-grow">
                {children}
                <Analytics />
              </main>
              <Toaster />
              <SiteFooter className="relative z-50" />
            </div>
          </ImageProvider>
        </ContactDialogProvider>
      </body>
    </html>
  );
}
