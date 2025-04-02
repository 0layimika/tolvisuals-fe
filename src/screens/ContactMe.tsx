"use client";
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
import { useContactMe } from "@/hooks/useContactMe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  instagram: z.string().min(2, "Instagram handle is required"),
  email: z.string().email("Valid email is required"),
  sessionType: z.enum([
    "Wedding",
    "Pre-wedding",
    "Portraits",
    "Events",
    "Others",
  ]),
  otherSessionType: z.string().optional(),
  eventDate: z.string().min(1, "Event date is required"),
  eventLocation: z.string().min(1, "Event location is required"),
  communication: z
    .array(z.string())
    .min(1, "Select at least one communication method"),
  otherCommunication: z.string().optional(),
  referralSource: z.string().min(1, "Please tell us how you heard about us"),
  additionalDetails: z.string().optional(),
  recaptcha: z.string().min(1, "Please verify that you are not a robot"),
});

export default function ContactForm() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communication: [],
    },
  });

  const { data: submitData } = useContactMe();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!recaptchaToken) {
      form.setError("recaptcha", {
        message: "Please complete the reCAPTCHA",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("instagram", values.instagram);
    formData.append("email", values.email);
    formData.append("sessionType", values.sessionType);
    if (values.additionalDetails) {
      formData.append("additonalDetails", values.additionalDetails);
    }
    // if (values.communication) {
    //   formData.append("communication", values.communication);
    // }

    formData.append("eventDate", values.eventDate);
    formData.append("eventLocation", values.eventLocation);
    formData.append("referralSource", values.referralSource);
    if (values.otherSessionType) {
      formData.append("otherSessionType", values.otherSessionType);
    }
    if (values.otherCommunication) {
      formData.append("otherCommunication", values.otherCommunication);
    }
    formData.append("recaptcha", values.recaptcha);

    submitData(formData, {
      onSuccess: () => {
        console.log("data submitted");
      },
    });

    console.log(values);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-24 pb-12">
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
          onSubmit={form.handleSubmit(onSubmit)}
          action="https://formsubmit.co/olakay739@gmail.com"
          method="POST"
          className=" space-y-8"
        >
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  PHONE NUMBER *
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
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  INSTAGRAM HANDLE *
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  EMAIL ADDRESS *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="border-gray-200 rounded-none py-6"
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
                    defaultValue={field.value}
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
                  OTHERS, PLEASE SPECIFY*
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
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  EVENT SHOOT DATE *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    className="border-gray-200 rounded-none py-6"
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
                    className="border-gray-200 rounded-none py-6"
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
                  OTHERS, PLEASE SPECIFY*
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
            name="referralSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs tracking-widest">
                  HOW DID YOU HEAR ABOUT ME? *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
                  ANY ADDITIONAL DETAILS? *
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-[150px] rounded-none border-gray-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recaptcha"
            render={() => (
              <FormItem>
                <ReCAPTCHA
                  sitekey="YOUR_GOOGLE_RECAPTCHA_SITE_KEY"
                  onChange={(token) => {
                    setRecaptchaToken(token);
                    form.setValue("recaptcha", token || "");
                  }}
                />
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
