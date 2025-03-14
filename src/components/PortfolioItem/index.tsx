import Image from "next/image";
import Link from "next/link";

interface PortfolioItemProps {
  image: string;
  title: string;
  subtitle: string;
  href: string;
}

export default function PortfolioItem({
  image,
  title,
  subtitle,
  href,
}: PortfolioItemProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-8 aspect-[4/5] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      <h3 className="mb-2 font-serif text-3xl font-light tracking-wide">
        {title}
      </h3>

      <p className="mb-4 text-xs tracking-[0.2em] text-gray-600">{subtitle}</p>

      <Link
        href={href}
        className="group flex items-center space-x-2 text-gray-900"
      >
        <Image
          src={"/assets/arrowRightBlack.svg"}
          alt="Instagram"
          width={25}
          height={25}
        />
      </Link>
    </div>
  );
}
