import { checkSubscription } from "@/lib/subscription";
import React from "react";
import Info from "../_components/Info";
import { Separator } from "@/components/ui/separator";
import SubscriptioButtoComponent from "./_components/SubscriptioButtoComponent";

const BillingPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <SubscriptioButtoComponent isPro={isPro} />
    </div>
  );
};

export default BillingPage;
