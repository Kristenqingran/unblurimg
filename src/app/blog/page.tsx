import type { Metadata } from "next";
import ClientBlogPage from './ClientBlogPage';

export const metadata: Metadata = {
  title: "Blog - AI Image Enhancement Tips & Updates | Unblurimg.co",
  description: "Learn about AI image enhancement, get tips for better photos, and stay updated with the latest features in image processing technology.",
  alternates: {
    canonical: "https://www.unblurimage.co/blog",  // 使用 alternates.canonical
  },
  openGraph: {
    title: "Blog - AI Image Enhancement Tips & Updates | Unblurimg.co",
    description: "Learn about AI image enhancement, get tips for better photos, and stay updated with the latest features in image processing technology.",
    url: "https://www.unblurimage.co/blog",
    type: "website",
  }
};

export default function BlogPage() {
  return <ClientBlogPage />;
} 