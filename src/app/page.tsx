"use client";

import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { useLanguage } from '@/i18n/LanguageContext';

// 添加类型定义
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface EnhanceParams {
  sharpness?: number;
  brightness?: number;
  contrast?: number;
  denoise?: boolean;
  upscale?: boolean;
  scale_factor?: number;
}

// 添加环境变量类型
declare global {
  interface Window {
    ENV: {
      API_BASE_URL: string;
      API_KEY: string;
    }
  }
}

export default function Home() {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [enhancedImageUrl, setEnhancedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [enhanceParams, setEnhanceParams] = useState<EnhanceParams>({
    sharpness: 1.5,
    brightness: 1.0,
    contrast: 1.0,
    denoise: false,
    upscale: false,
    scale_factor: 2.0
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // 验证文件大小（10MB限制）
      if (file.size > 10 * 1024 * 1024) {
        setError(t('errors.fileTooLarge'));
        return;
      }
      // 验证文件类型
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError(t('errors.invalidFormat'));
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleEnhanceImage = async () => {
    if (!selectedFile) return;

    try {
      setUploadStatus('uploading');
      setError(null);

      const formData = new FormData();
      formData.append('image', selectedFile, selectedFile.name);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/image/enhance/image-sharpness-enhancement`, {
        method: 'POST',
        headers: {
          'ailabapi-api-key': process.env.NEXT_PUBLIC_API_KEY || ''
        },
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      
      if (data.error_code === 0) {  // 检查 error_code 而不是 code
        // 将 base64 图片数据转换为 URL
        const imageUrl = `data:image/jpeg;base64,${data.image}`;
        setEnhancedImageUrl(imageUrl);
        setUploadStatus('success');
      } else {
        const errorMessage = data.error_detail?.message || 'Enhancement failed';
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('Error details:', err);
      setError(t('errors.enhancementFailed'));
      setUploadStatus('error');
    }
  };

  // 添加参数调整控件
  const renderEnhanceControls = () => (
    <div className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('controls.sharpness')} ({enhanceParams.sharpness})
        </label>
        <input
          type="range"
          min="0.1"
          max="3.0"
          step="0.1"
          value={enhanceParams.sharpness}
          onChange={(e) => setEnhanceParams({
            ...enhanceParams,
            sharpness: parseFloat(e.target.value)
          })}
          className="w-full"
        />
      </div>
      
      {/* 添加其他参数控制... */}
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="denoise"
          checked={enhanceParams.denoise}
          onChange={(e) => setEnhanceParams({
            ...enhanceParams,
            denoise: e.target.checked
          })}
          className="mr-2"
        />
        <label htmlFor="denoise" className="text-sm font-medium text-gray-700">
          {t('controls.denoise')}
        </label>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta
          name="description"
          content={t('meta.description')}
        />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Upload Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-center">
              {/* Left side for comparison slider */}
              <section className="lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src="/sharp-person.jpg"  // 模糊的图片
                      alt="Sharp food image"
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src="/blurred-person.jpg"  // 清晰的图片
                      alt="Blurred food image"
                    />
                  }
                  className="rounded-lg shadow-lg w-full max-w-[500px]"
                  position={50}
                  style={{
                    height: '400px',
                  }}
                />
              </section>

              {/* Right side for the form and description */}
              <section className="lg:w-1/2 flex flex-col items-center lg:items-start lg:pl-8">
                <header>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center lg:text-left">
                  {t('hero.title')}
                  </h1>
                  <h2 className="text-lg text-gray-700 mb-6 text-center lg:text-left">
                  {t('hero.description')}
                  </h2>
                </header>

                {/* Upload Section */}
                <div className="w-full max-w-md">
                  <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center mb-4">
                    <label
                      htmlFor="upload"
                      className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50"
                    >
                      {uploadStatus === 'uploading' ? t('upload.processing') : t('upload.button')}
                    </label>
                    <input
                      type="file"
                      id="upload"
                      className="hidden"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleFileChange}
                      disabled={uploadStatus === 'uploading'}
                    />
                    <p className="text-gray-600 mt-4">
                      {t('upload.dropText')}
                    </p>
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm text-center mb-4">
                      {error}
                    </div>
                  )}

                  {/* Supported Formats */}
                  <p className="text-sm text-gray-500 text-center mb-2">
                    {t('upload.formats')}
                  </p>

                  {/* Terms and Conditions */}
                  <p className="text-xs text-gray-400 text-center">
                    {t('upload.terms')}
                    <a href="/terms" className="text-blue-500 hover:underline">
                      Terms of Service
                    </a>{" "}
                    {t('upload.and')}
                    <a href="/privacy" className="text-blue-500 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>

                {/* Preview Section */}
                {selectedFile && (
                  <div className="mt-6">
                    <p className="text-gray-700 mb-4">
                      {t('preview.selectedFile')} {selectedFile.name}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-gray-500 mb-2">{t('preview.original')}</h4>
                        <Image
                          src={URL.createObjectURL(selectedFile)}
                          alt="Original image"
                          width={400}
                          height={400}
                          className="rounded-lg border border-gray-300 shadow-lg"
                        />
                      </div>
                      {enhancedImageUrl && (
                        <div>
                          <h4 className="text-sm text-gray-500 mb-2">{t('preview.enhanced')}</h4>
                          <Image
                            src={enhancedImageUrl}
                            alt="Enhanced image"
                            width={400}
                            height={400}
                            className="rounded-lg border border-gray-300 shadow-lg"
                          />
                          <a
                            href={enhancedImageUrl}
                            download
                            className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                          >
                            {t('download.button')}
                          </a>
                        </div>
                      )}
                    </div>
                    {renderEnhanceControls()}
                    {!enhancedImageUrl && (
                      <button
                        onClick={handleEnhanceImage}
                        disabled={uploadStatus === 'uploading'}
                        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                      >
                        {uploadStatus === 'uploading' ? t('enhance.processing') : t('enhance.button')}
                      </button>
                    )}
                  </div>
                )}
              </section>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left side - Text Content */}
              <div className="lg:w-1/2">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  {t('features.title')}
                </h1>
                <h2 className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {t('features.description')}
                </h2>
              </div>

              {/* Right side - Replace Image with CompareSlider */}
              <div className="lg:w-1/2">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src="/sharp-sea.jpg"  // 清晰的演示图片
                      alt="Sharp demonstration"
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                       src="/blurred-sea.jpg"  // 模糊的演示图片
                      alt="Blurred demonstration"
                    />
                  }
                  className="rounded-lg shadow-lg w-full"
                  position={50}
                  style={{
                    height: '400px',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t('howItWorks.title')}
              </h1>
              <h2 className="text-xl text-gray-600">
                {t('howItWorks.description')}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {t('howItWorks.steps').map((step, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-gray-50">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              {t('faq.title')}
            </h2>
            <div className="max-w-2xl mx-auto">
              {t('faq.items').map((faq, index) => (
                <Disclosure key={index} as="div" className="mt-4">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50">
                        <span>{faq.question}</span>
                        <ChevronUpIcon
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-blue-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-600 bg-white rounded-b-lg">
                        {faq.answer}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}