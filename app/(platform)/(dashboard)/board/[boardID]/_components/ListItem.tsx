"use client";

import { ListWithCards } from "@/types";
import React, { ElementRef, useRef, useState } from "react";
import ListHeader from "./ListHeader";
import CardForm from "./CardForm";
import { cn } from "@/lib/utils";
import CardItem from "./CardItem";
import { Draggable, Droppable } from "@hello-pangea/dnd";

type TListItem = {
  item: ListWithCards;
  idx: number;
};

const ListItem = ({ idx, item }: TListItem) => {
  const textAreaRef = useRef<ElementRef<"textarea"> | null>(null);
  const [isEditing, setEditing] = useState(false);

  const disableEditing = () => setEditing(false);
  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => textAreaRef.current?.focus());
  };

  return (
    <Draggable draggableId={item.id} index={idx}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full pb-2 rounded-md bg-[#f1f2f3] shadow-md"
          >
            <ListHeader
              onAddCard={enableEditing}
              boardId={item.boardId}
              id={item.id}
              title={item.title}
            />
            <Droppable droppableId={item.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-1 flex flex-col gap-y-2",
                    item.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {item.cards.map((card, idx) => (
                    <CardItem key={card.id} idx={idx} card={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              listId={item.id}
              isEditing={isEditing}
              ref={textAreaRef}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
