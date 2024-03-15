"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createBoard = z.object({
  title: z.string().min(4),
});

export async function create(formData: FormData) {
  const { title } = createBoard.parse({ title: formData.get("title") });

  await db.board.create({
    data: {
      title: title,
    },
  });


  revalidatePath("/")
}
