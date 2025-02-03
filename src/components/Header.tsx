"use client";
import Image from "next/image";
import {useState} from "react"
import { useLanguage } from '@/i18n/LanguageContext';

export default function Header() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <header className="w-full flex justify-between items-center px-6 py-3 bg-black text-white shadow-md">
      {/* 左侧 Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Logo" width={30} height={30} />
        <span className="text-lg font-semibold">Unblurimg.io</span>
      </div>

      {/* 中间导航 */}
      <nav className="hidden md:flex gap-6">
        <a href="#" className="hover:text-green-400">{t('header.features')}</a>
        <a href="#" className="hover:text-green-400">{t('header.blog')}</a>
        <a href="#" className="hover:text-green-400">{t('header.pricing')}</a>
      </nav>

      {/* 右侧部分 */}
      <div className="flex items-center gap-4">
        {/* 语言选择下拉框 */}
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as 'en' | 'zh')}
          className="bg-transparent text-white"
        >
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
      </div>
    </header>
  );
}
