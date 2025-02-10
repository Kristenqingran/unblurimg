"use client";
import Image from "next/image";
import { useLanguage } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Image 
                src="/logo.png" 
                alt="Unblurimage Logo" 
                width={40} 
                height={40}
              />
              <span className="text-xl font-semibold">Unblurimage.co</span>
            </div>
            <h2 className="text-gray-400 mb-6">
              {t('footer.description')}
            </h2>
            <a href="https://twitter.com/unblurimage" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>

          {/* Features */}
          <div className="md:pl-20">
            <h3 className="text-xl font-semibold mb-6">{t('footer.features')}</h3>
            <ul className="space-y-4">
              <li><span className="text-gray-400">{t('footer.links.imageEnhancement')}</span></li>
            </ul>
          </div>

          {/* Blog */}
          <div className="md:pl-20">
            <h3 className="text-xl font-semibold mb-6">{t('footer.blog')}</h3>
            <ul className="space-y-4">
              <li>
                <a href="/blog/image-enhancement" className="text-gray-400 hover:text-white">
                  {t('footer.links.imageEnhancement')}
                </a>
              </li>
              <li>
                <a href="/blog/ai-technology" className="text-gray-400 hover:text-white">
                  {t('footer.links.aiTechnology')}
                </a>
              </li>
              <li>
                <a href="/blog/tips" className="text-gray-400 hover:text-white">
                  {t('footer.links.tips')}
                </a>
              </li>
              <li>
                <a href="/blog/updates" className="text-gray-400 hover:text-white">
                  {t('footer.links.updates')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Left Side Links */}
          <div className="flex gap-6 mb-4 md:mb-0">
            <a href="/privacy-policy" className="text-gray-400 hover:text-white">
              {t('footer.legal.privacy')}
            </a>
            <a href="/terms-of-service" className="text-gray-400 hover:text-white">
              {t('footer.legal.terms')}
            </a>
          </div>

          {/* Right Side Copyright */}
          <div className="text-gray-400">
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
} 