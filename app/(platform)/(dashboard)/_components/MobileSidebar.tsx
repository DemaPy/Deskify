"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  const pathname = usePathname();
  const [mounted, setIsMounted] = useState(false);
  const { isOpen, onClose, onOpen } = useMobileSidebar();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!mounted) return null;

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden"
        variant={"outline"}
        size={"sm"}
      >
        <MenuIcon className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"left"} className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
