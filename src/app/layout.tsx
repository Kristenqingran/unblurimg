import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from '@/i18n/LanguageContext';

export const metadata: Metadata = {
  title: "Unblur Image & Enhance Quality with AI | Unblurimg.co",
  description: "Unblur images instantly with AI! Enhance image quality, sharpen blurry photos, and restore lost details online.",
  icons: {
    icon: '/favicon.ico', // 或 '/logo.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
