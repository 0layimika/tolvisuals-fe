"use client";
import Image from "next/image";
import Container from "../Container";
import TransitionLink from "../TransitionLink";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { name: "Home", route: "/" },
    { name: "About", route: "/about" },
    { name: "Portfolio", route: "/portfolio" },
    { name: "Blogs", route: "/blogs" },
    { name: "Clients", route: "/clients" },
    { name: "Contact", route: "/contact" },
  ];

  return (
    <footer className="w-full bg-white py-12">
      <Container className="mx-auto max-w-7xl px-8">
        <div className="border-t border-gray-200"></div>

        <div className="flex items-start justify-between py-12">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-24 gap-y-8">
            <div className="space-y-8">
              {navLinks.slice(0, 3).map((navItem) => (
                <TransitionLink
                  key={navItem.route}
                  href={navItem.route}
                  className="block text-sm font-light text-gray-800 hover:text-gray-600"
                >
                  {navItem.name}
                </TransitionLink>
              ))}
            </div>

            <div className="space-y-8">
              {navLinks.slice(3, 6).map((navItem) => (
                <TransitionLink
                  key={navItem.route}
                  href={navItem.route}
                  className="block text-sm font-light text-gray-800 hover:text-gray-600"
                >
                  {navItem.name}
                </TransitionLink>
              ))}
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="text-gray-800 hover:text-gray-600"
            aria-label="Back to top"
          >
            <Image
              src={"/assets/arrowUp.svg"}
              alt="arrow"
              width={25}
              height={25}
            />
          </button>
        </div>

        <div className="border-t border-gray-200"></div>

        <div className="flex sm:flex-row flex-col sm:items-center gap-5 justify-between md:pt-12 pt-8">
          <p className="text-xs order-2 sm:order-1 font-light text-gray-800">
            All content Copyright © {new Date().getFullYear()} Ayo Ayo
          </p>

          <div className="flex order-1 sm:order-2 items-center space-x-6">
            <Link
              target="_blank"
              href="https://www.instagram.com/tolvisuals/?igsh=ZjBoeHF3dzE4c3Fp"
              className="text-gray-800 hover:text-gray-600"
              aria-label="Instagram"
            >
              <Image
                src={"/assets/instagram.svg"}
                alt="arrow"
                width={25}
                height={25}
              />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/ayotunde-adepoju-8bbb69194?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              className="text-gray-800 hover:text-gray-600"
              aria-label="LinkedIn"
            >
              <Image
                src={"/assets/linkedin.svg"}
                alt="arrow"
                width={25}
                height={25}
              />
            </Link>
            <Link
              target="_blank"
              href="https://www.tiktok.com/@tolvisuals9?_t=ZN-8vg4hJeJEZS&_r=1"
              className="text-gray-800 hover:text-gray-600"
              aria-label="LinkedIn"
            >
              <Image
                src={"/assets/tiktok.svg"}
                alt="arrow"
                width={25}
                height={25}
              />
            </Link>
            <Link
              target="_blank"
              href="https://youtube.com/@tolvisuals9?si=FluLHNZolWI1BTE3"
              className="text-gray-800 hover:text-gray-600"
              aria-label="LinkedIn"
            >
              <Image
                src={"/assets/youtube.svg"}
                alt="arrow"
                width={25}
                height={25}
              />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
