"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import { useGetHomeContent } from "@/hooks/useGetHomeContent";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Portraits");
  const [images, setImages] = useState<string[]>([]);
  const fallbackImage = "/assets/placeholder.jpg"; // Fallback image path

  const [portfolioTypes, setPortfolioTypes] = useState([
    {
      name: "Wedding",
      href: "/portfolio/wedding",
      image: fallbackImage,
    },
    {
      name: "Portraits",
      href: "/portfolio/portraits",
      image: fallbackImage,
    },
    {
      name: "Engagement",
      href: "/portfolio/engagement",
      image: fallbackImage,
    },
  ]);
  const [about, setAbout] = useState<string>("");

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const { data: homeContent } = useGetHomeContent();
  useEffect(() => {
    if (homeContent?.data) {
      setImages([
        homeContent.data.image_1,
        homeContent.data.image_2,
        homeContent.data.image_3,
        homeContent.data.image_4,
        homeContent.data.image_5,
        homeContent.data.image_6,
        homeContent.data.image_7,
      ]);
      setAbout(homeContent.data.text);
      setPortfolioTypes([
        {
          name: "Wedding",
          href: "/portfolio/wedding",
          image: homeContent.data.wedding_img,
        },
        {
          name: "Portraits",
          href: "/portfolio/portraits",
          image: homeContent.data.portrait_img,
        },
        {
          name: "Engagement",
          href: "/portfolio/engagement",
          image: homeContent.data.engagement_img,
        },
      ]);
    }
  }, [homeContent]);

  return (
    <div>
      <div className="relative h-screen mb-10 w-full overflow-hidden">
        <div className="ree h-full w-full">
          {images.length > 0 &&
            images.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
                  index === currentSlide
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide}
                  alt={`Image ${index}`}
                  layout="fill"
                  priority={index === currentSlide}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-8 top-1/2 z-10 -translate-y-1/2 transform rounded-full p-2 text-white transition-all hover:bg-white/10"
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
          </>
        )}

        {images.length > 0 && (
          <div className="absolute italic right-8 bottom-1/4 z-10 flex flex-col items-end space-y-6 text-white">
            <div className="text-xl font-light">
              {String(currentSlide + 1).padStart(2, "0")}
            </div>
            <div className="text-xl font-light">
              {String(images.length).padStart(2, "0")}
            </div>
          </div>
        )}
      </div>

      <section className="mx-auto max-w-3xl px-4 lg:py-16 py-10">
        <h1 className="mb-10 font-serif text-center text-3xl lg:text-5xl font-light tracking-tight">
          Hi, I am Ayo.
        </h1>

        <div className="leading-4 text-gray-800">
          <p className="font-light text-sm lg:text-[16px] leading-relaxed">
            {about}
          </p>
        </div>

        <div className="flex justify-center w-full text-center flex-col items-center">
          <div className="lg:my-24 my-16 h-px w-full max-w-[400px] bg-gray-200"></div>
          <TransitionLink
            href="/portfolio"
            className="font-serif mb-6 text-center text-2xl font-light tracking-wide hover:text-gray-600"
          >
            See My Work
          </TransitionLink>
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
            <TransitionLink
              key={portfolio.name}
              href={portfolio.href.toLowerCase()}
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
            </TransitionLink>
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
            <TransitionLink
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
            </TransitionLink>
          </div>
        ))}
      </section>

      <div className="flex justify-center my-24 mb-44 items-center">
        <TransitionLink
          href="/portfolio"
          className="bg-[#bbac95] hover:bg-[#807c7c] transition-colors duration-300 ease-in-out font-serif text-white py-2.5 px-7 "
        >
          See More Galleries
        </TransitionLink>
      </div>
    </div>
  );
};

export default HomePage;
