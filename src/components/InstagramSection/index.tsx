"use client";
import Image from "next/image";

export default function InstagramSection() {
  const instagramUrl =
    "https://www.instagram.com/tolvisuals/?igsh=ZjBoeHF3dzE4c3Fp";

  return (
    <section
      onClick={() => window.open(instagramUrl, "_blank", "noopener,noreferrer")}
      className="w-full my-12 opacity-0  transition-opacity duration-300 hover:opacity-100 cursor-pointer bg-[#807c7c] py-24 flex items-center justify-center relative"
    >
      <div className="absolute inset-0"></div>

      <div className="flex flex-col mx-auto items-center justify-center space-y-4 text-white  transition-opacity duration-300">
        <Image
          src={"/assets/instagram-white.svg"}
          alt="Instagram"
          width={25}
          height={25}
        />
        <h2 className="text-3xl font-light tracking-wide">Instagram</h2>
        <p className="text-sm font-light tracking-wide">@tolvisuals</p>
      </div>
    </section>
  );
}
