import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Unblur Image & Enhance Quality with AI | Unblurimg.io",
  description: "Unblur images instantly with AI! Enhance image quality, sharpen blurry photos, and restore lost details online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Header />
        {children}
      </body>
    </html>
  );
}
