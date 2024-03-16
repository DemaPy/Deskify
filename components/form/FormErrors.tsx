import { XCircle } from "lucide-react";
import React from "react";

type FormErrors = {
  id: string;
  errors: Record<string, string[]> | undefined;
};

const FormErrors = ({ id, errors }: FormErrors) => {
  if (!errors) {
    return null;
  }

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-xs text-rose-500"
    >
      {errors?.[id].map((err) => {
        return (
          <div
            key={err}
            className="mt-2 items-center flex font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
          >
            <XCircle className="h-4 w-4 mr-2" /> {err}
          </div>
        );
      })}
    </div>
  );
};

export default FormErrors;
