"use client";

import { updateCard } from "@/actions/updateCard";
import FormInput from "@/components/form/FormInput";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

type THeader = {
  title: string;
  id: string;
  isLoading: boolean;
};

const Header = ({ id, title, isLoading }: THeader) => {
  const queryClient = useQueryClient();
  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success("Card title updated");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const params = useParams();
  const [isOpen, setIsOpen] = useState();
  const ref = useRef<ElementRef<"form"> | null>(null);

  const onBlur = () => {
    ref.current?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    execute({
      id,
      title: formData.get("title") as string,
      boardId: params.boardID as string,
    });
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton className="w-full h-6" />
      ) : (
        <div className="flex items-center gapx-3 mb-6 w-full">
          <Layout className="h-4 w-4 text-neutral-700 mt-1" />
          <form ref={ref} action={onSubmit}>
            <FormInput
              className="outline-none border-none text-xl focus-visible:bg-white truncate bg-transparent font-semibold"
              onBlur={onBlur}
              id="title"
              defaultValue={title}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Header;
