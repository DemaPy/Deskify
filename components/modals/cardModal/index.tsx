"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Header from "./header";

export const CardModal = () => {
  const { id, isOpen, onClose, onOpen } = useCardModal();

  const { data, isLoading } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <Header isLoading={isLoading} id={id!} title={data?.title!} />
      </DialogContent>
    </Dialog>
  );
};
