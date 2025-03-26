"use client";
import ImageSlider from "@/components/ImageSlider";
import { useGetSingleClient } from "@/hooks/useGetSingleClient";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const SkeletonLoader = () => (
  <div className="w-full aspect-square rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite]"></div>
);

const ClientPictures = () => {
  const pathname = usePathname();
  const clientId = parseInt(pathname.split("/").pop() || "0", 10);
  const { data, isLoading, isFetching, refetch } = useGetSingleClient(
    {},
    clientId
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    refetch();
  }, [clientId, refetch]);

  const clientImages = data ? data.images : [];

  return (
    <div className="py-24 lg:mt-12">
      <h2 className="font-serif mb-10 lg:text-4xl font-light text-center md:text-3xl text-2xl">
        {isLoading || isFetching ? (
          <div className="h-8 w-40 mx-auto rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite]" />
        ) : (
          data?.client_name
        )}
      </h2>

      <div className="grid gap-4 max-w-7xl px-7 mx-auto md:grid-cols-2 lg:grid-cols-4">
        {isLoading || isFetching
          ? [...Array(5)].map((_, index) => <SkeletonLoader key={index} />)
          : clientImages.map((client) => (
              <div
                key={client.id}
                onClick={() => {
                  const index = clientImages.findIndex(
                    (item) => item.id === client.id
                  );
                  setSelectedImageIndex(index);
                }}
                tabIndex={0}
                className="group relative aspect-square w-full overflow-hidden cursor-pointer"
              >
                <Image
                  src={client.image_url || "/placeholder.svg"}
                  alt={`Client image ${client.id}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
              </div>
            ))}
      </div>

      {selectedImageIndex !== null && (
        <ImageSlider
          images={clientImages.map((item) => ({
            imageUrl: item.image_url,
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
