import VerticalImageList from "@/components/VerticalImageFormat";
import React from "react";

const Weddings = () => {
  const images = [
    {
      src: "/assets/image1.jpg",
      alt: "Elegant couple in formal attire",
    },
    {
      src: "/assets/image3.jpg",
      alt: "Sample image 2",
    },
    {
      src: "/assets/image4.jpg",
      alt: "Sample image 3",
    },
    {
      src: "/assets/image5.jpg",
      alt: "Sample image 4",
    },
  ];
  return (
    <div className="py-24 lg:mt-12 ">
      <h2 className="font-serif mb-16 lg:text-4xl font-light text-center md:text-3xl text-2xl">
        Weddings
      </h2>
      <VerticalImageList images={images} />
    </div>
  );
};

export default Weddings;
