import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const font = localFont({
  src: "../public/fonts/font.woff2",
});

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <div className="gap-2 items-center hidden md:flex hover:opacity-75 transition-opacity">
        <Image src={"/logo.svg"} alt="Logo" height={30} width={30} />
      </div>
      <p className={cn("text-lg text-neutral-700", font.className)}>Deskify</p>
    </Link>
  );
};

export default Logo;
