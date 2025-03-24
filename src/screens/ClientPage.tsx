"use client";
import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import Pagination from "@/components/Pagination";
import ImageSlider from "@/components/ImageSlider";
import { useGetClients } from "@/hooks/useGetClients";

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

  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  // Fetch data with both page and category as parameters
  const {
    data: clients,
    isLoading,
    isError,
  } = useGetClients({
    category:
      activeCategory === "ALL" ? undefined : activeCategory.toLowerCase(),
    page: currentPage,
  });

  // Filtered items based on fetched data
  const filteredItems = clients ? clients.data.data : [];
  const totalPages = clients ? clients.data.data.length : 1;

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Container className="py-24 lg:mt-24">
        <div className="mb-20 text-center">
          <h2 className="mb-9 font-serif text-4xl font-extralight tracking-wide text-gray-900">
            Client Area
          </h2>
          <p className="mx-auto max-w-3xl font-light leading-relaxed text-gray-600">
            Every client has a unique story, and we&apos;re here to capture it
            with authenticity and artistry. From intimate moments to grand
            celebrations, we create timeless images that reflect your vision.
            Let&apos;s bring your memories to life.
          </p>
        </div>

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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            // Skeleton loader
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <div
                key={index}
                className="group relative aspect-square w-full overflow-hidden bg-gray-200 animate-pulse"
              >
                <div className="h-full w-full bg-gray-300" />
              </div>
            ))
          ) : isError ? (
            <p className="text-red-500">Failed to load clients</p>
          ) : (
            filteredItems.map((client) => (
              <div
                key={client.id}
                onClick={() => {
                  const index = filteredItems.findIndex(
                    (item) => item.id === client.id
                  );
                  setSelectedImageIndex(index);
                }}
                tabIndex={0}
                className="group relative aspect-square w-full overflow-hidden cursor-pointer"
              >
                <Image
                  src={client.images[0].image_url || "/placeholder.svg"}
                  alt={client.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
                <div className="absolute inset-0 flex justify-center items-end p-8">
                  <h3 className="font-serif text-xl text-white">
                    {client.name}
                  </h3>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-16">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Container>

      {selectedImageIndex !== null && (
        <ImageSlider
          images={filteredItems.map((item, index) => ({
            imageUrl: item.images[0].image_url,
            user: item.name,
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
