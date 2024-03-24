"use client";
import { CardModel } from "@prisma/client";

type TCardItem = {
  idx: number;
  card: CardModel;
};

const CardItem = ({ card, idx }: TCardItem) => {
  return (
    <div className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-sm shadow-sm transition">
      {card.title}
    </div>
  );
};

export default CardItem;
