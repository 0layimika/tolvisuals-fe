"use client";
import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import Pagination from "@/components/Pagination";
import ImageSlider from "@/components/ImageSlider";

type Category =
  | "ALL"
  | "ENGAGEMENT"
  | "PORTRAITS"
  | "WEDDINGS"
  | "CHILDREN AND FAMILY"
  | "PRODUCT AND LIFESTYLE";

const ITEMS_PER_PAGE = 9;

export interface ImageItem {
  image: string;
  title: string;
  category: Category;
  id: number;
}

const ClientPage = () => {
  const categories: Category[] = [
    "ALL",
    "CHILDREN AND FAMILY",
    "ENGAGEMENT",
    "PORTRAITS",
    "PRODUCT AND LIFESTYLE",
    "WEDDINGS",
  ];

  const galleryItems: ImageItem[] = [
    {
      image: "/assets/client1.jpg",
      title: "FAVOUR & DARA",
      category: "ENGAGEMENT",
      id: 1,
    },
    {
      image: "/assets/client2.jpg",
      title: "TEMI & DARE",
      category: "PORTRAITS",
      id: 2,
    },
    {
      image: "/assets/client3.jpg",
      title: "NNEKA & JORDAN",
      category: "WEDDINGS",
      id: 3,
    },
    {
      image: "/assets/client4.jpg",
      title: "IBUKUN & DOLAPO",
      category: "ENGAGEMENT",
      id: 4,
    },
    {
      image: "/assets/client5.jpg",
      title: "KENECHUKWU & OLOLADE",
      category: "WEDDINGS",
      id: 5,
    },
    {
      image: "/assets/childrenandfamily.jpg",
      title: "WANG FAMILY",
      category: "CHILDREN AND FAMILY",
      id: 6,
    },
    {
      image: "/assets/productandlifestyle.jpg",
      title: "APPLE",
      category: "PRODUCT AND LIFESTYLE",
      id: 7,
    },
  ];

  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

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
      <Container className="py-24 lg:mt-24">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="mb-9 font-serif text-4xl font-extralight tracking-wide text-gray-900">
            Client Area
          </h2>
          <p className="mx-auto max-w-3xl font-light leading-relaxed text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            nec felis libero. Ut blandit viverra urna quis scelerisque. Praesent
            non venenatis ex.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex text-nowrap hide-scrollbar overflow-scroll md:justify-start space-x-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`border-b-2 font-serif pb-1 text-sm tracking-[0.2em] transition-all hover:border-gray-900 ${
                activeCategory === category
                  ? "border-gray-900 transition-colors duration-300 ease-in-out border-b-2"
                  : "border-transparent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentItems.map((item) => (
            <div
              key={item.title}
              onClick={() => setSelectedImageIndex(filteredItems.indexOf(item))}
              tabIndex={0} // Allows keyboard navigation
              className="group relative aspect-square w-full overflow-hidden cursor-pointer"
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
              <div className="absolute inset-0 flex justify-center items-end p-8">
                <h3 className="font-serif text-xl text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
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

      {selectedImageIndex !== null && (
        <ImageSlider
          images={filteredItems.map((item) => ({
            imageUrl: item.image,
            user: item.title,
            id: item.id,
          }))}
          showDetails={true}
          currentIndex={selectedImageIndex}
          setCurrentIndex={(index) => setSelectedImageIndex(index)}
          show
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </div>
  );
};

export default ClientPage;
