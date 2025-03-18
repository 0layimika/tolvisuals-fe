"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ImageData {
  imageUrl: string;
  user: string;
}

interface ImageSliderProps {
  show: boolean;
  images: ImageData[];
  currentIndex: number;
  onClose: () => void;
  setCurrentIndex: (index: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  show,
  images,
  currentIndex,
  onClose,
  setCurrentIndex,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const next = useCallback(() => {
    if (currentIndex < images.length - 1 && !isAnimating) {
      setDirection("next");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setTimeout(() => setIsAnimating(false), 300);
      }, 10);
    }
  }, [currentIndex, images.length, isAnimating, setCurrentIndex]);

  const prev = useCallback(() => {
    if (currentIndex > 0 && !isAnimating) {
      setDirection("prev");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setTimeout(() => setIsAnimating(false), 300);
      }, 10);
    }
  }, [currentIndex, isAnimating, setCurrentIndex]);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (!show) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    },
    [show, next, prev, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  if (!show) return null;

  return (
    <div
      className="fixed  inset-0 bg-black/50 backdrop-blur  flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <button
        onClick={prev}
        disabled={currentIndex === 0 || isAnimating}
        className="bg-white cursor-pointer flex justify-center items-center absolute top-1/2 transform -translate-y-1/2 p-2 w-16 h-16 left-8 rounded-full shadow-md disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <div
        className="relative w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full md:h-[600px] h:[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className={`absolute w-full h-full flex items-center justify-center`}
                initial={{ opacity: 1, x: direction === "next" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === "next" ? -50 : 50 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={images[currentIndex].imageUrl}
                alt={images[currentIndex].user}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute flex justify-center  gap-4 flex-col items-center inset-0 z-50">

            <h2 className="text-white font-serif font-bold text-3xl text-wrap text-center">{images[currentIndex].user}</h2>
            <button className="bg-white  hover:bg-black/70 hover:text-white/70 transition-colors duration-300 ease-in-out cursor-pointer py-2 px-4 font-serif font-light text-sm">View Gallery</button>


          </div>
        </div>
      </div>
      <div className="absolute top-1/2 transform flex justify-center items-center -translate-y-1/2  px-4"></div>
      <button
        onClick={next}
        disabled={currentIndex === images.length - 1 || isAnimating}
        className="bg-white cursor-pointer flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 p-2 rounded-full w-16 h-16 right-8 shadow-md disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default ImageSlider;
