import React from "react";
import Image from "next/image";
import Container from "@/components/Container";
import PortfolioItem from "@/components/PortfolioItem";

const PortfolioPage = () => {
  const portfolioItems = [
    {
      image: "/assets/image4.jpg",
      title: "Wedding",
      subtitle: "THE BIG DAY",
      href: "/portfolio/wedding",
    },
    {
      image: "/assets/image3.jpg",
      title: "Engagement",
      subtitle: "BEGINNING OF A JOURNEY",
      href: "/portfolio/engagement",
    },
    {
      image: "/assets/image7.jpg",
      title: "Portraits",
      subtitle: "CAPTURING MOMENTS",
      href: "/portfolio/portraits",
    },
    {
      image: "/assets/childrenandfamily.jpg",
      title: "Children and Family",
      subtitle: "CHERISHED MOMENTS, LASTING MEMORIES",
      href: "/portfolio/children-and-family",
    },
    {
      image: "/assets/productandlifestyle.jpg",
      title: "Product and Lifestyle",
      subtitle: "SHOWCASING STYLE AND ELEGANCE",
      href: "/portfolio/products-and-lifestyle",
    },
  ];
  return (
    <div>
      <section className="relative h-[66vh] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/assets/image3.jpg"
          alt="Professional portrait"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="absolute font-serif inset-0 flex flex-col items-center justify-center pt-20">
          <h1 className="font-serif text-3xl font-light tracking-wide text-white md:text-6xl lg:text-5xl">
            My Portfolio
          </h1>
          <p className="mt-4 text-sm capitalize font-light tracking-[0.2em] text-white/90">
            EVERY PHOTO TELLS A STORY
          </p>
        </div>
      </section>
      <Container className="py-24">
        <div className="grid gap-16 md:gap-y-12  md:grid-cols-2 md:gap-24">
          {portfolioItems.map((item, index) => (
            <PortfolioItem
              key={index}
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              href={item.href}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PortfolioPage;
