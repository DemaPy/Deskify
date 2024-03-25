"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { CopyCardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  let card;
  try {
    const board = await db.board.findUnique({
      where: {
        id: data.boardId,
      },
    });

    if (!board) {
      return {
        error: "Board not found",
      };
    }
    const cardCopy = await db.cardModel.findUnique({
      where: {
        id: data.id,
        list: {
          board: {
            orgId: orgId,
          },
        },
      },
    });

    if (!cardCopy) {
      return {
        error: "Card not found",
      };
    }

    const lastCard = await db.cardModel.findFirst({
      where: {
        listId: cardCopy.listId,
      },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 0;

    card = await db.cardModel.create({
      data: {
        title: cardCopy.title + " Copy",
        order: newOrder,
        listId: cardCopy.listId,
        description: cardCopy.description + " Copy",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: "Failed to copy",
    };
  }

  revalidatePath(`/board/${data.boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCardSchema, handler);
