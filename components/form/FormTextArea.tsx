"use client";

import { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import FormErrors from "./FormErrors";
import { useFormStatus } from "react-dom";

type TFormTextArea = {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[]> | undefined;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  defaultValue?: string;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
};

const FormTextArea = forwardRef<HTMLTextAreaElement, TFormTextArea>(
  function _FormTextArea(
    {
      id,
      label,
      onBlur,
      onClick,
      placeholder,
      className,
      defaultValue,
      disabled,
      errors,
      onKeyDown,
      required,
    },
    ref
  ) {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            ref={ref}
            disabled={pending || disabled}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            required={required}
            placeholder={placeholder}
            id={id}
            name={id}
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={`${id}-erorr`}
            defaultValue={defaultValue}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

export default FormTextArea;
