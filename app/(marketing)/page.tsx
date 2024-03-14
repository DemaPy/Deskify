import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";
import { cn } from "../../lib/utils";

const font = localFont({
  src: "../../public/fonts/font.woff2",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const Marketing = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          `flex items-center justify-center flex-col select-none`,
          font.className
        )}
      >
        <article className="hover:shadow-md transition-shadow mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="w-4 h-4 mr-2" />
          No 1 Task management
        </article>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-4">
          Deskify helps team move faster
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-tr from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit font-semibold">
          work forward.
        </div>
      </div>
      <div className={cn("text-sm md:text-xl text-neutral-400 mt-4 max-w-xl md:max-w-2xl text-center mx-auto", poppins.className)}>
        Collaborate, manage projects, and reach new productivity peaks.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href={"/sign-up"} className="select-none">
          Get Deskify for free
        </Link>
      </Button>
    </div>
  );
};

export default Marketing;
