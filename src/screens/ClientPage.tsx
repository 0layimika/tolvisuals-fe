"use client";
import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import Pagination from "@/components/Pagination";

type Category = "ALL" | "ENGAGEMENT" | "PORTRAITS" | "WEDDINGS";
const ITEMS_PER_PAGE = 9;

const ClientPage = () => {
  const categories: Category[] = ["ALL", "ENGAGEMENT", "PORTRAITS", "WEDDINGS"];

  const galleryItems = [
    {
      image: "/assets/client1.jpg",
      title: "FAVOUR & DARA",
      category: "ENGAGEMENT",
    },

    {
      image: "/assets/client2.jpg",
      title: "TEMI & DARE",
      category: "PORTRAITS",
    },
    {
      image: "/assets/client3.jpg",
      title: "NNEKA & JORDAN",
      category: "WEDDINGS",
    },
    {
      image: "/assets/client4.jpg",
      title: "IBUKUN & DOLAPO",
      category: "ENGAGEMENT",
    },
    {
      image: "/assets/client5.jpg",
      title: "KENECHUKWU & OLOLADE",
      category: "WEDDINGS",
    },
    {
      image: "/assets/client2.jpg",
      title: "OBASAN & FAITH",
      category: "ENGAGEMENT",
    },
    {
      image: "/assets/client2.jpg",
      title: "OBASAN & FAITH",
      category: "ENGAGEMENT",
    },
    {
      image: "/assets/client2.jpg",
      title: "OBASAN & FAITH",
      category: "ENGAGEMENT",
    },
    {
      image: "/assets/client2.jpg",
      title: "OBASAN & FAITH",
      category: "ENGAGEMENT",
    },
    {
      image: "/assets/client2.jpg",
      title: "OBASAN & FAITH",
      category: "ENGAGEMENT",
    },
    {
      image: "/assets/client2.jpg",
      title: "OBASAN & FAITH",
      category: "ENGAGEMENT",
    },
    {
      image: "/assets/client2.jpg",
      title: "OBASAN & FAITH",
      category: "ENGAGEMENT",
    },
    {
      image: "/assets/client2.jpg",
      title: "OBASAN & FAITH",
      category: "ENGAGEMENT",
    },
    {
      image: "/assets/client2.jpg",
      title: "OBASAN & FAITH",
      category: "ENGAGEMENT",
    },
    {
      image: "/assets/client2.jpg",
      title: "OBASAN & FAITH",
      category: "ENGAGEMENT",
    },
    {
      image: "/assets/client2.jpg",
      title: "OBASAN & FAITH",
      category: "ENGAGEMENT",
    },
  ];

  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "ALL" || item.category === activeCategory
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const currentItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div>
      <Container className="py-24 mt-24">
        <div className="mb-20">
          <h2 className="mb-9 font-serif text-center text-4xl font-extralight tracking-wide text-gray-900 md:text-4xl">
            Client Area
          </h2>
          <p className="mx-auto max-w-3xl font-light leading-relaxed text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            nec felis libero. Ut blandit viverra urna quis scelerisque. Praesent
            non venenatis ex. Morbi in pellentesque dui. Aliquam erat volutpat.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-10 flex space-x-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`border-b-2 font-serif  border-transparent pb-1 text-sm tracking-[0.2em] transition-all hover:border-gray-900 ${
                activeCategory === category ? "border-gray-900 border-b-2" : "border-transparent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentItems.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-square w-full overflow-hidden"
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
              <div className="absolute  inset-0 flex justify-center items-end p-8">
                <h3 className="font-serif text-xl text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-16">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

export default ClientPage;
