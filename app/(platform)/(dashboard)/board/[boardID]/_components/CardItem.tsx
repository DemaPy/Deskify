"use client";
import { CardModel } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";

type TCardItem = {
  idx: number;
  card: CardModel;
};

const CardItem = ({ card, idx }: TCardItem) => {
  const cardModal = useCardModal();
  
  return (
    <Draggable draggableId={card.id} index={idx}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(card.id)}
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-sm shadow-sm transition"
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
