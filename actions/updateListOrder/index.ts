"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateListOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, lists } = data;
  let _lists;
  try {
    const trans = lists.map((list) =>
      db.list.update({
        where: {
          board: {
            orgId,
          },
          id: list.id,
        },
        data: {
          order: list.order,
        },
      })
    );

    _lists = await db.$transaction(trans);
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: "Failed to reorder",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: _lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
