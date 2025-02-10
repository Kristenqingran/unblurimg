import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from '@/i18n/LanguageContext';

export const metadata: Metadata = {
  title: "Unblur Image & Enhance Quality with AI | Unblurimg.co",
  description: "Unblur images instantly with AI! Enhance image quality, sharpen blurry photos, and restore lost details online.",
  alternates: {
    canonical: "https://www.unblurimage.co",
  },
  openGraph: {
    title: "Unblur Image & Enhance Quality with AI | Unblurimg.co",
    description: "Unblur images instantly with AI! Enhance image quality, sharpen blurry photos, and restore lost details online.",
    url: "https://www.unblurimage.co",
    type: "website",
    images: [
      {
        url: "https://www.unblurimage.co/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Unblurimage.co - AI Image Enhancement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unblur Image & Enhance Quality with AI | Unblurimg.co",
    description: "Unblur images instantly with AI! Enhance image quality, sharpen blurry photos, and restore lost details online.",
    images: ["https://www.unblurimage.co/twitter-image.jpg"],
  },
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
