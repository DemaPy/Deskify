"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateBoardSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  let board;
  try {
    board = await db.board.update({
      data: {
        title: data.title,
      },
      where: {
        id: data.id,
        orgId: orgId,
      },
    });

    await createAuditLog({
      action: "DELETE",
      entityId: board.id,
      entityTitle: board.title,
      entityType: "BOARD",
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
  revalidatePath(`/board/${data.id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoardSchema, handler);
