"use client";

import { copyCard } from "@/actions/copyCard";
import { deleteCard } from "@/actions/deleteCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modal";
import { useAction } from "@/hooks/useAction";
import { CardWithList } from "@/types";
import { CopyIcon, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

type TActions = {
  data: CardWithList;
};

export const Actions = ({ data }: TActions) => {
  const { onClose } = useCardModal();
  const params = useParams();
  const { execute: onDeleteCard, isLoading: isDeleteLoading } = useAction(
    deleteCard,
    {
      onSuccess: () => {
        toast.success("Card deleted");
        onClose();
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  const { execute: onCopyCard, isLoading: isCopyLoading } = useAction(
    copyCard,
    {
      onSuccess: () => {
        toast.success("Card copied");
        onClose();
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );

  return (
    <div className="space-y-2 mt-2 w-full">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        size={"sm"}
        className="w-full justify-start"
        variant={"outline"}
        disabled={isCopyLoading}
        onClick={() =>
          onCopyCard({ boardId: params.boardID as string, id: data.id })
        }
      >
        <CopyIcon className="w-4 h-4 mr-2" />
        Copy
      </Button>
      <Button
        size={"sm"}
        className="w-full justify-start"
        variant={"outline"}
        disabled={isDeleteLoading}
        onClick={() =>
          onDeleteCard({ boardId: params.boardID as string, id: data.id })
        }
      >
        <Trash className="w-4 h-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
