import { List, CardModel } from "@prisma/client";

export type ListWithCards = List & { cards: CardModel[] };

export type CardWithList = CardModel & { list: List[] };
