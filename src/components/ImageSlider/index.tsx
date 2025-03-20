"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface ImageData {
  imageUrl: string;
  user: string;
  id: number;
}

interface ImageSliderProps {
  show: boolean;
  images: ImageData[];
  currentIndex: number;
  showDetails: boolean;
  onClose: () => void;
  setCurrentIndex: (index: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  show,
  images,
  currentIndex,
  onClose,
  showDetails,
  setCurrentIndex,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const router = useRouter();


  const preloadImage = (index: number) => {
    const image = images[index];
    if (image) {
      const img = new window.Image();
      img.src = image.imageUrl;
    }
  };

  const next = useCallback(() => {
    if (currentIndex < images.length - 1 && !isAnimating) {
      preloadImage(currentIndex + 1);
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
      preloadImage(currentIndex - 1);
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
      className="fixed  inset-0 bg-black/50 backdrop-blur cursor-pointer  flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <button
        onClick={prev}
        disabled={currentIndex === 0 || isAnimating}
        className="bg-white z-30 cursor-pointer flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 p-2 rounded-full md:w-16 md:h-16 w-10 h-10 md:left-8 left-5 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
        className="relative w-full max-w-lg bg-transparent rounded-xl shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full md:h-[600px] cursor-default h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              className="absolute w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, x: direction === "next" ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "next" ? -100 : 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Image
                src={images[currentIndex].imageUrl}
                alt={images[currentIndex].user}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {showDetails ? (
            <div className="absolute flex justify-center  gap-4 flex-col items-center inset-0 z-50">
              <h2 className="text-white font-serif font-bold text-3xl text-wrap text-center">
                {images[currentIndex].user}
              </h2>
              <button
                onClick={() =>
                  router.push(`${"/clients/" + images[currentIndex].id}`)
                }
                className="bg-white  hover:bg-black/70 hover:text-white/70 transition-colors duration-300 ease-in-out cursor-pointer py-2 px-4 font-serif font-light text-sm"
              >
                View Gallery
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="absolute top-1/2 transform flex justify-center items-center -translate-y-1/2  px-4"></div>
      <button
        onClick={next}
        disabled={currentIndex === images.length - 1 || isAnimating}
        className="bg-white z-30 cursor-pointer flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 p-2 rounded-full md:w-16 md:h-16 w-10 h-10 md:right-8 right-5 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
