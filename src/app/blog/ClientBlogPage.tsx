"use client";
import Image from 'next/image';
import Link from 'next/link';

// 博客文章类型定义
interface BlogPost {
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  slug: string;
}

// 博客文章数据
const blogPosts: BlogPost[] = [
  {
    title: "Best AI Upscaling Video Online Free – Enhance Video Quality Fast",
    description: "Looking for a free AI upscaling video tool? Discover how to enhance video quality online with AI, upscale to 4K, and ...",
    date: "February 5, 2025",
    author: "unblurimage.ai",
    image: "/blog/video-upscale.jpg",
    slug: "ai-video-upscaling"
  },
  {
    title: "How to Increase the Resolution of Images",
    description: "Learn simple and effective ways to increase the resolution of your images without losing quality. Tools like Unblurim...",
    date: "January 22, 2025",
    author: "unblurimage.ai",
    image: "/blog/image-resolution.jpg",
    slug: "increase-image-resolution"
  },
  {
    title: "In-Depth Review of Picwish Unblur Image Editor and Alternatives",
    description: "Discover Picwish Unblur Image Editor: AI-powered clarity for photos, text, and old memories. Explore features, pricin...",
    date: "January 16, 2025",
    author: "unblurimage.ai",
    image: "/blog/picwish-review.jpg",
    slug: "picwish-review"
  },
  {
    title: "HD Video Converter: Unlocking the Full Potential of Your Videos",
    description: "Effortlessly enhance your videos with Unblurimage AI Video Enhancer. Free, no login required, upscale videos to 4K, a...",
    date: "January 13, 2025",
    author: "unblurimage.ai",
    image: "/blog/hd-converter.jpg",
    slug: "hd-video-converter"
  }
];

export default function ClientBlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={index} className="h-full">
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                {/* 图片容器 */}
                <div className="relative h-56 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* 内容区域 */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* 作者信息 */}
                  <div className="flex items-center gap-2 mb-4">
                    <Image
                      src="/avatar.jpg"
                      alt={post.author}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-sm text-gray-600">{post.author}</span>
                    <span className="text-sm text-gray-400">{post.date}</span>
                  </div>
                  
                  {/* 标题和描述 */}
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 