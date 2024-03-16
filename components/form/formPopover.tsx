"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "../ui/popover";
import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/actions/createDashboard";
import { ElementRef, ReactNode, useRef, useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import FormInput from "./FormInput";
import FormButton from "@/hooks/FormButton";
import { toast } from "sonner";
import FormPicker from "./formPicker";
import { useRouter } from "next/navigation";

type TFormPopover = {
  children: ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
};

const FormPopover = ({ children, align, side, sideOffset }: TFormPopover) => {
  const router = useRouter();
  const ref = useRef<ElementRef<"button">>(null);
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created");
      ref.current?.click();
      router.push("/board/" + data.id);
    },
    onError: () => {
      toast.error("Board created");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 mb-4">
          Create board
        </div>
        <PopoverClose ref={ref} asChild>
          <Button
            className=" right-2 absolute top-2"
            size={"sm"}
            variant={"ghost"}
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormButton className="w-full">Create</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
