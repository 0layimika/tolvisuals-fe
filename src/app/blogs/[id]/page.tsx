"use client";
import { useGetSingleBlog } from "@/hooks/useGetSingleBlog";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

const PerBlogsPage = () => {
  const pathname = usePathname();
  const blogId = parseInt(pathname.split("/").pop() || "0", 10);
  const { data, isLoading, isFetching, refetch } = useGetSingleBlog({}, blogId);

  useEffect(() => {
    refetch();
  }, [blogId, refetch]);

  return (
    <div className="py-24 lg:mt-12">
      <h2 className="font-serif  mb-10 lg:text-4xl font-bold text-center md:text-3xl text-2xl">
        {isLoading || isFetching ? (
          <div className="h-8 w-40  mx-auto rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite]" />
        ) : (
          data?.data.title
        )}
      </h2>

      <div className="">
        {isLoading ? (
          <div className="h-[600px] w-4/5 my-7  mx-auto bg-gray-300 rounded animate-pulse"></div>
        ) : data?.data ? (
          <Image
            src={data?.data.thumbnail ?? "/assets/placeholder.jpg"}
            alt={data?.data.title + " image"}
            priority
            width={600}
            height={450}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      <div className="max-w-5xl px-7 mx-auto">
        {isLoading || isFetching ? (
          <div className="md:space-y-8 space-y-4 mx-auto">
            <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-5/6  bg-gray-300  rounded animate-pulse"></div>
            <div className="h-4 w-4/6  bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-5/6  bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-5/6  bg-gray-300 rounded animate-pulse"></div>{" "}
            <div className="h-4 w-5/6  bg-gray-300 rounded animate-pulse"></div>{" "}
            <div className="h-4 w-5/6  bg-gray-300 rounded animate-pulse"></div>
          </div>
        ) : (
          <p className="sm:text-lg">
            {data?.data.content.split("\r\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
};

export default PerBlogsPage;
