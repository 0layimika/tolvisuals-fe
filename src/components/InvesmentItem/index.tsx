import React from "react";
import Image from "next/image";

interface Props {
  title: string;
  description: string[];
  image: string;
  left?: boolean;
  footerText: string;
}

const InvestmentItem = ({
  image,
  description,
  title,
  footerText,
  left,
}: Props) => {
  return (
    <div className="">
      <div
        className={`grid  gap-16 md:grid-cols-2 md:gap-24 ${
          left ? "md:grid-flow-dense text-right " : "text-left"
        }`}
      >
        <div
          className={`relative aspect-[4/5] w-full overflow-hidden ${
            left ? "md:order-2" : ""
          }`}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt="Portrait package"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Content */}
        <div
          className={`flex flex-col justify-center ${left ? "md:order-1" : ""}`}
        >
          <div className={`mb-24 `}>
            <h3 className="mb-6 font-serif text-3xl tracking-widest text-gray-900">
              {title}
            </h3>
            {description.map((text) => (
              <p className="mb-4 font-light text-xl leading-relaxed text-gray-600">
                {text}
              </p>
            ))}
          </div>
          <div>
            <div className="my-4 h-px w-full  bg-gray-200"></div>
            <p className="inline-block font-serif   w-full pb-1 text-sm tracking-[0.2em] text-gray-900 transition-colors hover:text-gray-600">
              {footerText}
            </p>
          </div>
        </div>

        {/* Image */}
      </div>
    </div>
  );
};

export default InvestmentItem;
