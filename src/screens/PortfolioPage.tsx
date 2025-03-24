"use client";
import React from "react";
import Image from "next/image";
import Container from "@/components/Container";
import PortfolioItem from "@/components/PortfolioItem";
import { usePortfolio } from "@/hooks/usePortfolio";

const subtitleMap: Record<string, string> = {
  Weddings: "THE BIG DAY",
  Engagements: "BEGINNING OF A JOURNEY",
  Portraits: "CAPTURING MOMENTS",
  "Kids and Family": "CHERISHED MOMENTS, LASTING MEMORIES",
  "Products and Lifestyle": "SHOWCASING STYLE AND ELEGANCE",
};

const PortfolioPage = () => {
  const { data: portfolio, isLoading } = usePortfolio();

  return (
    <div>
      <section className="relative h-[100vh] w-full overflow-hidden">
        <Image
          src="/assets/image3.jpg"
          alt="Professional portrait"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute font-serif inset-0 flex flex-col items-center justify-center ">
          <h1 className="font-serif text-3xl font-light tracking-wide text-white md:text-6xl lg:text-5xl">
            My Portfolio
          </h1>
          <p className="mt-4 text-sm capitalize font-light tracking-[0.2em] text-white/90">
            EVERY PHOTO TELLS A STORY
          </p>
        </div>
      </section>

      <Container className="py-24">
        <div className="grid gap-16 md:gap-y-12 md:grid-cols-2 md:gap-24">
          {portfolio?.data.map((item, index) => (
            <PortfolioItem
              key={index}
              isLoading={isLoading}
              image={item.image_url}
              title={item.category}
              subtitle={subtitleMap[item.category] || "A MOMENT TO REMEMBER"}
              href={`/portfolio/${item.category
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PortfolioPage;
