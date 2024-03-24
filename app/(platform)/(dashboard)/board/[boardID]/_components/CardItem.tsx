"use client";
import { CardModel } from "@prisma/client";
import { Draggable, Droppable } from "@hello-pangea/dnd";

type TCardItem = {
  idx: number;
  card: CardModel;
};

const CardItem = ({ card, idx }: TCardItem) => {
  return (
    <Draggable draggableId={card.id} index={idx}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          role="button"
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-sm shadow-sm transition"
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
