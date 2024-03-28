"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateCardSchema } from "./schema";
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
    card = await db.cardModel.update({
      data: {
        title: data.title,
        description: data.description,
      },
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
      action: "UPDATE",
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
      error: "Failed to update",
    };
  }
  revalidatePath(`/board/${data.boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCardSchema, handler);
