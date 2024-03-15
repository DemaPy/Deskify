import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 w-full p-4 border-b flex items-center bg-white">
      <MobileSidebar />

      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button size={"sm"} className="rounded-sm hidden md:block px-3 py-1">
          Create
        </Button>
        <Button size={"sm"} className="rounded-sm md:hidden ml-2">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl={"/organization/:id"}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
