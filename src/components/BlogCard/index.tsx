import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  date: string;
  title: string;
  imageUrl: string;
  href: string;
}

export default function BlogCard({
  date,
  title,
  imageUrl,
  href,
}: BlogCardProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <Link
      href={href}
      className="group flex flex-col  overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="p-6 pb-4 flex-1">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium text-gray-800 font-serif">
            TOL VISUALS
          </span>
          <span className="text-sm text-gray-500">{formatDate(date)}</span>
        </div>
        <h3 className="mb-6 text-xl font-bold leading-tight text-gray-900 ">
          {title}
        </h3>
      </div>
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </Link>
  );
}
