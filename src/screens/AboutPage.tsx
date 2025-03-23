"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import TransitionLink from "@/components/TransitionLink";
import { useGetAboutContent } from "@/hooks/useAboutContent";
import { useGetReviews } from "@/hooks/useReviewContent";

type TestimonialProps = {
  name: string;
  comment: string;
  image_url: string;
};

const AboutPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fallback = "/assets/me.jpg";
  const [mainImage, setMainImage] = useState(fallback);
  const [bodyImage, setBodyImage] = useState(fallback);

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

  const { data: aboutContent } = useGetAboutContent();
  const { data: testimonialsData } = useGetReviews();

  useEffect(() => {
    if (aboutContent?.data) {
      setBodyImage(aboutContent.data.main_img);
      setMainImage(aboutContent.data.top_image);
    }
  }, [aboutContent]);

  const testimonials: TestimonialProps[] =
    testimonialsData?.data?.map((review: TestimonialProps) => ({
      name: review.name,
      comment: review.comment,
      image_url: review.image_url,
    })) || [];

  return (
    <div>
      <section className="relative lg:h-[66vh] h-[70vh] w-full overflow-hidden">
        <Image
          src={mainImage ?? fallback}
          alt="Professional portrait"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20">
          <h1 className="font-serif text-5xl font-light tracking-wide text-white md:text-6xl lg:text-7xl">
            About Me
          </h1>
          <p className="mt-4 text-sm text-center tracking-[0.2em] text-white/90">
            GET TO KNOW ME A LITTLE BETTER
          </p>
        </div>
      </section>
      <Container className="mx-auto px-4 py-24 pb-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 grid-cols-1 md:gap-24">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={bodyImage ?? fallback}
              alt="Professional portrait"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <h2 className="font-serif sm:text-3xl text-2xl font-light tracking-wide text-gray-900">
              Hi, I am Adepoju Ayotunde.
            </h2>
          </div>
        </div>
        <div className="lg:pt-24 pt-32">
          <h2 className="lg:mb-28 lg:hidden font-serif mb-8 font-light tracking-wide text-gray-900 text-3xl">
            Testimonials
          </h2>
          <div className="grid gap-12 md:grid-cols-2 grid-cols-1 md:gap-24">
            <div className="flex order-2 lg:order-1 flex-col">
              <div className="flex-1 order-2 lg:order-1">
                <h2 className="lg:mb-28 lg:block hidden mb-14 font-serif font-light tracking-wide text-gray-900 text-3xl">
                  Testimonials
                </h2>
                <div className="space-y-8">
                  {testimonials.length > 0 && (
                    <p className="font-serif text-2xl font-light leading-normal text-gray-800">
                      &apos;{testimonials[currentSlide].comment}&apos;
                    </p>
                  )}
                  <p className="text-sm font-light tracking-wide text-gray-600">
                    — {testimonials[currentSlide]?.name}
                  </p>
                </div>
              </div>
              <div className="py-3 flex order-1 lg:order-2 lg:flex-col flex-row lg:gap-2 gap-5">
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
                    alt="next"
                    width={25}
                    height={25}
                  />
                </button>
              </div>
            </div>
            <div className="relative aspect-[4/5] order-1 lg:order-2 w-full overflow-hidden">
              <Image
                src={
                  testimonials[currentSlide]?.image_url || "/placeholder.svg"
                }
                alt={`Testimonial by ${testimonials[currentSlide]?.name}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-24 flex justify-center">
            <TransitionLink
              href="/contact"
              className="bg-[#BEB3A7] font-serif px-8 py-3 text-sm font-light tracking-wide text-white hover:bg-[#807c7c] transition-colors ease-in-out duration-300"
            >
              Contact Me
            </TransitionLink>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
