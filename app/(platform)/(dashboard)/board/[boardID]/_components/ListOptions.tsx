import React, { ElementRef, useRef } from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import FormButton from "@/hooks/FormButton";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/useAction";
import { deleteList } from "@/actions/deleteList";
import { toast } from "sonner";
import { copyList } from "@/actions/copyList";

type TListOptions = {
  id: string;
  boardId: string;
  onAddCard: () => void;
};

const ListOptions = ({ id, boardId, onAddCard }: TListOptions) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success("List removed");
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: copyListAction } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success("List copied");
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-400 pb-4">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            size={"sm"}
            variant={"ghost"}
            className="h-auto w-auto p-2 absolute top-2 right-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start text-sm "
          variant={"ghost"}
        >
          Add card
        </Button>
        <Separator />
        <form
          action={async () => {
            copyListAction({ boardId, id });
          }}
        >
          <FormButton className="rounded-none w-full h-auto p-2 px-5 justify-start text-sm ">
            Copy list
          </FormButton>
        </form>
        <Separator />
        <form
          action={async () => {
            execute({ boardId, id });
          }}
        >
          <FormButton className="rounded-none w-full h-auto p-2 px-5 justify-start text-sm ">
            Delete list
          </FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
