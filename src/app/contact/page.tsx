import ContactForm from "@/screens/ContactMe";
import React from "react";
import Image from "next/image";

const Contact = () => {
  return (
    <div>
      <section className="relative h-[100vh] w-full overflow-hidden">
        <Image
          src="/assets/client4.jpg"
          alt="Professional portrait"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute font-serif inset-0 flex flex-col items-center justify-center pt-20">
          <h1 className="font-serif text-3xl font-light tracking-wide text-white md:text-6xl lg:text-5xl">
            Contact Me
          </h1>
          <p className="mt-4 text-sm capitalize font-light tracking-[0.2em] text-white/90">
            YOUR STORY BEGINS HERE
          </p>
        </div>
      </section>
      <ContactForm />
    </div>
  );
};

export default Contact;
