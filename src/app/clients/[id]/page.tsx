"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ImageItem } from "@/screens/ClientPage";
import ImageSlider from "@/components/ImageSlider";

const ClientPictures = () => {
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
    {
      image: "/assets/image5.jpg",
      title: "SMOSH",
      category: "ENGAGEMENT",
      id: 8,
    },
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  return (
    <div className="py-24 lg:mt-12 ">
      <h2 className="font-serif mb-10 lg:text-4xl font-light text-center md:text-3xl text-2xl">
        Client Name
      </h2>
      <div className="grid gap-4 max-w-[1600px] px-7 mx-auto md:grid-cols-2 lg:grid-cols-4">
        {galleryItems.map((item) => (
          <div
            key={item.title}
            onClick={() => setSelectedImageIndex(galleryItems.indexOf(item))}
            tabIndex={0}
            className="group relative aspect-square w-full overflow-hidden cursor-pointer"
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
          </div>
        ))}
      </div>
      {selectedImageIndex !== null && (
        <ImageSlider
          images={galleryItems.map((item) => ({
            imageUrl: item.image,
            user: item.title,
            id: item.id,
          }))}
          showDetails={false}
          currentIndex={selectedImageIndex}
          setCurrentIndex={(index) => setSelectedImageIndex(index)}
          show
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </div>
  );
};

export default ClientPictures;
