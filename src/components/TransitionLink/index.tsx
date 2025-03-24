"use client";
import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface Props extends LinkProps {
  children: ReactNode;
  href: string;
  className: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TransitionLink = ({ children, className, href, ...props }: Props) => {
  const router = useRouter();
  const handleTransiton = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const body = document.querySelector("body");
    body?.classList.add("page-transition");
    await sleep(500);

    router.push(href);
    body?.classList.remove("page-transition");
  };
  return (
    <Link
      onClick={handleTransiton}
      className={className}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
