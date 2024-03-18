"use client";

import { ListWithCards } from "@/types";
import ListForm from "./ListForm";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";

type ListContainer = {
  data: ListWithCards[];
  boardId: string;
};

const ListContainer = ({ boardId, data }: ListContainer) => {
  const [lists, setLists] = useState(data);

  useEffect(() => {
    setLists(data);
  }, [data]);

  return (
    <ol className="flex gap-x-3 h-full">
      {lists.map((list, i) => {
        return <ListItem key={list.id} idx={i} item={list} />;
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};

export default ListContainer;
