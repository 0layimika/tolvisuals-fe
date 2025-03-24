import Image from "next/image";
import { cn } from "@/lib/utils";

interface VerticalImageListProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
}

export default function VerticalImageList({
  images,
  className,
}: VerticalImageListProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex px-5 flex-col items-center gap-8 w-full", className)}>
      {images.map((image, index) => (
        <div key={index} className="w-full max-w-[700px] relative">
          <div className="relative w-full aspect-[3/4] md:aspect-[3/5]">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover "
              sizes="(max-width: 700px) 80vw, 700px"
              priority={index === 0}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
