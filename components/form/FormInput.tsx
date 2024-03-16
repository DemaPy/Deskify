"use client";

import React, { ForwardedRef, forwardRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import FormErrors from "./FormErrors";

type IFormInput = {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  errors?: Record<string, string[]> | undefined;
  onBlur?: () => void;
};

const FormInput = forwardRef<HTMLInputElement, IFormInput>(
  (
    {
      id,
      className,
      defaultValue,
      disabled,
      errors,
      label,
      onBlur,
      placeholder,
      required,
      type,
    },
    forwardedRef
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-sm font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Input
            name={id}
            type={type}
            onBlur={onBlur}
            required={required}
            ref={forwardedRef}
            className={cn("py-1 h-7 text-sm px-2", className)}
            aria-describedby={`${id}-error`}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={pending || disabled}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = "FormInputForward";

export default FormInput;
