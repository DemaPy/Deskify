"use client";

import { ListWithCards } from "@/types";
import ListForm from "./ListForm";

type ListContainer = {
  data: ListWithCards[];
  boardId: string;
};

const ListContainer = ({ boardId, data }: ListContainer) => {
  return (
    <ol>
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};

export default ListContainer;
