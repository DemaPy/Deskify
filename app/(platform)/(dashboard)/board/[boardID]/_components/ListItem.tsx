"use client";

import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import React from "react";
import ListHeader from "./ListHeader";

type TListItem = {
  item: ListWithCards;
  idx: number;
};

const ListItem = ({ idx, item }: TListItem) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full pb-2 rounded-md bg-[#f1f2f3] shadow-md">
        <ListHeader boardId={item.boardId} id={item.id} title={item.title} />
      </div>
    </li>
  );
};

export default ListItem;
