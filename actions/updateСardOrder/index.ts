"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateСardOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  let cards;
  let list;
  
  try {
    list = await db.list.findUnique({
      where: {
        id: data.listId,
      },
    });

    if (!list) {
      return {
        error: "List not found",
      };
    }
    
    const trans = data.lists.map((item) =>
      db.cardModel.update({
        data: {
          order: item.order,
          listId: data.listId,
        },
        where: {
          id: item.id,
          list: {
            board: {
              orgId
            }
          }
        },
      })
    );

    cards = await db.$transaction(trans);
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: "Failed to update",
    };
  }
  revalidatePath(`/board/${list.boardId}`);
  return { data: cards };
};

export const updateСardOrder = createSafeAction(UpdateСardOrder, handler);
