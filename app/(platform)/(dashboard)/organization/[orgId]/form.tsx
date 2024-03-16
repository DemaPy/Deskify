"use client";

import { createBoard } from "@/actions/createDashboard";
import FormInput from "@/components/form/FormInput";
import FormButton from "@/hooks/FormButton";
import { useAction } from "@/hooks/useAction";
import React from "react";

const Form = () => {
  const { execute, data, fieldErrors, isLoading, error } = useAction(
    createBoard,
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  return (
    <div>
      <form action={onSubmit}>
        <FormInput errors={fieldErrors} id="title" label="Title" />
        <FormButton />
      </form>
    </div>
  );
};

export default Form;
