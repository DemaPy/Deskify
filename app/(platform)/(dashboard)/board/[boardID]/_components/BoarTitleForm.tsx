"use client";

import { updateBoard } from "@/actions/updateBoard";
import { useAction } from "@/hooks/useAction";

type TBoarTitleForm = {
  title: string;
  params?: { boardID: string };
};

const BoarTitleForm = ({ title, params }: TBoarTitleForm) => {
//   const { execute } = useAction(updateBoard);

  //     ToDo: update board. Action already created
  //   const onSubmit = (formData: FormData) => {
  //     const title = formData.get("title") as string
  //       execute({
  //           id: id,
  //           title: newTitle
  //       })
  //     };
  return <div>{title}</div>;
};

export default BoarTitleForm;
