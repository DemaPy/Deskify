"use client";

import { deleteBoard } from "@/actions/deleteBoard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/useAction";
import { MoreHorizontal, Trash, X } from "lucide-react";

type TBoardOptions = {
  id: string;
};
const BoardOptions = ({ id }: TBoardOptions) => {
  const { execute, isLoading } = useAction(deleteBoard);

  const onDelete = () => {
    execute({ id });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"sm"} variant={"secondary"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="py-4 px-2" side="bottom" align="start">
        <Label>Board actions</Label>
        <PopoverClose asChild>
          <Button
            className="absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
            size={"sm"}
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          disabled={isLoading}
          onClick={onDelete}
          variant={"ghost"}
          className="bg-red-200 rounded-sm w-full justify-start"
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
