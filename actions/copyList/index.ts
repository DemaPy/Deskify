"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { CopyListSchema } from "./schema";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/create-audit-log";

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
    const listCopy = await db.list.findUnique({
      where: {
        id: data.id,
        boardId: data.boardId,
        board: {
          orgId: orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listCopy) {
      return {
        error: "List not found",
      };
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId: data.boardId,
      },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 0;

    list = await db.list.create({
      data: {
        title: listCopy.title + " Copy",
        order: newOrder,
        boardId: listCopy.boardId,
        cards: {
          createMany: {
            data: listCopy.cards.map((item) => ({
              title: item.title,
              description: item.description,
              order: item.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });

    await createAuditLog({
      action: "CREATE",
      entityId: list.id,
      entityTitle: list.title,
      entityType: "LIST",
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
  return { data: list };
};

export const copyList = createSafeAction(CopyListSchema, handler);
