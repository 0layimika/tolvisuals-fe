"use client";

import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-6">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            font-serif text-lg font-light text-black transition-colors hover:text-gray-900"
            ${currentPage === page && "text-gray-900"}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="text-gray-400 transition-colors hover:text-gray-900"
        disabled={currentPage === totalPages}
      >
        <Image
          src={"/assets/arrowRightBlack.svg"}
          alt="Instagram"
          width={25}
          height={25}
        />
      </button>
    </div>
  );
}
