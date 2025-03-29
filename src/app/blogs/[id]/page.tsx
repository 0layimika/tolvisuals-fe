"use client";
import { useGetSingleBlog } from "@/hooks/useGetSingleBlog";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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

      <div className="max-w-5xl px-7 mx-auto">
        {isLoading || isFetching ? (
          <p>Loading...</p>
        ) : (
          <p className="sm:text-lg">{data?.data.content}</p>
        )}
      </div>
    </div>
  );
};

export default PerBlogsPage;
