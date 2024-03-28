"use client";

import { useOrganization } from "@clerk/nextjs";
import { CreditCard, LoaderCircle } from "lucide-react";
import Image from "next/image";

const Info = ({ isPro }: { isPro: boolean }) => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return (
      <p className="text-xl text-muted-foreground">
        <LoaderCircle className="animate-spin w-6 h-6 mr-2" /> Loading...
      </p>
    );
  }

  return (
    <div className="flex items-center gap-x-4 mb-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          alt={"organization"}
          fill
          src={organization?.imageUrl!}
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="h-4 w-4 mr-2" /> {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};

export default Info;
