"use client";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import Container from "@/components/Container";
import { useGetBlog } from "@/hooks/useGetBlog";
import Image from "next/image";
import { Blog } from "@/data";
import TransitionLink from "@/components/TransitionLink";
import { useGetFaq } from "@/hooks/useGetFaqs";

const BlogsPage = () => {
  const { data: faqs, isLoading } = useGetFaq();

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
        <div className=" py-24">
          <div className="mb-16">
            <h2 className="mb-8 font-serif lg:text-4xl text-3xl font-light tracking-wide text-gray-900 md:text-4xl">
              FAQ
            </h2>
            <div className="h-px w-full  bg-gray-200" />
          </div>

          <div className="grid gap-x-24 lg:px-10 gap-y-16 md:grid-cols-2">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="space-y-4 animate-pulse">
                    <div className="h-6 bg-gray-300 rounded w-3/4" />
                    <div className="h-4 bg-gray-300 rounded w-full" />
                    <div className="h-4 bg-gray-300 rounded w-5/6" />
                    <div className="h-4 bg-gray-300 rounded w-2/3" />
                  </div>
                ))
              : faqs?.data.map((faq) => (
                  <div key={faq.id} className="space-y-4">
                    <h3 className="font-serif text-2xl font-light leading-snug text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="font-light leading-relaxed text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                ))}
          </div>

          <div className="my-24 h-px w-full max-w-[400px] mx-auto bg-gray-200" />

          <div className="text-center">
            <h3 className="mb-20 font-serif text-3xl font-light tracking-wide text-gray-900">
              Ready to Begin?
            </h3>
            <TransitionLink
              href="/contact"
              className="inline-block font-serif bg-[#BEB3A7] px-8 py-3 text-sm font-light tracking-wide text-white transition-colors hover:bg-[#807c7c]"
            >
              Book a Session
            </TransitionLink>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogsPage;
