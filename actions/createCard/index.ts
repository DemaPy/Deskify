"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { createSafeAction } from "@/lib/createSafeAction";
import { CreateCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  let card;
  let list;
  const { listId, title } = data;
  try {
    list = await db.list.findUnique({
      where: {
        id: listId,
      },
    });
    if (!list) {
      return {
        error: "List not found",
      };
    }

    const cardOrder = await db.cardModel.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = cardOrder ? cardOrder.order : 0;
    card = await db.cardModel.create({
      data: {
        title: title,
        order: newOrder,
        listId: listId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: "Failed to create",
    };
  }
  revalidatePath(`/board/${list?.boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
