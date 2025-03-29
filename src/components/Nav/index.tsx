"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Container from "../Container";
import TransitionLink from "../TransitionLink";

const Nav = () => {
  const navLinks = [
    { name: "Home", route: "/home" },
    { name: "About", route: "/about" },
    { name: "Portfolio", route: "/portfolio" },
    { name: "Investment", route: "/investment" },
    { name: "Clients", route: "/clients" },
    { name: "Contact", route: "/contact" },
  ];
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const darkPaths = [
    "/clients",
    "/portfolio/weddings",
    "/portfolio/engagements",
    "/portfolio/children-and-family",
    "/portfolio/products-and-lifestyle",
    "/portfolio/portraits",
    "/reviews",
    "/blogs",
  ];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <nav
      className={`absolute font-serif p-5 lg:p-0 lg:top-7 max-w-5xl mx-auto left-0 right-0 z-10 flex items-center justify-center px- lg:py-6`}
    >
      <div className="flex w-full items-center justify-between lg:justify-center gap-x-16">
        <div className="lg:flex hidden items-center gap-x-16">
          {navLinks.slice(0, 3).map((navItem) => (
            <TransitionLink
              key={navItem.route}
              href={navItem.route}
              className={` font-light ${
                darkPaths.includes(pathname) || pathname.startsWith("/clients")
                  ? "text-[#000] hover:text-[000]/80"
                  : "text-white hover:text-white/80"
              } `}
            >
              {navItem.name}
            </TransitionLink>
          ))}
        </div>

        <TransitionLink href="/home" className="text-2xl italic font-light">
          <Image src={"/assets/logoo.svg"} width={80} height={80} alt="logo" />
        </TransitionLink>

        <div className="lg:flex hidden items-center gap-x-16">
          {navLinks.slice(3, 6).map((navItem) => (
            <TransitionLink
              key={navItem.route}
              href={navItem.route}
              className={`font-light ${
                darkPaths.includes(pathname) ||
                pathname.startsWith("/clients") ||
                pathname.startsWith("/blogs")
                  ? "text-[#000] hover:text-[000]/80"
                  : "text-white hover:text-white/80"
              }`}
            >
              {navItem.name}
            </TransitionLink>
          ))}
        </div>

        <motion.div
          whileTap={{ scale: 0.85 }}
          className="flex flex-col z-50 gap-[4px] w-[18px] lg:hidden cursor-pointer"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          <motion.div
            animate={mobileNavOpen ? { rotateZ: 45, y: 6 } : {}}
            style={{
              backgroundColor:
                mobileNavOpen ||
                darkPaths.includes(pathname) ||
                pathname.startsWith("/clients") ||
                pathname.startsWith("/blogs")
                  ? "#000"
                  : "#fff",
            }}
            className="w-full h-[1.5px] transition-all duration-300"
          ></motion.div>

          <motion.div
            animate={
              mobileNavOpen
                ? { opacity: 0 }
                : { opacity: 1, transition: { delay: 0.3 } }
            }
            style={{
              backgroundColor:
                darkPaths.includes(pathname) ||
                pathname.startsWith("/clients") ||
                pathname.startsWith("/blogs")
                  ? "#000"
                  : "#fff",
            }}
            className="w-full h-[1.5px] transition-all duration-300"
          ></motion.div>

          <motion.div
            animate={mobileNavOpen ? { rotateZ: -45, y: -4 } : {}}
            style={{
              backgroundColor:
                mobileNavOpen ||
                darkPaths.includes(pathname) ||
                pathname.startsWith("/clients") ||
                pathname.startsWith("/blogs")
                  ? "#000"
                  : "#fff",
            }}
            className="w-full h-[1.5px] transition-all duration-300"
          ></motion.div>
        </motion.div>

        {hasMounted && (
          <motion.div
            animate={{ height: mobileNavOpen ? "calc(100%)" : 0 }}
            className={`fixed ${
              mobileNavOpen ? "block" : "hidden"
            } inset-0 overflow-hidden z-40 bg-white py-5  flex flex-col w-full lg:hidden transition-height duration-300`}
          >
            <Container className="flex flex-col h-full">
              <div className="flex flex-col mt-10 flex-grow">
                {navLinks.map((navItem, index) => (
                  <motion.div
                    key={index}
                    className="py-4"
                    initial={{ y: 60, opacity: 0 }}
                    animate={
                      mobileNavOpen
                        ? {
                            y: 0,
                            opacity: 1,
                            transition: {
                              duration: 0.4,
                              delay: 0.1 + index * 0.1,
                            },
                          }
                        : {
                            y: 60,
                            opacity: 0,
                            transition: { duration: 0.1 },
                          }
                    }
                  >
                    <TransitionLink
                      href={navItem.route}
                      onClick={() => setMobileNavOpen(false)}
                      className="relative group text-2xl md:text-3xl"
                    >
                      {navItem.name}
                    </TransitionLink>
                  </motion.div>
                ))}
              </div>
            </Container>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
