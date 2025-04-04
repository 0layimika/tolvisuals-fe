"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { X } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  instagram: z.string().min(2, "Instagram handle is required"),
  email: z.string().email("Valid email is required"),
  sessionType: z
    .enum(["Wedding", "Pre-wedding", "Portraits", "Events", "Others"])
    .optional(),
  otherSessionType: z.string().optional().or(z.literal("")),
  eventDate: z.string().min(1, "Event date is required"),
  eventLocation: z.string().min(1, "Event location is required"),
  communication: z
    .array(z.string())
    .min(1, "Select at least one communication method"),
  otherCommunication: z.string().optional().or(z.literal("")),
  referralSource: z.string().min(1, "Please tell us how you heard about us"),
  additionalDetails: z.string().optional().or(z.literal("")),
});

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowThankYou(true);

      const timer = setTimeout(() => {
        setShowThankYou(false);
      }, 10000); 
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      instagram: "",
      email: "",
      sessionType: undefined,
      otherSessionType: "",
      eventDate: "",
      eventLocation: "",
      communication: [],
      otherCommunication: "",
      referralSource: "",
      additionalDetails: "",
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    form.handleSubmit((values) => {
      console.log("Form is valid, submitting:", values);
      const formEl = e.target as HTMLFormElement;
      formEl.submit();
    })(e);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-24 pb-12 relative">
      {/* Thank You Message */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative shadow-xl">
            <button
              onClick={() => setShowThankYou(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-serif font-light mb-4 text-gray-900">
                Thank You!
              </h2>
              <div className="w-16 h-16 bg-[#BEB3A7] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-gray-600 mb-6">
                Your message has been received. We&apo;ll get back to you shortly to
                discuss your photography needs.
              </p>
              <Button
                onClick={() => setShowThankYou(false)}
                className="bg-[#BEB3A7] hover:bg-[#807c7c] text-white font-light py-2 px-6 rounded-none"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-16">
        <h1 className="mb-6 font-serif md:text-4xl text-2xl font-light tracking-wide text-gray-900 ">
          Let&apos;s Start Your Journey
        </h1>
        <p className="mb-8 font-light leading-relaxed text-gray-600">
          Are you looking to tell your unique love stories in the most beautiful
          way ever, or are you looking to create elegant and timeless portraits
          or celebratory portraits, whatever your style is, we work to make your
          dream come true.
        </p>
        <p className="font-light text-gray-600">
          Please use our contact form below and we will get in touch shortly via
          email. Thank you!
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={onSubmit}
          action="https://formsubmit.co/ayo@tolvisuals.co.uk"
          method="POST"
          className="space-y-8"
        >
          <input
            type="hidden"
            name="_subject"
            value="New Photography Inquiry"
          />
          <input type="hidden" name="_captcha" value="true" />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_next"
            value={
              typeof window !== "undefined"
                ? `${window.location.href.split("?")[0]}?success=true`
                : ""
            }
          />

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
                    name="name"
                    className="border-gray-200 rounded-none py-6"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  PHONE NUMBER *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="phone"
                    className="border-gray-200 rounded-none py-6"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  INSTAGRAM HANDLE *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="instagram"
                    className="border-gray-200 rounded-none py-6"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  EMAIL ADDRESS *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="email"
                    type="email"
                    className="border-gray-200 rounded-none py-6"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sessionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs mb-2 leading-relaxed tracking-widest">
                  WHAT TYPE OF SESSION ARE YOU LOOKING FOR? *
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    className="space-y-2.5"
                  >
                    {[
                      "Wedding",
                      "Pre-wedding",
                      "Portraits",
                      "Events",
                      "Others",
                    ].map((type) => (
                      <FormItem
                        key={type}
                        className="flex items-center space-x-3"
                      >
                        <FormControl>
                          <RadioGroupItem value={type} />
                        </FormControl>
                        <FormLabel className="font-light">{type}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                {/* Hidden input to ensure the value is sent with the form */}
                <input
                  type="hidden"
                  name="sessionType"
                  value={field.value || ""}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="otherSessionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  OTHERS, PLEASE SPECIFY
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="otherSessionType"
                    className="border-gray-200 rounded-none py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  EVENT SHOOT DATE *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="eventDate"
                    type="date"
                    className="border-gray-200 rounded-none py-6"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  EVENT SHOOT LOCATION *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="eventLocation"
                    className="border-gray-200 rounded-none py-6"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="communication"
            render={() => (
              <FormItem>
                <FormLabel className="text-xs mb-2 leading-relaxed tracking-widest">
                  WHAT IS YOUR PREFERRED MODE OF COMMUNICATION FOR OUR INQUIRY
                  RESPONSE? *
                </FormLabel>
                <div className="">
                  {["Email", "Whatsapp", "Instagram", "Others"].map(
                    (method) => (
                      <FormField
                        key={method}
                        control={form.control}
                        name="communication"
                        render={({ field }) => (
                          <FormItem className="flex mb-4 items-center space-x-3">
                            <FormControl className="space-y-2.5">
                              <Checkbox
                                name="communication"
                                value={method}
                                checked={field.value?.includes(method)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  return checked
                                    ? field.onChange([...value, method])
                                    : field.onChange(
                                        value.filter((v) => v !== method)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-light">
                              {method}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    )
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="otherCommunication"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  OTHERS, PLEASE SPECIFY
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="otherCommunication"
                    className="border-gray-200 rounded-none py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="referralSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  HOW DID YOU HEAR ABOUT ME? *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  name="referralSource"
                >
                  <FormControl>
                    <SelectTrigger className="border-gray-200 rounded-none py-6 w-full">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="referral">Friend Referral</SelectItem>
                    <SelectItem value="google">Google Search</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  ANY ADDITIONAL DETAILS?
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    name="additionalDetails"
                    className="min-h-[150px] rounded-none border-gray-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-fit px-6 rounded-none py-3 font-serif hover:bg-[#807c7c] duration-300 ease-in-out transition-colors bg-[#BEB3A7] font-light tracking-wider cursor-pointer"
          >
            Send Message
          </Button>
        </form>
      </Form>
    </section>
  );
}
