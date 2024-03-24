"use client";

import { ListWithCards } from "@/types";
import ListForm from "./ListForm";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import {
  DragDropContext,
  DropResult,
  Droppable,
  OnDragEndResponder,
  ResponderProvided,
} from "@hello-pangea/dnd";
import { List } from "@prisma/client";
import { useAction } from "@/hooks/useAction";
import { updateListOrder } from "@/actions/updateListOrder";
import { updateСardOrder } from "@/actions/updateСardOrder";
import { toast } from "sonner";

type ListContainer = {
  data: ListWithCards[];
  boardId: string;
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  // Remove item by index from given list
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const ListContainer = ({ boardId, data }: ListContainer) => {
  const [lists, setLists] = useState(data);
  const { execute: reorderCard } = useAction(updateСardOrder, {
    onSuccess: (data) => {
      console.log(data);

      toast.success("Card reordered succesfully");
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  const { execute: reorderList } = useAction(updateListOrder, {
    onSuccess: (data) => {
      console.log(data);

      toast.success("Lists reordered succesfully");
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  useEffect(() => {
    setLists(data);
  }, [data]);

  const handleCardDrag = (result: DropResult) => {
    const newLists = [...lists];
    const sourceList = newLists.find(
      (list) => list.id === result.source.droppableId
    );
    const destList = newLists.find(
      (list) => list.id === result.destination?.droppableId
    );

    // sourceList - list from card has been taken
    // destList - list where card has been dropped
    if (!sourceList || !destList) return;

    if (result.source.droppableId === result.destination?.droppableId) {
      const reorderedCards = reorder(
        sourceList.cards,
        result.source.index,
        result.destination?.index
      ).map((card, idx) => ({ ...card, order: idx }));

      sourceList.cards = reorderedCards;
      setLists(newLists);
      reorderCard({ listId: destList.id, lists: reorderedCards });
    } else {
      const [card] = sourceList.cards.splice(result.source.index, 1);
      card.listId = destList.id;
      destList.cards.splice(result.destination?.index!, 0, card);

      // Since card has been remove from source list, we need to update index for other cards.
      // Before removal: 1 -> 2 -> 3 -> 4
      // After removal: 1 -> 2 -> 4
      // After applying new idx: 1 -> 2 -> 3
      sourceList.cards.forEach((card, idx) => ({ ...card, idx }));

      // Since card has been added to dest list, we need to update index for other cards.
      destList.cards.map((card, idx) => ({ ...card, order: idx }));
      setLists(newLists);
      reorderCard({ listId: destList.id, lists: destList.cards });
    }
  };

  const handleListDrag = (result: DropResult) => {
    if (result.destination?.index || result.destination?.index === 0) {
      const newOrder = reorder(
        lists,
        result.source.index,
        result.destination?.index
      ).map((list, idx) => ({ ...list, order: idx }));
      setLists(newOrder);
      reorderList({ boardId, lists: newOrder });
    }
  };

  const handleDragType: Record<string, (result: DropResult) => void> = {
    card: handleCardDrag,
    list: handleListDrag,
  };

  const handleDrag = (result: DropResult, provided: ResponderProvided) => {
    if (
      result.destination?.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    if (result.type in handleDragType) {
      handleDragType[result.type](result);

      // TODO: Trigger server action after reordering
    }
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="list" type="list" direction="horizontal">
        {(provided) => (
          <ol
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-x-3 h-full"
          >
            {lists.map((list, i) => {
              return <ListItem key={list.id} idx={i} item={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
