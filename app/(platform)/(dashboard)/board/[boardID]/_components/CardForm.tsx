import { createCard } from "@/actions/createCard";
import FormTextArea from "@/components/form/FormTextArea";
import { Button } from "@/components/ui/button";
import FormButton from "@/hooks/FormButton";
import { useAction } from "@/hooks/useAction";
import { error } from "console";
import { PlusIcon, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, {
  ElementRef,
  KeyboardEventHandler,
  forwardRef,
  useRef,
} from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type TCardForm = {
  isEditing: boolean;
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
};

const CardForm = forwardRef<HTMLTextAreaElement, TCardForm>(function _CardForm(
  { listId, isEditing, enableEditing, disableEditing },
  ref
) {
  const params = useParams();
  const formRef = useRef<ElementRef<"form"> | null>(null);
  const { execute, fieldErrors, isLoading } = useAction(createCard, {
    onSuccess: (data) => {
      toast.success(`Card ${data.title} created.`);
      formRef.current?.reset();
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  const onTextAreKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (ev) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeyDown);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title, listId });
  };

  if (isEditing) {
    return (
      <form ref={formRef} action={onSubmit} className="m-1 px-1 space-y-2">
        <FormTextArea
          errors={fieldErrors}
          id="title"
          onKeyDown={onTextAreKeyDown}
          ref={ref}
          placeholder="Enter a title..."
        />
        <div className="flex items-center gap-x-1">
          <FormButton disabled={isLoading}>Add card</FormButton>
          <Button onClick={disableEditing} size={"sm"} variant={"ghost"}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="pt-2 px-2">
      <Button
        onClick={enableEditing}
        className="h-auto px-2 py-2 justify-start text-muted-foreground text-sm"
        size={"sm"}
        variant={"ghost"}
      >
        <PlusIcon className="w-4 h-4 mr-2" />
        Add card
      </Button>
    </div>
  );
});

export default CardForm;
