'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const navLinks = [
    { name: "Home", route: "/" },
    { name: "About", route: "/about" },
    { name: "Portfolio", route: "/portfolio" },
    { name: "Investment", route: "/investment" },
    { name: "Clients", route: "/clients" },
    { name: "Contact", route: "/contact" },
  ];
  const pathname = usePathname();

  return (
    <nav className="absolute font-serif  top-0 max-w-5xl mx-auto left-0 right-0 z-10 flex items-center justify-center px- py-6">
      <div className="flex w-full  items-center justify-center gap-x-16">
        <div className="flex items-center gap-x-16">
          {navLinks.slice(0, 3).map((navItem) => (
            <Link
              key={navItem.route}
              href={navItem.route}
              className={`text-sm font-light ${
                pathname === "/clients"
                  ? "text-[#000] hover:text-[000]/80"
                  : "text-white hover:text-white/80"
              } `}
            >
              {navItem.name}
            </Link>
          ))}
        </div>

        <Link href="/" className="text-2xl italic font-light">
          <Image
            src={"/assets/logoo.svg"}
            width={120}
            height={100}
            alt="logo"
          />
        </Link>

        <div className="flex items-center gap-x-16">
          {navLinks.slice(3, 6).map((navItem) => (
            <Link
              key={navItem.route}
              href={navItem.route}
              className={`text-sm font-light ${
                pathname === "/clients"
                  ? "text-[#000] hover:text-[000]/80"
                  : "text-white hover:text-white/80"
              }`}
            >
              {navItem.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
