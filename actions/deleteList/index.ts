"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { DeleteListSchema } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  let list;
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
    list = await db.list.delete({
      where: {
        id: data.id,
        boardId: data.boardId,
        board: {
          orgId: orgId,
        },
      },
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
  return { data: list };
};

export const deleteList = createSafeAction(DeleteListSchema, handler);
