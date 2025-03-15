"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  const slides = [
    { id: 1, image: "/assets/image1.jpg", number: "01" },
    { id: 2, image: "/assets/image2.jpg", number: "02" },
    { id: 3, image: "/assets/image3.jpg", number: "03" },
    { id: 4, image: "/assets/image4.jpg", number: "04" },
    { id: 5, image: "/assets/image5.jpg", number: "05" },
    { id: 6, image: "/assets/image6.jpg", number: "06" },
    { id: 7, image: "/assets/image7.jpg", number: "07" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const [activeCategory, setActiveCategory] = useState("Portraits");

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const portfolioTypes = [
    {
      name: "Wedding",
      href: "/wedding",
      image: "/assets/wedding.jpg",
    },
    {
      name: "Portraits",
      href: "/portraits",
      image: "/assets/portrait.jpg",
    },
    {
      name: "Engagement",
      href: "/engagement",
      image: "/assets/engagement.jpg",
    },
  ];

  return (
    <div>
      <div className="relative h-screen mb-10 w-full overflow-hidden">
        <div className="ree h-full w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolut  text-black inset-0 h-full w-full transition-opacity duration-300 ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={`Slide ${slide.number}`}
                //   width={1920}
                layout="fill"
                //   height={1080}
                priority={index === currentSlide}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 z-5 -translate-y-1/2 transform rounded-full p-2 text-white transition-all hover:bg-white/10"
          aria-label="Previous slide"
        >
          <Image
            src="/assets/arrowLeft.svg"
            alt="prev"
            width={25}
            height={25}
          />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 z-10 -translate-y-1/2 transform rounded-full p-2 text-white transition-all hover:bg-white/10"
          aria-label="Next slide"
        >
          <Image
            src="/assets/arrowRight.svg"
            alt="next"
            width={25}
            height={25}
          />
        </button>

        {/* Slide Numbers */}
        <div className="absolute italic right-8 bottom-1/4 z-10 flex flex-col items-end space-y-6 text-white">
          <div className="text-xl font-light">
            {slides[currentSlide].number}
          </div>
          <div className="text-xl font-light">
            {slides[slides.length - 1].number}
          </div>
        </div>
      </div>
      <section className="mx-auto max-w-3xl px-4 lg:py-16 py-10">
        <h1 className="mb-10 font-serif text-center text-3xl lg:text-5xl font-light tracking-tight">
          Hi, I am Ayo.
        </h1>

        <div className="leading-4 text-gray-800">
          <p className="font-light text-sm lg:text-[16px] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia.
          </p>
          <p className="font-light text-sm lg:text-[16px] leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis.
          </p>
        </div>
        <div className="flex justify-center w-full text-center flex-col items-center">
          <div className="lg:my-24 my-16 h-px w-full max-w-[400px] bg-gray-200"></div>

          <Link
            href="/portfolio"
            className="font-serif mb-6 text-center text-2xl font-light tracking-wide hover:text-gray-600"
          >
            See My Work
          </Link>
        </div>
      </section>

      <section className="relative md:block hidden h-[700px] w-full overflow-hidden">
        {portfolioTypes.map((portfolio) => (
          <div
            key={portfolio.name}
            className={`absolute inset-0 transition-opacity duration-700 ${
              activeCategory === portfolio.name ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={portfolio.image}
              alt={portfolio.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}

        <div className="absolute  flex  text-2xl lg:text-3xl max-w-5xl mx-auto inset-0  items-center justify-between px-16">
          {portfolioTypes.map((portfolio) => (
            <Link
              key={portfolio.name}
              href={portfolio.name.toLowerCase()}
              className="group flex flex-col gap-5 items-center  text-white transition-opacity hover:opacity-80"
              onMouseEnter={() => setActiveCategory(portfolio.name)}
            >
              <span className="font-serif  font-light tracking-wide">
                {portfolio.name}
              </span>
              <Image
                src="/assets/arrowRight.svg"
                alt="next"
                width={25}
                height={25}
              />{" "}
            </Link>
          ))}
        </div>
      </section>

      <section className="relative md:hidden flex  flex-col w-full overflow-hidden">
        {portfolioTypes.map((portfolio) => (
          <div
            key={portfolio.name}
            className="relative  min-h-[400px] w-full transition-opacity duration-700"
          >
            <Image
              src={portfolio.image}
              alt={portfolio.name}
              fill
              className="object-cover w-full h-auto"
              priority
            />
            
            <div className="absolute inset-0 bg-black/30" />
            <Link
              href={portfolio.name.toLowerCase()}
              className="group absolute inset-0 top-1/2 flex flex-col gap-5 items-center text-white transition-opacity hover:opacity-80"
              onMouseEnter={() => setActiveCategory(portfolio.name)}
            >
              <span className="font-serif font-light tracking-wide">
                {portfolio.name}
              </span>
              <Image
                src="/assets/arrowRight.svg"
                alt="next"
                width={25}
                height={25}
              />
            </Link>
          </div>
        ))}
      </section>

      <div className="flex justify-center my-24 mb-44 items-center">
        <Link
          href="/portfolio"
          className="bg-[#bbac95] hover:bg-[#807c7c] transition-colors duration-300 ease-in-out font-serif text-white py-2.5 px-7 "
        >
          See More Galleries
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
