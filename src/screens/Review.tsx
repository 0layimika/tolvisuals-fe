"use client";
import type React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitReviews } from "@/hooks/useSubmitReview";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import * as z from "zod";
import TransitionLink from "@/components/TransitionLink";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  reviewText: z
    .string()
    .min(10, "Please share more details about your experience"),
  photoPermission: z.enum(["yes", "no"], {
    required_error: "Please indicate if we can share your photos",
  }),
});

export default function ReviewSubmissionForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photoPermission: "yes",
      name: "",
      reviewText: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
  };

  const { mutate: submitReviews, isPending } = useSubmitReviews();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("comment", values.reviewText);
    formData.append("photoPermission", values.photoPermission);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    console.log("This is the selected file", selectedFile);
    console.log(formData);

    submitReviews(formData,  {
        
      onSuccess: () => {
        setSubmitSuccess(true);
      },
      onError: (error) => {
        console.error("Error submitting review:", error);
      },
    });
  };

  return (
    <>
      {submitSuccess ? (
        <section className="mx-auto max-w-3xl px-4 py-24 lg:mt-24  pb-12 text-center">
          <div className="mb-12">
            <h1 className="mb-6 font-serif md:text-4xl text-2xl font-light tracking-wide text-gray-900">
              Thank You for Your Review
            </h1>
            <p className="mb-8 font-light leading-relaxed text-gray-600">
              We truly appreciate you taking the time to share your experience
              with us. Your feedback helps us improve and allows others to learn
              about our services.
            </p>
          </div>

          <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-[#BEB3A7] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <div className="space-y-6">
            <p className="font-light text-gray-600">
              Your review has been submitted successfully and will help future
              clients make informed decisions.
            </p>

            <div className="pt-4 space-y-4">
              <TransitionLink
                href="/home"
                className="inline-block w-fit px-6 rounded-none py-3 text-white font-serif hover:bg-[#807c7c] duration-300 ease-in-out transition-colors bg-[#BEB3A7] font-light tracking-wider cursor-pointer"
              >
                Return to Home
              </TransitionLink>

              <div className="block pt-2">
                <TransitionLink
                  href="/about"
                  className="font-light text-gray-600 underline hover:text-gray-900 transition-colors"
                >
                  View Latest Reviews
                </TransitionLink>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-3xl px-4 py-24 lg:mt-24 pb-12">
          <div className="mb-16">
            <h1 className="mb-6 font-serif md:text-4xl text-center text-2xl font-light tracking-wide text-gray-900">
              Share Your Experience
            </h1>
            <p className="mb-8 font-light leading-relaxed text-gray-600">
              Thank you for choosing us to capture your special moments. We
              would love to hear about your experience and see the beautiful
              memories we created together.
            </p>
            <p className="font-light text-gray-600">
              Your feedback helps us improve and allows others to learn about
              our services. We appreciate your time!
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs tracking-widest">
                      YOUR NAME *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-gray-200 rounded-none py-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reviewText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs tracking-widest">
                      YOUR REVIEW *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[150px] rounded-none border-gray-200"
                        placeholder="Share the details of your experience with us"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <p className="text-xs tracking-widest">
                  SHARE A PHOTO (OPTIONAL)
                </p>

                {imagePreview ? (
                  <div className="relative w-full h-64 border border-gray-200">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full hover:bg-black/90 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="border border-gray-200 p-6 text-center">
                    <label className="cursor-pointer block">
                      <div className="flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-400 mb-2"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <p className="text-sm font-light text-gray-600 mb-1">
                          Click to upload a photo
                        </p>
                        <p className="text-xs font-light text-gray-400">
                          JPG, PNG or WEBP (max. 5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="photoPermission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs mb-2 leading-relaxed tracking-widest">
                      MAY WE SHARE YOUR REVIEW AND PHOTOS? *
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2.5"
                      >
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-light">
                            Yes, I give permission to share my review and photos
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-light">
                            No, please keep my review private
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                className="w-fit px-6 rounded-none py-3 font-serif hover:bg-[#807c7c] duration-300 ease-in-out transition-colors bg-[#BEB3A7] font-light tracking-wider cursor-pointer"
              >
                {isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </Form>
        </section>
      )}
    </>
  );
}
