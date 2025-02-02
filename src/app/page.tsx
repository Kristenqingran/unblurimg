"use client";

import { useState } from "react";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <>
      <Head>
        <title>Upscale Images with AI for FREE</title>
        <meta
          name="description"
          content="Leverage AI technology to enhance your image quality. Sign up today to avail your first 3 credits!"
        />
      </Head>

      <main className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
        {/* Left side for dynamic image or GIF */}
        <section className="lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
          <Image
            src="/path/to/your/dynamic-image-or-gif.gif" // Replace with your dynamic image or GIF path
            alt="AI-powered image enhancement example"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
            priority // Ensures the image is loaded as a priority
          />
        </section>

        {/* Right side for the form and description */}
        <section className="lg:w-1/2 flex flex-col items-center lg:items-start lg:pl-8">
          <header>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center lg:text-left">
            Unblur Image & Enhance Quality with AI
            </h1>
            <h2 className="text-lg text-gray-700 mb-6 text-center lg:text-left">
            Unblur images instantly with AI! Enhance image quality, sharpen blurry photos, and restore lost details online.
            </h2>
          </header>

          {/* Upload Section */}
          <div className="w-full max-w-md">
            {/* Dotted Border Box */}
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center mb-4">
              <label
                htmlFor="upload"
                className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <p className="text-gray-600 mt-4">
                Drop an Image or Paste URL
              </p>
            </div>

            {/* Supported Formats */}
            <p className="text-sm text-gray-500 text-center mb-2">
              Supported formats: png jpeg jpg webp
            </p>

            {/* Terms and Conditions */}
            <p className="text-xs text-gray-400 text-center">
              By uploading an image or URL you agree to our{" "}
              <a href="/terms" className="text-blue-500 hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Preview Section */}
          {selectedFile && (
            <div className="mt-6">
              <p className="text-gray-700">Selected File: {selectedFile.name}</p>
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Uploaded image preview"
                width={400}
                height={400}
                className="mt-4 border border-gray-300 rounded-lg shadow-lg"
              />
            </div>
          )}
        </section>
      </main>
    </>
  );
}