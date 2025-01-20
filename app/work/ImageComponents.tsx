// ImageComponents.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageModal = ({ 
  images, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNext, 
  onPrev 
}: { 
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X className="h-8 w-8" />
      </button>
      
      <button 
        onClick={onPrev}
        className="absolute left-4 text-white hover:text-gray-300"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      
      <button 
        onClick={onNext}
        className="absolute right-4 text-white hover:text-gray-300"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      <div className="relative w-full max-w-5xl h-[80vh]">
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export const ImageGrid = ({ images, title }: { images: string[], title: string }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getGridClass = () => {
    if (images.length === 1) return "grid-cols-1";
    if (images.length === 2) return "grid-cols-2";
    if (images.length === 3) return "grid-cols-2";
    return "grid-cols-2 md:grid-cols-3";
  };

  return (
    <>
      <div className={`grid ${getGridClass()} gap-4`}>
        {images.map((image, index) => (
          <div 
            key={index}
            className={`relative group cursor-pointer ${
              images.length === 3 && index === 2 ? "md:col-span-2" : ""
            } ${images.length === 1 ? "h-96" : "h-64"}`}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt={`${title} - Image ${index + 1}`}
              fill
              className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
          </div>
        ))}
      </div>

      <ImageModal
        images={images}
        currentIndex={currentImageIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
};