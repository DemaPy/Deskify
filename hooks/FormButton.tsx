import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React, { ReactNode } from "react";
import { useFormStatus } from "react-dom";

const FormButton = ({
  className,
  disabled,
  children,
}: {
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={cn(className, pending && "w-20")}
      disabled={disabled || pending}
      type="submit"
      variant={"outline"}
      size={"sm"}
    >
      {disabled || pending ? (
        <>
          <LoaderCircle className="font-semibold w-4 h-4 animate-spin mr-2" />{" "}
          {children ? children : "Save"}
        </>
      ) : (
        <>{children ? children : "Save"}</>
      )}
    </Button>
  );
};

export default FormButton;
