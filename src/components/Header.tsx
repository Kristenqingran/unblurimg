"use client";
import Image from "next/image";
import {useState} from "react"

export default function Header() {
  const [language, setLanguage] = useState("English");
  return (
    <header className="w-full flex justify-between items-center px-6 py-3 bg-black text-white shadow-md">
      {/* 左侧 Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Logo" width={30} height={30} />
        <span className="text-lg font-semibold">Unblurimg.io</span>
      </div>

      {/* 中间导航 */}
      <nav className="hidden md:flex gap-6">
        <a href="#" className="hover:text-green-400">Features</a>
        <a href="#" className="hover:text-green-400">Blog</a>
        <a href="#" className="hover:text-green-400">Pricing</a>
      </nav>

      {/* 右侧部分 */}
      <div className="flex items-center gap-4">
        {/* 语言选择下拉框 */}
        <select
          className="bg-black border border-gray-600 px-2 py-1 rounded text-white"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>English</option>
          <option>中文</option>
          <option>Español</option>
        </select>
      </div>
    </header>
  );
}
