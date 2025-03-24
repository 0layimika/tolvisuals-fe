"use client"
import VerticalImageList from "@/components/VerticalImageFormat";
import { usePortfolio } from "@/hooks/usePortfolio";
import React from "react";

const ProductLifeStyle = () => {
  const { data: products } = usePortfolio({ category: "products" });
  return (
    <div className="py-24 lg:mt-12  ">
      <h2 className="font-serif mb-16 lg:text-4xl font-light text-center md:text-3xl text-2xl">
        Products and Lifestyle
      </h2>
      <VerticalImageList
        images={
          products?.data.map((image) => ({
            src: image.image_url,
            alt: `${image.category} ${image.id}` || "A Wedding image",
          })) || []
        }
      />
    </div>
  );
};

export default ProductLifeStyle;
