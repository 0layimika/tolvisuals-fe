import React from "react";
import Image from "next/image";
import Link from "next/link";
import InvestmentItem from "@/components/InvesmentItem";
import Container from "@/components/Container";
import TransitionLink from "@/components/TransitionLink";

const InvesmentPage = () => {
  const faqs = [
    {
      question: "How do I reserve you for my date or session time?",
      answer:
        "All session dates are reserved once we receive your signed contract and deposit.",
    },
    {
      question: "What rights do I have to the digital prints?",
      answer:
        "You have the right to reprint images whenever you want. However, you may not sell your images for profit or publish your images without the written consent of Lorem Ipsum Photography.",
    },
    {
      question:
        "Do you provide the RAW files from my portrait session, engagement session and/or wedding day?",
      answer:
        "Each of our packages comes with a full resolution image download. However, we typically do not provide RAW (unprocessed) files from our shoots because we believe in delivering a finished product. In fact, we're often shooting with the end (post-produced) product in mind. However, on occasion, we may provide RAW images along with our post-produced JPG's for an additional fee and restrictions.",
    },
    {
      question: "Do you shoot destination weddings?",
      answer:
        "While we are based in Lagos, Nigeria, we serve clients all around the world. Our destination wedding photography packages include the cost of travel and reasonable accommodations. Contact us via our inquiry form for more details",
    },
    {
      question: "Do you provide framing services as well?",
      answer:
        "Yes, We do provide wall art and framing service. Inquire with your service consultant for more information!",
    },
  ];
  return (
    <div>
      <section className="relative h-[66vh] w-full overflow-hidden">
        <Image
          src="/assets/image3.jpg"
          alt="Professional portrait"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute font-serif inset-0 flex flex-col items-center justify-center pt-20">
          <h1 className="font-serif text-3xl font-light tracking-wide text-white md:text-6xl lg:text-5xl">
            Investment
          </h1>
          <p className="mt-4 text-sm capitalize font-light tracking-[0.2em] text-white/90">
            PRESERVE YOUR BEST MEMORIES
          </p>
        </div>
      </section>
      <Container className="py-24">
        <h2 className="lg:mb-16 mb-10 lg:text-center  font-serif text-2xl lg:text-4xl font-light tracking-wide text-gray-900 md:text-5xl">
          Pricing & Packages
        </h2>

        <div className="space-y-16">
          <InvestmentItem
            description={[
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt sed aliquid dignissimos repellat. Eveniet, vitae?",
              "Sunt sed aliquid dignissimos repellat. Eveniet, vitae?",
            ]}
            footerText="CONTACT ME"
            image="/assets/client1.jpg"
            title="PORTRAITS"
          />
          <InvestmentItem
            description={[
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt sed aliquid dignissimos repellat. Eveniet, vitae?",
            ]}
            footerText="GET IN TOUCH"
            image="/assets/client4.jpg"
            title="ENGAGEMENTS"
            left={true}
          />
          <InvestmentItem
            description={[
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt sed aliquid dignissimos repellat. Eveniet, vitae?",
            ]}
            footerText="CONTACT ME"
            image="/assets/image2.jpg"
            title="WEDDINGS"
          />
          <InvestmentItem
            description={[
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt sed aliquid dignissimos repellat. Eveniet, vitae?",
            ]}
            footerText="CONTACT ME"
            image="/assets/childrenandfamily.jpg"
            left={true}
            title="CHILDREN AND FAMILY"
          />
          <InvestmentItem
            description={[
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt sed aliquid dignissimos repellat. Eveniet, vitae?",
            ]}
            footerText="GET IN TOUCH"
            image="/assets/productandlifestyle.jpg"
            title="PRODUCTS AND LIFESTYLE"
          />
        </div>

        <div className=" py-24">
          <div className="mb-16">
            <h2 className="mb-8 font-serif lg:text-4xl text-3xl font-light tracking-wide text-gray-900 md:text-4xl">
              FAQ
            </h2>
            <div className="h-px w-full  bg-gray-200" />
          </div>

          <div className="grid gap-x-24 lg:px-10 gap-y-16 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-4">
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

export default InvesmentPage;
