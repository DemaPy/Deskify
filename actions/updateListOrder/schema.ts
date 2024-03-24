import { z } from "zod";

export const UpdateListOrder = z.object({
  lists: z.array(z.object({
    id: z.string(),
    order: z.number(),
    title: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })),
  boardId: z.string(),
});
