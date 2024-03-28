"use client";

import { stripeRedirect } from "@/actions/stripeRedirection";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { useAction } from "@/hooks/useAction";
import Image from "next/image";
import { toast } from "sonner";

export const ProModal = () => {
  const { isOpen, onClose } = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onClick = () => {
    execute({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex justify-center items-center">
          <Image src={"/hero.svg"} alt="Hero" className="object-cover" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Upgrade to Deskify pro Today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best Deskify
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>and many more...</li>
            </ul>
          </div>
          <Button
            disabled={isLoading}
            onClick={onClick}
            className="w-full"
            variant={"default"}
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
