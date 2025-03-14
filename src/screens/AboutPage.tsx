"use client";
import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";

const AboutPage = () => {
  const testimonials = [
    {
      id: 1,
      quote: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      ],
      author: "JOHN DOE",
      image: "/assets/image3.jpg",
    },
    {
      id: 2,
      quote: [
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ],
      author: "JANE SMITH",
      image: "/assets/image5.jpg",
    },
    {
      id: 3,
      quote: [
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      ],
      author: "MIKE JOHNSON",
      image: "/assets/image6.jpg",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };
  return (
    <div>
      <section className="relative h-[66vh] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/assets/me.jpg"
          alt="Professional portrait"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20">
          <h1 className="font-serif text-5xl font-light tracking-wide text-white md:text-6xl lg:text-7xl">
            About Me
          </h1>
          <p className="mt-4 text-sm tracking-[0.2em] text-white/90">
            GET TO KNOW ME A LITTLE BETTER
          </p>
        </div>
      </section>
      <Container className="mx-auto px-4 py-24 pb-12">
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-24">
          {/* Image */}
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src="/assets/me.jpg"
              alt="Professional portrait"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="text-left">
            <h2 className="font-serif md:text-3xl text-xl font-light tracking-wide text-gray-900 ">
              Hi, I am Lorem Ipsum.
            </h2>
          </div>
        </div>

        <div className="pt-24 ">
          <div className="grid gap-12 md:grid-cols-2 md:gap-24">
            <div className="flex flex-col">
              <div className="flex-1">
                <h2 className="mb-28 font-serif text-2xl font-light tracking-wide text-gray-900 md:text-3xl">
                  Testimonials
                </h2>
                <div className="space-y-8">
                  {testimonials[currentSlide].quote.map((paragraph, index) => (
                    <p
                      key={index}
                      className="font-serif text-2xl font-light leading-normal text-gray-800"
                    >
                      "{paragraph}"
                    </p>
                  ))}
                  <p className="text-sm font-light tracking-wide text-gray-600">
                    — {testimonials[currentSlide].author}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="py-3 flex flex-col  gap-2">
                <button
                  onClick={prevSlide}
                  className="text-gray-800 cursor-pointer transition-colors hover:text-gray-600"
                  aria-label="Previous testimonial"
                >
                  <Image
                    src="/assets/arrowLeftBlack.svg"
                    alt="prev"
                    width={25}
                    height={25}
                  />
                </button>
                <p className="text-sm text-[#807c7c] italic font-serif font-light">
                  {String(currentSlide + 1).padStart(2, "0")} /{" "}
                  {String(testimonials.length).padStart(2, "0")}
                </p>
                <button
                  onClick={nextSlide}
                  className="text-gray-800 cursor-pointer transition-colors hover:text-gray-600"
                  aria-label="Next testimonial"
                >
                  <Image
                    src="/assets/arrowRightBlack.svg"
                    alt="prev"
                    width={25}
                    height={25}
                  />{" "}
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={testimonials[currentSlide].image || "/placeholder.svg"}
                alt={`Testimonial by ${testimonials[currentSlide].author}`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Contact Button */}
          <div className="mt-24 flex justify-center">
            <Link
              href="/contact"
              className="bg-[#BEB3A7] font-serif px-8 py-3 text-sm font-light tracking-wide text-white  hover:bg-[#807c7c] transition-colors ease-in-out duration-300"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
