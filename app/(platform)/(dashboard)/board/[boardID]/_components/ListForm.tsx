"use client";

import { Button } from "@/components/ui/button";
import ListWrapper from "./ListWrapper";
import { Plus, X } from "lucide-react";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormInput from "@/components/form/FormInput";
import { useParams, useRouter } from "next/navigation";
import FormButton from "@/hooks/FormButton";
import { useAction } from "@/hooks/useAction";
import { createList } from "@/actions/createList";
import { toast } from "sonner";

const ListForm = () => {
  const router = useRouter();
  const { execute, isLoading, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title} created."`);
      disableEditing();
      router.refresh();
    },
  });
  const params = useParams();
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardID = formData.get("boardID") as string;

    execute({ boardId: params.boardID as string, title });
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const okKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", okKeyDown);
  useOnClickOutside(formRef, disableEditing);
  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            ref={inputRef}
            placeholder="Enter list title"
          />
          <div className="flex items-center gap-x-1">
            <FormButton disabled={isLoading}>Add list</FormButton>
            <Button onClick={disableEditing} variant={"ghost"} size={"sm"}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <Button
        onClick={enableEditing}
        className="text-black w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex justify-start font-medium text-sm"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add list
      </Button>
    </ListWrapper>
  );
};

export default ListForm;
