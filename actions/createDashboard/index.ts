"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { createSafeAction } from "@/lib/createSafeAction";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  let board;
  try {
    board = await db.board.create({
      data: {
        title: data.title,
      },
    });
    revalidatePath(`/board/${board.id}`);
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

  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
