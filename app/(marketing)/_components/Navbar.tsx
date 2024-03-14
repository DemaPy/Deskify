import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full p-4 border-b shadow-sm flex items-center bg-white">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} asChild variant={"outline"}>
            <Link href={"/sign-in"}>Login</Link>
          </Button>
          <Button size={"sm"} asChild>
            <Link href={"/sign-up"}>Get Deskify for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
