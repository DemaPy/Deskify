"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { DeleteCardSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";

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
    card = await db.cardModel.delete({
      where: {
        id: data.id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    await createAuditLog({
      action: "DELETE",
      entityId: card.id,
      entityTitle: card.title,
      entityType: "CARD",
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: "Failed to delete",
    };
  }

  revalidatePath(`/board/${data.boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCardSchema, handler);
