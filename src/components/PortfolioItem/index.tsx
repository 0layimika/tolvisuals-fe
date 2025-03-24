"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TransitionLink from "../TransitionLink";

interface PortfolioItemProps {
  image?: string;
  title?: string;
  subtitle?: string;
  href: string;
  isLoading?: boolean;
}

export default function PortfolioItem({
  image,
  title,
  subtitle,
  href,
  isLoading = false,
}: PortfolioItemProps) {
  const route = useRouter();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center animate-pulse">
        <div className="relative mb-8 aspect-[4/5] w-full bg-gray-300 rounded-lg" />

        <div className="h-6 w-3/4 bg-gray-300 rounded-md mb-2 text-black" >hey</div>

        <div className="h-4 w-1/2 bg-gray-300 rounded-md mb-4" />

        <div className="h-6 w-10 bg-gray-300 rounded-md" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col cursor-pointer items-center"
      onClick={() => route.push(href)}
    >
      <div className="relative mb-8 aspect-[4/5] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title || "Portfolio Image"}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      <h3 className="mb-2 font-serif text-3xl font-light tracking-wide">
        {title}
      </h3>

      <p className="mb-4 text-xs tracking-[0.2em] text-gray-600">{subtitle}</p>

      <TransitionLink
        href={href}
        className="group flex items-center space-x-2 text-gray-900"
      >
        <Image
          src={"/assets/arrowRightBlack.svg"}
          alt="Instagram"
          width={25}
          height={25}
        />
      </TransitionLink>
    </div>
  );
}
