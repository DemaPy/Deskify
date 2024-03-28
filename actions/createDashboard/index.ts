"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { createSafeAction } from "@/lib/createSafeAction";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { hasAvailableCount, incrementAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const canCreateBoard = await hasAvailableCount();
  const isPro = await checkSubscription();

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHtml ||
    !imageUserName
  ) {
    return {
      error: "Failed to create board.",
    };
  }

  let board;
  try {
    if (!canCreateBoard && !isPro) {
      throw new Error(
        "You have reached limit of five boards. Please, consider update to pro plan."
      );
    }
    board = await db.board.create({
      data: {
        title: title,
        imageId,
        imageFullUrl,
        imageLinkHtml,
        imageThumbUrl,
        imageUserName,
        orgId,
      },
    });
    if (!isPro) {
      await incrementAvailableCount();
    }
    await createAuditLog({
      action: "CREATE",
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
      error: "Failed to create",
    };
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
