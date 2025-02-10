import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // 获取博客文章列表
  const blogPosts = [
    {
      slug: "ai-video-upscaling",
      lastModified: new Date("2025-02-05").toISOString(),
      title: "Best AI Upscaling Video Online Free",
    },
    {
      slug: "increase-image-resolution",
      lastModified: new Date("2025-01-22").toISOString(),
      title: "How to Increase the Resolution of Images",
    },
    {
      slug: "picwish-review",
      lastModified: new Date("2025-01-16").toISOString(),
      title: "In-Depth Review of Picwish Unblur Image Editor",
    },
    {
      slug: "hd-video-converter",
      lastModified: new Date("2025-01-13").toISOString(),
      title: "HD Video Converter Guide",
    },
  ];

  // 生成主要页面的 sitemap 条目
  const routes: MetadataRoute.Sitemap = [
    {
      url: 'https://www.unblurimage.co',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.unblurimage.co/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://www.unblurimage.co/price',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  // 生成博客文章的 sitemap 条目
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `https://www.unblurimage.co/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: 'weekly' as const,  // 使用 as const 来固定字面量类型
    priority: 0.6,
    // 添加额外的 SEO 信息
    alternates: {
      languages: {
        'en-US': `https://www.unblurimage.co/blog/${post.slug}`,
        'zh-CN': `https://www.unblurimage.co/zh/blog/${post.slug}`,
      },
    },
    // 添加图片信息
    images: [
      `/blog/${post.slug}.jpg`,
    ],
  }));

  return [...routes, ...blogRoutes];
} 