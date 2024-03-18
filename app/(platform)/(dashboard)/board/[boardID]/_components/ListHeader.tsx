"use client";

import { updateList } from "@/actions/updateList";
import FormInput from "@/components/form/FormInput";
import { useAction } from "@/hooks/useAction";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type TListHeader = {
  title: string;
  id: string;
  boardId: string;
};

const ListHeader = ({ title, boardId, id }: TListHeader) => {
  const { execute, isLoading, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`List renamed.`);
    },
  });
  const [listName, setListName] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const formref = useRef<ElementRef<"form">>(null);
  const inputref = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputref.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  const onBlur = () => {
    formref.current?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    setListName(title);
    if (title === listName) disableEditing();

    execute({ title, boardId, id });
    disableEditing();
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="py-4 px-2 text-sm font-semibold justify-between items-start gap-x-2">
      {isEditing ? (
        <form
          ref={formref}
          onBlur={onBlur}
          action={onSubmit}
          className="w-full text-sm px-2 font-medium"
        >
          <FormInput
            errors={fieldErrors}
            className="px-0 py-0 hover:border-input bg-transparent focus:border-input transition truncate"
            id="title"
            ref={inputref}
            onBlur={disableEditing}
            placeholder="Enter list title"
            defaultValue={listName}
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2 font-medium"
        >
          {listName}
        </div>
      )}
    </div>
  );
};

export default ListHeader;
