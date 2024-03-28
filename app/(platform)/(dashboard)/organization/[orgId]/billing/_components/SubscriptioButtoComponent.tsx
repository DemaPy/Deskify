import { stripeRedirect } from "@/actions/stripeRedirection";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { useAction } from "@/hooks/useAction";
import React from "react";
import { toast } from "sonner";

const SubscriptioButtoComponent = ({ isPro }: { isPro: boolean }) => {
  const proModal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };
  return (
    <Button onClick={onClick} disabled={isLoading}>
      {isPro ? "Manage subscription" : "Upgrade to pro now!"}
    </Button>
  );
};

export default SubscriptioButtoComponent;
