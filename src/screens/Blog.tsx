"use client";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import Container from "@/components/Container";
import { useGetBlog } from "@/hooks/useGetBlog";
import Image from "next/image";
import { Blog } from "@/data";

const BlogsPage = () => {
  const { data: blogs, isLoading: isBlogLoading } = useGetBlog();
  const [blogList, setBlogList] = useState<Blog[]>([]);

  useEffect(() => {
    if (blogs?.data) {
      console.log("Fetched Blogs:", blogs.data[0]?.content);
      setBlogList(blogs.data);
    }
  }, [blogs]);

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
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center font-serif">
          <h1 className="text-3xl font-light tracking-wide text-white md:text-6xl lg:text-5xl">
            Blogs & Newsletters
          </h1>
          <p className="mt-4 text-sm font-light tracking-[0.2em] text-white/90 capitalize">
            CAPTURE STORIES, INSPIRE MINDS
          </p>
        </div>
      </section>

      <Container className="py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isBlogLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="group relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 animate-pulse"
                >
                  <div className="h-full w-full bg-gray-300" />
                </div>
              ))
            : blogList.map((post, index) => (
                <BlogCard
                  key={index}
                  date={post.date}
                  href={`/blogs/${post.id}`}
                  imageUrl={post.thumbmail ?? "/assets/placeholder.jpg"}
                  title={post.title}
                />
              ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogsPage;
