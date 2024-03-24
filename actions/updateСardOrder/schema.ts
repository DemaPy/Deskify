import { z } from "zod";

export const UpdateСardOrder = z.object({
  lists: z.array(
    z.object({
      id: z.string(),
      description: z.string().nullish(),
      order: z.number(),
      listId: z.string(),
      title: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  listId: z.string(),
});
